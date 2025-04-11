import { QueryCrossChainPackageRequest, QueryCrossChainPackageResponse, QueryReceiveSequenceRequest, QueryReceiveSequenceResponse, QuerySendSequenceRequest, QuerySendSequenceResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/crosschain/v1/query';
import { QueryInturnRelayerRequest, QueryInturnRelayerResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/query';
import { MsgClaim } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/tx';
import { QueryParamsResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/query';
import { MsgTransferOut } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/tx';
import { MsgMirrorBucket, MsgMirrorGroup, MsgMirrorObject } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface ICrossChain {
    /**
     * makes a transfer from Greenfield to BSC
     */
    transferOut(msg: MsgTransferOut): Promise<TxResponse>;
    /**
     * cross-chain packages from BSC to Greenfield, used by relayers which run by validators
     */
    claims(msg: MsgClaim): Promise<TxResponse>;
    /**
     * gets the next send sequence for a channel
     */
    getChannelSendSequence(request: QuerySendSequenceRequest): Promise<QuerySendSequenceResponse>;
    /**
     * gets the next receive sequence for a channel
     */
    getChannelReceiveSequence(request: QueryReceiveSequenceRequest): Promise<QueryReceiveSequenceResponse>;
    /**
     * gets the in-turn relayer bls public key and its relay interval
     */
    getInturnRelayer(request: QueryInturnRelayerRequest): Promise<QueryInturnRelayerResponse>;
    getCrosschainPackage(request: QueryCrossChainPackageRequest): Promise<QueryCrossChainPackageResponse>;
    /**
     * mirrors the group to BSC as NFT
     */
    mirrorGroup(msg: MsgMirrorGroup): Promise<TxResponse>;
    /**
     * mirrors the bucket to BSC as NFT
     */
    mirrorBucket(msg: MsgMirrorBucket): Promise<TxResponse>;
    /**
     * mirrors the object to BSC as NFT
     */
    mirrorObject(msg: MsgMirrorObject): Promise<TxResponse>;
    getParams(): Promise<QueryParamsResponse>;
}
export declare class CrossChain implements ICrossChain {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    transferOut(msg: MsgTransferOut): Promise<{
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
    claims(msg: MsgClaim): Promise<{
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
    getChannelSendSequence(request: QuerySendSequenceRequest): Promise<QuerySendSequenceResponse>;
    getChannelReceiveSequence(request: QueryReceiveSequenceRequest): Promise<QueryReceiveSequenceResponse>;
    getInturnRelayer(request: QueryInturnRelayerRequest): Promise<QueryInturnRelayerResponse>;
    getCrosschainPackage(request: QueryCrossChainPackageRequest): Promise<QueryCrossChainPackageResponse>;
    mirrorGroup(msg: MsgMirrorGroup): Promise<{
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
    mirrorBucket(msg: MsgMirrorBucket): Promise<{
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
    mirrorObject(msg: MsgMirrorObject): Promise<{
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
    getParams(): Promise<QueryParamsResponse>;
}
