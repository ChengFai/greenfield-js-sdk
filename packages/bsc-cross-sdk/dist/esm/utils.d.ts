import { ChainConfig, ExecuteParams, SendMessagesParams } from './types';
export declare const getChain: (chainConfig: ChainConfig) => {
    blockExplorers: {
        readonly default: {
            readonly name: "BscScan";
            readonly url: "https://testnet.bscscan.com";
            readonly apiUrl: "https://api-testnet.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 17422483;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 97;
    name: "Binance Smart Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "tBNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
} | {
    blockExplorers: {
        readonly default: {
            readonly name: "BscScan";
            readonly url: "https://bscscan.com";
            readonly apiUrl: "https://api.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 15921452;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 56;
    name: "BNB Smart Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "BNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://56.rpc.thirdweb.com"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
};
export declare const splitExecutorParams: (params: ExecuteParams[]) => {
    types: number[];
    bytes: `0x${string}`[];
};
export declare const splitMultiMessageParams: (params: SendMessagesParams[]) => {
    targets: `0x${string}`[];
    msgBytes: `0x${string}`[];
    values: bigint[];
};
