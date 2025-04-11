import { ReqMeta, UploadOffsetResponse } from '@/types';
export declare const getObjectOffsetInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
export declare const parseObjectOffsetResponse: (data: string) => UploadOffsetResponse;
