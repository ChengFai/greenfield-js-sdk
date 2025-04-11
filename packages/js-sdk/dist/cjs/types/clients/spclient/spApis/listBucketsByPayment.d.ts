import { ListBucketsByPaymentAccountRequest, ListBucketsByPaymentAccountResponse } from '@/types/sp/ListBucketsByPaymentAccount';
export declare const getListBucketByPaymentMetaInfo: (endpoint: string, params: ListBucketsByPaymentAccountRequest) => {
    url: string;
};
export declare const parseListBucketByPaymentResponse: (data: string) => ListBucketsByPaymentAccountResponse;
