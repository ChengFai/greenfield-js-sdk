import { MsgCreatePaymentAccount, MsgDeposit, MsgDisableRefund, MsgWithdraw } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx';
import { MsgCancelMigrateBucket, MsgCopyObject, MsgMigrateBucket, MsgSetBucketFlowRateLimit, MsgSetTag, MsgToggleSPAsDelegatedAgent, MsgUpdateBucketInfo, MsgUpdateGroupExtra, MsgUpdateObjectInfo } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { ExecuteParams } from '../../types';
export declare class ExecutorMsg {
    static getCreatePaymentAccountParams: (msg: MsgCreatePaymentAccount) => ExecuteParams;
    static getDepositParams: (msg: MsgDeposit) => ExecuteParams;
    static getDisableRefundParams: (msg: MsgDisableRefund) => ExecuteParams;
    static getWithdrawParams: (msg: MsgWithdraw) => ExecuteParams;
    static getMigrateBucketParams: (msg: MsgMigrateBucket) => ExecuteParams;
    static getCancelMigrateBucketParams: (msg: MsgCancelMigrateBucket) => ExecuteParams;
    static getUpdateBucketInfoParams: (msg: MsgUpdateBucketInfo) => ExecuteParams;
    static getToggleSPAsDelegatedAgentParams: (msg: MsgToggleSPAsDelegatedAgent) => ExecuteParams;
    static getSetBucketFlowRateLimitParams: (msg: MsgSetBucketFlowRateLimit) => ExecuteParams;
    static getCopyObjectParams: (msg: MsgCopyObject) => ExecuteParams;
    static getUpdateObjectInfoParams: (msg: MsgUpdateObjectInfo) => ExecuteParams;
    static getUpdateGroupExtraParams: (msg: MsgUpdateGroupExtra) => ExecuteParams;
    static getSetTagParams: (msg: MsgSetTag) => ExecuteParams;
}
