package zetaclient

import (
	"context"
	"fmt"
	"sort"
	"time"

	sdkmath "cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client/grpc/tmservice"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"

	"github.com/cosmos/cosmos-sdk/types/query"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
	tmhttp "github.com/tendermint/tendermint/rpc/client/http"
	"github.com/zeta-chain/zetacore/cmd/zetacored/config"
	"github.com/zeta-chain/zetacore/common"
	"github.com/zeta-chain/zetacore/x/crosschain/types"
	observertypes "github.com/zeta-chain/zetacore/x/observer/types"
	"google.golang.org/grpc"
)

type Order string

const (
	NoOrder    Order = ""
	Ascending  Order = "ASC"
	Descending Order = "DESC"
)

func (b *ZetaCoreBridge) GetCrosschainFlags() (observertypes.CrosschainFlags, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.CrosschainFlags(context.Background(), &observertypes.QueryGetCrosschainFlagsRequest{})
	if err != nil {
		return observertypes.CrosschainFlags{}, err
	}
	return resp.CrosschainFlags, nil
}

func (b *ZetaCoreBridge) GetCoreParamsForChainID(externalChainID int64) (*observertypes.CoreParams, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.GetCoreParamsForChain(context.Background(), &observertypes.QueryGetCoreParamsForChainRequest{ChainId: externalChainID})
	if err != nil {
		return &observertypes.CoreParams{}, err
	}
	return resp.CoreParams, nil
}

func (b *ZetaCoreBridge) GetCoreParams() ([]*observertypes.CoreParams, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	var err error

	resp := &observertypes.QueryGetCoreParamsResponse{}
	for i := 0; i <= DefaultRetryCount; i++ {
		resp, err = client.GetCoreParams(context.Background(), &observertypes.QueryGetCoreParamsRequest{})
		if err == nil {
			return resp.CoreParams.CoreParams, nil
		}
		time.Sleep(DefaultRetryInterval * time.Second)
	}
	return nil, fmt.Errorf("failed to get core params | err %s", err.Error())
}

func (b *ZetaCoreBridge) GetObserverParams() (observertypes.Params, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.Params(context.Background(), &observertypes.QueryParamsRequest{})
	if err != nil {
		return observertypes.Params{}, err
	}
	return resp.Params, nil
}

func (b *ZetaCoreBridge) GetUpgradePlan() (*upgradetypes.Plan, error) {
	client := upgradetypes.NewQueryClient(b.grpcConn)

	resp, err := client.CurrentPlan(context.Background(), &upgradetypes.QueryCurrentPlanRequest{})
	if err != nil {
		return nil, err
	}
	return resp.Plan, nil
}

func (b *ZetaCoreBridge) GetAllCctx() ([]*types.CrossChainTx, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.CctxAll(context.Background(), &types.QueryAllCctxRequest{})
	if err != nil {
		return nil, err
	}
	return resp.CrossChainTx, nil
}

func (b *ZetaCoreBridge) GetCctxByHash(sendHash string) (*types.CrossChainTx, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.Cctx(context.Background(), &types.QueryGetCctxRequest{Index: sendHash})
	if err != nil {
		return nil, err
	}
	return resp.CrossChainTx, nil
}

func (b *ZetaCoreBridge) GetCctxByNonce(chainID int64, nonce uint64) (*types.CrossChainTx, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.CctxByNonce(context.Background(), &types.QueryGetCctxByNonceRequest{
		ChainID: chainID,
		Nonce:   nonce,
	})
	if err != nil {
		return nil, err
	}
	return resp.CrossChainTx, nil
}

// todo every chain have many observers?
func (b *ZetaCoreBridge) GetObserverList(chain common.Chain) ([]string, error) {
	var err error
	client := observertypes.NewQueryClient(b.grpcConn)

	for i := 0; i <= DefaultRetryCount; i++ {
		resp, err := client.ObserversByChain(context.Background(), &observertypes.QueryObserversByChainRequest{ObservationChain: chain.ChainName.String()})
		if err == nil {
			return resp.Observers, nil
		}
		time.Sleep(DefaultRetryInterval * time.Second)
	}
	return nil, err
}

func (b *ZetaCoreBridge) GetAllPendingCctx(chainID int64) ([]*types.CrossChainTx, error) {
	client := types.NewQueryClient(b.grpcConn)
	maxSizeOption := grpc.MaxCallRecvMsgSize(32 * 1024 * 1024)
	resp, err := client.CctxAllPending(context.Background(), &types.QueryAllCctxPendingRequest{ChainId: chainID}, maxSizeOption)
	if err != nil {
		return nil, err
	}
	return resp.CrossChainTx, nil
}

func (b *ZetaCoreBridge) GetCctxByStatus(status types.CctxStatus) ([]types.CrossChainTx, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.CctxByStatus(context.Background(), &types.QueryCctxByStatusRequest{Status: status})
	if err != nil {
		return nil, err
	}
	return resp.CrossChainTx, nil
}

func (b *ZetaCoreBridge) GetGenesisSupply() (sdkmath.Int, error) {
	tmURL := fmt.Sprintf("http://%s", b.cfg.ChainRPC)
	s, err := tmhttp.New(tmURL, "/websocket")
	if err != nil {
		return sdkmath.ZeroInt(), err
	}
	res, err := s.Genesis(context.Background())
	if err != nil {
		return sdkmath.ZeroInt(), err
	}
	appState, err := genutiltypes.GenesisStateFromGenDoc(*res.Genesis)
	if err != nil {
		return sdkmath.ZeroInt(), err
	}
	bankstate := banktypes.GetGenesisStateFromAppState(b.encodingCfg.Codec, appState)
	return bankstate.Supply.AmountOf(config.BaseDenom), nil
}

func (b *ZetaCoreBridge) GetZetaTokenSupplyOnNode() (sdkmath.Int, error) {
	client := banktypes.NewQueryClient(b.grpcConn)
	resp, err := client.SupplyOf(context.Background(), &banktypes.QuerySupplyOfRequest{Denom: config.BaseDenom})
	if err != nil {
		return sdkmath.ZeroInt(), err
	}
	return resp.GetAmount().Amount, nil
}

func (b *ZetaCoreBridge) GetLastBlockHeight() ([]*types.LastBlockHeight, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.LastBlockHeightAll(context.Background(), &types.QueryAllLastBlockHeightRequest{})
	if err != nil {
		b.logger.Error().Err(err).Msg("query GetBlockHeight error")
		return nil, err
	}
	return resp.LastBlockHeight, nil
}

func (b *ZetaCoreBridge) GetLatestZetaBlock() (*tmtypes.Block, error) {
	client := tmservice.NewServiceClient(b.grpcConn)
	res, err := client.GetLatestBlock(context.Background(), &tmservice.GetLatestBlockRequest{})
	if err != nil {
		return nil, err
	}
	return res.Block, nil
}

func (b *ZetaCoreBridge) GetNodeInfo() (*tmservice.GetNodeInfoResponse, error) {
	var err error

	client := tmservice.NewServiceClient(b.grpcConn)
	for i := 0; i <= DefaultRetryCount; i++ {
		res, err := client.GetNodeInfo(context.Background(), &tmservice.GetNodeInfoRequest{})
		if err == nil {
			return res, nil
		}
		time.Sleep(DefaultRetryInterval * time.Second)
	}
	return nil, err
}

func (b *ZetaCoreBridge) GetLastBlockHeightByChain(chain common.Chain) (*types.LastBlockHeight, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.LastBlockHeight(context.Background(), &types.QueryGetLastBlockHeightRequest{Index: chain.ChainName.String()})
	if err != nil {
		return nil, err
	}
	return resp.LastBlockHeight, nil
}

func (b *ZetaCoreBridge) GetZetaBlockHeight() (int64, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.LastZetaHeight(context.Background(), &types.QueryLastZetaHeightRequest{})
	if err != nil {
		return 0, err
	}
	return resp.Height, nil
}

// todo every chain have one nonce?
func (b *ZetaCoreBridge) GetNonceByChain(chain common.Chain) (*types.ChainNonces, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.ChainNonces(context.Background(), &types.QueryGetChainNoncesRequest{Index: chain.ChainName.String()})
	if err != nil {
		return nil, err
	}
	return resp.ChainNonces, nil
}

func (b *ZetaCoreBridge) GetAllNodeAccounts() ([]*observertypes.NodeAccount, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.NodeAccountAll(context.Background(), &observertypes.QueryAllNodeAccountRequest{})
	if err != nil {
		return nil, err
	}
	b.logger.Debug().Msgf("GetAllNodeAccounts: %d", len(resp.NodeAccount))
	return resp.NodeAccount, nil
}

func (b *ZetaCoreBridge) GetKeyGen() (*observertypes.Keygen, error) {
	var err error
	client := observertypes.NewQueryClient(b.grpcConn)

	for i := 0; i <= ExtendedRetryCount; i++ {
		resp, err := client.Keygen(context.Background(), &observertypes.QueryGetKeygenRequest{})
		if err == nil {
			return resp.Keygen, nil
		}
		time.Sleep(DefaultRetryInterval * time.Second)
	}
	return nil, fmt.Errorf("failed to get keygen | err %s", err.Error())

}

// todo every identifier have one ballot
func (b *ZetaCoreBridge) GetBallot(ballotIdentifier string) (*observertypes.QueryBallotByIdentifierResponse, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.BallotByIdentifier(context.Background(), &observertypes.QueryBallotByIdentifierRequest{
		BallotIdentifier: ballotIdentifier,
	})
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func (b *ZetaCoreBridge) GetInboundTrackersForChain(chainID int64) ([]types.InTxTracker, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.InTxTrackerAllByChain(context.Background(), &types.QueryAllInTxTrackerByChainRequest{ChainId: chainID})
	if err != nil {
		return nil, err
	}
	return resp.InTxTracker, nil
}

func (b *ZetaCoreBridge) GetCurrentTss() (*types.TSS, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.TSS(context.Background(), &types.QueryGetTSSRequest{})
	if err != nil {
		return nil, err
	}
	return resp.TSS, nil
}

func (b *ZetaCoreBridge) GetEthTssAddress() (string, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.GetTssAddress(context.Background(), &types.QueryGetTssAddressRequest{})
	if err != nil {
		return "", err
	}
	return resp.Eth, nil
}

func (b *ZetaCoreBridge) GetBtcTssAddress() (string, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.GetTssAddress(context.Background(), &types.QueryGetTssAddressRequest{})
	if err != nil {
		return "", err
	}
	return resp.Btc, nil
}

func (b *ZetaCoreBridge) GetTssHistory() ([]types.TSS, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.TssHistory(context.Background(), &types.QueryTssHistoryRequest{})
	if err != nil {
		return nil, err
	}
	return resp.TssList, nil
}

func (b *ZetaCoreBridge) GetOutTxTracker(chain common.Chain, nonce uint64) (*types.OutTxTracker, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.OutTxTracker(context.Background(), &types.QueryGetOutTxTrackerRequest{
		ChainID: chain.ChainId,
		Nonce:   nonce,
	})
	if err != nil {
		return nil, err
	}
	return &resp.OutTxTracker, nil
}

func (b *ZetaCoreBridge) GetAllOutTxTrackerByChain(chain common.Chain, order Order) ([]types.OutTxTracker, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.OutTxTrackerAllByChain(context.Background(), &types.QueryAllOutTxTrackerByChainRequest{
		Chain: chain.ChainId,
		Pagination: &query.PageRequest{
			Key:        nil,
			Offset:     0,
			Limit:      2000,
			CountTotal: false,
			Reverse:    false,
		},
	})
	if err != nil {
		return nil, err
	}
	if order == Ascending {
		sort.SliceStable(resp.OutTxTracker, func(i, j int) bool {
			return resp.OutTxTracker[i].Nonce < resp.OutTxTracker[j].Nonce
		})
	}
	if order == Descending {
		sort.SliceStable(resp.OutTxTracker, func(i, j int) bool {
			return resp.OutTxTracker[i].Nonce > resp.OutTxTracker[j].Nonce
		})
	}
	return resp.OutTxTracker, nil
}

func (b *ZetaCoreBridge) GetClientParams(chainID int64) (observertypes.QueryGetCoreParamsForChainResponse, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.GetCoreParamsForChain(context.Background(), &observertypes.QueryGetCoreParamsForChainRequest{ChainId: chainID})
	if err != nil {
		return observertypes.QueryGetCoreParamsForChainResponse{}, err
	}
	return *resp, nil
}

func (b *ZetaCoreBridge) GetPendingNoncesByChain(chainID int64) (types.PendingNonces, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.PendingNoncesByChain(context.Background(), &types.QueryPendingNoncesByChainRequest{ChainId: chainID})
	if err != nil {
		return types.PendingNonces{}, err
	}
	return resp.PendingNonces, nil
}

func (b *ZetaCoreBridge) GetBlockHeaderStateByChain(chainID int64) (observertypes.QueryGetBlockHeaderStateResponse, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.GetBlockHeaderStateByChain(context.Background(), &observertypes.QueryGetBlockHeaderStateRequest{ChainId: chainID})
	if err != nil {
		return observertypes.QueryGetBlockHeaderStateResponse{}, err
	}
	return *resp, nil
}

func (b *ZetaCoreBridge) GetSupportedChains() ([]*common.Chain, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.SupportedChains(context.Background(), &observertypes.QuerySupportedChains{})
	if err != nil {
		return nil, err
	}
	return resp.GetChains(), nil
}

func (b *ZetaCoreBridge) GetPendingNonces() (*types.QueryAllPendingNoncesResponse, error) {
	client := types.NewQueryClient(b.grpcConn)
	resp, err := client.PendingNoncesAll(context.Background(), &types.QueryAllPendingNoncesRequest{})
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func (b *ZetaCoreBridge) Prove(blockHash string, txHash string, txIndex int64, proof *common.Proof, chainID int64) (bool, error) {
	client := observertypes.NewQueryClient(b.grpcConn)
	resp, err := client.Prove(context.Background(), &observertypes.QueryProveRequest{
		BlockHash: blockHash,
		TxIndex:   txIndex,
		Proof:     proof,
		ChainId:   chainID,
		TxHash:    txHash,
	})
	if err != nil {
		return false, err
	}
	return resp.Valid, nil
}
