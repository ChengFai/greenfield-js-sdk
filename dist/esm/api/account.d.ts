import { TxClient } from '../clients/txClient';
import { BaseAccount } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth';
import { QueryModuleAccountByNameResponse, QueryModuleAccountsResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/query';
import { QueryBalanceRequest, QueryBalanceResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query';
import { MsgMultiSend, MsgSend } from '@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/tx';
import { QueryPaymentAccountsByOwnerResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/query';
import { MsgCreatePaymentAccount } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx';
import { TxResponse } from '..';
export interface IAccount {
    /**
     * retrieves account information for a given address.
     */
    getAccount(address: string): Promise<BaseAccount>;
    /**
     * retrieves balance information of an account for a given address.
     */
    getAccountBalance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
    /**
     * Get all module accounts.
     */
    getModuleAccounts(): Promise<QueryModuleAccountsResponse>;
    /**
     * Get module account by module name.
     */
    getModuleAccountByName(name: string): Promise<QueryModuleAccountByNameResponse>;
    /**
     * Get all payment accounts owned by the given owner address.
     */
    getPaymentAccountsByOwner(owner: string): Promise<QueryPaymentAccountsByOwnerResponse>;
    /**
     * Create a new payment account for the given address.
     */
    createPaymentAccount(msg: MsgCreatePaymentAccount): Promise<TxResponse>;
    /**
     * Transfer function
     */
    transfer(msg: MsgSend): Promise<TxResponse>;
    /**
     * makes transfers from an account to multiple accounts with respect amounts
     */
    multiTransfer(address: string, msg: MsgMultiSend): Promise<TxResponse>;
}
export declare class Account implements IAccount {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    multiTransfer(address: string, msg: MsgMultiSend): Promise<{
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
    createPaymentAccount(msg: MsgCreatePaymentAccount): Promise<{
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
    getPaymentAccountsByOwner(owner: string): Promise<QueryPaymentAccountsByOwnerResponse>;
    getModuleAccountByName(name: string): Promise<QueryModuleAccountByNameResponse>;
    getModuleAccounts(): Promise<QueryModuleAccountsResponse>;
    getAccountBalance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
    getAccount(address: string): Promise<BaseAccount>;
    transfer(msg: MsgSend): Promise<{
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
}
