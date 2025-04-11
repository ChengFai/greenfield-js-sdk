import { ReqMeta } from '@/types';
export type APPROVAL_ACTION = 'CreateBucket' | 'CreateObject' | 'MigrateBucket';
export declare const getApprovalMetaInfo: <T>(endpoint: string, action: APPROVAL_ACTION, msg: T) => {
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
};
