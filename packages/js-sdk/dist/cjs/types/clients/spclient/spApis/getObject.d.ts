import { ReqMeta } from '@/types';
export declare const getGetObjectMetaInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
