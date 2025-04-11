import { ActionType, PrincipalType } from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import { QueryHeadObjectResponse, QueryNFTRequest, QueryObjectNFTResponse, QueryPolicyForAccountResponse, QueryVerifyPermissionResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { MsgCancelCreateObject, MsgCreateObject, MsgDeleteObject, MsgPutPolicy, MsgUpdateObjectInfo } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { TxClient } from '../clients/txClient';
import { AuthType, GetListObjectPoliciesRequest, GetListObjectPoliciesResponse, GetPrivewObject, ListObjectsByBucketNameRequest, ListObjectsByIDsRequest, ListObjectsByIDsResponse, SpResponse, TxResponse } from '../types';
import { DelegateCreateFolderRepsonse, DelegatedCreateFolderRequest } from '../types/sp/DelegateCreateFolder';
import { DelegatedPubObjectRequest } from '../types/sp/DelegatedPubObject';
import { GetObjectRequest } from '../types/sp/GetObject';
import { GetObjectMetaRequest, GetObjectMetaResponse } from '../types/sp/GetObjectMeta';
import { ListObjectsByBucketNameResponse } from '../types/sp/ListObjectsByBucketName';
import { PutObjectRequest } from '../types/sp/PutObject';
import { Sp } from './sp';
import { Storage } from './storage';
export interface IObject {
    createObject(msg: MsgCreateObject): Promise<TxResponse>;
    uploadObject(configParam: PutObjectRequest, authType: AuthType): Promise<SpResponse<null>>;
    delegateUploadObject(params: DelegatedPubObjectRequest, authType: AuthType): Promise<SpResponse<null>>;
    cancelCreateObject(msg: MsgCancelCreateObject): Promise<TxResponse>;
    updateObjectInfo(msg: MsgUpdateObjectInfo): Promise<TxResponse>;
    deleteObject(msg: MsgDeleteObject): Promise<TxResponse>;
    headObject(bucketName: string, objectName: string): Promise<QueryHeadObjectResponse>;
    headObjectById(objectId: string): Promise<QueryHeadObjectResponse>;
    headObjectNFT(request: QueryNFTRequest): Promise<QueryObjectNFTResponse>;
    /**
     * get s3 object's blob
     */
    getObject(configParam: GetObjectRequest, authType: AuthType): Promise<SpResponse<Blob>>;
    getObjectPreviewUrl(configParam: GetPrivewObject, authType: AuthType): Promise<string>;
    /**
     * download s3 object
     */
    downloadFile(configParam: GetObjectRequest, authType: AuthType): Promise<void>;
    listObjects(configParam: ListObjectsByBucketNameRequest): Promise<SpResponse<ListObjectsByBucketNameResponse>>;
    createFolder(msg: Omit<MsgCreateObject, 'payloadSize' | 'contentType' | 'expectChecksums'>): Promise<TxResponse>;
    delegateCreateFolder(params: DelegatedCreateFolderRequest, authType: AuthType): Promise<SpResponse<DelegateCreateFolderRepsonse>>;
    putObjectPolicy(bucketName: string, objectName: string, srcMsg: Omit<MsgPutPolicy, 'resource'>): Promise<TxResponse>;
    deleteObjectPolicy(operator: string, bucketName: string, objectName: string, principalAddr: string, principalType: keyof typeof PrincipalType): Promise<TxResponse>;
    isObjectPermissionAllowed(bucketName: string, objectName: string, actionType: ActionType, operator: string): Promise<QueryVerifyPermissionResponse>;
    getObjectPolicy(bucketName: string, objectName: string, principalAddr: string): Promise<QueryPolicyForAccountResponse>;
    getObjectMeta(params: GetObjectMetaRequest): Promise<SpResponse<GetObjectMetaResponse>>;
    listObjectsByIds(params: ListObjectsByIDsRequest): Promise<SpResponse<ListObjectsByIDsResponse>>;
    listObjectPolicies(params: GetListObjectPoliciesRequest): Promise<SpResponse<GetListObjectPoliciesResponse>>;
    /**
     * return the status of object including the uploading progress
     */
    getObjectUploadProgress(bucketName: string, objectName: string, authType: AuthType): Promise<string>;
}
export declare class Objects implements IObject {
    private txClient;
    private storage;
    private sp;
    constructor(txClient: TxClient, storage: Storage, sp: Sp);
    private queryClient;
    private spClient;
    createObject(msg: MsgCreateObject): Promise<{
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
    delegateUploadObject(params: DelegatedPubObjectRequest, authType: AuthType): Promise<SpResponse<null> | {
        code: number;
        message: any;
        statusCode: any;
    }>;
    uploadObject(params: PutObjectRequest, authType: AuthType): Promise<SpResponse<null>>;
    private putObject;
    private splitPartInfo;
    private putResumableObject;
    private headSPObjectInfo;
    private getObjectResumableUploadOffset;
    private getObjectOffsetFromSP;
    private getObjectStatusFromSp;
    cancelCreateObject(msg: MsgCancelCreateObject): Promise<{
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
    deleteObject(msg: MsgDeleteObject): Promise<{
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
    updateObjectInfo(msg: MsgUpdateObjectInfo): Promise<{
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
    headObject(bucketName: string, objectName: string): Promise<QueryHeadObjectResponse>;
    headObjectById(objectId: string): Promise<QueryHeadObjectResponse>;
    headObjectNFT(request: QueryNFTRequest): Promise<QueryObjectNFTResponse>;
    getObject(params: GetObjectRequest, authType: AuthType): Promise<{
        code: string | number;
        message: string;
        statusCode: number;
        body?: undefined;
    } | {
        code: number;
        body: Blob;
        message: string;
        statusCode: number;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    getObjectPreviewUrl(params: GetPrivewObject, authType: AuthType): Promise<string>;
    downloadFile(configParam: GetObjectRequest, authType: AuthType): Promise<void>;
    listObjects(configParam: ListObjectsByBucketNameRequest): Promise<{
        code: string | number;
        message: string;
        statusCode: number;
        body?: undefined;
    } | {
        code: number;
        message: string;
        statusCode: number;
        body: ListObjectsByBucketNameResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    createFolder(msg: Omit<MsgCreateObject, 'payloadSize' | 'contentType' | 'expectChecksums'>): Promise<{
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
    delegateCreateFolder(params: DelegatedCreateFolderRequest, authType: AuthType): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: DelegateCreateFolderRepsonse;
    } | {
        code: any;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    putObjectPolicy(bucketName: string, objectName: string, srcMsg: Omit<MsgPutPolicy, 'resource'>): Promise<{
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
    isObjectPermissionAllowed(bucketName: string, objectName: string, actionType: ActionType, operator: string): Promise<QueryVerifyPermissionResponse>;
    getObjectPolicy(bucketName: string, objectName: string, principalAddr: string): Promise<QueryPolicyForAccountResponse>;
    deleteObjectPolicy(operator: string, bucketName: string, objectName: string, principalAddr: string, principalType: keyof typeof PrincipalType): Promise<{
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
    getObjectMeta(params: GetObjectMetaRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: GetObjectMetaResponse;
    }>;
    listObjectsByIds(params: ListObjectsByIDsRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListObjectsByIDsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listObjectPolicies(params: GetListObjectPoliciesRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: GetListObjectPoliciesResponse;
    }>;
    getObjectUploadProgress(bucketName: string, objectName: string, authType: AuthType): Promise<string>;
}
