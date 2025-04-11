import { TxClient } from '../clients/txClient';
import { QueryGroupMembersExistRequest, QueryGroupMembersExistResponse, QueryGroupsExistByIdRequest, QueryGroupsExistRequest, QueryGroupsExistResponse, QueryLockFeeRequest, QueryLockFeeResponse, QueryParamsResponse, QueryPolicyByIdRequest, QueryPolicyByIdResponse, QueryPolicyForAccountRequest, QueryPolicyForAccountResponse, QueryPolicyForGroupRequest, QueryPolicyForGroupResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { MsgDeletePolicy, MsgPutPolicy, MsgSetTag } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { TxResponse } from '..';
export interface IStorage {
    params(): Promise<QueryParamsResponse>;
    putPolicy(msg: MsgPutPolicy): Promise<TxResponse>;
    deletePolicy(msg: MsgDeletePolicy): Promise<TxResponse>;
    setTag(msg: MsgSetTag): Promise<TxResponse>;
    getPolicyForGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getQueryPolicyForAccount(request: QueryPolicyForAccountRequest): Promise<QueryPolicyForAccountResponse>;
    getQueryPolicyForGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getQueryPolicyById(request: QueryPolicyByIdRequest): Promise<QueryPolicyByIdResponse>;
    queryLockFee(request: QueryLockFeeRequest): Promise<QueryLockFeeResponse>;
    queryGroupMembersExist(request: QueryGroupMembersExistRequest): Promise<QueryGroupMembersExistResponse>;
    queryGroupExist(request: QueryGroupsExistRequest): Promise<QueryGroupsExistResponse>;
    queryGroupsExistById(request: QueryGroupsExistByIdRequest): Promise<QueryGroupsExistResponse>;
}
export declare class Storage implements IStorage {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    params(): Promise<QueryParamsResponse>;
    putPolicy(msg: MsgPutPolicy): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    deletePolicy(msg: MsgDeletePolicy): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    setTag(msg: MsgSetTag): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    getPolicyForGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getQueryPolicyForAccount(request: QueryPolicyForAccountRequest): Promise<QueryPolicyForAccountResponse>;
    getQueryPolicyForGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getQueryPolicyById(request: QueryPolicyByIdRequest): Promise<QueryPolicyByIdResponse>;
    queryLockFee(request: QueryLockFeeRequest): Promise<QueryLockFeeResponse>;
    queryGroupMembersExist(request: QueryGroupMembersExistRequest): Promise<QueryGroupMembersExistResponse>;
    queryGroupExist(request: QueryGroupsExistRequest): Promise<QueryGroupsExistResponse>;
    queryGroupsExistById(request: QueryGroupsExistByIdRequest): Promise<QueryGroupsExistResponse>;
}
