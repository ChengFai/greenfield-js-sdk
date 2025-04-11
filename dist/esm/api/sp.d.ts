import { ListUserOwnedGroupsResponse } from '../types/sp/ListUserOwnedGroups';
import { QueryGlobalSpStorePriceByTimeRequest, QueryGlobalSpStorePriceByTimeResponse, QueryParamsResponse, QuerySpStoragePriceRequest, QuerySpStoragePriceResponse, QueryStorageProviderByOperatorAddressRequest, QueryStorageProviderByOperatorAddressResponse, QueryStorageProviderMaintenanceRecordsRequest, QueryStorageProviderMaintenanceRecordsResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/sp/query';
import { StorageProvider } from '@bnb-chain/greenfield-cosmos-types/greenfield/sp/types';
import type { ListGroupsMembersRequest, ListGroupsMembersResponse, ListGroupsResponse, ListGroupsResquest, ListUserGroupsResponse, ListUserGroupsResquest, ListUserOwnedGroupsRequest, SpResponse, VerifyPermissionRequest, VerifyPermissionResponse } from '..';
export interface ISp {
    /**
     * return the storage provider info on chain
        isInService indicates if only display the sp with STATUS_IN_SERVICE status
     */
    getStorageProviders(): Promise<StorageProvider[]>;
    /**
     * return the sp info with the sp chain address
     */
    getStorageProviderInfo(spId: number): Promise<StorageProvider | undefined>;
    /**
     * get the latest storage price of specific sp
     */
    getQuerySpStoragePrice(request: QuerySpStoragePriceRequest): Promise<QuerySpStoragePriceResponse>;
    /**
     * get global store price by time
     */
    getQueryGlobalSpStorePriceByTime(request: QueryGlobalSpStorePriceByTimeRequest): Promise<QueryGlobalSpStorePriceByTimeResponse>;
    /**
     * Queries a StorageProvider by specify operator address.
     */
    getStorageProviderByOperatorAddress(request: QueryStorageProviderByOperatorAddressRequest): Promise<QueryStorageProviderByOperatorAddressResponse>;
    /**
     * Queries a StorageProvider by specify operator address.
     */
    getStorageProviderMaintenanceRecordsByOperatorAddress(request: QueryStorageProviderMaintenanceRecordsRequest): Promise<QueryStorageProviderMaintenanceRecordsResponse>;
    params(): Promise<QueryParamsResponse>;
    listGroups(params: ListGroupsResquest): Promise<SpResponse<ListGroupsResponse>>;
    listGroupsMembers(params: ListGroupsMembersRequest): Promise<SpResponse<ListGroupsMembersResponse>>;
    listUserGroups(params: ListUserGroupsResquest): Promise<SpResponse<ListUserGroupsResponse>>;
    listUserOwnedGroups(params: ListUserOwnedGroupsRequest): Promise<SpResponse<ListUserOwnedGroupsResponse>>;
    getSPUrlByBucket(bucketName: string): Promise<string>;
    getSPUrlByPrimaryAddr(parimaryAddr: string): Promise<string>;
    getSPUrlById(primaryId: number): Promise<string>;
    verifyPermission(params: VerifyPermissionRequest): Promise<SpResponse<VerifyPermissionResponse>>;
}
export declare class Sp implements ISp {
    private bucket;
    private queryClient;
    private virtualGroup;
    private spClient;
    getStorageProviders(): Promise<StorageProvider[]>;
    getStorageProviderInfo(spId: number): Promise<StorageProvider | undefined>;
    getQuerySpStoragePrice(request: QuerySpStoragePriceRequest): Promise<QuerySpStoragePriceResponse>;
    getQueryGlobalSpStorePriceByTime(request: QueryGlobalSpStorePriceByTimeRequest): Promise<QueryGlobalSpStorePriceByTimeResponse>;
    getStorageProviderByOperatorAddress(request: QueryStorageProviderByOperatorAddressRequest): Promise<QueryStorageProviderByOperatorAddressResponse>;
    getStorageProviderMaintenanceRecordsByOperatorAddress(request: QueryStorageProviderMaintenanceRecordsRequest): Promise<QueryStorageProviderMaintenanceRecordsResponse>;
    getSPUrlById(primaryId: number): Promise<string>;
    getSPUrlByBucket(bucketName: string): Promise<string>;
    getSPUrlByPrimaryAddr(parimaryAddr: string): Promise<string>;
    params(): Promise<QueryParamsResponse>;
    getInServiceSP(): Promise<StorageProvider>;
    listGroups(params: ListGroupsResquest): Promise<{
        code: number;
        message: string;
        body: ListGroupsResponse;
        statusCode?: undefined;
    } | {
        code: number;
        message: string;
        statusCode: number;
        body: ListGroupsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    verifyPermission(params: VerifyPermissionRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: VerifyPermissionResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listGroupsMembers(params: ListGroupsMembersRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListGroupsMembersResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listUserGroups(params: ListUserGroupsResquest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListUserGroupsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    listUserOwnedGroups(params: ListUserOwnedGroupsRequest): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListUserOwnedGroupsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
}
