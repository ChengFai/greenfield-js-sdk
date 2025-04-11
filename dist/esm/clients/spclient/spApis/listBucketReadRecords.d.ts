import { ListBucketReadRecordRequest, ListBucketReadRecordResponse } from '@/types/sp/ListBucketReadRecord';
import { SPMetaInfo } from './metaInfos';
export declare const getListBucketReadRecordMetaInfo: (endpoint: string, params: ListBucketReadRecordRequest) => SPMetaInfo;
export declare const parseListBucketReadRecordResponse: (data: string) => Promise<ListBucketReadRecordResponse>;
