import { ReqMeta } from '@/types';
import { UploadProgressResponse } from '@/types/sp/UploadProgress';
export declare const getObjectStatusInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
export declare const parseObjectStatusResponse: (data: string) => UploadProgressResponse;
