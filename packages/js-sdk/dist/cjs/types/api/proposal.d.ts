import { MsgSubmitProposal, MsgVote } from '@bnb-chain/greenfield-cosmos-types/cosmos/gov/v1/tx';
import { MsgCreateValidator } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface IProposal {
    /**
     * NOTICE: only validator can use this api
     */
    submitProposal(createValidatorTx: object, srcMsg: MsgSubmitProposal): Promise<TxResponse>;
    /**
     * NOTICE: only validator can use this api
     */
    voteProposal(msg: MsgVote): Promise<TxResponse>;
}
export declare class Proposal implements IProposal {
    private txClient;
    constructor(txClient: TxClient);
    voteProposal(msg: MsgVote): Promise<{
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
    submitProposal(createMsg: MsgCreateValidator, submitMsg: MsgSubmitProposal): Promise<{
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
