import { ReqMeta, ReadQuotaRequest } from '@/types';
import { ReadQuotaResponse } from '@/types/sp';
export declare const getQueryBucketReadQuotaMetaInfo: (endpoint: string, params: ReadQuotaRequest) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
export declare const parseReadQuotaResponse: (data: string) => Promise<ReadQuotaResponse>;
