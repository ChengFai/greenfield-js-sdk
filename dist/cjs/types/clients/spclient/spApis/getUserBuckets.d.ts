import type { GetUserBucketsResponse } from '@/types';
import { SPMetaInfo } from './metaInfos';
export declare const getUserBucketMetaInfo: (endpoint: string) => Pick<SPMetaInfo, 'url'>;
export declare const parseGetUserBucketsResponse: (data: string) => Promise<GetUserBucketsResponse>;
