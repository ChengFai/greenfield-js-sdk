import { ISignature712 } from '.';
/**
 * @addr wallet address
 * @message sign typed v4 data
 */
export declare const sign712Tx: (addr: string, message: string) => Promise<ISignature712>;
export declare const defaultSignTypedData: (addr: string, message: string) => Promise<any>;
