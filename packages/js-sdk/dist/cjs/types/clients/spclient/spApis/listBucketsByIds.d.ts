import { ListBucketsByIDsRequest, ListBucketsByIDsResponse } from '@/types';
import { SPMetaInfo } from './metaInfos';
export declare const getListBucketsByIDsMetaInfo: (endpoint: string, params: ListBucketsByIDsRequest) => Pick<SPMetaInfo, 'url'>;
export declare const parseListBucketsByIdsResponse: (data: string) => Promise<ListBucketsByIDsResponse>;
