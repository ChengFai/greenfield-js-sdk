import { QueryGroupNFTResponse, QueryHeadGroupMemberResponse, QueryHeadGroupResponse, QueryListGroupsRequest, QueryListGroupsResponse, QueryNFTRequest, QueryPolicyForGroupRequest, QueryPolicyForGroupResponse } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { MsgCreateGroup, MsgDeleteGroup, MsgLeaveGroup, MsgPutPolicy, MsgUpdateGroupExtra, MsgUpdateGroupMember } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { TxResponse } from '..';
import { TxClient } from '../clients/txClient';
import { Storage } from './storage';
export interface IGroup {
    /**
     * create a new group on greenfield chain the group members can be initialized  or not
     */
    createGroup(msg: MsgCreateGroup): Promise<TxResponse>;
    /**
     * send DeleteGroup txn to greenfield chain and return txn hash
     */
    deleteGroup(msg: MsgDeleteGroup): Promise<TxResponse>;
    /**
     * support adding or removing members from the group and return the txn hash
     */
    updateGroupMember(msg: MsgUpdateGroupMember): Promise<TxResponse>;
    updateGroupExtra(msg: MsgUpdateGroupExtra): Promise<TxResponse>;
    /**
     * make the member leave the specific group
     */
    leaveGroup(address: string, msg: MsgLeaveGroup): Promise<TxResponse>;
    /**
     * query the groupInfo on chain, return the group info if exists
     */
    headGroup(groupName: string, groupOwner: string): Promise<QueryHeadGroupResponse>;
    /**
     * query the group member info on chain, return true if the member exists in group
     */
    headGroupMember(groupName: string, groupOwner: string, member: string): Promise<QueryHeadGroupMemberResponse>;
    /**
     * @deprecated
     */
    listGroup(request: QueryListGroupsRequest): Promise<QueryListGroupsResponse>;
    headGroupNFT(request: QueryNFTRequest): Promise<QueryGroupNFTResponse>;
    /**
     * get the bucket policy info of the group specified by group id
     * it queries a bucket policy that grants permission to a group
     */
    getPolicyOfGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getBucketPolicyOfGroup(bucketName: string, groupId: number): Promise<QueryPolicyForGroupResponse>;
    getObjectPolicyOfGroup(bucketName: string, objectName: string, groupId: number): Promise<QueryPolicyForGroupResponse>;
    putGroupPolicy(owner: string, groupName: string, srcMsg: Omit<MsgPutPolicy, 'resource' | 'expirationTime'>): Promise<TxResponse>;
}
export declare class Group implements IGroup {
    private txClient;
    private storage;
    constructor(txClient: TxClient, storage: Storage);
    private queryClient;
    createGroup(msg: MsgCreateGroup): Promise<{
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
    deleteGroup(msg: MsgDeleteGroup): Promise<{
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
    updateGroupMember(msg: MsgUpdateGroupMember): Promise<{
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
    updateGroupExtra(msg: MsgUpdateGroupExtra): Promise<{
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
    leaveGroup(address: string, msg: MsgLeaveGroup): Promise<{
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
    headGroup(groupName: string, groupOwner: string): Promise<QueryHeadGroupResponse>;
    headGroupMember(groupName: string, groupOwner: string, member: string): Promise<QueryHeadGroupMemberResponse>;
    headGroupNFT(request: QueryNFTRequest): Promise<QueryGroupNFTResponse>;
    listGroup(request: QueryListGroupsRequest): Promise<QueryListGroupsResponse>;
    getPolicyOfGroup(request: QueryPolicyForGroupRequest): Promise<QueryPolicyForGroupResponse>;
    getBucketPolicyOfGroup(bucketName: string, groupId: number): Promise<QueryPolicyForGroupResponse>;
    getObjectPolicyOfGroup(bucketName: string, objectName: string, groupId: number): Promise<QueryPolicyForGroupResponse>;
    putGroupPolicy(owner: string, groupName: string, srcMsg: Omit<MsgPutPolicy, 'resource' | 'expirationTime'>): Promise<{
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
