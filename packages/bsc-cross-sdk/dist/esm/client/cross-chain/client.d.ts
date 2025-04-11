import { BasicClientParams } from '../../types';
import { BasicClient } from '../basic';
interface ICrossChainClient {
    getRelayFee(): Promise<{
        relayFee: bigint;
        minAckRelayFee: bigint;
    }>;
    getCallbackGasPrice(): Promise<bigint>;
}
export declare class CrossChainClient extends BasicClient implements ICrossChainClient {
    crossChainAddress: `0x${string}`;
    constructor(initParams: BasicClientParams, crossChainAddress: `0x${string}`);
    getRelayFee(): Promise<{
        relayFee: any;
        minAckRelayFee: any;
    }>;
    getCallbackGasPrice(): Promise<bigint>;
}
export {};
