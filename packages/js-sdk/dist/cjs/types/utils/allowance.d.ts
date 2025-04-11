import { AllowedMsgAllowance, BasicAllowance } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/feegrant';
import { MsgGrantAllowance } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/tx';
import { Timestamp } from '@bnb-chain/greenfield-cosmos-types/google/protobuf/timestamp';
export interface IGrantAllowance {
    amount: string;
    denom: string;
    allowedMessages: string[];
    granter: MsgGrantAllowance['granter'];
    grantee: MsgGrantAllowance['grantee'];
    expirationTime: Timestamp;
}
export declare const newBasicAllowance: (amount: string, denom: string | undefined, expirationTime: Timestamp) => BasicAllowance;
export declare const newAllowedMsgAllowance: (allowedMessages: string[], basicAllowance: BasicAllowance) => AllowedMsgAllowance;
export declare const newMsgGrantAllowance: (grantee: string, granter: string, allowedMsgAllowance: AllowedMsgAllowance) => MsgGrantAllowance;
export declare const newMarshal: (amount: string, denom: string | undefined, allowed_messages: string[], expirationTime: Timestamp) => {
    '@type': string;
    allowance: {
        '@type': string;
        expiration: Date;
        spend_limit: {
            amount: string;
            denom: string;
        }[];
    };
    allowed_messages: string[];
};
