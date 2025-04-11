import { QueryGlobalVirtualGroupByFamilyIDRequest, QueryGlobalVirtualGroupByFamilyIDResponse, QueryGlobalVirtualGroupFamiliesRequest, QueryGlobalVirtualGroupFamiliesResponse, QueryGlobalVirtualGroupFamilyRequest, QueryGlobalVirtualGroupFamilyResponse, QueryGlobalVirtualGroupRequest, QueryGlobalVirtualGroupResponse, QueryParamsResponse, QuerySPAvailableGlobalVirtualGroupFamiliesRequest, QuerySPAvailableGlobalVirtualGroupFamiliesResponse, QuerySpOptimalGlobalVirtualGroupFamilyRequest, QuerySpOptimalGlobalVirtualGroupFamilyResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/query';
import { MsgSettle } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface IVirtualGroup {
    params(): Promise<QueryParamsResponse>;
    getGlobalVirtualGroup(request: QueryGlobalVirtualGroupRequest): Promise<QueryGlobalVirtualGroupResponse>;
    getGlobalVirtualGroupByFamilyID(request: QueryGlobalVirtualGroupByFamilyIDRequest): Promise<QueryGlobalVirtualGroupByFamilyIDResponse>;
    getGlobalVirtualGroupFamilies(request: QueryGlobalVirtualGroupFamiliesRequest): Promise<QueryGlobalVirtualGroupFamiliesResponse>;
    getGlobalVirtualGroupFamily(request: QueryGlobalVirtualGroupFamilyRequest): Promise<QueryGlobalVirtualGroupFamilyResponse>;
    getSpOptimalGlobalVirtualGroupFamily(request: QuerySpOptimalGlobalVirtualGroupFamilyRequest): Promise<QuerySpOptimalGlobalVirtualGroupFamilyResponse>;
    getSpAvailableGlobalVirtualGroupFamilies(request: QuerySPAvailableGlobalVirtualGroupFamiliesRequest): Promise<QuerySPAvailableGlobalVirtualGroupFamiliesResponse>;
    settle(address: string, msg: MsgSettle): Promise<TxResponse>;
}
export declare class VirtualGroup implements IVirtualGroup {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    params(): Promise<QueryParamsResponse>;
    getGlobalVirtualGroup(request: QueryGlobalVirtualGroupRequest): Promise<QueryGlobalVirtualGroupResponse>;
    getGlobalVirtualGroupByFamilyID(request: QueryGlobalVirtualGroupByFamilyIDRequest): Promise<QueryGlobalVirtualGroupByFamilyIDResponse>;
    getGlobalVirtualGroupFamilies(request: QueryGlobalVirtualGroupFamiliesRequest): Promise<QueryGlobalVirtualGroupFamiliesResponse>;
    getGlobalVirtualGroupFamily(request: QueryGlobalVirtualGroupFamilyRequest): Promise<QueryGlobalVirtualGroupFamilyResponse>;
    getSpOptimalGlobalVirtualGroupFamily(request: QuerySpOptimalGlobalVirtualGroupFamilyRequest): Promise<QuerySpOptimalGlobalVirtualGroupFamilyResponse>;
    getSpAvailableGlobalVirtualGroupFamilies(request: QuerySPAvailableGlobalVirtualGroupFamiliesRequest): Promise<QuerySPAvailableGlobalVirtualGroupFamiliesResponse>;
    settle(address: string, msg: MsgSettle): Promise<{
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
}
