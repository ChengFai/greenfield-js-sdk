import { QueryInturnAttestationSubmitterResponse, QueryLatestAttestedChallengesResponse, QueryParamsResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/challenge/query';
import { MsgAttest, MsgSubmit } from '@bnb-chain/greenfield-cosmos-types/greenfield/challenge/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
export interface IChallenge {
    /**
     * challenges the service provider data integrity, used by off-chain service greenfield-challenger.
     */
    submitChallenge(address: string, msg: MsgSubmit): Promise<TxResponse>;
    /**
     * Attest handles user's request for attesting a challenge.
       The attestation can include a valid challenge or is only for heartbeat purpose.
       If the challenge is valid, the related storage provider will be slashed.
       For heartbeat attestation, the challenge is invalid and the storage provider will not be slashed.
     */
    attestChallenge(address: string, msg: MsgAttest): Promise<TxResponse>;
    latestAttestedChallenges(): Promise<QueryLatestAttestedChallengesResponse>;
    inturnAttestationSubmitter(): Promise<QueryInturnAttestationSubmitterResponse>;
    params(): Promise<QueryParamsResponse>;
}
export declare class Challenge implements IChallenge {
    private txClient;
    private queryClient;
    constructor(txClient: TxClient);
    submitChallenge(address: string, msg: MsgSubmit): Promise<{
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
    attestChallenge(address: string, msg: MsgAttest): Promise<{
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
    latestAttestedChallenges(): Promise<QueryLatestAttestedChallengesResponse>;
    inturnAttestationSubmitter(): Promise<QueryInturnAttestationSubmitterResponse>;
    params(): Promise<QueryParamsResponse>;
}
