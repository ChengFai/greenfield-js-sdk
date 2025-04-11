import { GetBlockByHeightResponse, GetLatestBlockResponse, GetLatestValidatorSetRequest, GetNodeInfoResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/base/tendermint/v1beta1/query';
export interface IBasic {
    /**
     * returns the current node info of the greenfield that the client is connected to.
     */
    getNodeInfo(): Promise<GetNodeInfoResponse>;
    /**
     * retrieves the latest block from the chain.
     */
    getLatestBlock(): Promise<GetLatestBlockResponse>;
    /**
     * retrieves the height of the latest block from the chain.
     * returns the block height and any error that occurred during the operation.
     */
    getLatestBlockHeight(): Promise<number>;
    /**
     * retrieves the syncing status of the node. If true, means the node is catching up the latest block.
     * The function returns a boolean indicating whether the node is syncing and any error that occurred during the operation.
     */
    getSyncing(): Promise<boolean>;
    /**
     * GetBlockByHeight retrieves the block at the given height from the chain.
     * The function returns a pointer to a Block object and any error that occurred during the operation.
     */
    getBlockByHeight(height: number): Promise<GetBlockByHeightResponse>;
    /**
     * retrieves the latest validator set from the chain.
     * The function returns the block height of the validator set
     */
    GetLatestValidatorSet(request: GetLatestValidatorSetRequest): Promise<number>;
}
export declare class Basic implements IBasic {
    private rpcQueryClient;
    getNodeInfo(): Promise<GetNodeInfoResponse>;
    getLatestBlock(): Promise<GetLatestBlockResponse>;
    getLatestBlockHeight(): Promise<number>;
    getSyncing(): Promise<boolean>;
    getBlockByHeight(height: number): Promise<GetBlockByHeightResponse>;
    GetLatestValidatorSet(request: GetLatestValidatorSetRequest): Promise<number>;
}
