import { AccountConfig, JSONRpcAccountConfig, PrivateKeyAccountConfig } from './types';
export declare function assertHubAddress(errMsg: string, address?: `0x${string}`): asserts address is `0x${string}`;
export declare function assertAddress(address: string): asserts address is `0x${string}`;
export declare function isJSONRpcAccount(accountConfig: AccountConfig): accountConfig is JSONRpcAccountConfig;
export declare function isPrivateKeyAccount(accountConfig: AccountConfig): accountConfig is PrivateKeyAccountConfig;
