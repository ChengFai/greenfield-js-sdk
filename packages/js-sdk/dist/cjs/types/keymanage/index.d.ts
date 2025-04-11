import { BroadcastOptions } from '..';
/**
 * @priKey 0x prefix
 */
export declare const getPubKeyByPriKey: (priKey: string) => {
    typeUrl: string;
    value: Uint8Array;
};
export declare const createEIP712Data: (chainId: string, accountNumber: string, sequence: string, typeUrl: string, MsgSDKTypeEIP712: object, MsgSDK: object, txOption: BroadcastOptions) => {
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
export declare const signEIP712Data: (chainId: string, accountNumber: string, sequence: string, typeUrl: string, MsgSDKTypeEIP712: object, MsgSDK: object, txOption: BroadcastOptions) => string;
