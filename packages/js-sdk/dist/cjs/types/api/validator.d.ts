import { QueryValidatorsRequest, QueryValidatorsResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/query';
import { MsgCreateValidator, MsgEditValidator } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface IValidator {
    /**
     * lists all validators (if status is empty string) or validators filtered by status.
     * STATUS:
     * "BOND_STATUS_UNBONDED",
     * "BOND_STATUS_UNBONDING",
     * "BOND_STATUS_BONDED",
     */
    listValidators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
    /**
     * NOTICE: only validator can use this api
     */
    createValidator(address: string, createValidatorSrcMsg: MsgCreateValidator): Promise<TxResponse>;
    /**
     * NOTICE: only validator can use this api
     */
    editValidator(address: string, msg: MsgEditValidator): Promise<TxResponse>;
}
export declare class Validator implements IValidator {
    private txClient;
    constructor(txClient: TxClient);
    private queryClient;
    private proposal;
    listValidators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
    createValidator(address: string, msg: MsgCreateValidator): Promise<{
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
    editValidator(address: string, msg: MsgEditValidator): Promise<{
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
