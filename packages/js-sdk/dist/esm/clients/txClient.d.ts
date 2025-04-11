import { BaseAccount } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { BroadcastOptions, CustomTx, ISimulateGasFee, MetaTxInfo, SimulateOptions, TxResponse } from '..';
export interface ITxClient {
    /**
     * simulates a transaction containing the provided messages on the chain.
      The function returns a pointer to a ISimulateGasFee
     */
    simulateRawTx(txBodyBytes: Uint8Array, accountInfo: BaseAccount, txOption: SimulateOptions): Promise<ISimulateGasFee>;
    /**
     * broadcasts a transaction containing the provided messages to the chain.
      The function returns a pointer to a BroadcastTxResponse and any error that occurred during the operation.
     */
    broadcastRawTx(txRawBytes: Uint8Array): Promise<DeliverTxResponse>;
    tx(typeUrl: MetaTxInfo['typeUrl'], address: MetaTxInfo['address'], MsgSDKTypeEIP712: MetaTxInfo['MsgSDKTypeEIP712'], MsgSDK: MetaTxInfo['MsgSDK'], msgBytes: MetaTxInfo['msgBytes']): Promise<TxResponse>;
    txRaw({ address, txRawHex, eip712MsgType, msgData, }: CustomTx): Promise<Omit<TxResponse, 'metaTxInfo'>>;
    /**
     *
     */
    multiTx(txResList: Pick<TxResponse, 'metaTxInfo'>[]): Promise<Omit<TxResponse, 'metaTxInfo'>>;
}
export declare class TxClient implements ITxClient {
    rpcUrl: string;
    chainId: string;
    constructor(rpcUrl: string, chainId: string);
    private account;
    private rpcQueryClient;
    tx(typeUrl: MetaTxInfo['typeUrl'], address: MetaTxInfo['address'], MsgSDKTypeEIP712: MetaTxInfo['MsgSDKTypeEIP712'], MsgSDK: MetaTxInfo['MsgSDK'], msgBytes: MetaTxInfo['msgBytes']): Promise<{
        simulate: (opts: SimulateOptions) => Promise<ISimulateGasFee>;
        broadcast: (opts: BroadcastOptions) => Promise<DeliverTxResponse>;
        metaTxInfo: {
            typeUrl: string;
            address: string;
            MsgSDKTypeEIP712: object;
            MsgSDK: object;
            msgBytes: Uint8Array;
            bodyBytes: Uint8Array;
        };
    }>;
    txRaw({ address, txRawHex, eip712MsgType, msgData, }: CustomTx): Promise<Omit<TxResponse, 'metaTxInfo'>>;
    private getBodyBytes;
    private getSignByPriKey;
    private getSignByWallet;
    private getAuthInfoBytes;
    simulateRawTx(txBodyBytes: Uint8Array, accountInfo: BaseAccount, options: SimulateOptions): Promise<ISimulateGasFee>;
    broadcastRawTx(txRawBytes: Uint8Array): Promise<DeliverTxResponse>;
    multiTx(txResList: Pick<TxResponse, 'metaTxInfo'>[]): Promise<{
        simulate: (opts: SimulateOptions) => Promise<ISimulateGasFee>;
        broadcast: (opts: BroadcastOptions) => Promise<DeliverTxResponse>;
    }>;
}
