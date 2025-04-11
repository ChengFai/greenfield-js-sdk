import { IFetchNonces, TGenSecondSignMsgParams, IPersonalSignParams, ISp, IUpdateSpsPubKeyParams } from '../types/storage';
export declare const promiseRaceAll: (promises: Promise<unknown>[], timeout?: number, timeoutValue?: any) => Promise<unknown[]>;
export declare const genLocalSignMsg: (sps: ISp[], domain: string) => string;
export declare const fetchNonces: ({ sps, address, domain }: IFetchNonces) => Promise<any>;
export declare const updateSpsPubKey: ({ address, sps, domain, pubKey, expireDate, authorization, }: IUpdateSpsPubKeyParams) => Promise<unknown[]>;
export declare const getSpsEndpoint: (sps: ISp[]) => string[];
export declare const genSecondSignMsg: ({ domain, address, pubKey, chainId, issuedDate, expireDate, }: TGenSecondSignMsgParams) => string;
export declare const personalSign: ({ message, address, provider }: IPersonalSignParams) => Promise<any>;
