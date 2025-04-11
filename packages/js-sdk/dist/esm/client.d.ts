import 'reflect-metadata';
import { IAccount } from './api/account';
import { IBasic } from './api/basic';
import { IBucket } from './api/bucket';
import { IChallenge } from './api/challenge';
import { ICrossChain } from './api/crosschain';
import { IDistribution } from './api/distribution';
import { IFeeGrant } from './api/feegrant';
import { IGashub } from './api/gashub';
import { IGroup } from './api/group';
import { IObject } from './api/objects';
import { IOffChainAuth } from './api/offchainauth';
import { IPayment } from './api/payment';
import { IProposal } from './api/proposal';
import { ISp } from './api/sp';
import { IStorage } from './api/storage';
import { Validator } from './api/validator';
import { IVirtualGroup } from './api/virtualGroup';
import { RpcQueryClient } from './clients/queryclient';
import { ISpClient } from './clients/spclient/spClient';
import { ITxClient } from './clients/txClient';
export declare class Client {
    account: IAccount;
    basic: IBasic;
    bucket: IBucket;
    challenge: IChallenge;
    crosschain: ICrossChain;
    distribution: IDistribution;
    feegrant: IFeeGrant;
    gashub: IGashub;
    group: IGroup;
    object: IObject;
    payment: IPayment;
    proposal: IProposal;
    queryClient: RpcQueryClient;
    sp: ISp;
    spClient: ISpClient;
    storage: IStorage;
    txClient: ITxClient;
    offchainauth: IOffChainAuth;
    validator: Validator;
    virtualGroup: IVirtualGroup;
    /**
     * @rpcUrl string
     * @chaidId string
     * @wasmURL optional, need setting only used for browser
     */
    static create(rpcUrl: string, chainId: string): Client;
    constructor(account: IAccount, basic: IBasic, bucket: IBucket, challenge: IChallenge, crosschain: ICrossChain, distribution: IDistribution, feegrant: IFeeGrant, gashub: IGashub, group: IGroup, object: IObject, payment: IPayment, proposal: IProposal, queryClient: RpcQueryClient, sp: ISp, spClient: ISpClient, storage: IStorage, txClient: ITxClient, offchainauth: IOffChainAuth, validator: Validator, virtualGroup: IVirtualGroup);
}
