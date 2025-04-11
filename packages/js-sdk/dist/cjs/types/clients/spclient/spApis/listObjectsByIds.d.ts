import { ListObjectsByIDsRequest, ListObjectsByIDsResponse } from '@/types';
export declare const getListObjectsByIDsMetaInfo: (endpoint: string, params: ListObjectsByIDsRequest) => {
    url: string;
};
export declare const parseListObjectsByIdsResponse: (data: string) => Promise<ListObjectsByIDsResponse>;
