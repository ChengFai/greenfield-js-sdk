import { QueryMsgGasParamsRequest, QueryMsgGasParamsResponse, QueryParamsResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/gashub/v1beta1/query';
export interface IGashub {
    getParams(): Promise<QueryParamsResponse>;
    getMsgGasParams(request: QueryMsgGasParamsRequest): Promise<QueryMsgGasParamsResponse>;
}
export declare class Gashub implements IGashub {
    private queryClient;
    getMsgGasParams(request: QueryMsgGasParamsRequest): Promise<QueryMsgGasParamsResponse>;
    getParams(): Promise<QueryParamsResponse>;
}
