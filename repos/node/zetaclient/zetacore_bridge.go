package zetaclient

import (
	"fmt"
	"sync"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/simapp/params"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/hashicorp/go-retryablehttp"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/zeta-chain/zetacore/app"
	"github.com/zeta-chain/zetacore/common"
	"github.com/zeta-chain/zetacore/common/cosmos"
	crosschaintypes "github.com/zeta-chain/zetacore/x/crosschain/types"
	observertypes "github.com/zeta-chain/zetacore/x/observer/types"
	"github.com/zeta-chain/zetacore/zetaclient/config"
	"google.golang.org/grpc"
)

var _ ZetaCoreBridger = &ZetaCoreBridge{}

// ZetaCoreBridge will be used to send tx to ZetaCore.
type ZetaCoreBridge struct {
	logger              zerolog.Logger
	blockHeight         int64
	accountNumber       map[common.KeyType]uint64
	seqNumber           map[common.KeyType]uint64
	grpcConn            *grpc.ClientConn
	httpClient          *retryablehttp.Client
	cfg                 config.ClientConfiguration
	encodingCfg         params.EncodingConfig
	keys                *Keys
	broadcastLock       *sync.RWMutex
	zetaChainID         string
	lastOutTxReportTime map[string]time.Time
	stop                chan struct{}
	pause               chan struct{}
}

// NewZetaCoreBridge create a new instance of ZetaCoreBridge
func NewZetaCoreBridge(k *Keys, chainIP string, signerName string, chainID string, hsmMode bool) (*ZetaCoreBridge, error) {
	// main module logger
	logger := log.With().Str("module", "CoreBridge").Logger()
	cfg := config.ClientConfiguration{
		//todo is this const ok?
		ChainHost:    fmt.Sprintf("%s:1317", chainIP),
		SignerName:   signerName,
		SignerPasswd: "password",
		ChainRPC:     fmt.Sprintf("%s:26657", chainIP),
		HsmMode:      hsmMode,
	}

	httpClient := retryablehttp.NewClient()
	httpClient.Logger = nil

	grpcConn, err := grpc.Dial(
		fmt.Sprintf("%s:9090", chainIP),
		grpc.WithInsecure(),
	)
	if err != nil {
		logger.Error().Err(err).Msg("grpc dial fail")
		return nil, err
	}
	accountsMap := make(map[common.KeyType]uint64)
	seqMap := make(map[common.KeyType]uint64)
	for _, keyType := range common.GetAllKeyTypes() {
		accountsMap[keyType] = 0
		seqMap[keyType] = 0
	}

	return &ZetaCoreBridge{
		logger:              logger,
		grpcConn:            grpcConn,
		httpClient:          httpClient,
		accountNumber:       accountsMap,
		seqNumber:           seqMap,
		cfg:                 cfg,
		encodingCfg:         app.MakeEncodingConfig(),
		keys:                k,
		broadcastLock:       &sync.RWMutex{},
		lastOutTxReportTime: map[string]time.Time{},
		stop:                make(chan struct{}),
		zetaChainID:         chainID,
		pause:               make(chan struct{}),
	}, nil
}

// MakeLegacyCodec creates codec
func MakeLegacyCodec() *codec.LegacyAmino {
	cdc := codec.NewLegacyAmino()
	banktypes.RegisterLegacyAminoCodec(cdc)
	authtypes.RegisterLegacyAminoCodec(cdc)
	cosmos.RegisterCodec(cdc)
	crosschaintypes.RegisterCodec(cdc)
	return cdc
}

func (b *ZetaCoreBridge) GetLogger() *zerolog.Logger {
	return &b.logger
}

func (b *ZetaCoreBridge) UpdateChainID(chainID string) {
	if b.zetaChainID != chainID {
		b.zetaChainID = chainID
	}
}

func (b *ZetaCoreBridge) Stop() {
	b.logger.Info().Msgf("ZetaBridge is stopping")
	close(b.stop) // this notifies all configupdater to stop
}

// GetAccountNumberAndSequenceNumber We do not use multiple KeyType for now , but this can be optionally used in the future to seprate TSS signer from Zetaclient GRantee
func (b *ZetaCoreBridge) GetAccountNumberAndSequenceNumber(_ common.KeyType) (uint64, uint64, error) {
	ctx, err := b.GetContext()
	if err != nil {
		return 0, 0, err
	}
	address := b.keys.GetAddress()
	return ctx.AccountRetriever.GetAccountNumberSequence(ctx, address)
}

func (b *ZetaCoreBridge) SetAccountNumber(keyType common.KeyType) {
	ctx, err := b.GetContext()
	if err != nil {
		b.logger.Error().Err(err).Msg("fail to get context")
		return
	}
	address := b.keys.GetAddress()
	accN, seq, err := ctx.AccountRetriever.GetAccountNumberSequence(ctx, address)
	if err != nil {
		b.logger.Error().Err(err).Msg("fail to get account number and sequence number")
		return
	}
	b.accountNumber[keyType] = accN
	b.seqNumber[keyType] = seq
}

func (b *ZetaCoreBridge) WaitForCoreToCreateBlocks() {
	retryCount := 0
	for {
		block, err := b.GetLatestZetaBlock()
		if err == nil && block.Header.Height > 1 {
			b.logger.Info().Msgf("Zeta-core height: %d", block.Header.Height)
			break
		}
		retryCount++
		b.logger.Debug().Msgf("Failed to get latest Block , Retry : %d/%d", retryCount, DefaultRetryCount)
		if retryCount > ExtendedRetryCount {
			//todo crash this go routine, then schedule?
			panic(fmt.Sprintf("ZetaCore is not ready , Waited for %d seconds", DefaultRetryCount*DefaultRetryInterval))
		}
		time.Sleep(DefaultRetryInterval * time.Second)
	}
}

func (b *ZetaCoreBridge) GetKeys() *Keys {
	return b.keys
}

func (b *ZetaCoreBridge) UpdateConfigFromCore(cfg *config.Config, init bool) error {
	bn, err := b.GetZetaBlockHeight()
	if err != nil {
		return err
	}
	plan, err := b.GetUpgradePlan()
	// if there is no active upgrade plan, plan will be nil, err will be nil as well.
	if err != nil {
		return err
	}
	if plan != nil && bn == plan.Height-1 { // stop zetaclients; notify operator to upgrade and restart
		b.logger.Warn().Msgf("Active upgrade plan detected and upgrade height reached: %s at height %d; ZetaClient is stopped; please kill this process, replace zetaclientd binary with upgraded version, and restart zetaclientd", plan.Name, plan.Height)
		b.pause <- struct{}{} // notify CoreObserver to stop ChainClients, Signers, and CoreObservder itself
	}

	coreParams, err := b.GetCoreParams()
	if err != nil {
		return err
	}

	newEVMParams := make(map[int64]*observertypes.CoreParams)
	var newBTCParams *observertypes.CoreParams

	// check and update core params for each chain
	for _, coreParam := range coreParams {
		err := config.ValidateCoreParams(coreParam)
		if err != nil {
			b.logger.Debug().Err(err).Msgf("Invalid core params for chain %s", common.GetChainFromChainID(coreParam.ChainId).ChainName)
		}
		if common.IsBitcoinChain(coreParam.ChainId) {
			newBTCParams = coreParam
		} else {
			newEVMParams[coreParam.ChainId] = coreParam
		}
	}

	chains, err := b.GetSupportedChains()
	if err != nil {
		return err
	}
	newChains := make([]common.Chain, len(chains))
	for i, chain := range chains {
		newChains[i] = *chain
	}
	keyGen, err := b.GetKeyGen()
	if err != nil {
		b.logger.Info().Msg("Unable to fetch keygen from zetacore")
	}
	cfg.UpdateCoreParams(keyGen, newChains, newEVMParams, newBTCParams, init, b.logger)

	tss, err := b.GetCurrentTss()
	if err != nil {
		b.logger.Debug().Err(err).Msg("Unable to fetch TSS from zetacore")
	} else {
		cfg.CurrentTssPubkey = tss.GetTssPubkey()
	}
	return nil
}

func (b *ZetaCoreBridge) Pause() {
	//todo pause why use out?
	//todo report this?
	<-b.pause
}

func (b *ZetaCoreBridge) Unpause() {
	b.pause <- struct{}{}
}
