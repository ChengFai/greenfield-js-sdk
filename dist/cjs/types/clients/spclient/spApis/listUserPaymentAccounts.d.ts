import { ReqMeta } from '@/types';
import { ListUserPaymentAccountsResponse, ListUserPaymentAccountsResquest } from '@/types/sp/ListUserPaymentAccounts';
export declare const getListUserPaymentAccountMetaInfo: (endpoint: string, params: ListUserPaymentAccountsResquest) => {
    url: string;
    optionsWithOutHeaders: Omit<RequestInit, "headers">;
    reqMeta: Partial<ReqMeta>;
};
export declare const parseListUserPaymentAccountResponse: (data: string) => ListUserPaymentAccountsResponse;
