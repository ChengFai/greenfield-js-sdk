import { QueryAutoSettleRecordsRequest, QueryAutoSettleRecordsResponse, QueryDynamicBalanceRequest, QueryDynamicBalanceResponse, QueryGetStreamRecordResponse, QueryOutFlowsRequest, QueryOutFlowsResponse, QueryParamsByTimestampRequest, QueryParamsByTimestampResponse, QueryParamsResponse, QueryPaymentAccountCountRequest, QueryPaymentAccountCountResponse, QueryPaymentAccountCountsRequest, QueryPaymentAccountCountsResponse, QueryPaymentAccountRequest, QueryPaymentAccountResponse, QueryPaymentAccountsByOwnerRequest, QueryPaymentAccountsByOwnerResponse, QueryPaymentAccountsRequest, QueryPaymentAccountsResponse, QueryStreamRecordsRequest, QueryStreamRecordsResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/query';
import { MsgDeposit, MsgDisableRefund, MsgWithdraw } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx';
import { AuthType, SpResponse, TxResponse } from '..';
import { TxClient } from '../clients/txClient';
import { ListUserPaymentAccountsResponse, ListUserPaymentAccountsResquest } from '../types/sp/ListUserPaymentAccounts';
import { SpConfig } from './config';
import { Sp } from './sp';
export interface IPayment {
    /**
     * retrieves stream record information for a given stream address.
     * the account must actions: deposit, withdraw
     */
    getStreamRecord(account: string): Promise<QueryGetStreamRecordResponse>;
    getStreamRecordAll(request: QueryStreamRecordsRequest): Promise<QueryStreamRecordsResponse>;
    /**
     * deposits BNB to a stream account.
     */
    deposit(msg: MsgDeposit): Promise<TxResponse>;
    /**
     * withdraws BNB from a stream account.
     */
    withdraw(msg: MsgWithdraw): Promise<TxResponse>;
    /**
     * disables refund for a stream account.
     */
    disableRefund(msg: MsgDisableRefund): Promise<TxResponse>;
    params(): Promise<QueryParamsResponse>;
    paramsByTimestamp(request: QueryParamsByTimestampRequest): Promise<QueryParamsByTimestampResponse>;
    paymentAccount(request: QueryPaymentAccountRequest): Promise<QueryPaymentAccountResponse>;
    paymentAccountAll(request: QueryPaymentAccountsRequest): Promise<QueryPaymentAccountsResponse>;
    /** Queries a PaymentAccountCount by index. */
    getPaymentAccountCount(request: QueryPaymentAccountCountRequest): Promise<QueryPaymentAccountCountResponse>;
    /** Queries a list of PaymentAccountCount items. */
    getPaymentAccountCounts(request: QueryPaymentAccountCountsRequest): Promise<QueryPaymentAccountCountsResponse>;
    /** Queries a list of DynamicBalance items. */
    dynamicBalance(request: QueryDynamicBalanceRequest): Promise<QueryDynamicBalanceResponse>;
    /** Queries a list of GetPaymentAccountsByOwner items. */
    getPaymentAccountsByOwner(request: QueryPaymentAccountsByOwnerRequest): Promise<QueryPaymentAccountsByOwnerResponse>;
    getAutoSettleRecords(request: QueryAutoSettleRecordsRequest): Promise<QueryAutoSettleRecordsResponse>;
    getOutFlows(request: QueryOutFlowsRequest): Promise<QueryOutFlowsResponse>;
    listUserPaymentAccounts(params: ListUserPaymentAccountsResquest, authType: AuthType, config?: SpConfig): Promise<SpResponse<ListUserPaymentAccountsResponse>>;
}
export declare class Payment implements IPayment {
    private txClient;
    private sp;
    constructor(txClient: TxClient, sp: Sp);
    private spClient;
    private queryClient;
    getStreamRecord(account: string): Promise<QueryGetStreamRecordResponse>;
    getStreamRecordAll(request: QueryStreamRecordsRequest): Promise<QueryStreamRecordsResponse>;
    params(): Promise<QueryParamsResponse>;
    paramsByTimestamp(request: QueryParamsByTimestampRequest): Promise<QueryParamsByTimestampResponse>;
    getPaymentAccountCount(request: QueryPaymentAccountCountRequest): Promise<QueryPaymentAccountCountResponse>;
    getPaymentAccountCounts(request: QueryPaymentAccountCountsRequest): Promise<QueryPaymentAccountCountsResponse>;
    paymentAccount(request: QueryPaymentAccountRequest): Promise<QueryPaymentAccountResponse>;
    paymentAccountAll(request: QueryPaymentAccountsRequest): Promise<QueryPaymentAccountsResponse>;
    dynamicBalance(request: QueryDynamicBalanceRequest): Promise<QueryDynamicBalanceResponse>;
    getPaymentAccountsByOwner(request: QueryPaymentAccountsByOwnerRequest): Promise<QueryPaymentAccountsByOwnerResponse>;
    getAutoSettleRecords(request: QueryAutoSettleRecordsRequest): Promise<QueryAutoSettleRecordsResponse>;
    getOutFlows(request: QueryOutFlowsRequest): Promise<QueryOutFlowsResponse>;
    deposit(msg: MsgDeposit): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    withdraw(msg: MsgWithdraw): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    disableRefund(msg: MsgDisableRefund): Promise<{
        simulate: (opts: import("..").SimulateOptions) => Promise<import("..").ISimulateGasFee>;
        broadcast: (opts: import("..").BroadcastOptions) => Promise<import("@cosmjs/stargate").DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    listUserPaymentAccounts(params: ListUserPaymentAccountsResquest, authType: AuthType, config?: SpConfig): Promise<{
        code: number;
        message: string;
        statusCode: number;
        body: ListUserPaymentAccountsResponse;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
}
