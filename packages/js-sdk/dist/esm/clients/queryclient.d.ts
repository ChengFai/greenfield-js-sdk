import { QueryClientImpl as AuthQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/query';
import { QueryClientImpl as BankQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query';
import { QueryClientImpl as CrosschainQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/crosschain/v1/query';
import { MsgClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/distribution/v1beta1/tx';
import { QueryClientImpl as FeeGrantQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/query';
import { QueryClientImpl as GashubClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/gashub/v1beta1/query';
import { QueryClientImpl as OracleQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/query';
import { QueryClientImpl as StakingQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/query';
import { QueryClientImpl as BridgeQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/query';
import { QueryClientImpl as ChallengeQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/challenge/query';
import { QueryClientImpl as PaymentQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/query';
import { QueryClientImpl as SpQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/sp/query';
import { QueryClientImpl as StorageQueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { QueryClientImpl as VirtualGroupClientImpl } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/query';
import { AuthExtension, BankExtension, ProtobufRpcClient, QueryClient, TxExtension } from '@cosmjs/stargate';
import { AuthzExtension } from '@cosmjs/stargate/build/modules/authz/queries';
import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
export declare class RpcQueryClient {
    private rpcUrl;
    constructor(rpcUrl: string);
    private rpcClient;
    getRpcClient(): Promise<ProtobufRpcClient>;
    private txQueryClient;
    getQueryClient(): Promise<QueryClient & BankExtension & TxExtension & AuthExtension & AuthzExtension>;
    getAuthQueryClient(): Promise<AuthQueryClientImpl>;
    getBankQueryClient(): Promise<BankQueryClientImpl>;
    getPaymentQueryClient(): Promise<PaymentQueryClientImpl>;
    getSpQueryClient(): Promise<SpQueryClientImpl>;
    getChallengeQueryClient(): Promise<ChallengeQueryClientImpl>;
    getCrosschainQueryClient(): Promise<CrosschainQueryClientImpl>;
    getOracleQueryClient(): Promise<OracleQueryClientImpl>;
    getBridgeQueryClient(): Promise<BridgeQueryClientImpl>;
    getFeeGrantQueryClient(): Promise<FeeGrantQueryClientImpl>;
    getStorageQueryClient(): Promise<StorageQueryClientImpl>;
    getMsgClient(): Promise<MsgClientImpl>;
    getGashubClient(): Promise<GashubClientImpl>;
    getVirtualGroupClient(): Promise<VirtualGroupClientImpl>;
    getStakingClient(): Promise<StakingQueryClientImpl>;
}
export declare const makeClientWithExtension: (rpcUrl: string) => Promise<[
    QueryClient & BankExtension & TxExtension & AuthExtension & AuthzExtension,
    Tendermint37Client
]>;
export declare const makeRpcClient: (rpcUrl: string) => Promise<ProtobufRpcClient>;
