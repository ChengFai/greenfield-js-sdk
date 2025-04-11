import { Policy } from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/types';
import { Address } from 'viem';
import { BasicClientParams, CreateBucketSynPackage, CreateGroupSynPackage, DeleteBucketSynPackage, DeleteGroupSynPackage, DeleteObjectSynPackage, DeletePolicySynPackage, HubAddresses, MultiMessageParamOptions, SendMessagesParams, TransferOutSynPackage, UpdateGroupSynPackage } from '../../types';
import { BasicClient } from '../basic';
interface IMultiMessageClient {
    createBucket(synPkg: CreateBucketSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteBucket(synPkg: DeleteBucketSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteObject(synPkg: DeleteObjectSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    createGroup(synPkg: CreateGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteGroup(synPkg: DeleteGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    updateGroup(synPkg: UpdateGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    /**
     * `createPolicy` is special function, need pass Greenfield protobuf message not synPackage message
     */
    createPolicy(msg: Policy, opts: MultiMessageParamOptions): SendMessagesParams;
    deletePolicy(synPkg: DeletePolicySynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    transferOut(synPkg: TransferOutSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    sendMessages(params: SendMessagesParams[]): Promise<Address>;
}
export declare class MultiMessageClient extends BasicClient implements IMultiMessageClient {
    multiMsgAddress: `0x${string}`;
    hubAddress: HubAddresses;
    constructor(initParams: BasicClientParams, multiMsgAddress: `0x${string}`, hubAddress: HubAddresses);
    transferOut(synPkg: TransferOutSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    updateGroup(synPkg: UpdateGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    createGroup(synPkg: CreateGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteGroup(synPkg: DeleteGroupSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    createBucket(synPkg: CreateBucketSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteBucket(synPkg: DeleteBucketSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    deleteObject(synPkg: DeleteObjectSynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    createPolicy(msg: Policy, opts: MultiMessageParamOptions): {
        target: `0x${string}`;
        msgBytes: `0x${string}`;
        values: bigint;
    };
    deletePolicy(synPkg: DeletePolicySynPackage, opts: MultiMessageParamOptions): SendMessagesParams;
    sendMessages(params: SendMessagesParams[]): Promise<`0x${string}`>;
    private calculateFee;
}
export {};
