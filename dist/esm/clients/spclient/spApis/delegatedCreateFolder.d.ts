import { ReqMeta } from '@/types';
import { DelegateCreateFolderRepsonse } from '@/types/sp/DelegateCreateFolder';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
export declare const getDelegatedCreateFolderMetaInfo: (endpoint: string, params: {
    objectName: string;
    bucketName: string;
    delegatedOpts?: {
        visibility: VisibilityType;
    };
}) => Promise<{
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
}>;
export declare const parseDelegatedCreateFolderResponse: (data: string) => DelegateCreateFolderRepsonse;
