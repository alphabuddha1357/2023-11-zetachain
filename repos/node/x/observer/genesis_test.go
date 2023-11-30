package observer_test

import (
	"encoding/json"
	"log"
	"testing"

	"github.com/zeta-chain/zetacore/common"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/stretchr/testify/require"
	keepertest "github.com/zeta-chain/zetacore/testutil/keeper"
	"github.com/zeta-chain/zetacore/testutil/sample"
	"github.com/zeta-chain/zetacore/x/observer"
	"github.com/zeta-chain/zetacore/x/observer/types"
)

//todo report this? ballot and observer both have this order and index problem
//2023/11/29 22:52:31 ballot.go:20: SetBallot 06au3q40y3bx9pts6wms4lfx7982hrp7
//2023/11/29 22:52:31 ballot.go:20: SetBallot yztabo1lfjj6wy0ynzmcu04ohtyvbgol
//2023/11/29 22:52:31 ballot.go:20: SetBallot bevhcgkvpwovm7z112ffap55rdizfwem
//2023/11/29 22:52:31 ballot.go:57: GetAllBallots 06au3q40y3bx9pts6wms4lfx7982hrp7
//2023/11/29 22:52:31 ballot.go:57: GetAllBallots bevhcgkvpwovm7z112ffap55rdizfwem
//2023/11/29 22:52:31 ballot.go:57: GetAllBallots yztabo1lfjj6wy0ynzmcu04ohtyvbgol

func TestGenesis(t *testing.T) {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	//params := types.DefaultParams()
	params := types.Params{
		ObserverParams: []*types.ObserverParams{
			{
				Chain: &common.Chain{
					ChainName: common.ChainName_bsc_mainnet,
					ChainId:   56,
				},
				BallotThreshold:       sdk.NewDec(1),
				MinObserverDelegation: sdk.NewDec(2),
				IsSupported:           false,
			},
			{
				Chain: &common.Chain{
					ChainName: common.ChainName_eth_mainnet,
					ChainId:   1,
				},
				BallotThreshold:       sdk.NewDec(1),
				MinObserverDelegation: sdk.NewDec(4),
				IsSupported:           true,
			},
		},
		AdminPolicy: []*types.Admin_Policy{
			{
				PolicyType: 1111,
				Address:    "0xaa",
			},
			{
				PolicyType: 2222,
				Address:    "0xbb",
			},
		},
		BallotMaturityBlocks: 100,
	}

	genesisState := types.GenesisState{
		Params: &params,
		Ballots: []*types.Ballot{
			sample.Ballot(t, "0"),
			sample.Ballot(t, "1"),
			sample.Ballot(t, "2"),
		},
		Observers: []*types.ObserverMapper{
			sample.ObserverMapper(t, "0"),
			sample.ObserverMapper(t, "1"),
			sample.ObserverMapper(t, "2"),
		},
		//todo ballots's BallotIdentifier equal to observer's chain when index is the same,because of the same random seed
		NodeAccountList: []*types.NodeAccount{
			sample.NodeAccount(),
			sample.NodeAccount(),
			sample.NodeAccount(),
		},
		CrosschainFlags:   types.DefaultCrosschainFlags(),
		Keygen:            sample.Keygen(t),
		LastObserverCount: sample.LastObserverCount(1000),
		CoreParamsList:    sample.CoreParamsList(),
	}
	//for _, p := range genesisState.Ballots {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("index", p.Index)
	//	log.Println("Ballots", string(mar))
	//}
	//for _, p := range genesisState.Observers {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("index", p.Index)
	//	log.Println("Observers", string(mar))
	//}
	//for _, p := range genesisState.NodeAccountList {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//
	//	log.Println("NodeAccountList", string(mar))
	//}

	//mar, err := json.MarshalIndent(genesisState.CrosschainFlags, "", "\t")
	//if err != nil {
	//	log.Println(err)
	//	return
	//}
	//
	//log.Println("genesisState.CrosschainFlags", string(mar))
	//marshal(genesisState.Keygen, "marshal(genesisState.Keygen")
	marshal(genesisState.CoreParamsList, "marshal(genesisState.CoreParamsList")
	// Init and export
	k, ctx := keepertest.ObserverKeeper(t)
	//todo index changed to genesisState and order change also
	observer.InitGenesis(ctx, *k, genesisState)
	got := observer.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	//marshal(got.Keygen, "marshal(got.Keygen")
	//marshal(got.LastObserverCount, "marshal(got.LastObserverCount")
	//marshal(got.LastObserverCount, "marshal(got.LastObserverCount")

	marshal(got.CoreParamsList, "marshal(got.CoreParamsList")
	//for _, p := range got.Ballots {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("index", p.Index)
	//	log.Println("Ballots", string(mar))
	//}
	//for _, p := range got.Observers {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("index", p.Index)
	//	log.Println("Observers", string(mar))
	//}
	//for _, p := range got.NodeAccountList {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("NodeAccountList", string(mar))
	//}
	//mar, err = json.MarshalIndent(got.CrosschainFlags, "", "\t")
	//if err != nil {
	//	log.Println(err)
	//	return
	//}
	//
	//log.Println("got.CrosschainFlags", string(mar))
	// Compare genesis after init and export
	//nullify.Fill(&genesisState)
	//nullify.Fill(got)
	//require.Equal(t, genesisState, *got)
	//log.Println(json.MarshalIndent(got, "", "\t"))
	//for _, p := range got.Params.ObserverParams {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("ObserverParams", string(mar))
	//}
	//for _, p := range got.Params.AdminPolicy {
	//	mar, err := json.MarshalIndent(p, "", "\t")
	//	if err != nil {
	//		log.Println(err)
	//		return
	//	}
	//	log.Println("AdminPolicy", string(mar))
	//}
	//log.Println("BallotMaturityBlocks", got.Params.BallotMaturityBlocks)
}

func marshal(input interface{}, flag string) {
	mar, err := json.MarshalIndent(input, "", "\t")
	if err != nil {
		log.Println(err)
		return
	}

	log.Println(flag, string(mar))
}
