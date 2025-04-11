import { ChainConfig, JSONRpcAccountConfig, PrivateKeyAccountConfig } from '../types';
export declare const getPrivateKeyAccount: ({ privateKey }: PrivateKeyAccountConfig, chainConfig: ChainConfig) => {
    account: undefined;
    batch?: import("viem").ClientConfig["batch"] | undefined;
    cacheTime: number;
    ccipRead?: import("viem").ClientConfig["ccipRead"] | undefined;
    chain: {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
    transport: import("viem").TransportConfig<"http", import("viem").EIP1193RequestFn> & {
        fetchOptions?: import("viem").HttpTransportConfig["fetchOptions"] | undefined;
        url?: string | undefined;
    };
    type: string;
    uid: string;
    addChain: (args: import("viem").AddChainParameters) => Promise<void>;
    deployContract: <const abi extends import("viem").Abi | readonly unknown[], chainOverride extends import("viem").Chain | undefined>(args: import("viem").DeployContractParameters<abi, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, chainOverride>) => Promise<import("viem").DeployContractReturnType>;
    getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
    getChainId: () => Promise<import("viem").GetChainIdReturnType>;
    getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride>, TChainOverride extends import("viem").Chain | undefined = undefined, TAccountOverride extends import("viem").Account | import("viem").Address | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, TChainOverride, TAccountOverride, TRequest>) => Promise<import("viem").PrepareTransactionRequestReturnType<import("viem").Chain, undefined, TChainOverride, TAccountOverride, TRequest>>;
    requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
    requestPermissions: (args: import("viem").RequestPermissionsParameters) => Promise<import("viem").RequestPermissionsReturnType>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<import("viem").SendRawTransactionReturnType>;
    sendTransaction: <const TRequest extends import("viem").SendTransactionRequest<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride>, TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").SendTransactionParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, TChainOverride, TRequest>) => Promise<import("viem").SendTransactionReturnType>;
    signMessage: (args: import("viem").SignMessageParameters<undefined>) => Promise<import("viem").SignMessageReturnType>;
    signTransaction: <TChainOverride extends import("viem").Chain | undefined>(args: import("viem").SignTransactionParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, TChainOverride>) => Promise<import("viem").SignTransactionReturnType>;
    signTypedData: <const TTypedData extends {
        [x: string]: readonly import("viem").TypedDataParameter[];
        [x: `string[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        bool?: undefined;
        bytes?: undefined;
        bytes2?: undefined;
        bytes1?: undefined;
        bytes18?: undefined;
        bytes22?: undefined;
        bytes3?: undefined;
        bytes4?: undefined;
        bytes5?: undefined;
        bytes6?: undefined;
        bytes7?: undefined;
        bytes8?: undefined;
        bytes9?: undefined;
        bytes10?: undefined;
        bytes11?: undefined;
        bytes12?: undefined;
        bytes13?: undefined;
        bytes14?: undefined;
        bytes15?: undefined;
        bytes16?: undefined;
        bytes17?: undefined;
        bytes19?: undefined;
        bytes20?: undefined;
        bytes21?: undefined;
        bytes23?: undefined;
        bytes24?: undefined;
        bytes25?: undefined;
        bytes26?: undefined;
        bytes27?: undefined;
        bytes28?: undefined;
        bytes29?: undefined;
        bytes30?: undefined;
        bytes31?: undefined;
        bytes32?: undefined;
        int56?: undefined;
        int8?: undefined;
        int16?: undefined;
        int24?: undefined;
        int32?: undefined;
        int40?: undefined;
        int48?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint56?: undefined;
        uint8?: undefined;
        uint16?: undefined;
        uint24?: undefined;
        uint32?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
        uint256?: undefined;
    } | {
        [key: string]: unknown;
    }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, undefined>) => Promise<import("viem").SignTypedDataReturnType>;
    switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
    watchAsset: (args: import("viem").WatchAssetParameters) => Promise<import("viem").WatchAssetReturnType>;
    writeContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args_1 extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").WriteContractParameters<abi, functionName, args_1, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, TChainOverride>) => Promise<import("viem").WriteContractReturnType>;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined>, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, import("viem").WalletRpcSchema, import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined>>) => client) => import("viem").Client<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, import("viem").WalletRpcSchema, import("viem/chains").Prettify<client> & (import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined> extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } ? import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined> : unknown)>;
};
export declare const getJSONRpcAccount: ({ address, ethereumProvider }: JSONRpcAccountConfig, chainConfig: ChainConfig) => {
    account: {
        address: `0x${string}`;
        type: "json-rpc";
    };
    batch?: import("viem").ClientConfig["batch"] | undefined;
    cacheTime: number;
    ccipRead?: import("viem").ClientConfig["ccipRead"] | undefined;
    chain: {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
    transport: import("viem").TransportConfig<"custom", import("viem").EIP1193RequestFn>;
    type: string;
    uid: string;
    addChain: (args: import("viem").AddChainParameters) => Promise<void>;
    deployContract: <const abi extends import("viem").Abi | readonly unknown[], chainOverride extends import("viem").Chain | undefined>(args: import("viem").DeployContractParameters<abi, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, chainOverride>) => Promise<import("viem").DeployContractReturnType>;
    getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
    getChainId: () => Promise<import("viem").GetChainIdReturnType>;
    getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride>, TChainOverride extends import("viem").Chain | undefined = undefined, TAccountOverride extends import("viem").Account | import("viem").Address | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride, TAccountOverride, TRequest>) => Promise<import("viem").PrepareTransactionRequestReturnType<import("viem").Chain, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride, TAccountOverride, TRequest>>;
    requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
    requestPermissions: (args: import("viem").RequestPermissionsParameters) => Promise<import("viem").RequestPermissionsReturnType>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<import("viem").SendRawTransactionReturnType>;
    sendTransaction: <const TRequest extends import("viem").SendTransactionRequest<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride>, TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").SendTransactionParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride, TRequest>) => Promise<import("viem").SendTransactionReturnType>;
    signMessage: (args: import("viem").SignMessageParameters<{
        address: `0x${string}`;
        type: "json-rpc";
    }>) => Promise<import("viem").SignMessageReturnType>;
    signTransaction: <TChainOverride extends import("viem").Chain | undefined>(args: import("viem").SignTransactionParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride>) => Promise<import("viem").SignTransactionReturnType>;
    signTypedData: <const TTypedData extends {
        [x: string]: readonly import("viem").TypedDataParameter[];
        [x: `string[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        bool?: undefined;
        bytes?: undefined;
        bytes2?: undefined;
        bytes1?: undefined;
        bytes18?: undefined;
        bytes22?: undefined;
        bytes3?: undefined;
        bytes4?: undefined;
        bytes5?: undefined;
        bytes6?: undefined;
        bytes7?: undefined;
        bytes8?: undefined;
        bytes9?: undefined;
        bytes10?: undefined;
        bytes11?: undefined;
        bytes12?: undefined;
        bytes13?: undefined;
        bytes14?: undefined;
        bytes15?: undefined;
        bytes16?: undefined;
        bytes17?: undefined;
        bytes19?: undefined;
        bytes20?: undefined;
        bytes21?: undefined;
        bytes23?: undefined;
        bytes24?: undefined;
        bytes25?: undefined;
        bytes26?: undefined;
        bytes27?: undefined;
        bytes28?: undefined;
        bytes29?: undefined;
        bytes30?: undefined;
        bytes31?: undefined;
        bytes32?: undefined;
        int56?: undefined;
        int8?: undefined;
        int16?: undefined;
        int24?: undefined;
        int32?: undefined;
        int40?: undefined;
        int48?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint56?: undefined;
        uint8?: undefined;
        uint16?: undefined;
        uint24?: undefined;
        uint32?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
        uint256?: undefined;
    } | {
        [key: string]: unknown;
    }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, {
        address: `0x${string}`;
        type: "json-rpc";
    }>) => Promise<import("viem").SignTypedDataReturnType>;
    switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
    watchAsset: (args: import("viem").WatchAssetParameters) => Promise<import("viem").WatchAssetReturnType>;
    writeContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args_1 extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").WriteContractParameters<abi, functionName, args_1, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, TChainOverride>) => Promise<import("viem").WriteContractReturnType>;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").CustomTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }>, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<import("viem").CustomTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, import("viem").WalletRpcSchema, import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }>>) => client) => import("viem").Client<import("viem").CustomTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }, import("viem").WalletRpcSchema, import("viem/chains").Prettify<client> & (import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }> extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } ? import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, {
        address: `0x${string}`;
        type: "json-rpc";
    }> : unknown)>;
};
export declare const getPublicClient: (chainConfig: ChainConfig) => {
    account: undefined;
    batch?: import("viem").ClientConfig["batch"] | undefined;
    cacheTime: number;
    ccipRead?: import("viem").ClientConfig["ccipRead"] | undefined;
    chain: {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").PublicRpcSchema>;
    transport: import("viem").TransportConfig<"http", import("viem").EIP1193RequestFn> & {
        fetchOptions?: import("viem").HttpTransportConfig["fetchOptions"] | undefined;
        url?: string | undefined;
    };
    type: string;
    uid: string;
    call: (parameters: import("viem").CallParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>) => Promise<import("viem").CallReturnType>;
    createBlockFilter: () => Promise<import("viem").CreateBlockFilterReturnType>;
    createContractEventFilter: <const TAbi extends import("viem").Abi | readonly unknown[], TEventName extends import("viem").ContractEventName<TAbi> | undefined, TArgs extends import("viem").MaybeExtractEventArgsFromAbi<TAbi, TEventName> | undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, TToBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").CreateContractEventFilterParameters<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock>) => Promise<import("viem").CreateContractEventFilterReturnType<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock>>;
    createEventFilter: <const TAbiEvent extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = TAbiEvent extends import("viem").AbiEvent ? [TAbiEvent] : undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, TToBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, _EventName extends string | undefined = import("viem").MaybeAbiEventName<TAbiEvent>, _Args extends import("viem").MaybeExtractEventArgsFromAbi<TAbiEvents, _EventName> | undefined = undefined>(args?: import("viem").CreateEventFilterParameters<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args> | undefined) => Promise<import("viem").CreateEventFilterReturnType<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<import("viem").CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <TChain extends import("viem").Chain | undefined, const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: import("viem").EstimateContractGasParameters<abi, functionName, args, TChain>) => Promise<import("viem").EstimateContractGasReturnType>;
    estimateGas: (args: import("viem").EstimateGasParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>) => Promise<import("viem").EstimateGasReturnType>;
    getBalance: (args: import("viem").GetBalanceParameters) => Promise<import("viem").GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<import("viem").GetBlobBaseFeeReturnType>;
    getBlock: <TIncludeTransactions extends boolean = false, TBlockTag extends import("viem").BlockTag = "latest">(args?: import("viem").GetBlockParameters<TIncludeTransactions, TBlockTag> | undefined) => Promise<import("viem").GetBlockReturnType<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TIncludeTransactions, TBlockTag>>;
    getBlockNumber: (args?: import("viem").GetBlockNumberParameters | undefined) => Promise<import("viem").GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: import("viem").GetBlockTransactionCountParameters | undefined) => Promise<import("viem").GetBlockTransactionCountReturnType>;
    getBytecode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
    getChainId: () => Promise<import("viem").GetChainIdReturnType>;
    getCode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
    getContractEvents: <const abi extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<import("viem").GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: import("viem").GetEip712DomainParameters) => Promise<import("viem").GetEip712DomainReturnType>;
    getEnsAddress: (args: import("viem").GetEnsAddressParameters) => Promise<import("viem").GetEnsAddressReturnType>;
    getEnsAvatar: (args: import("viem").GetEnsAvatarParameters) => Promise<import("viem").GetEnsAvatarReturnType>;
    getEnsName: (args: import("viem").GetEnsNameParameters) => Promise<import("viem").GetEnsNameReturnType>;
    getEnsResolver: (args: import("viem").GetEnsResolverParameters) => Promise<import("viem").GetEnsResolverReturnType>;
    getEnsText: (args: import("viem").GetEnsTextParameters) => Promise<import("viem").GetEnsTextReturnType>;
    getFeeHistory: (args: import("viem").GetFeeHistoryParameters) => Promise<import("viem").GetFeeHistoryReturnType>;
    estimateFeesPerGas: <TChainOverride extends import("viem").Chain | undefined = undefined, TType extends import("viem").FeeValuesType = "eip1559">(args?: import("viem").EstimateFeesPerGasParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride, TType> | undefined) => Promise<import("viem").EstimateFeesPerGasReturnType>;
    getFilterChanges: <TFilterType extends import("viem").FilterType, const TAbi extends import("viem").Abi | readonly unknown[] | undefined, TEventName extends string | undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, TToBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterChangesParameters<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock>) => Promise<import("viem").GetFilterChangesReturnType<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock>>;
    getFilterLogs: <const TAbi extends import("viem").Abi | readonly unknown[] | undefined, TEventName extends string | undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, TToBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterLogsParameters<TAbi, TEventName, TStrict, TFromBlock, TToBlock>) => Promise<import("viem").GetFilterLogsReturnType<TAbi, TEventName, TStrict, TFromBlock, TToBlock>>;
    getGasPrice: () => Promise<import("viem").GetGasPriceReturnType>;
    getLogs: <const TAbiEvent extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = TAbiEvent extends import("viem").AbiEvent ? [TAbiEvent] : undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, TToBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args?: import("viem").GetLogsParameters<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock> | undefined) => Promise<import("viem").GetLogsReturnType<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock>>;
    getProof: (args: import("viem").GetProofParameters) => Promise<import("viem").GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <TChainOverride extends import("viem").Chain | undefined = undefined>(args?: {
        chain?: TChainOverride | null | undefined;
    } | undefined) => Promise<import("viem").EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: import("viem").GetStorageAtParameters) => Promise<import("viem").GetStorageAtReturnType>;
    getTransaction: <TBlockTag extends import("viem").BlockTag = "latest">(args: import("viem").GetTransactionParameters<TBlockTag>) => Promise<import("viem").GetTransactionReturnType<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TBlockTag>>;
    getTransactionConfirmations: (args: import("viem").GetTransactionConfirmationsParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>) => Promise<import("viem").GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: import("viem").GetTransactionCountParameters) => Promise<import("viem").GetTransactionCountReturnType>;
    getTransactionReceipt: (args: import("viem").GetTransactionReceiptParameters) => Promise<import("viem").GetTransactionReceiptReturnType<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: import("viem").MulticallParameters<contracts, allowFailure>) => Promise<import("viem").MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TChainOverride>, TChainOverride extends import("viem").Chain | undefined = undefined, TAccountOverride extends import("viem").Account | import("viem").Address | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, import("viem").Account | undefined, TChainOverride, TAccountOverride, TRequest>) => Promise<import("viem").PrepareTransactionRequestReturnType<import("viem").Chain, import("viem").Account | undefined, TChainOverride, TAccountOverride, TRequest>>;
    readContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "pure" | "view">, args extends import("viem").ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: import("viem").ReadContractParameters<abi, functionName, args>) => Promise<import("viem").ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<import("viem").SendRawTransactionReturnType>;
    simulateContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args_1 extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends import("viem").Chain | undefined, accountOverride extends import("viem").Account | import("viem").Address | undefined = undefined>(args: import("viem").SimulateContractParameters<abi, functionName, args_1, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, chainOverride, accountOverride>) => Promise<import("viem").SimulateContractReturnType<abi, functionName, args_1, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, import("viem").Account | undefined, chainOverride, accountOverride>>;
    verifyMessage: (args: import("viem").VerifyMessageActionParameters) => Promise<import("viem").VerifyMessageActionReturnType>;
    verifySiweMessage: (args: import("viem/_types/actions/siwe/verifySiweMessage").VerifySiweMessageParameters) => Promise<import("viem/_types/actions/siwe/verifySiweMessage").VerifySiweMessageReturnType>;
    verifyTypedData: (args: import("viem").VerifyTypedDataActionParameters) => Promise<import("viem").VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: import("viem").UninstallFilterParameters) => Promise<import("viem").UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: import("viem").WaitForTransactionReceiptParameters<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>) => Promise<import("viem").WaitForTransactionReceiptReturnType<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>>;
    watchBlockNumber: (args: import("viem").WatchBlockNumberParameters) => import("viem").WatchBlockNumberReturnType;
    watchBlocks: <TIncludeTransactions extends boolean = false, TBlockTag extends import("viem").BlockTag = "latest">(args: import("viem").WatchBlocksParameters<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, TIncludeTransactions, TBlockTag>) => import("viem").WatchBlocksReturnType;
    watchContractEvent: <const TAbi extends import("viem").Abi | readonly unknown[], TEventName extends import("viem").ContractEventName<TAbi>, TStrict extends boolean | undefined = undefined>(args: import("viem").WatchContractEventParameters<TAbi, TEventName, TStrict, import("viem").HttpTransport>) => import("viem").WatchContractEventReturnType;
    watchEvent: <const TAbiEvent extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = TAbiEvent extends import("viem").AbiEvent ? [TAbiEvent] : undefined, TStrict extends boolean | undefined = undefined>(args: import("viem").WatchEventParameters<TAbiEvent, TAbiEvents, TStrict, import("viem").HttpTransport>) => import("viem").WatchEventReturnType;
    watchPendingTransactions: (args: import("viem").WatchPendingTransactionsParameters<import("viem").HttpTransport>) => import("viem").WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined>, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<{
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, import("viem").PublicRpcSchema, import("viem").PublicActions<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }>>) => client) => import("viem").Client<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }, undefined, import("viem").PublicRpcSchema, import("viem/chains").Prettify<client> & (import("viem").PublicActions<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }> extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } ? import("viem").PublicActions<import("viem").HttpTransport, {
        blockExplorers: {
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://testnet.bscscan.com";
                readonly apiUrl: "https://testnet.bscscan.com/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 17422483;
            };
        };
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
        sourceId?: number | undefined;
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
        id: 56;
        name: "BNB Smart Chain";
        nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    }> : unknown)>;
};
