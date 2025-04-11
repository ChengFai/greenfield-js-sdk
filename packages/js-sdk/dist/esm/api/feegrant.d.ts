import { TxClient } from '../clients/txClient';
import { QueryAllowanceRequest, QueryAllowanceResponse, QueryAllowancesRequest, QueryAllowancesResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/query';
import { MsgRevokeAllowance } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/tx';
import { IGrantAllowance, TxResponse } from '..';
export interface IFeeGrant {
    grantAllowance(msg: IGrantAllowance): Promise<TxResponse>;
    revokeAllowance(msg: MsgRevokeAllowance): Promise<TxResponse>;
    getAllowence(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    getAllowences(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
}
export declare class FeeGrant implements IFeeGrant {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    grantAllowance(params: IGrantAllowance): Promise<{
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
    revokeAllowance(msg: MsgRevokeAllowance): Promise<{
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
    getAllowence(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    getAllowences(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
}
