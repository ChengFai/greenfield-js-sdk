import { ActionType, PrincipalType } from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import { QueryBucketNFTResponse, QueryHeadBucketExtraResponse, QueryHeadBucketResponse, QueryNFTRequest, QueryPolicyForAccountRequest, QueryPolicyForAccountResponse, QueryVerifyPermissionResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { MsgCancelMigrateBucket, MsgCreateBucket, MsgDeleteBucket, MsgPutPolicy, MsgSetBucketFlowRateLimit, MsgToggleSPAsDelegatedAgent, MsgUpdateBucketInfo } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { AuthType, TxResponse } from '..';
import { TxClient } from '../clients/txClient';
import type { GetBucketMetaRequest, GetBucketMetaResponse, GetUserBucketsRequest, GetUserBucketsResponse, IQuotaProps, ListBucketReadRecordRequest, ListBucketReadRecordResponse, ListBucketsByIDsRequest, ListBucketsByIDsResponse, ListBucketsByPaymentAccountRequest, ListBucketsByPaymentAccountResponse, MigrateBucketApprovalRequest, MigrateBucketApprovalResponse, ReadQuotaRequest, SpResponse } from '../types/sp';
import { Sp } from './sp';
import { Storage } from './storage';
import { VirtualGroup } from './virtualGroup';
export interface IBucket {
    /**
     * send createBucket txn to greenfield chain
     */
    createBucket(msg: MsgCreateBucket): Promise<TxResponse>;
    deleteBucket(msg: MsgDeleteBucket): Promise<TxResponse>;
    deleteBucketPolicy(operator: string, bucketName: string, principalAddr: string, principalType: keyof typeof PrincipalType): Promise<TxResponse>;
    toggleSpAsDelegatedAgent(msg: MsgToggleSPAsDelegatedAgent): Promise<TxResponse>;
    getBucketMeta(params: GetBucketMetaRequest): Promise<SpResponse<GetBucketMetaResponse>>;
    getBucketPolicy(request: QueryPolicyForAccountRequest): Promise<QueryPolicyForAccountResponse>;
    /**
     * return quota info of bucket of current month, include chain quota, free quota and consumed quota
     */
    getBucketReadQuota(configParam: ReadQuotaRequest, authType: AuthType): Promise<SpResponse<IQuotaProps>>;
    getMigrateBucketApproval(params: MigrateBucketApprovalRequest, authType: AuthType): Promise<SpResponse<string>>;
    /**
     * check if the permission of bucket is allowed to the user.
     */
    getVerifyPermission(bucketName: string, operator: string, actionType: ActionType): Promise<QueryVerifyPermissionResponse>;
    /**
     * query the bucketInfo on chain, return the bucket info if exists
     */
    headBucket(bucketName: string): Promise<QueryHeadBucketResponse>;
    /**
     * query the bucketInfo on chain by bucketId, return the bucket info if exists
     */
    headBucketById(bucketId: string): Promise<QueryHeadBucketResponse>;
    headBucketExtra(bucketName: string): Promise<QueryHeadBucketExtraResponse>;
    headBucketNFT(request: QueryNFTRequest): Promise<QueryBucketNFTResponse>;
    listBucketReadRecords(params: ListBucketReadRecordRequest, authType: AuthType): Promise<SpResponse<ListBucketReadRecordResponse>>;
    listBuckets(configParam: GetUserBucketsRequest): Promise<SpResponse<GetUserBucketsResponse['GfSpGetUserBucketsResponse']['Buckets']>>;
    listBucketsByIds(params: ListBucketsByIDsRequest): Promise<SpResponse<ListBucketsByIDsResponse>>;
    /**
     * ListBucketsByPaymentAccount list buckets by payment account
     */
    listBucketsByPaymentAccount(params: ListBucketsByPaymentAccountRequest): Promise<SpResponse<ListBucketsByPaymentAccountResponse>>;
    migrateBucket(params: MigrateBucketApprovalRequest, authType: AuthType): Promise<TxResponse>;
    cancelMigrateBucket(msg: MsgCancelMigrateBucket): Promise<TxResponse>;
    putBucketPolicy(bucketName: string, srcMsg: Omit<MsgPutPolicy, 'resource'>): Promise<TxResponse>;
    /**
     * Update the bucket meta on chain, including read quota, payment address or visibility. It will send the MsgUpdateBucketInfo msg to greenfield to update the meta.
     */
    updateBucketInfo(srcMsg: Omit<MsgUpdateBucketInfo, 'chargedReadQuota'> & {
        chargedReadQuota?: string;
    }): Promise<TxResponse>;
    /**
     * Get the flow rate limit of the bucket.
     */
    setPaymentAccountFlowRateLimit(msg: MsgSetBucketFlowRateLimit): Promise<TxResponse>;
}
export declare class Bucket implements IBucket {
    private txClient;
    private sp;
    private storage;
    private virtualGroup;
    constructor(txClient: TxClient, sp: Sp, storage: Storage, virtualGroup: VirtualGroup);
    private queryClient;
    private spClient;
    setPaymentAccountFlowRateLimit(msg: MsgSetBucketFlowRateLimit): Promise<{
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
    createBucket(msg: MsgCreateBucket): Promise<{
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
    deleteBucket(msg: MsgDeleteBucket): Promise<{
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
    toggleSpAsDelegatedAgent(msg: MsgToggleSPAsDelegatedAgent): Promise<{
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
    headBucket(bucketName: string): Promise<QueryHeadBucketResponse>;
    headBucketById(bucketId: string): Promise<QueryHeadBucketResponse>;
    headBucketExtra(bucketName: string): Promise<QueryHeadBucketExtraResponse>;
    headBucketNFT(request: QueryNFTRequest): Promise<QueryBucketNFTResponse>;
    getVerifyPermission(bucketName: string, operator: string, actionType: ActionType): Promise<QueryVerifyPermissionResponse>;
    listBuckets(configParam: GetUserBucketsRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: import("../types/sp/Common").BucketMetaWithVGF[];
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    getBucketReadQuota(params: ReadQuotaRequest, authType: AuthType): Promise<SpResponse<IQuotaProps>>;
    updateBucketInfo(srcMsg: Omit<MsgUpdateBucketInfo, 'chargedReadQuota'> & {
        chargedReadQuota: string;
    }): Promise<{
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
    putBucketPolicy(bucketName: string, srcMsg: Omit<MsgPutPolicy, 'resource'>): Promise<{
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
    deleteBucketPolicy(operator: string, bucketName: string, principalAddr: string, principalType: keyof typeof PrincipalType): Promise<{
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
    getBucketPolicy(request: QueryPolicyForAccountRequest): Promise<QueryPolicyForAccountResponse>;
    getMigrateBucketApproval(params: MigrateBucketApprovalRequest, authType: AuthType): Promise<{
        code: number;
        message: string;
        body: string;
        statusCode: number;
        signedMsg: MigrateBucketApprovalResponse;
    }>;
    migrateBucket(params: MigrateBucketApprovalRequest, authType: AuthType): Promise<{
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
    cancelMigrateBucket(msg: MsgCancelMigrateBucket): Promise<TxResponse>;
    private migrateBucketTx;
    getBucketMeta(params: GetBucketMetaRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: GetBucketMetaResponse;
    }>;
    listBucketReadRecords(params: ListBucketReadRecordRequest, authType: AuthType): Promise<{
        code: number;
        body: ListBucketReadRecordResponse;
        message: string;
        statusCode: number;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listBucketsByIds(params: ListBucketsByIDsRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListBucketsByIDsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listBucketsByPaymentAccount(params: ListBucketsByPaymentAccountRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListBucketsByPaymentAccountResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
}
