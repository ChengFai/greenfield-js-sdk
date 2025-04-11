import { MsgFundCommunityPool, MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission } from '@bnb-chain/greenfield-cosmos-types/cosmos/distribution/v1beta1/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface IDistribution {
    /**
     * sets the withdrawal address for a delegator address
     */
    setWithdrawAddress(msg: MsgSetWithdrawAddress): Promise<TxResponse>;
    /**
     * withdraw accumulated commission by validator
     */
    withdrawValidatorCommission(address: string, msg: MsgWithdrawValidatorCommission): Promise<TxResponse>;
    /**
     * withdraw rewards by a delegator
     */
    withdrawDelegatorReward(msg: MsgWithdrawDelegatorReward): Promise<TxResponse>;
    /**
     * sends coins directly from the sender to the community pool.
     */
    fundCommunityPoolundComm(address: string, msg: MsgFundCommunityPool): Promise<TxResponse>;
}
export declare class Distribution implements IDistribution {
    private txClient;
    constructor(txClient: TxClient);
    setWithdrawAddress(msg: MsgSetWithdrawAddress): Promise<{
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
    withdrawValidatorCommission(address: string, msg: MsgWithdrawValidatorCommission): Promise<{
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
    withdrawDelegatorReward(msg: MsgWithdrawDelegatorReward): Promise<{
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
    fundCommunityPoolundComm(address: string, msg: MsgFundCommunityPool): Promise<{
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
