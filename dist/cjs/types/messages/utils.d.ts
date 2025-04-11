import { Any } from '@bnb-chain/greenfield-cosmos-types/google/protobuf/any';
import { MetaTxInfo } from '..';
export type EIP712Msg = Record<string, Array<{
    type: string;
    name: string;
}>>;
export declare const typeWrapper: (type: string, msg: object) => {
    type: string;
};
export declare const generateMsg: (typeUrl: string, msgBytes: Uint8Array) => Any;
export declare const createEIP712: (types: object, chainId: string, message: object) => {
    readonly types: object;
    readonly primaryType: "Tx";
    readonly domain: {
        readonly name: "Greenfield Tx";
        readonly version: "1.0.0";
        readonly chainId: string;
        readonly verifyingContract: "0x71e835aff094655dEF897fbc85534186DbeaB75d";
        readonly salt: "0";
    };
    readonly message: object;
};
export declare const generateMessage: (accountNumber: string, sequence: string, chainCosmosId: string, memo: string, fee: object, msg: object, timeoutHeight: string) => Record<string, any>;
export declare const generateTypes: (newTypes: object) => {
    Coin: {
        name: string;
        type: string;
    }[];
    EIP712Domain: {
        name: string;
        type: string;
    }[];
    Fee: {
        name: string;
        type: string;
    }[];
    Tx: {
        name: string;
        type: string;
    }[];
};
export declare const generateFee: (amount: string, denom: string, gas_limit: string, payer: string, granter: string) => {
    amount: {
        amount: string;
        denom: string;
    }[];
    gas_limit: string;
    payer: string;
    granter: string;
};
export declare const mergeMultiEip712: (eip712s: MetaTxInfo['MsgSDKTypeEIP712'][]) => MetaTxInfo['MsgSDKTypeEIP712'][];
export declare const mergeMultiMessage: (txs: MetaTxInfo[]) => Record<string, object>;
export declare const findAnyType: (msgData: object) => string[][];
export declare const convertAnyTypeData: (msgData: object, fields: string[][]) => object;
