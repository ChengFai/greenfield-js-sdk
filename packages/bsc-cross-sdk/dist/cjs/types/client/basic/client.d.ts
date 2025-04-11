import { Account, Address, WalletClient } from 'viem';
import { BasicClientParams } from '../../types';
export declare class BasicClient {
    protected publicClient: any;
    protected walletClient: WalletClient;
    protected account: Account | Address;
    constructor(initParams: BasicClientParams);
}
