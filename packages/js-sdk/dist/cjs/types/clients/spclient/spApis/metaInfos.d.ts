import type { ReqMeta } from '@/types';
export type SPMetaInfo = {
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, 'headers'>;
    reqMeta: Partial<ReqMeta>;
};
export declare const SpMetaInfo: {
    getGetObjectMetaInfo: (endpoint: string, params: {
        objectName: string;
        bucketName: string;
    }) => Promise<{
        url: string;
        optionsWithOutHeaders: Omit<RequestInit, "headers">;
        reqMeta: Partial<ReqMeta>;
    }>;
    getPutObjectMetaInfo: (endpoint: string, params: {
        objectName: string;
        bucketName: string;
        contentType: string;
        body: import("../../../types/sp/Common").UploadFile;
        txnHash?: string | undefined;
        delegatedOpts?: {
            visibility: import("@/types").VisibilityType;
            isUpdate?: boolean | undefined;
        } | undefined;
    }) => Promise<{
        url: string;
        optionsWithOutHeaders: Omit<RequestInit, "headers">;
        reqMeta: Partial<ReqMeta>;
        file: import("../../../types/sp/Common").UploadFile;
    }>;
    getQueryBucketReadQuotaMetaInfo: (endpoint: string, params: import("@/types").ReadQuotaRequest) => Promise<{
        url: string;
        optionsWithOutHeaders: Omit<RequestInit, "headers">;
        reqMeta: Partial<ReqMeta>;
    }>;
};
