import type { EIP712Msg } from '@/messages/utils';
import { MsgGroupMember } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
export declare const getMsgUpdateGroupMemberSDKTypeEIP712: ({ membersToAdd, membersToDelete, }: {
    membersToAdd: MsgGroupMember[];
    membersToDelete: string[];
}) => EIP712Msg;
