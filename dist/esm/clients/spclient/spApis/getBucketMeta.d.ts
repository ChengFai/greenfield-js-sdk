import { GetBucketMetaRequest, GetBucketMetaResponse } from '@/types';
import { SPMetaInfo } from './metaInfos';
export declare const getBucketMetaInfo: (endpoint: string, params: GetBucketMetaRequest) => Pick<SPMetaInfo, 'url'>;
export declare const parseGetBucketMetaResponse: (data: string) => Promise<GetBucketMetaResponse>;
