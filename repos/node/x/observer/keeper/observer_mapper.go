package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/zeta-chain/zetacore/common"
	"github.com/zeta-chain/zetacore/x/observer/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func GetObserverMapperIndex(chain *common.Chain) string {
	return fmt.Sprintf("%d", chain.ChainId)
}

func (k Keeper) SetLastObserverCount(ctx sdk.Context, lbc *types.LastObserverCount) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LastBlockObserverCountKey))
	b := k.cdc.MustMarshal(lbc)
	store.Set([]byte{0}, b)
}

func (k Keeper) GetLastObserverCount(ctx sdk.Context) (val types.LastObserverCount, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LastBlockObserverCountKey))

	b := store.Get([]byte{0})
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

func (k Keeper) SetObserverMapper(ctx sdk.Context, om *types.ObserverMapper) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ObserverMapperKey))
	om.Index = GetObserverMapperIndex(om.ObserverChain)
	b := k.cdc.MustMarshal(om)
	store.Set([]byte(om.Index), b)
}

func (k Keeper) GetObserverMapper(ctx sdk.Context, chain *common.Chain) (val types.ObserverMapper, found bool) {
	index := GetObserverMapperIndex(chain)
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ObserverMapperKey))
	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

func (k Keeper) GetAllObserverMappers(ctx sdk.Context) (mappers []*types.ObserverMapper) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ObserverMapperKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})
	defer iterator.Close()
	//todo notice this may not in the set order
	for ; iterator.Valid(); iterator.Next() {
		var val types.ObserverMapper
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		mappers = append(mappers, &val)
	}
	return
}
func (k Keeper) GetAllObserverMappersForAddress(ctx sdk.Context, address string) (mappers []*types.ObserverMapper) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ObserverMapperKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})
	defer iterator.Close()
	//todo looks like one address=>many observer in every chain
	for ; iterator.Valid(); iterator.Next() {
		var val types.ObserverMapper
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		addToList := false
		for _, addr := range val.ObserverList {
			if addr == address {
				addToList = true
			}
		}
		if addToList {
			mappers = append(mappers, &val)
		}
	}
	return
}

// Tx

// AddObserver adds in a new observer to the store.It can be executed using an admin policy account
// Once added, the function also resets keygen and pauses inbound so that a new TSS can be generated.

//Queries

func (k Keeper) ObserversByChain(goCtx context.Context, req *types.QueryObserversByChainRequest) (*types.QueryObserversByChainResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO move parsing to client
	// https://github.com/zeta-chain/node/issues/867

	chainName := common.ParseChainName(req.ObservationChain)
	chain := k.GetParams(ctx).GetChainFromChainName(chainName)
	if chain == nil {
		return &types.QueryObserversByChainResponse{}, types.ErrSupportedChains
	}
	mapper, found := k.GetObserverMapper(ctx, chain)
	if !found {
		return &types.QueryObserversByChainResponse{}, types.ErrObserverNotPresent
	}
	return &types.QueryObserversByChainResponse{Observers: mapper.ObserverList}, nil
}

func (k Keeper) AllObserverMappers(goCtx context.Context, req *types.QueryAllObserverMappersRequest) (*types.QueryAllObserverMappersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	mappers := k.GetAllObserverMappers(ctx)
	return &types.QueryAllObserverMappersResponse{ObserverMappers: mappers}, nil
}

// Utils

func (k Keeper) GetAllObserverAddresses(ctx sdk.Context) []string {
	var val []string
	mappers := k.GetAllObserverMappers(ctx)
	for _, mapper := range mappers {
		val = append(val, mapper.ObserverList...)
	}
	allKeys := make(map[string]bool)
	var dedupedList []string
	for _, item := range val {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			dedupedList = append(dedupedList, item)
		}
	}
	return dedupedList
}

func (k Keeper) AddObserverToMapper(ctx sdk.Context, chain *common.Chain, address string) {
	mapper, found := k.GetObserverMapper(ctx, chain)
	if !found {
		k.SetObserverMapper(ctx, &types.ObserverMapper{
			Index:         "",
			ObserverChain: chain,
			ObserverList:  []string{address},
		})
		return
	}
	// Return if duplicate
	for _, addr := range mapper.ObserverList {
		if addr == address {
			return
		}
	}
	mapper.ObserverList = append(mapper.ObserverList, address)
	k.SetObserverMapper(ctx, &mapper)
}
