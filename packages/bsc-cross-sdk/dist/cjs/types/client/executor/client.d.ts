import { Address } from 'viem';
import { BasicClient } from '../basic';
import { BasicClientParams, ExecuteParams } from '../../types';
interface IExecutorClient {
    execute(params: ExecuteParams[], opts: {
        relayFee: bigint;
    }): Promise<Address>;
}
export declare class ExecutorClient extends BasicClient implements IExecutorClient {
    executorAddress: `0x${string}`;
    constructor(initParams: BasicClientParams, executorAddress: `0x${string}`);
    execute(params: ExecuteParams[], opts: {
        relayFee: bigint;
    }): Promise<`0x${string}`>;
}
export {};
