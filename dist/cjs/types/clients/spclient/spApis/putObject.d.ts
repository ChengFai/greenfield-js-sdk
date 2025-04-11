import { ReqMeta, VisibilityType } from '@/types';
import { UploadFile } from '@/types/sp/Common';
export declare const getPutObjectMetaInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
    contentType: string;
    body: UploadFile;
    txnHash?: string;
    delegatedOpts?: {
        visibility: VisibilityType;
        isUpdate?: boolean;
    };
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
    file: UploadFile;
}>;
