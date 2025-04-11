/// <reference types="node" />
/// <reference types="node" />
import { ISignature712 } from '.';
/**
 * recover public key from signature
 *
 * @messageHash message hash
 * @signature message signature
 *
 * @returns uncompressed public key
 */
export declare const recoverPk: ({ messageHash, signature }: ISignature712) => string;
/**
 * @pk compressed public key from signature
 * @return eg. { typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey', value: 'CiEC+hp2uVKio9T7x0goOPyHgwUYiRsZ8MeYUrfRX8MxrzM=' }
 */
export declare const makeCosmsPubKey: (pk: string) => {
    typeUrl: string;
    value: Uint8Array;
};
export declare const eip712Hash: (message: string) => Buffer;
