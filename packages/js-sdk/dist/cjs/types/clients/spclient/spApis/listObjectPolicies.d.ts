import { GetListObjectPoliciesRequest, GetListObjectPoliciesResponse } from '@/types/sp/ListObjectPolicies';
export declare const getListObjectPoliciesMetaInfo: (endpoint: string, params: GetListObjectPoliciesRequest) => {
    url: string;
};
export declare const parseGetListObjectPoliciesResponse: (data: string) => GetListObjectPoliciesResponse;
