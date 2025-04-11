import { ReqMeta } from '@/types';
import { DelegatedOpts } from '@/types/sp/Common';
export declare const getResumablePutObjectMetaInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
    contentType: string;
    body: File;
    offset: number;
    complete: boolean;
    delegatedOpts?: DelegatedOpts;
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
