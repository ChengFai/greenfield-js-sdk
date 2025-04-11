'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var viem = require('viem');
var chains = require('viem/chains');
var accounts = require('viem/accounts');
var tx = require('@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx');
var tx$1 = require('@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx');
var types = require('@bnb-chain/greenfield-cosmos-types/greenfield/permission/types');

function assertHubAddress(errMsg, address) {
    if (!address || !viem.isAddress(address)) {
        throw new Error(errMsg);
    }
}
function assertAddress(address) {
    if (address && !address.startsWith('0x')) {
        throw new Error('address should start with 0x');
    }
}
function isJSONRpcAccount(accountConfig) {
    return 'address' in accountConfig;
}
function isPrivateKeyAccount(accountConfig) {
    return 'privateKey' in accountConfig;
}

const getChain = (chainConfig) => {
    return chainConfig === 'testnet' ? chains.bscTestnet : chains.bsc;
};
const splitExecutorParams = (params) => {
    const types = [];
    const bytes = [];
    params.forEach((p) => {
        types.push(p[0]);
        bytes.push(p[1]);
    });
    return {
        types,
        bytes,
    };
};
const splitMultiMessageParams = (params) => {
    const targets = [];
    const msgBytes = [];
    const values = [];
    params.forEach((p) => {
        targets.push(p.target);
        msgBytes.push(p.msgBytes);
        values.push(p.values);
    });
    return {
        targets,
        msgBytes,
        values,
    };
};

const getPrivateKeyAccount = ({ privateKey }, chainConfig) => {
    assertAddress(privateKey);
    return viem.createWalletClient({
        // account: privateKeyToAccount(privateKey),
        chain: getChain(chainConfig),
        transport: viem.http(),
    });
};
const getJSONRpcAccount = ({ address, ethereumProvider }, chainConfig) => {
    assertAddress(address);
    return viem.createWalletClient({
        account: address,
        chain: getChain(chainConfig),
        transport: viem.custom(ethereumProvider),
    });
};
const getPublicClient = (chainConfig) => {
    return viem.createPublicClient({
        chain: getChain(chainConfig),
        transport: viem.http(),
    });
};

class BasicClient {
    constructor(initParams) {
        const { chainConfig, accountConfig } = initParams;
        if (isJSONRpcAccount(accountConfig)) {
            this.walletClient = getJSONRpcAccount(accountConfig, chainConfig);
            this.account = accountConfig.address;
        }
        if (isPrivateKeyAccount(accountConfig)) {
            this.walletClient = getPrivateKeyAccount(accountConfig, chainConfig);
            this.account = accounts.privateKeyToAccount(accountConfig.privateKey);
        }
        this.publicClient = getPublicClient(chainConfig);
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IGreenfieldExecutor.sol
const ExecutorABI = [
    'function execute(uint8[] calldata _msgTypes, bytes[] calldata _msgBytes) external payable returns (bool)',
];

class ExecutorClient extends BasicClient {
    constructor(initParams, executorAddress) {
        super(initParams);
        this.executorAddress = executorAddress;
        this.executorAddress = executorAddress;
    }
    execute(params, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.length === 0)
                throw new Error('execute params is empty');
            const { types, bytes } = splitExecutorParams(params);
            const { relayFee } = opts;
            const { request } = yield this.publicClient.simulateContract({
                account: this.account,
                address: this.executorAddress,
                abi: viem.parseAbi(ExecutorABI),
                functionName: 'execute',
                args: [types, bytes],
                value: relayFee,
            });
            const txHash = yield this.walletClient.writeContract(request);
            return txHash;
        });
    }
}

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/middle-layer/GreenfieldExecutor.sol
class ExecutorMsg {
}
ExecutorMsg.getCreatePaymentAccountParams = (msg) => [
    1,
    viem.toHex(tx.MsgCreatePaymentAccount.encode(msg).finish()),
];
ExecutorMsg.getDepositParams = (msg) => [
    2,
    viem.toHex(tx.MsgDeposit.encode(msg).finish()),
];
ExecutorMsg.getDisableRefundParams = (msg) => [
    3,
    viem.toHex(tx.MsgDisableRefund.encode(msg).finish()),
];
ExecutorMsg.getWithdrawParams = (msg) => [
    4,
    viem.toHex(tx.MsgWithdraw.encode(msg).finish()),
];
ExecutorMsg.getMigrateBucketParams = (msg) => [
    5,
    viem.toHex(tx$1.MsgMigrateBucket.encode(msg).finish()),
];
ExecutorMsg.getCancelMigrateBucketParams = (msg) => [
    6,
    viem.toHex(tx$1.MsgCancelMigrateBucket.encode(msg).finish()),
];
ExecutorMsg.getUpdateBucketInfoParams = (msg) => [
    7,
    viem.toHex(tx$1.MsgUpdateBucketInfo.encode(msg).finish()),
];
ExecutorMsg.getToggleSPAsDelegatedAgentParams = (msg) => [
    8,
    viem.toHex(tx$1.MsgToggleSPAsDelegatedAgent.encode(msg).finish()),
];
ExecutorMsg.getSetBucketFlowRateLimitParams = (msg) => [
    9,
    viem.toHex(tx$1.MsgSetBucketFlowRateLimit.encode(msg).finish()),
];
ExecutorMsg.getCopyObjectParams = (msg) => [
    10,
    viem.toHex(tx$1.MsgCopyObject.encode(msg).finish()),
];
ExecutorMsg.getUpdateObjectInfoParams = (msg) => [
    11,
    viem.toHex(tx$1.MsgUpdateObjectInfo.encode(msg).finish()),
];
ExecutorMsg.getUpdateGroupExtraParams = (msg) => [
    12,
    viem.toHex(tx$1.MsgUpdateGroupExtra.encode(msg).finish()),
];
ExecutorMsg.getSetTagParams = (msg) => [
    13,
    viem.toHex(tx$1.MsgSetTag.encode(msg).finish()),
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/ICrossChain.sol
const CrossChainABI = [
    'function callbackGasPrice() external returns (uint256)',
    'function getRelayFees() view returns (uint256 relayFee, uint256 minAckRelayFee)',
];

class CrossChainClient extends BasicClient {
    constructor(initParams, crossChainAddress) {
        super(initParams);
        this.crossChainAddress = crossChainAddress;
    }
    getRelayFee() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.publicClient.readContract({
                address: this.crossChainAddress,
                abi: viem.parseAbi(CrossChainABI),
                functionName: 'getRelayFees',
            });
            return {
                relayFee: data[0],
                minAckRelayFee: data[1],
            };
        });
    }
    getCallbackGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.publicClient.readContract({
                address: this.crossChainAddress,
                abi: viem.parseAbi(CrossChainABI),
                functionName: 'callbackGasPrice',
            });
            return data;
        });
    }
}

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IBucketHub.sol
const BaseBucketHubAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'Empty',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleFailAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
        ],
        name: 'CreateSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'FailAckPkgReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'MirrorFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'MirrorSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'ParamChange',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'RoleGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'RoleRevoked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'UnexpectedPackage',
        type: 'event',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_CREATE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_DELETE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'CROSS_CHAIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_UPGRADE_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ERC721Token',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'INIT_MAX_CALLBACK_DATA_LENGTH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'LIGHT_CLIENT',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MAX_CALLBACK_GAS_LIMIT',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PROXY_ADMIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'RELAYER_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_CREATE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_DELETE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_FAILED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_SUCCESS',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_UNEXPECTED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TOKEN_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_IN_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_OUT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_CREATE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_DELETE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MIRROR',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'additional',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'channelId',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'enum BucketStorage.BucketVisibilityType',
                        name: 'visibility',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address',
                        name: 'paymentAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'primarySpAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'uint64',
                        name: 'primarySpApprovalExpiredHeight',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'globalVirtualGroupFamilyId',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'primarySpSignature',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64',
                        name: 'chargedReadQuota',
                        type: 'uint64',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct BucketStorage.CreateBucketSynPackage',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'createBucket',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'enum BucketStorage.BucketVisibilityType',
                        name: 'visibility',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address',
                        name: 'paymentAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'primarySpAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'uint64',
                        name: 'primarySpApprovalExpiredHeight',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'globalVirtualGroupFamilyId',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'primarySpSignature',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64',
                        name: 'chargedReadQuota',
                        type: 'uint64',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct BucketStorage.CreateBucketSynPackage',
                name: '',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'createBucket',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deleteBucket',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'deleteBucket',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'grant',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'grantee',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleFailAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'handleSynPackage',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'hasRole',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_ERC721_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_additional',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'initializeV2',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxCallbackDataLength',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'packageMap',
        outputs: [
            {
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'status',
                type: 'uint32',
            },
            {
                internalType: 'uint8',
                name: 'operationType',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'resourceId',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'callbackData',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retryPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'retryQueue',
        outputs: [
            {
                internalType: 'int128',
                name: '_begin',
                type: 'int128',
            },
            {
                internalType: 'int128',
                name: '_end',
                type: 'int128',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'revoke',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'skipPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'updateParam',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'versionInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'version',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
const PrepareCreateBucketHubAbi = [
    ...BaseBucketHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'enum BucketStorage.BucketVisibilityType',
                        name: 'visibility',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address',
                        name: 'paymentAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'primarySpAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'uint64',
                        name: 'primarySpApprovalExpiredHeight',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'globalVirtualGroupFamilyId',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'primarySpSignature',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64',
                        name: 'chargedReadQuota',
                        type: 'uint64',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct BucketStorage.CreateBucketSynPackage',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareCreateBucket',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareCreateBucketHubCallbackAbi = [
    ...BaseBucketHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'enum BucketStorage.BucketVisibilityType',
                        name: 'visibility',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address',
                        name: 'paymentAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'primarySpAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'uint64',
                        name: 'primarySpApprovalExpiredHeight',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'globalVirtualGroupFamilyId',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'primarySpSignature',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64',
                        name: 'chargedReadQuota',
                        type: 'uint64',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct BucketStorage.CreateBucketSynPackage',
                name: '',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareCreateBucket',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeleteBucketHubAbi = [
    ...BaseBucketHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'prepareDeleteBucket',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeleteBucketHubCallbackAbi = [
    ...BaseBucketHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareDeleteBucket',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IGroupHub.sol
const GroupHubAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'Empty',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleFailAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
        ],
        name: 'CreateSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'FailAckPkgReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'MirrorFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'MirrorSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'ParamChange',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'RoleGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'RoleRevoked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'UnexpectedPackage',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'opType',
                type: 'uint8',
            },
        ],
        name: 'UpdateFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'opType',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'address[]',
                name: 'members',
                type: 'address[]',
            },
        ],
        name: 'UpdateSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'opType',
                type: 'uint8',
            },
        ],
        name: 'UpdateSuccess',
        type: 'event',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_CREATE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_DELETE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_UPDATE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'CROSS_CHAIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_UPGRADE_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ERC1155Token',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ERC721Token',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'INIT_MAX_CALLBACK_DATA_LENGTH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'LIGHT_CLIENT',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MAX_CALLBACK_GAS_LIMIT',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PROXY_ADMIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'RELAYER_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_CREATE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_DELETE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_UPDATE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_FAILED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_SUCCESS',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_UNEXPECTED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TOKEN_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_IN_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_OUT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_CREATE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_DELETE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MIRROR',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_UPDATE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'additional',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'channelId',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'createGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'createGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deleteGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'deleteGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'grant',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'grantee',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleFailAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'handleSynPackage',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'hasRole',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_ERC721_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_ERC1155_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_additional',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'initializeV2',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxCallbackDataLength',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'packageMap',
        outputs: [
            {
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'status',
                type: 'uint32',
            },
            {
                internalType: 'uint8',
                name: 'operationType',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'resourceId',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'callbackData',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retryPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'retryQueue',
        outputs: [
            {
                internalType: 'int128',
                name: '_begin',
                type: 'int128',
            },
            {
                internalType: 'int128',
                name: '_end',
                type: 'int128',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'revoke',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'skipPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'enum GroupStorage.UpdateGroupOpType',
                        name: 'opType',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address[]',
                        name: 'members',
                        type: 'address[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64[]',
                        name: 'memberExpiration',
                        type: 'uint64[]',
                    },
                ],
                internalType: 'struct GroupStorage.UpdateGroupSynPackage',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'updateGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'enum GroupStorage.UpdateGroupOpType',
                        name: 'opType',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address[]',
                        name: 'members',
                        type: 'address[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64[]',
                        name: 'memberExpiration',
                        type: 'uint64[]',
                    },
                ],
                internalType: 'struct GroupStorage.UpdateGroupSynPackage',
                name: '',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'updateGroup',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'updateParam',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'versionInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'version',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
const PrepareUpdateGroupHubAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'enum GroupStorage.UpdateGroupOpType',
                        name: 'opType',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address[]',
                        name: 'members',
                        type: 'address[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64[]',
                        name: 'memberExpiration',
                        type: 'uint64[]',
                    },
                ],
                internalType: 'struct GroupStorage.UpdateGroupSynPackage',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareUpdateGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareUpdateGroupHubCallbackAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'enum GroupStorage.UpdateGroupOpType',
                        name: 'opType',
                        type: 'uint8',
                    },
                    {
                        internalType: 'address[]',
                        name: 'members',
                        type: 'address[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'extraData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint64[]',
                        name: 'memberExpiration',
                        type: 'uint64[]',
                    },
                ],
                internalType: 'struct GroupStorage.UpdateGroupSynPackage',
                name: '',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareUpdateGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareCreateGroupAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'prepareCreateGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareCreateGroupHubCallbackAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareCreateGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeleteGroupHubAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'prepareDeleteGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeleteGroupHubCallbackAbi = [
    ...GroupHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareDeleteGroup',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IMultiMessage.sol
const MultiMessageAbi = [
    'function sendMessages(address[] calldata _targets, bytes[] calldata _data,uint256[] calldata _values) external payable returns (bool)',
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IObjectHub.sol
const ObjectHubAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'Empty',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleFailAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
        ],
        name: 'CreateSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'FailAckPkgReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'MirrorFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'MirrorSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'ParamChange',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'RoleGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'RoleRevoked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'UnexpectedPackage',
        type: 'event',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_CREATE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_DELETE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'CROSS_CHAIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_UPGRADE_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ERC721Token',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'INIT_MAX_CALLBACK_DATA_LENGTH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'LIGHT_CLIENT',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MAX_CALLBACK_GAS_LIMIT',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PROXY_ADMIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'RELAYER_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_CREATE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_DELETE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_FAILED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_SUCCESS',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_UNEXPECTED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TOKEN_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_IN_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_OUT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_CREATE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_DELETE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MIRROR',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'additional',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'channelId',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'deleteObject',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deleteObject',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'grant',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'grantee',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'expireTime',
                type: 'uint256',
            },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleFailAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'handleSynPackage',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'hasRole',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_ERC721_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_additional',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'initializeV2',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxCallbackDataLength',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'packageMap',
        outputs: [
            {
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'status',
                type: 'uint32',
            },
            {
                internalType: 'uint8',
                name: 'operationType',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'resourceId',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'callbackData',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'granter',
                type: 'address',
            },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retryPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'retryQueue',
        outputs: [
            {
                internalType: 'int128',
                name: '_begin',
                type: 'int128',
            },
            {
                internalType: 'int128',
                name: '_end',
                type: 'int128',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'revoke',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'skipPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'updateParam',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'versionInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'version',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
const PrepareDeleteObjectAbi = [
    ...ObjectHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'prepareDeleteObject',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeleteObjectCallbackAbi = [
    ...ObjectHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareDeleteObject',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/IPermissionHub.sol
const PermissionHubAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'Empty',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'pkgHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'AppHandleFailAckPkgFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
        ],
        name: 'CreateSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'CreateSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSubmitted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'DeleteSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'FailAckPkgReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        name: 'MirrorFailed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'MirrorSuccess',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'ParamChange',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
        ],
        name: 'UnexpectedPackage',
        type: 'event',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_CREATE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'AUTH_CODE_DELETE',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'BUCKET_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'CROSS_CHAIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'EMERGENCY_UPGRADE_OPERATOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ERC721Token',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GNFD_EXECUTOR_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GOV_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'GROUP_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'INIT_MAX_CALLBACK_DATA_LENGTH',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'LIGHT_CLIENT',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MAX_CALLBACK_GAS_LIMIT',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'MULTI_MESSAGE_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'OBJECT_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PERMISSION_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'PROXY_ADMIN',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'RELAYER_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_CREATE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ROLE_DELETE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_FAILED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_SUCCESS',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'STATUS_UNEXPECTED',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TOKEN_HUB',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_IN_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TRANSFER_OUT_CHANNEL_ID',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_CREATE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_DELETE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MIRROR',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'TYPE_MULTI_MESSAGE',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'additional',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'channelId',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'createPolicy',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'createPolicy',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'deletePolicy',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deletePolicy',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'grant',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'channelId',
                type: 'uint8',
            },
            {
                internalType: 'uint64',
                name: 'sequence',
                type: 'uint64',
            },
            {
                internalType: 'bytes',
                name: 'msgBytes',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
            },
        ],
        name: 'handleFailAckPackage',
        outputs: [
            {
                internalType: 'uint256',
                name: 'remainingGas',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'refundAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'handleSynPackage',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_ERC721_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_additional',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'initializeV2',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxCallbackDataLength',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'packageMap',
        outputs: [
            {
                internalType: 'address',
                name: 'appAddress',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'status',
                type: 'uint32',
            },
            {
                internalType: 'uint8',
                name: 'operationType',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'resourceId',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'callbackData',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'failReason',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retryPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'retryQueue',
        outputs: [
            {
                internalType: 'int128',
                name: '_begin',
                type: 'int128',
            },
            {
                internalType: 'int128',
                name: '_end',
                type: 'int128',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'revoke',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'skipPackage',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: 'value',
                type: 'bytes',
            },
        ],
        name: 'updateParam',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'versionInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'version',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
const PrepareCreatePolicyAbi = [
    ...PermissionHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'prepareCreatePolicy',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareCreatePolicyCallbackAbi = [
    ...PermissionHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareCreatePolicy',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeletePolicyAbi = [
    ...PermissionHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'prepareDeletePolicy',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
const PrepareDeletePolicyCallbackAbi = [
    ...PermissionHubAbi,
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'appAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'refundAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'enum PackageQueue.FailureHandleStrategy',
                        name: 'failureHandleStrategy',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'callbackData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct CmnStorage.ExtraData',
                name: '',
                type: 'tuple',
            },
        ],
        name: 'prepareDeletePolicy',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];

// https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/interface/ITokenHub.sol
const TokenHubAbi = [
    'function prepareTransferOut(address sender, address recipient,uint256 amount) external payable returns (uint8, bytes memory, uint256, uint256, address)',
];

class MultiMessageClient extends BasicClient {
    constructor(initParams, multiMsgAddress, hubAddress) {
        super(initParams);
        this.multiMsgAddress = multiMsgAddress;
        this.hubAddress = hubAddress;
        this.multiMsgAddress = multiMsgAddress;
        this.hubAddress = hubAddress;
    }
    transferOut(synPkg, opts) {
        assertHubAddress('token hub address is required in init params', this.hubAddress.tokenHubAddress);
        if (opts.cb)
            throw new Error('callback is not supported in transferOut');
        let fee = this.calculateFee(opts);
        fee += synPkg.amount;
        return {
            target: this.hubAddress.tokenHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: viem.parseAbi(TokenHubAbi),
                functionName: 'prepareTransferOut',
                args: [opts.sender, synPkg.recipient, synPkg.amount],
            }),
            values: fee,
        };
    }
    updateGroup(synPkg, opts) {
        assertHubAddress('group hub address is required in init params', this.hubAddress.groupHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.groupHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareUpdateGroupHubCallbackAbi : PrepareUpdateGroupHubAbi,
                functionName: 'prepareUpdateGroup',
                args: !opts.cb
                    ? [opts.sender, synPkg]
                    : [opts.sender, synPkg, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    createGroup(synPkg, opts) {
        assertHubAddress('group hub address is required in init params', this.hubAddress.groupHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.groupHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareCreateGroupHubCallbackAbi : PrepareCreateGroupAbi,
                functionName: 'prepareCreateGroup',
                args: !opts.cb
                    ? [opts.sender, synPkg.owner, synPkg.name]
                    : [opts.sender, synPkg.owner, synPkg.name, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    deleteGroup(synPkg, opts) {
        assertHubAddress('group hub address is required in init params', this.hubAddress.groupHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.groupHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareDeleteGroupHubCallbackAbi : PrepareDeleteGroupHubAbi,
                functionName: 'prepareDeleteGroup',
                args: !opts.cb
                    ? [opts.sender, synPkg.id]
                    : [opts.sender, synPkg.id, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    createBucket(synPkg, opts) {
        assertHubAddress('bucket hub address is required in init params', this.hubAddress.bucketHubAddress);
        assertAddress(synPkg.creator);
        assertAddress(synPkg.primarySpAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.bucketHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareCreateBucketHubCallbackAbi : PrepareCreateBucketHubAbi,
                functionName: 'prepareCreateBucket',
                args: !opts.cb
                    ? [opts.sender, synPkg]
                    : [opts.sender, synPkg, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    deleteBucket(synPkg, opts) {
        assertHubAddress('bucket hub address is required in init params', this.hubAddress.bucketHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.bucketHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareDeleteBucketHubCallbackAbi : PrepareDeleteBucketHubAbi,
                functionName: 'prepareDeleteBucket',
                args: !opts.cb
                    ? [opts.sender, synPkg.id]
                    : [opts.sender, synPkg.id, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    deleteObject(synPkg, opts) {
        assertHubAddress('object hub address is required in init params', this.hubAddress.objectHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.objectHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareDeleteObjectCallbackAbi : PrepareDeleteObjectAbi,
                functionName: 'prepareDeleteObject',
                args: !opts.cb
                    ? [opts.sender, synPkg.id]
                    : [opts.sender, synPkg.id, opts.cb.gasLimit, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    createPolicy(msg, opts) {
        assertHubAddress('permission hub address is required in init params', this.hubAddress.permissionHubAddress);
        const data = viem.toHex(types.Policy.encode(msg).finish());
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.permissionHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareCreatePolicyCallbackAbi : PrepareCreatePolicyAbi,
                functionName: 'prepareCreatePolicy',
                args: !opts.cb ? [opts.sender, data] : [opts.sender, data, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    deletePolicy(synPkg, opts) {
        assertHubAddress('permission hub address is required in init params', this.hubAddress.permissionHubAddress);
        const fee = this.calculateFee(opts);
        return {
            target: this.hubAddress.permissionHubAddress,
            msgBytes: viem.encodeFunctionData({
                abi: opts.cb ? PrepareDeletePolicyCallbackAbi : PrepareDeletePolicyAbi,
                functionName: 'prepareDeletePolicy',
                args: !opts.cb ? [opts.sender, synPkg.id] : [opts.sender, synPkg.id, opts.cb.extraData],
            }),
            values: fee,
        };
    }
    sendMessages(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.length === 0)
                throw new Error('execute params is empty');
            const { targets, msgBytes, values } = splitMultiMessageParams(params);
            const sumValue = values.reduce((a, b) => a + b, BigInt(0));
            const { request } = yield this.publicClient.simulateContract({
                account: this.account,
                address: this.multiMsgAddress,
                abi: viem.parseAbi(MultiMessageAbi),
                functionName: 'sendMessages',
                args: [targets, msgBytes, values],
                value: sumValue,
            });
            const txHash = yield this.walletClient.writeContract(request);
            return txHash;
        });
    }
    calculateFee(opts) {
        let fee = opts.relayFee + opts.minAckRelayFee;
        if (opts.cb) {
            const callbackGasCost = opts.cb.gasLimit * opts.cb.gasPrice;
            fee += callbackGasCost;
        }
        return fee;
    }
}

exports.FailureHandleStrategy = void 0;
(function (FailureHandleStrategy) {
    FailureHandleStrategy[FailureHandleStrategy["BlockOnFail"] = 0] = "BlockOnFail";
    FailureHandleStrategy[FailureHandleStrategy["CacheOnFail"] = 1] = "CacheOnFail";
    FailureHandleStrategy[FailureHandleStrategy["SkipOnFail"] = 2] = "SkipOnFail";
})(exports.FailureHandleStrategy || (exports.FailureHandleStrategy = {}));
exports.BucketVisibilityType = void 0;
(function (BucketVisibilityType) {
    BucketVisibilityType[BucketVisibilityType["Unspecified"] = 0] = "Unspecified";
    BucketVisibilityType[BucketVisibilityType["PublicRead"] = 1] = "PublicRead";
    BucketVisibilityType[BucketVisibilityType["Private"] = 2] = "Private";
    BucketVisibilityType[BucketVisibilityType["Inherit"] = 3] = "Inherit";
})(exports.BucketVisibilityType || (exports.BucketVisibilityType = {}));
exports.UpdateGroupOpType = void 0;
(function (UpdateGroupOpType) {
    UpdateGroupOpType[UpdateGroupOpType["AddMembers"] = 0] = "AddMembers";
    UpdateGroupOpType[UpdateGroupOpType["RemoveMembers"] = 1] = "RemoveMembers";
    UpdateGroupOpType[UpdateGroupOpType["RenewMembers"] = 2] = "RenewMembers";
})(exports.UpdateGroupOpType || (exports.UpdateGroupOpType = {}));

exports.BasicClient = BasicClient;
exports.CrossChainClient = CrossChainClient;
exports.ExecutorClient = ExecutorClient;
exports.ExecutorMsg = ExecutorMsg;
exports.MultiMessageClient = MultiMessageClient;
exports.getJSONRpcAccount = getJSONRpcAccount;
exports.getPrivateKeyAccount = getPrivateKeyAccount;
exports.getPublicClient = getPublicClient;
//# sourceMappingURL=index.js.map
