'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('reflect-metadata');
var tsyringe = require('tsyringe');
var any = require('@bnb-chain/greenfield-cosmos-types/google/protobuf/any');
var base64 = require('@ethersproject/base64');
var bytes = require('@ethersproject/bytes');
var strings = require('@ethersproject/strings');
var cloneDeep = require('lodash.clonedeep');
var get = require('lodash.get');
var mapValues = require('lodash.mapvalues');
var set = require('lodash.set');
var sortBy = require('lodash.sortby');
var ethSigUtil = require('@metamask/eth-sig-util');
var secp256k1Compat = require('ethereum-cryptography/secp256k1-compat');
var query$d = require('@bnb-chain/greenfield-cosmos-types/cosmos/base/tendermint/v1beta1/query');
var Long = require('long');
var query = require('@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/query');
var query$1 = require('@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query');
var query$5 = require('@bnb-chain/greenfield-cosmos-types/cosmos/crosschain/v1/query');
var tx = require('@bnb-chain/greenfield-cosmos-types/cosmos/distribution/v1beta1/tx');
var query$8 = require('@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/query');
var query$a = require('@bnb-chain/greenfield-cosmos-types/cosmos/gashub/v1beta1/query');
var query$6 = require('@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/query');
var query$c = require('@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/query');
var query$7 = require('@bnb-chain/greenfield-cosmos-types/greenfield/bridge/query');
var query$4 = require('@bnb-chain/greenfield-cosmos-types/greenfield/challenge/query');
var query$2 = require('@bnb-chain/greenfield-cosmos-types/greenfield/payment/query');
var query$3 = require('@bnb-chain/greenfield-cosmos-types/greenfield/sp/query');
var query$9 = require('@bnb-chain/greenfield-cosmos-types/greenfield/storage/query');
var query$b = require('@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/query');
var stargate = require('@cosmjs/stargate');
var tendermintRpc = require('@cosmjs/tendermint-rpc');
var wrapper = require('@bnb-chain/greenfield-cosmos-types/greenfield/common/wrapper');
var common = require('@bnb-chain/greenfield-cosmos-types/greenfield/permission/common');
var common$1 = require('@bnb-chain/greenfield-cosmos-types/greenfield/storage/common');
var tx$5 = require('@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx');
var common$2 = require('@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/common');
var helpers = require('@bnb-chain/greenfield-cosmos-types/helpers');
var fetch = require('cross-fetch');
var tx$6 = require('@bnb-chain/greenfield-cosmos-types/greenfield/challenge/tx');
var tx$8 = require('@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/tx');
var tx$7 = require('@bnb-chain/greenfield-cosmos-types/greenfield/bridge/tx');
var tx$9 = require('@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/tx');
var signingKey = require('@ethersproject/signing-key');
var ed25519 = require('@noble/curves/ed25519');
var keccak_js = require('ethereum-cryptography/keccak.js');
var utils_js = require('ethereum-cryptography/utils.js');
var tx$3 = require('@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx');
var gov = require('@bnb-chain/greenfield-cosmos-types/cosmos/gov/v1/gov');
var tx$a = require('@bnb-chain/greenfield-cosmos-types/cosmos/gov/v1/tx');
var fastXmlParser = require('fast-xml-parser');
var superagent = require('superagent');
var feegrant = require('@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/feegrant');
var tx$b = require('@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/tx');
var tx$4 = require('@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/tx');
var keys = require('@bnb-chain/greenfield-cosmos-types/cosmos/crypto/secp256k1/keys');
var timestamp = require('@bnb-chain/greenfield-cosmos-types/google/protobuf/timestamp');
var types = require('@bnb-chain/greenfield-cosmos-types/greenfield/resource/types');
var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var units = require('@ethersproject/units');
var browserOrNode = require('browser-or-node');
var types$1 = require('@bnb-chain/greenfield-cosmos-types/greenfield/sp/types');
var utils = require('ethereum-cryptography/utils');
var service = require('@bnb-chain/greenfield-cosmos-types/cosmos/tx/v1beta1/service');
var tx$1 = require('@bnb-chain/greenfield-cosmos-types/cosmos/tx/v1beta1/tx');
var protoSigning = require('@cosmjs/proto-signing');
var auth = require('@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth');
var tx$2 = require('@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/tx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var base64__namespace = /*#__PURE__*/_interopNamespace(base64);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var mapValues__default = /*#__PURE__*/_interopDefaultLegacy(mapValues);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);
var sortBy__default = /*#__PURE__*/_interopDefaultLegacy(sortBy);
var Long__default = /*#__PURE__*/_interopDefaultLegacy(Long);
var common__namespace = /*#__PURE__*/_interopNamespace(common);
var common__namespace$1 = /*#__PURE__*/_interopNamespace(common$1);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var superagent__default = /*#__PURE__*/_interopDefaultLegacy(superagent);
var timestamp__namespace = /*#__PURE__*/_interopNamespace(timestamp);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var utc__default = /*#__PURE__*/_interopDefaultLegacy(utc);
var timezone__default = /*#__PURE__*/_interopDefaultLegacy(timezone);

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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

const typeWrapper = (type, msg) => {
    return Object.assign(Object.assign({}, msg), { type });
};
const generateMsg = (typeUrl, msgBytes) => {
    return any.Any.fromPartial({
        typeUrl,
        value: msgBytes,
    });
};
const createEIP712 = (types, chainId, message) => {
    return {
        types,
        primaryType: 'Tx',
        domain: {
            name: 'Greenfield Tx',
            version: '1.0.0',
            chainId,
            verifyingContract: '0x71e835aff094655dEF897fbc85534186DbeaB75d',
            salt: '0',
        },
        message,
    };
};
const generateMessage = (accountNumber, sequence, chainCosmosId, memo, fee, msg, timeoutHeight) => {
    let res = {
        account_number: accountNumber,
        chain_id: chainCosmosId,
        sequence,
        memo,
        fee,
        timeout_height: timeoutHeight,
    };
    if (Object.keys(msg).length == 0) {
        return res;
    }
    if (msg.hasOwnProperty('msg1')) {
        res = Object.assign(Object.assign({}, res), msg);
    }
    else {
        res.msg1 = msg;
    }
    return res;
};
const generateTypes = (newTypes) => {
    const types = {
        Coin: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'uint256' },
        ],
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'string' },
            { name: 'salt', type: 'string' },
        ],
        Fee: [
            { name: 'amount', type: 'Coin[]' },
            { name: 'gas_limit', type: 'uint256' },
            { name: 'payer', type: 'string' },
            { name: 'granter', type: 'string' },
        ],
        Tx: [
            {
                name: 'account_number',
                type: 'uint256',
            },
            {
                name: 'chain_id',
                type: 'uint256',
            },
            {
                name: 'fee',
                type: 'Fee',
            },
            {
                name: 'memo',
                type: 'string',
            },
            {
                name: 'sequence',
                type: 'uint256',
            },
            {
                name: 'timeout_height',
                type: 'uint256',
            },
        ],
    };
    if (Array.isArray(newTypes)) {
        for (let i = 0; i < newTypes.length; i++) {
            types.Tx.push({
                name: `msg${i + 1}`,
                type: `Msg${i + 1}`,
            });
        }
        Object.assign(types, ...newTypes);
    }
    else if (typeof newTypes === 'object') {
        const msgLen = Object.keys(newTypes).filter((k) => k.startsWith('Msg')).length;
        for (let i = 0; i < msgLen; i++) {
            types.Tx.push({
                name: `msg${i + 1}`,
                type: `Msg${i + 1}`,
            });
        }
        Object.assign(types, newTypes);
    }
    else {
        types.Tx.push({
            name: 'msg1',
            type: 'Msg1',
        });
        Object.assign(types, newTypes);
    }
    return mapValues__default["default"](types, (o) => {
        return sortBy__default["default"](o, ['name']);
    });
};
const generateFee = (amount, denom, gas_limit, payer, granter) => {
    return {
        amount: [
            {
                amount,
                denom,
            },
        ],
        gas_limit,
        payer,
        granter,
    };
};
const mergeMultiEip712 = (eip712s) => {
    const res = [];
    eip712s.forEach((eip712, index) => {
        if (index === 0) {
            res.push(eip712);
        }
        else {
            const str = JSON.stringify(eip712);
            const reStr = str.replaceAll('Msg1', `Msg${index + 1}`);
            res.push(JSON.parse(reStr));
        }
    });
    return res;
};
const mergeMultiMessage = (txs) => {
    const msgs = txs.map((tx) => tx.MsgSDK);
    const res = {};
    msgs.forEach((msg, index) => {
        res[`msg${index + 1}`] = Object.assign(Object.assign({}, msg), { type: txs[index].typeUrl });
    });
    return res;
};
const findAnyType = (msgData) => {
    const results = [];
    function findTypeAnyFields(obj, path = []) {
        if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                const newPath = [...path, key];
                // console.log(newPath.join('.'));
                if (key === 'value') {
                    results.push(newPath);
                }
                findTypeAnyFields(obj[key], newPath);
            }
        }
    }
    findTypeAnyFields(msgData);
    return results;
};
const convertAnyTypeData = (msgData, fields) => {
    const resData = cloneDeep__default["default"](msgData);
    fields.forEach((field) => {
        const path = field.join('.');
        const anyValue = get__default["default"](resData, path);
        // console.log('path', path, anyValue);
        if (anyValue.startsWith('ZXl')) {
            // TypeAny: need base64 decode
            set__default["default"](resData, path, strings.toUtf8String(base64__namespace.decode(anyValue)));
        }
        else if (anyValue.startsWith('eyJ')) {
            // TypeAny[]: need base64 decode and encode hex
            set__default["default"](resData, path, bytes.hexlify(base64__namespace.decode(anyValue)));
        }
        else ;
    });
    return resData;
};

/**
 * @priKey 0x prefix
 */
const getPubKeyByPriKey = (priKey) => {
    const privateKeyBytes = bytes.arrayify(priKey);
    const publicKeyBytes = secp256k1Compat.publicKeyCreate(privateKeyBytes);
    const pk = bytes.hexlify(bytes.arrayify(publicKeyBytes));
    const pubKey = makeCosmsPubKey(pk);
    return pubKey;
};

/**
 * recover public key from signature
 *
 * @messageHash message hash
 * @signature message signature
 *
 * @returns uncompressed public key
 */
const recoverPk = ({ messageHash, signature }) => {
    const uncompressedPubKey = signingKey.recoverPublicKey(messageHash, signature);
    return signingKey.computePublicKey(uncompressedPubKey, true);
};
/**
 * @pk compressed public key from signature
 * @return eg. { typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey', value: 'CiEC+hp2uVKio9T7x0goOPyHgwUYiRsZ8MeYUrfRX8MxrzM=' }
 */
const makeCosmsPubKey = (pk) => {
    const pubKey = keys.PubKey.fromPartial({
        key: bytes.arrayify(pk),
    });
    return {
        typeUrl: '/cosmos.crypto.eth.ethsecp256k1.PubKey',
        value: keys.PubKey.encode(pubKey).finish(),
    };
};
const eip712Hash = (message) => {
    return ethSigUtil.TypedDataUtils.eip712Hash(JSON.parse(message), ethSigUtil.SignTypedDataVersion.V4);
};

/**
 * @addr wallet address
 * @message sign typed v4 data
 */
const sign712Tx = (addr, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // TODO: eth-sig-utils
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const signature = yield ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.request({
        method: 'eth_signTypedData_v4',
        params: [addr, message],
    }));
    const messageHash = eip712Hash(message);
    return {
        signature,
        messageHash,
    };
});
const defaultSignTypedData = (addr, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const signature = yield ((_b = window.ethereum) === null || _b === void 0 ? void 0 : _b.request({
        method: 'eth_signTypedData_v4',
        params: [addr, message],
    }));
    return signature;
});

const getGasFeeBySimulate = (simulateTxInfo, denom = 'BNB') => {
    var _a, _b;
    if (!simulateTxInfo.gasInfo)
        throw new Error('gasInfo not found');
    const gasLimit = BigInt((_a = simulateTxInfo.gasInfo) === null || _a === void 0 ? void 0 : _a.gasUsed.toNumber());
    const gasPrice = (_b = simulateTxInfo.gasInfo) === null || _b === void 0 ? void 0 : _b.minGasPrice.replace(denom, '');
    const gasFee = gasLimit * BigInt(gasPrice);
    return {
        gasLimit,
        gasPrice,
        gasFee: units.formatEther(String(gasFee)),
    };
};

let RpcQueryClient = class RpcQueryClient {
    constructor(rpcUrl) {
        this.rpcUrl = rpcUrl;
        this.rpcClient = null;
        this.txQueryClient = null;
        this.rpcUrl = rpcUrl;
    }
    getRpcClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.rpcClient) {
                this.rpcClient = yield makeRpcClient(this.rpcUrl);
            }
            return this.rpcClient;
        });
    }
    getQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.txQueryClient) {
                const [client] = yield makeClientWithExtension(this.rpcUrl);
                this.txQueryClient = client;
            }
            return this.txQueryClient;
        });
    }
    getAuthQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query.QueryClientImpl(rpcClient);
        });
    }
    getBankQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$1.QueryClientImpl(rpcClient);
        });
    }
    getPaymentQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$2.QueryClientImpl(rpcClient);
        });
    }
    getSpQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$3.QueryClientImpl(rpcClient);
        });
    }
    getChallengeQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$4.QueryClientImpl(rpcClient);
        });
    }
    getCrosschainQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$5.QueryClientImpl(rpcClient);
        });
    }
    getOracleQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$6.QueryClientImpl(rpcClient);
        });
    }
    getBridgeQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$7.QueryClientImpl(rpcClient);
        });
    }
    getFeeGrantQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$8.QueryClientImpl(rpcClient);
        });
    }
    getStorageQueryClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$9.QueryClientImpl(rpcClient);
        });
    }
    getMsgClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new tx.MsgClientImpl(rpcClient);
        });
    }
    getGashubClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$a.QueryClientImpl(rpcClient);
        });
    }
    getVirtualGroupClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$b.QueryClientImpl(rpcClient);
        });
    }
    getStakingClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.getRpcClient();
            return new query$c.QueryClientImpl(rpcClient);
        });
    }
};
RpcQueryClient = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject('RPC_URL')),
    __metadata("design:paramtypes", [String])
], RpcQueryClient);
const makeClientWithExtension = (rpcUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const tmClient = yield tendermintRpc.Tendermint37Client.connect(rpcUrl);
    return [
        stargate.QueryClient.withExtensions(tmClient, stargate.setupAuthExtension, stargate.setupAuthzExtension, stargate.setupBankExtension, stargate.setupDistributionExtension, stargate.setupFeegrantExtension, stargate.setupGovExtension, stargate.setupIbcExtension, stargate.setupMintExtension, stargate.setupSlashingExtension, stargate.setupStakingExtension, stargate.setupTxExtension),
        tmClient,
    ];
});
const makeRpcClient = (rpcUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const [, tmClient] = yield makeClientWithExtension(rpcUrl);
    const rpc = stargate.createProtobufRpcClient(new stargate.QueryClient(tmClient));
    return rpc;
});

const MsgSendTypeUrl = '/cosmos.bank.v1beta1.MsgSend';
const MsgMultiSendTypeUrl = '/cosmos.bank.v1beta1.MsgMultiSend';
const MsgClaimTypeUrl = '/cosmos.oracle.v1.MsgClaim';
const MsgGrantAllowanceTypeUrl = '/cosmos.feegrant.v1beta1.MsgGrantAllowance';
const MsgRevokeAllowanceTypeUrl = '/cosmos.feegrant.v1beta1.MsgRevokeAllowance';
const MsgTransferOutTypeUrl = '/greenfield.bridge.MsgTransferOut';
const MsgAttestTypeUrl = '/greenfield.challenge.MsgAttest';
const MsgSubmitTypeUrl = '/greenfield.challenge.MsgSubmit';
const MsgCreatePaymentAccountTypeUrl = '/greenfield.payment.MsgCreatePaymentAccount';
const MsgDepositTypeUrl = '/greenfield.payment.MsgDeposit';
const MsgDisableRefundTypeUrl = '/greenfield.payment.MsgDisableRefund';
const MsgWithdrawTypeUrl = '/greenfield.payment.MsgWithdraw';
const MsgCancelCreateObjectTypeUrl = '/greenfield.storage.MsgCancelCreateObject';
const MsgMigrateBucketTypeUrl = '/greenfield.storage.MsgMigrateBucket';
const MsgCancelMigrateBucketTypeUrl = '/greenfield.storage.MsgCancelMigrateBucket';
const MsgCreateBucketTypeUrl = '/greenfield.storage.MsgCreateBucket';
const MsgCreateGroupTypeUrl = '/greenfield.storage.MsgCreateGroup';
const MsgCreateObjectTypeUrl = '/greenfield.storage.MsgCreateObject';
const MsgDeleteBucketTypeUrl = '/greenfield.storage.MsgDeleteBucket';
const MsgDeleteGroupTypeUrl = '/greenfield.storage.MsgDeleteGroup';
const MsgDeleteObjectTypeUrl = '/greenfield.storage.MsgDeleteObject';
const MsgDeletePolicyTypeUrl = '/greenfield.storage.MsgDeletePolicy';
const MsgSetTagTypeUrl = '/greenfield.storage.MsgSetTag';
const MsgToggleSPAsDelegatedAgentTypeUrl = '/greenfield.storage.MsgToggleSPAsDelegatedAgent';
const MsgLeaveGroupTypeUrl = '/greenfield.storage.MsgLeaveGroup';
const MsgMirrorBucketTypeUrl = '/greenfield.storage.MsgMirrorBucket';
const MsgMirrorGroupTypeUrl = '/greenfield.storage.MsgMirrorGroup';
const MsgMirrorObjectTypeUrl = '/greenfield.storage.MsgMirrorObject';
const MsgPutPolicyTypeUrl = '/greenfield.storage.MsgPutPolicy';
const MsgUpdateBucketInfoTypeUrl = '/greenfield.storage.MsgUpdateBucketInfo';
const MsgUpdateGroupExtraTypeUrl = '/greenfield.storage.MsgUpdateGroupExtra';
const MsgUpdateGroupMemberTypeUrl = '/greenfield.storage.MsgUpdateGroupMember';
const MsgUpdateObjectInfoTypeUrl = '/greenfield.storage.MsgUpdateObjectInfo';
const BasicAllowanceTypeUrl = '/cosmos.feegrant.v1beta1.BasicAllowance';
const AllowedMsgAllowanceTypeUrl = '/cosmos.feegrant.v1beta1.AllowedMsgAllowance';
const MsgEditValidatorTypeUrl = '/cosmos.staking.v1beta1.MsgEditValidator';
const MsgCreateValidatorTypeUrl = '/cosmos.staking.v1beta1.MsgCreateValidator';
const MsgVoteTypeUrl = '/cosmos.gov.v1.MsgVote';
const MsgSetBucketFlowRateLimitTypeUrl = '/greenfield.storage.MsgSetBucketFlowRateLimit';
const MsgSubmitProposalTypeUrl = '/cosmos.gov.v1.MsgSubmitProposal';
const MsgWithdrawDelegatorRewardTypeUrl = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward';
const MsgSetWithdrawAddressTypeUrl = '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress';
const MsgWithdrawValidatorCommissionTypeUrl = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission';
const MsgFundCommunityPoolTypeUrl = '/cosmos.distribution.v1beta1.MsgFundCommunityPool';
const MsgSettleTypeUrl = '/greenfield.virtualgroup.MsgSettle';

const EMPTY_STRING_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const NORMAL_ERROR_CODE = 404;
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
// SPECIAL ERROR CODE
const SP_NOT_AVAILABLE_ERROR_CODE = 429;
// SPECIAL ERROR MESSAGE
const SP_NOT_AVAILABLE_ERROR_MSG = 'SP not available';

const ZERO_PUBKEY = '0x000000000000000000000000000000000000000000000000000000000000000000';
const DEFAULT_DENOM = 'BNB';
// 32 MB
const DEFAULT_PART_SIZE = 1024 * 1024 * 32;

let TxClient = class TxClient {
    constructor(rpcUrl, chainId) {
        this.account = tsyringe.container.resolve(Account);
        this.rpcQueryClient = tsyringe.container.resolve(RpcQueryClient);
        this.rpcUrl = rpcUrl;
        this.chainId = chainId;
    }
    tx(typeUrl, address, MsgSDKTypeEIP712, MsgSDK, msgBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const txBodyBytes = this.getBodyBytes([
                {
                    typeUrl,
                    msgBytes,
                },
            ]);
            const tx = yield this.multiTx([
                {
                    metaTxInfo: {
                        typeUrl,
                        address,
                        MsgSDKTypeEIP712,
                        MsgSDK,
                        msgBytes,
                        bodyBytes: txBodyBytes,
                    },
                },
            ]);
            return {
                simulate: tx.simulate,
                broadcast: tx.broadcast,
                metaTxInfo: {
                    typeUrl,
                    address,
                    MsgSDKTypeEIP712,
                    MsgSDK,
                    msgBytes,
                    bodyBytes: txBodyBytes,
                },
            };
        });
    }
    txRaw({ address, txRawHex, eip712MsgType, msgData, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountInfo = yield this.account.getAccount(address);
            const txRawBytes = bytes.arrayify(txRawHex);
            const txRawData = tx$1.TxRaw.decode(txRawBytes);
            return {
                simulate: (opts) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.simulateRawTx(txRawData.bodyBytes, accountInfo, opts);
                }),
                broadcast: (opts) => __awaiter(this, void 0, void 0, function* () {
                    const { denom, gasLimit, gasPrice, payer, granter, privateKey, signTypedDataCallback = defaultSignTypedData, } = opts;
                    const fee = generateFee(String(BigInt(gasLimit) * BigInt(gasPrice)), denom, String(gasLimit), payer, granter);
                    // console.log('eip712MsgType', eip712MsgType);
                    const wrapperTypes = generateTypes(eip712MsgType);
                    // find type any and convert
                    const anyFields = findAnyType(msgData);
                    // console.log('anyFields', anyFields);
                    const convertedMsg = convertAnyTypeData(msgData, anyFields);
                    const messages = generateMessage(accountInfo.accountNumber.toString(), accountInfo.sequence.toString(), this.chainId, '', fee, convertedMsg, '0');
                    const eip712 = createEIP712(wrapperTypes, this.chainId, messages);
                    // console.log('eip712', eip712);
                    const { pubKey, signature } = privateKey
                        ? this.getSignByPriKey(eip712, privateKey)
                        : yield this.getSignByWallet(eip712, accountInfo.address, signTypedDataCallback);
                    const authInfoBytes = this.getAuthInfoBytes({
                        denom,
                        sequence: accountInfo.sequence + '',
                        gasLimit,
                        gasPrice,
                        pubKey,
                        granter,
                        payer,
                    });
                    const txRaw = tx$1.TxRaw.fromPartial({
                        bodyBytes: txRawData.bodyBytes,
                        authInfoBytes,
                        signatures: [bytes.arrayify(signature)],
                    });
                    const txBytes = tx$1.TxRaw.encode(txRaw).finish();
                    // console.log('txBytes', hexlify(txBytes));
                    return yield this.broadcastRawTx(txBytes);
                }),
            };
        });
    }
    getBodyBytes(params) {
        const multiMsgBytes = params.map((tx) => {
            return generateMsg(tx.typeUrl, tx.msgBytes);
        });
        const txBody = tx$1.TxBody.fromPartial({
            messages: multiMsgBytes,
        });
        const txBodyBytes = tx$1.TxBody.encode(txBody).finish();
        return txBodyBytes;
    }
    getSignByPriKey(eip712, privateKey) {
        assertPrivateKey(privateKey);
        const pubKey = getPubKeyByPriKey(privateKey);
        const signature = ethSigUtil.signTypedData({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: eip712,
            version: ethSigUtil.SignTypedDataVersion.V4,
            privateKey: Buffer.from(bytes.arrayify(privateKey)),
        });
        return {
            pubKey,
            signature,
        };
    }
    getSignByWallet(eip712, address, signTypedDataCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield signTypedDataCallback(address, JSON.stringify(eip712));
            const messageHash = eip712Hash(JSON.stringify(eip712));
            // console.log('eip712 hash', hexlify(messageHash));
            const pk = recoverPk({
                signature,
                messageHash,
            });
            const pubKey = makeCosmsPubKey(pk);
            return {
                pubKey,
                signature,
            };
        });
    }
    getAuthInfoBytes(params) {
        const { pubKey, denom = DEFAULT_DENOM, sequence, gasLimit, gasPrice, granter, payer } = params;
        if (!pubKey)
            throw new Error('pubKey is required');
        const feeAmount = [
            {
                denom,
                amount: String(BigInt(gasLimit) * BigInt(gasPrice)),
            },
        ];
        const authInfoBytes = protoSigning.makeAuthInfoBytes([{ pubkey: pubKey, sequence: Number(sequence) }], feeAmount, gasLimit, granter, payer, 
        // @ts-ignore
        712);
        return authInfoBytes;
    }
    simulateRawTx(txBodyBytes, accountInfo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new service.ServiceClientImpl(rpcClient);
            const { denom } = options;
            const authInfoBytes = this.getAuthInfoBytes({
                sequence: accountInfo.sequence + '',
                denom,
                gasLimit: 0,
                gasPrice: '0',
                pubKey: makeCosmsPubKey(ZERO_PUBKEY),
                granter: '',
                payer: '',
            });
            const tx = tx$1.Tx.fromPartial({
                authInfo: tx$1.AuthInfo.decode(authInfoBytes),
                body: tx$1.TxBody.decode(txBodyBytes),
                signatures: [Uint8Array.from([])],
            });
            const request = service.SimulateRequest.fromPartial({
                txBytes: tx$1.Tx.encode(tx).finish(),
            });
            const res = yield rpc.Simulate(request);
            return getGasFeeBySimulate(res, denom);
        });
    }
    broadcastRawTx(txRawBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmClient = yield tendermintRpc.Tendermint37Client.connect(this.rpcUrl);
            const client = yield stargate.StargateClient.create(tmClient);
            return yield client.broadcastTx(txRawBytes);
        });
    }
    multiTx(txResList) {
        return __awaiter(this, void 0, void 0, function* () {
            const txs = txResList.map((txRes) => txRes.metaTxInfo);
            const accountInfo = yield this.account.getAccount(txs[0].address);
            const txBodyBytes = this.getBodyBytes(txs);
            return {
                simulate: (opts) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.simulateRawTx(txBodyBytes, accountInfo, opts);
                }),
                broadcast: (opts) => __awaiter(this, void 0, void 0, function* () {
                    const { denom, gasLimit, gasPrice, payer, granter, privateKey, signTypedDataCallback = defaultSignTypedData, } = opts;
                    const types = mergeMultiEip712(txs.map((tx) => tx.MsgSDKTypeEIP712));
                    const fee = generateFee(String(BigInt(gasLimit) * BigInt(gasPrice)), denom, String(gasLimit), payer, granter);
                    const wrapperTypes = generateTypes(types);
                    const multiMessages = mergeMultiMessage(txs);
                    const messages = generateMessage(accountInfo.accountNumber.toString(), accountInfo.sequence.toString(), this.chainId, '', fee, multiMessages, '0');
                    const eip712 = createEIP712(wrapperTypes, this.chainId, messages);
                    // console.log('eip712', eip712);
                    const { pubKey, signature } = privateKey
                        ? this.getSignByPriKey(eip712, privateKey)
                        : yield this.getSignByWallet(eip712, accountInfo.address, signTypedDataCallback);
                    const authInfoBytes = this.getAuthInfoBytes({
                        denom,
                        sequence: accountInfo.sequence + '',
                        gasLimit,
                        gasPrice,
                        pubKey,
                        granter,
                        payer,
                    });
                    const txRaw = tx$1.TxRaw.fromPartial({
                        bodyBytes: txBodyBytes,
                        authInfoBytes,
                        signatures: [bytes.arrayify(signature)],
                    });
                    const txBytes = tx$1.TxRaw.encode(txRaw).finish();
                    // console.log('txBytes', hexlify(txBytes));
                    return yield this.broadcastRawTx(txBytes);
                }),
            };
        });
    }
};
TxClient = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject('RPC_URL')),
    __param(1, tsyringe.inject('CHAIN_ID')),
    __metadata("design:paramtypes", [String, String])
], TxClient);

const MsgMultiSendSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'inputs',
            type: 'TypeMsg1Inputs[]',
        },
        {
            name: 'outputs',
            type: 'TypeMsg1Outputs[]',
        },
    ],
    TypeMsg1Inputs: [
        {
            name: 'address',
            type: 'string',
        },
        {
            name: 'coins',
            type: 'TypeMsg1InputsCoins[]',
        },
    ],
    TypeMsg1InputsCoins: [
        {
            name: 'denom',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
    TypeMsg1Outputs: [
        {
            name: 'address',
            type: 'string',
        },
        {
            name: 'coins',
            type: 'TypeMsg1OutputsCoins[]',
        },
    ],
    TypeMsg1OutputsCoins: [
        {
            name: 'denom',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
};

const MsgSendSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'from_address',
            type: 'string',
        },
        {
            name: 'to_address',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'TypeMsg1Amount[]',
        },
    ],
    TypeMsg1Amount: [
        {
            name: 'denom',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
};

const MsgCreatePaymentAccountSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'creator',
            type: 'string',
        },
    ],
};

let Account = class Account {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    multiTransfer(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgMultiSendTypeUrl, address, MsgMultiSendSDKTypeEIP712, tx$2.MsgMultiSend.toSDK(msg), tx$2.MsgMultiSend.encode(msg).finish());
        });
    }
    createPaymentAccount(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgCreatePaymentAccountTypeUrl, msg.creator, MsgCreatePaymentAccountSDKTypeEIP712, tx$3.MsgCreatePaymentAccount.toSDK(msg), tx$3.MsgCreatePaymentAccount.encode(msg).finish());
        });
    }
    getPaymentAccountsByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccountsByOwner({
                owner,
            });
        });
    }
    getModuleAccountByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getAuthQueryClient();
            return rpc.ModuleAccountByName({
                name,
            });
        });
    }
    getModuleAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getAuthQueryClient();
            return yield rpc.ModuleAccounts();
        });
    }
    getAccountBalance(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getBankQueryClient();
            return yield rpc.Balance(request);
        });
    }
    getAccount(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.queryClient.getQueryClient();
            const account = yield client.auth.account(address);
            if (!account)
                return auth.BaseAccount.fromJSON({});
            return auth.BaseAccount.toJSON(auth.BaseAccount.decode(account.value));
        });
    }
    transfer(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSendTypeUrl, msg.fromAddress, MsgSendSDKTypeEIP712, tx$2.MsgSend.toSDK(msg), tx$2.MsgSend.encode(msg).finish());
        });
    }
};
Account = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Account);

let Basic = class Basic {
    constructor() {
        this.rpcQueryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    getNodeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new query$d.ServiceClientImpl(rpcClient);
            return yield rpc.GetNodeInfo();
        });
    }
    getLatestBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new query$d.ServiceClientImpl(rpcClient);
            return yield rpc.GetLatestBlock();
        });
    }
    getLatestBlockHeight() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const latestBlock = yield this.getLatestBlock();
            const height = (_b = (_a = latestBlock.sdkBlock) === null || _a === void 0 ? void 0 : _a.header) === null || _b === void 0 ? void 0 : _b.height;
            if (!height)
                return 0;
            return height.toNumber();
        });
    }
    getSyncing() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new query$d.ServiceClientImpl(rpcClient);
            const syncing = yield rpc.GetSyncing();
            return syncing.syncing;
        });
    }
    getBlockByHeight(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new query$d.ServiceClientImpl(rpcClient);
            return yield rpc.GetBlockByHeight({
                height: Long__default["default"].fromInt(height),
            });
        });
    }
    GetLatestValidatorSet(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcClient = yield this.rpcQueryClient.getRpcClient();
            const rpc = new query$d.ServiceClientImpl(rpcClient);
            const validatorSet = yield rpc.GetLatestValidatorSet(request);
            return validatorSet.blockHeight.toNumber();
        });
    }
};
Basic = __decorate([
    tsyringe.injectable()
], Basic);

const MsgTransferOutSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'from',
            type: 'string',
        },
        {
            name: 'to',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'TypeMsg1Amount',
        },
    ],
    TypeMsg1Amount: [
        {
            name: 'denom',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
};

const MsgAttestSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'submitter',
            type: 'string',
        },
        {
            name: 'challenge_id',
            type: 'uint64',
        },
        {
            name: 'object_id',
            type: 'string',
        },
        {
            name: 'sp_operator_address',
            type: 'string',
        },
        {
            name: 'vote_result',
            type: 'string',
        },
        {
            name: 'challenger_address',
            type: 'string',
        },
    ],
};

const MsgSubmitSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'challenger',
            type: 'string',
        },
        {
            name: 'sp_operator_address',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'object_name',
            type: 'string',
        },
        {
            name: 'segment_index',
            type: 'uint32',
        },
        {
            name: 'random_index',
            type: 'bool',
        },
    ],
};

const MsgDepositSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'creator',
            type: 'string',
        },
        {
            name: 'to',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
};

const MsgDisableRefundSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'owner',
            type: 'string',
        },
        {
            name: 'addr',
            type: 'string',
        },
    ],
};

const MsgWithdrawSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'creator',
            type: 'string',
        },
        {
            name: 'from',
            type: 'string',
        },
        {
            name: 'amount',
            type: 'string',
        },
    ],
};

const MsgCancelCreateObjectSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'object_name',
            type: 'string',
        },
    ],
};

const MsgCreateBucketSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'charged_read_quota',
            type: 'uint64',
        },
        {
            name: 'creator',
            type: 'string',
        },
        {
            name: 'payment_address',
            type: 'string',
        },
        {
            name: 'primary_sp_address',
            type: 'string',
        },
        {
            name: 'primary_sp_approval',
            type: 'TypeMsg1PrimarySpApproval',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'visibility',
            type: 'string',
        },
    ],
    TypeMsg1PrimarySpApproval: [
        {
            name: 'expired_height',
            type: 'uint64',
        },
        {
            name: 'global_virtual_group_family_id',
            type: 'uint32',
        },
        // {
        //   name: 'sig',
        //   type: 'bytes',
        // },
    ],
};

const MsgCreateGroupSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'creator',
            type: 'string',
        },
        {
            name: 'extra',
            type: 'string',
        },
        {
            name: 'group_name',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

const MsgCreateObjectSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'content_type',
            type: 'string',
        },
        {
            name: 'creator',
            type: 'string',
        },
        {
            name: 'expect_checksums',
            type: 'bytes[]',
        },
        {
            name: 'object_name',
            type: 'string',
        },
        {
            name: 'payload_size',
            type: 'uint64',
        },
        {
            name: 'primary_sp_approval',
            type: 'TypeMsg1PrimarySpApproval',
        },
        {
            name: 'redundancy_type',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'visibility',
            type: 'string',
        },
    ],
    TypeMsg1PrimarySpApproval: [
        {
            name: 'expired_height',
            type: 'uint64',
        },
        {
            name: 'global_virtual_group_family_id',
            type: 'uint32',
        },
        // {
        //   name: 'sig',
        //   type: 'bytes',
        // },
    ],
};

const MsgDeleteBucketSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
    ],
};

const MsgDeleteGroupSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'group_name',
            type: 'string',
        },
    ],
};

const MsgDeleteObjectSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'object_name',
            type: 'string',
        },
    ],
};

const MsgDeletePolicySDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'resource',
            type: 'string',
        },
        {
            name: 'principal',
            type: 'TypeMsg1Principal',
        },
    ],
    TypeMsg1Principal: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'value',
            type: 'string',
        },
    ],
};

const MsgLeaveGroupSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'member',
            type: 'string',
        },
        {
            name: 'group_owner',
            type: 'string',
        },
        {
            name: 'group_name',
            type: 'string',
        },
    ],
};

const MsgMigrateBucketSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'dst_primary_sp_approval',
            type: 'TypeMsg1DstPrimarySpApproval',
        },
        {
            name: 'dst_primary_sp_id',
            type: 'uint32',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
    TypeMsg1DstPrimarySpApproval: [
        {
            name: 'expired_height',
            type: 'uint64',
        },
        {
            name: 'global_virtual_group_family_id',
            type: 'uint32',
        },
        {
            name: 'sig',
            type: 'bytes',
        },
    ],
};

const MsgMirrorBucketSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'id',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
    ],
};

const MsgMirrorGroupSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'dest_chain_id',
            type: 'uint32',
        },
        {
            name: 'group_name',
            type: 'string',
        },
        {
            name: 'id',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

const MsgMirrorObjectSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'id',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'object_name',
            type: 'string',
        },
    ],
};

const getMsgPutPolicySDKTypeEIP712 = (resource) => {
    const res = cloneDeep__default["default"](MsgPutPolicySDKTypeEIP712);
    if (resource.length !== 0) {
        res.TypeMsg1Statements.push({
            name: 'resources',
            type: 'string[]',
        });
    }
    return res;
};
const MsgPutPolicySDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'principal',
            type: 'TypeMsg1Principal',
        },
        {
            name: 'resource',
            type: 'string',
        },
        {
            name: 'statements',
            type: 'TypeMsg1Statements[]',
        },
        {
            name: 'expiration_time',
            type: 'string',
        },
    ],
    TypeMsg1Principal: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'value',
            type: 'string',
        },
    ],
    TypeMsg1Statements: [
        {
            name: 'actions',
            type: 'string[]',
        },
        {
            name: 'effect',
            type: 'string',
        },
        {
            name: 'expiration_time',
            type: 'string',
        },
        // {
        //   name: 'resources',
        //   type: 'string[]',
        // },
    ],
};

const getMsgSetTagSDKTypeEIP712 = (isTagsEmpty) => {
    const res = cloneDeep__default["default"](MsgSetTagSDKTypeEIP712);
    if (!isTagsEmpty) {
        res.Msg1.push({
            name: 'tags',
            type: 'TypeMsg1Tags',
        });
        res.TypeMsg1Tags = [
            {
                name: 'tags',
                type: 'TypeMsg1TagsTags[]',
            },
        ];
        res.TypeMsg1TagsTags = [
            {
                name: 'key',
                type: 'string',
            },
            {
                name: 'value',
                type: 'string',
            },
        ];
    }
    else {
        res.Msg1.push({
            name: 'tags',
            type: 'TypeMsg1Tags',
        });
        res.TypeMsg1Tags = [
            {
                name: 'tags',
                type: 'string[]',
            },
        ];
    }
    return res;
};
const MsgSetTagSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'resource',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

const MsgToggleSPAsDelegatedAgentSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

const MsgUpdateBucketInfoSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'charged_read_quota',
            type: 'TypeMsg1ChargedReadQuota',
        },
        {
            name: 'payment_address',
            type: 'string',
        },
        {
            name: 'visibility',
            type: 'string',
        },
    ],
    TypeMsg1ChargedReadQuota: [
        {
            name: 'value',
            type: 'uint64',
        },
    ],
};

const MsgUpdateGroupExtraSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'group_owner',
            type: 'string',
        },
        {
            name: 'group_name',
            type: 'string',
        },
        {
            name: 'extra',
            type: 'string',
        },
    ],
};

const getMsgUpdateGroupMemberSDKTypeEIP712 = ({ membersToAdd, membersToDelete, }) => {
    const res = cloneDeep__default["default"](MsgUpdateGroupMemberSDKTypeEIP712);
    if (membersToAdd.length > 0) {
        res.Msg1.push({
            name: 'members_to_add',
            type: 'TypeMsg1MembersToAdd[]',
        });
        res.TypeMsg1MembersToAdd = [
            {
                name: 'expiration_time',
                type: 'string',
            },
            {
                name: 'member',
                type: 'string',
            },
        ];
    }
    if (membersToDelete.length > 0) {
        res.Msg1.push({
            name: 'members_to_delete',
            type: 'string[]',
        });
    }
    return res;
};
const MsgUpdateGroupMemberSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'group_name',
            type: 'string',
        },
        {
            name: 'group_owner',
            type: 'string',
        },
        // {
        //   name: 'members_to_add',
        //   type: 'TypeMsg1MembersToAdd[]',
        // },
        // {
        //   name: 'members_to_delete',
        //   type: 'string[]',
        // },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
    // TypeMsg1MembersToAdd: [
    //   {
    //     name: 'expiration_time',
    //     type: 'string',
    //   },
    //   {
    //     name: 'member',
    //     type: 'string',
    //   },
    // ],
};

const MsgUpdateObjectInfoSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'object_name',
            type: 'string',
        },
        {
            name: 'visibility',
            type: 'string',
        },
    ],
};

const MsgSetBucketFlowRateLimitSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'bucket_owner',
            type: 'string',
        },
        {
            name: 'flow_rate_limit',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'payment_address',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

const assertStringRequire = (s, errMsg) => {
    if (!s)
        throw new Error(errMsg);
};
const assertPrivateKey = (privateKey) => {
    if (!privateKey.startsWith('0x'))
        throw new Error('private key should start with 0x');
};
const assertAuthType = (authType) => {
    if (!authType)
        throw new Error('authType is required');
    if (authType.type === 'ECDSA') {
        assertPrivateKey(authType.privateKey);
    }
    if (authType.type === 'EDDSA') {
        assertStringRequire(authType.address, 'address param is required');
        assertStringRequire(authType.seed, 'seed param is required');
        assertStringRequire(authType.domain, 'domain param is required');
    }
};
function assertFileType(file) {
    if ('content' in file) {
        return true;
    }
    return false;
}
function assertHttpMethod(method) {
    if (method !== 'GET' && method !== 'POST' && method !== 'PUT')
        throw new Error('method should be GET, POST or PUT');
}

const getCanonicalHeaders = (reqMeta, reqHeaders) => {
    const sortedHeaders = getSortedHeaders(reqHeaders, SUPPORTED_HEADERS);
    const res = [];
    sortedHeaders.forEach((k) => {
        const v = reqHeaders.get(k);
        res.push(`${k}:${v}`);
    });
    if (reqMeta.url && reqMeta.url.hostname) {
        res.push(reqMeta.url.hostname);
    }
    res.push('');
    return res.join('\n');
};
const getSortedHeaders = (reqHeaders, supportHeaders) => {
    const signedHeaders = [];
    reqHeaders.forEach((v, k) => {
        if (supportHeaders.includes(k)) {
            signedHeaders.push(k);
        }
    });
    return signedHeaders.sort();
};
const getSignedHeaders = (reqHeaders) => {
    const sortedHeaders = getSortedHeaders(reqHeaders, SUPPORTED_HEADERS);
    return sortedHeaders.join(';');
};
const getCanonicalRequest = (reqMeta, reqHeaders) => {
    var _a, _b;
    const canonicalHeaders = getCanonicalHeaders(reqMeta, reqHeaders);
    const signedHeaders = getSignedHeaders(reqHeaders);
    const canonicalRequestArr = [
        reqMeta.method,
        (_a = reqMeta.url) === null || _a === void 0 ? void 0 : _a.path,
        (_b = reqMeta.url) === null || _b === void 0 ? void 0 : _b.query,
        canonicalHeaders,
        signedHeaders,
    ];
    const canonicalRequest = canonicalRequestArr.join('\n');
    return canonicalRequest;
};
const getAuthorization = (canonicalRequest, authType) => {
    // console.log('canonicalRequest', canonicalRequest);
    const unsignedMsg = getMsgToSign(utils_js.utf8ToBytes(canonicalRequest));
    let authorization = '';
    if (authType.type === 'ECDSA') {
        const sig = secpSign(unsignedMsg, authType.privateKey);
        authorization = `GNFD1-ECDSA, Signature=${sig.slice(2)}`;
    }
    else {
        const sig = bytes.hexlify(ed25519.ed25519.sign(bytes.hexlify(unsignedMsg).slice(2), authType.seed.slice(2)));
        authorization = `GNFD2-EDDSA,Signature=${sig.slice(2)}`;
    }
    return authorization;
};
const newRequestHeadersByMeta = (meta) => {
    const headers = new fetch.Headers();
    if (meta.contentType) {
        headers.set(HTTPHeaderContentType.toLocaleLowerCase(), meta.contentType);
    }
    if (meta.txnHash && meta.txnHash !== '') {
        headers.set(HTTPHeaderTransactionHash.toLocaleLowerCase(), meta.txnHash);
    }
    if (meta.contentSHA256) {
        headers.set(HTTPHeaderContentSHA256.toLocaleLowerCase(), meta.contentSHA256);
    }
    if (meta.unsignMsg) {
        headers.set(HTTPHeaderUnsignedMsg.toLocaleLowerCase(), meta.unsignMsg);
    }
    if (meta.userAddress) {
        headers.set(HTTPHeaderUserAddress, meta.userAddress);
    }
    const date = new Date();
    if (meta.date) {
        headers.set(HTTPHeaderDate.toLocaleLowerCase(), formatDate(meta.date));
    }
    else {
        headers.set(HTTPHeaderDate.toLocaleLowerCase(), formatDate(date));
    }
    if (meta.expiryTimestamp) {
        headers.set(HTTPHeaderExpiryTimestamp.toLocaleLowerCase(), formatDate(meta.expiryTimestamp));
    }
    else {
        date.setHours(date.getHours() + 2);
        headers.set(HTTPHeaderExpiryTimestamp.toLocaleLowerCase(), formatDate(date));
    }
    return headers;
};
function formatDate(date) {
    const res = date.toISOString();
    return res.replace(/\.\d{3}/gi, '');
}
const HTTPHeaderAuthorization = 'Authorization';
const HTTPHeaderContentSHA256 = 'X-Gnfd-Content-Sha256';
const HTTPHeaderTransactionHash = 'X-Gnfd-Txn-Hash';
const HTTPHeaderObjectID = 'X-Gnfd-Object-ID';
const HTTPHeaderRedundancyIndex = 'X-Gnfd-Redundancy-Index';
const HTTPHeaderResource = 'X-Gnfd-Resource';
const HTTPHeaderDate = 'X-Gnfd-Date';
const HTTPHeaderExpiryTimestamp = 'X-Gnfd-Expiry-Timestamp';
const HTTPHeaderRange = 'Range';
const HTTPHeaderPieceIndex = 'X-Gnfd-Piece-Index';
const HTTPHeaderContentType = 'Content-Type';
const HTTPHeaderContentMD5 = 'Content-MD5';
const HTTPHeaderUnsignedMsg = 'X-Gnfd-Unsigned-Msg';
const HTTPHeaderUserAddress = 'X-Gnfd-User-Address';
const HTTPHeaderAppDomain = 'X-Gnfd-App-Domain';
const HTTPHeaderRegPubKey = 'X-Gnfd-App-Reg-Public-Key';
const SUPPORTED_HEADERS = [
    HTTPHeaderContentSHA256.toLocaleLowerCase(),
    HTTPHeaderTransactionHash.toLocaleLowerCase(),
    HTTPHeaderObjectID.toLocaleLowerCase(),
    HTTPHeaderRedundancyIndex.toLocaleLowerCase(),
    HTTPHeaderResource.toLocaleLowerCase(),
    HTTPHeaderDate.toLocaleLowerCase(),
    HTTPHeaderExpiryTimestamp.toLocaleLowerCase(),
    HTTPHeaderRange.toLocaleLowerCase(),
    HTTPHeaderPieceIndex.toLocaleLowerCase(),
    HTTPHeaderContentType.toLocaleLowerCase(),
    HTTPHeaderContentMD5.toLocaleLowerCase(),
    HTTPHeaderUnsignedMsg.toLocaleLowerCase(),
    HTTPHeaderUserAddress.toLocaleLowerCase(),
    // HTTPHeaderAppDomain.toLocaleLowerCase(),
];
// https://github.com/ethers-io/ethers.js/discussions/4339
const secpSign = (digestBz, privateKey) => {
    const signingKey$1 = new signingKey.SigningKey(privateKey);
    const signature = signingKey$1.signDigest(digestBz);
    let res = bytes.joinSignature(signature);
    const v = res.slice(-2);
    if (v === '1c')
        res = res.slice(0, -2) + '01';
    if (v === '1b')
        res = res.slice(0, -2) + '00';
    return res;
};
const getMsgToSign = (unsignedBytes) => {
    const res = keccak_js.keccak256(unsignedBytes);
    return res;
};
const encodePath = (pathName) => {
    const reservedNames = /^[a-zA-Z0-9-_.~/]+$/;
    if (reservedNames.test(pathName)) {
        return pathName;
    }
    let encodedPathName = '';
    for (let i = 0; i < pathName.length; i++) {
        const s = pathName[i];
        // soft characters
        if (('A' <= s && s <= 'Z') || ('a' <= s && s <= 'z') || ('0' <= s && s <= '9')) {
            encodedPathName += s;
            continue;
        }
        switch (s) {
            // special characters are allowed
            case '-':
            case '_':
            case '.':
            case '~':
            case '/':
                encodedPathName += s;
                continue;
            // others characters need to be encoded
            default: {
                const u = strings.toUtf8Bytes(s);
                for (let i = 0; i < u.length; i++) {
                    const hexStr = bytes.hexlify(u[i]);
                    encodedPathName += '%' + hexStr.slice(2).toUpperCase();
                }
            }
        }
    }
    return encodedPathName;
};
const getSortQuery = (queryMap) => {
    const queryParams = new URLSearchParams();
    for (const k in queryMap) {
        queryParams.append(k, queryMap[k]);
    }
    queryParams.sort();
    return queryParams.toString();
};
const getSortQueryParams = (url, queryMap) => {
    // const queryParams = new URLSearchParams();
    for (const k in queryMap) {
        url.searchParams.append(k, queryMap[k]);
    }
    url.searchParams.sort();
    return url;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_approval.md
const getApprovalMetaInfo = (endpoint, action, msg) => {
    const path = '/greenfield/admin/v1/get-approval';
    const queryMap = {
        action,
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    const unSignedMessageInHex = utils.toHex(utils.utf8ToBytes(JSON.stringify(msg)));
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        unsignMsg: unSignedMessageInHex,
        method: METHOD_GET,
        url: {
            hostname: url.hostname,
            query: url.searchParams.toString(),
            path,
        },
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
};

function formatVGF(vgf) {
    return Object.assign(Object.assign({}, vgf), { Id: Number(vgf.Id), PrimarySpId: Number(vgf.PrimarySpId) });
}
function formatBucketInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return Object.assign(Object.assign({}, o), { 
        // PrimarySpId: Number(item.BucketInfo.PrimarySpId),
        BucketStatus: Number(o.BucketStatus), ChargedReadQuota: Number(o.ChargedReadQuota), CreateAt: Number(o.CreateAt), GlobalVirtualGroupFamilyId: Number(o.GlobalVirtualGroupFamilyId), SourceType: Number(o.SourceType), Visibility: Number(o.Visibility), 
        // @ts-ignore
        SpAsDelegatedAgentDisabled: convertStrToBool(o.SpAsDelegatedAgentDisabled), Tags: {
            Tags: tags,
        } });
}
function formatObjectInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return Object.assign(Object.assign({}, o), { CreateAt: Number(o.CreateAt), Id: Number(o.Id), LocalVirtualGroupId: Number(o.LocalVirtualGroupId), ObjectStatus: Number(o.ObjectStatus), PayloadSize: Number(o.PayloadSize), RedundancyType: Number(o.RedundancyType), SourceType: Number(o.SourceType), Visibility: Number(o.Visibility), Tags: {
            Tags: tags,
        } });
}
function convertStrToBool(str) {
    return String(str).toLowerCase() === 'true';
}
function formatReadRecord(o) {
    return Object.assign(Object.assign({}, o), { ReadTimestampUs: Number(o.ReadTimestampUs), ReadSize: Number(o.ReadSize) });
}
function formatGroupInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return Object.assign(Object.assign({}, o), { SourceType: Number(o.SourceType), Id: Number(o.Id), Tags: {
            Tags: tags,
        } });
}

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_bucket_meta.md
const getBucketMetaInfo = (endpoint, params) => {
    const path = `/${params.bucketName}`;
    const queryMap = {
        'bucket-meta': '',
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseGetBucketMetaResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.GfSpGetBucketMetaResponse.Bucket = Object.assign(Object.assign({}, res.GfSpGetBucketMetaResponse.Bucket), { BucketInfo: formatBucketInfo(res.GfSpGetBucketMetaResponse.Bucket.BucketInfo), DeleteAt: Number(res.GfSpGetBucketMetaResponse.Bucket.DeleteAt), UpdateAt: Number(res.GfSpGetBucketMetaResponse.Bucket.UpdateAt), UpdateTime: Number(res.GfSpGetBucketMetaResponse.Bucket.UpdateTime) });
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_user_buckets.md
const getUserBucketMetaInfo = (endpoint) => {
    return {
        url: endpoint,
    };
};
const parseGetUserBucketsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Buckets = res.GfSpGetUserBucketsResponse.Buckets || [];
    if (Buckets) {
        if (!Array.isArray(Buckets)) {
            Buckets = [Buckets];
        }
        Buckets = Buckets.map((item) => {
            return Object.assign(Object.assign({}, item), { BucketInfo: formatBucketInfo(item.BucketInfo), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), DeleteAt: Number(item.DeleteAt), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime), Vgf: formatVGF(item.Vgf) });
        });
    }
    res.GfSpGetUserBucketsResponse = {
        Buckets,
    };
    return res;
});

const newBasicAllowance = (amount, denom = DEFAULT_DENOM, expirationTime) => {
    return {
        spendLimit: [
            {
                amount,
                denom,
            },
        ],
        expiration: expirationTime,
    };
};
const newAllowedMsgAllowance = (allowedMessages, basicAllowance) => {
    return {
        allowedMessages,
        allowance: any.Any.fromPartial({
            typeUrl: BasicAllowanceTypeUrl,
            value: feegrant.BasicAllowance.encode(basicAllowance).finish(),
        }),
    };
};
const newMsgGrantAllowance = (grantee, granter, allowedMsgAllowance) => {
    return {
        grantee,
        granter,
        allowance: any.Any.fromPartial({
            typeUrl: AllowedMsgAllowanceTypeUrl,
            value: feegrant.AllowedMsgAllowance.encode(allowedMsgAllowance).finish(),
        }),
    };
};
const newMarshal = (amount, denom = DEFAULT_DENOM, allowed_messages, expirationTime) => {
    return {
        '@type': AllowedMsgAllowanceTypeUrl,
        allowance: {
            '@type': BasicAllowanceTypeUrl,
            expiration: helpers.fromTimestamp(expirationTime),
            spend_limit: [
                {
                    amount,
                    denom,
                },
            ],
        },
        allowed_messages,
    };
};

const IP_REGEX = /^(\d+\.){3}\d+$/g;
const ALLOW_REGEX = /^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]$/g;
const dotdotComponent = '..';
const dotComponent = '.';
const slashSeparator = '/';
const verifyBucketName = (bucketName) => {
    if (!bucketName) {
        throw new Error('Bucket name is empty, please check.');
    }
    const length = bucketName.length;
    if (length < 3 || length > 63) {
        throw new Error(`Bucket name length is required to be between 3~63, please check.`);
    }
    if (bucketName.match(IP_REGEX)) {
        throw new Error('The bucket name %s cannot be formatted as an IP address, please check.');
    }
    if (bucketName.includes('..') || bucketName.includes('.-') || bucketName.includes('-.')) {
        throw new Error('Bucket name contains invalid characters, please check.');
    }
    if (!bucketName.match(ALLOW_REGEX)) {
        throw new Error('Bucket name can only include lowercase letters, numbers, commas and hyphen, please check.');
    }
    if (bucketName[0] === '-' ||
        bucketName[length - 1] === '-' ||
        bucketName[0] === '.' ||
        bucketName[length - 1] === '.') {
        throw new Error('Bucket name %must start and end with a lowercase letter or number, please check.');
    }
};
const hasBadPathComponent = (path) => {
    const newPath = path.trim();
    for (const p of newPath.split(slashSeparator)) {
        switch (p.trim()) {
            case dotdotComponent:
            case dotComponent:
                return true;
        }
    }
    return false;
};
const isUTF8 = (str) => {
    try {
        new TextDecoder('utf-8').decode(new TextEncoder().encode(str));
        return true;
    }
    catch (_a) {
        return false;
    }
};
const verifyObjectName = (objectName) => {
    if (!objectName) {
        throw new Error('Object name is empty, please check.');
    }
    if (objectName.length > 1024) {
        throw new Error('Object name is limited to 1024 at most, please check.');
    }
    if (hasBadPathComponent(objectName)) {
        throw new Error('Object name error, please check.');
    }
    if (!isUTF8(objectName)) {
        throw new Error('Object name is not in UTF-8 format, please check.');
    }
    if (objectName.includes(`//`)) {
        throw new Error(`Object name that contains a "//" is not supported`);
    }
};
const verifyAddress = (address) => {
    if (!address)
        throw new Error('Address is empty, please check.');
    if (address.length > 1024)
        throw new Error('Address is limited to 1024 at most, please check.');
};
const verifyUrl = (url) => {
    if (!url || url.length === 0)
        return false;
    const pattern = new RegExp('^(https?:\\/\\/)?' + // 协议
        '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+' + // 域名
        '[a-zA-Z]{2,13})' + // 顶级域名
        '(\\:\\d{1,5})?' + // 端口号
        '(\\/[-a-zA-Z\\d%_.~+]*)*' + // 路径
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 查询字符串
        '(\\#[-a-zA-Z\\d_]*)?$', // 锚点
    'i');
    if (!pattern.test(url))
        throw new Error('Invalid endpoint');
};
// remove specified from prefix and suffix of a string
const trimString = (originString, deleteString) => {
    const delStrLength = deleteString.length;
    if (originString.startsWith(deleteString)) {
        originString = originString.substring(delStrLength);
    }
    if (originString.endsWith(deleteString)) {
        originString = originString.substring(0, originString.length - delStrLength);
    }
    return originString;
};
const generateUrlByBucketName = (endpoint = '', bucketName) => {
    verifyBucketName(bucketName);
    verifyUrl(endpoint);
    const { protocol } = new URL(endpoint);
    return endpoint.replace(`${protocol}//`, `${protocol}//${bucketName}.`);
};
const isSQLInjection = (input) => {
    // define patterns that may indicate SQL injection
    const patterns = [
        /;.*select/,
        /;.*insert/,
        /;.*update/,
        /;.*delete/,
        /;.*drop/,
        /;.*alter/,
        /\/\*[\s\S]*?\*\//, // Matches SQL block comment
    ];
    for (const pattern of patterns) {
        const match = pattern.test(input);
        if (match) {
            return true;
        }
    }
    return false;
};
// CheckObjectName  This code block checks for unsupported or potentially risky formats in object names.
// The checks are essential for ensuring the security and compatibility of the object names within the system.
// 1. ".." in object names: Checked to prevent path traversal attacks which might access directories outside the intended scope.
// 2. Object name being "/": The root directory should not be used as an object name due to potential security risks and ambiguity.
// 3. "\\" in object names: Backslashes are checked because they are often not supported in UNIX-like file systems and can cause issues in path parsing.
// 4. SQL Injection patterns in object names: Ensures that the object name does not contain patterns that could be used for SQL injection attacks, maintaining the integrity of the database.
const checkObjectName = (objectName) => {
    if (objectName.includes('..') ||
        objectName === '/' ||
        objectName.includes('\\') ||
        isSQLInjection(objectName)) {
        throw new Error(`fail to check object name: ${objectName}`);
    }
};

const toHex = (char = '') => {
    return char.charCodeAt(0).toString(16);
};
const encodeToHex = (str = '') => {
    return str.split('').map(toHex).join('');
};
const decodeFromHex = (hex = '') => {
    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
        result.push(String.fromCharCode(parseInt(hex.substr(i, 2), 16)));
    }
    return result.join('');
};
const encodeObjectToHexString = (jsonObject) => {
    const utf8Encoder = new TextEncoder();
    const utf8Bytes = utf8Encoder.encode(JSON.stringify(jsonObject));
    return Array.from(utf8Bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
};
const encodeToHexString = (str = '') => {
    const utf8Encoder = new TextEncoder();
    const utf8Bytes = utf8Encoder.encode(str);
    return Array.from(utf8Bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
};
const hexToBytes = (hex = '') => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
};
function uint8ArrayToJson(uint8Array) {
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(uint8Array);
    return JSON.parse(jsonString);
}
const decodeObjectFromHexString = (hex = '') => {
    return uint8ArrayToJson(hexToBytes(hex));
};

const BucketTypeAbbr = 'b';
const ObjectTypeAbbr = 'o';
const GroupTypeAbbr = 'g';
const newBucketGRN = (bucketName) => {
    return {
        resType: types.ResourceType.RESOURCE_TYPE_BUCKET,
        groupOwner: '',
        name: bucketName,
    };
};
const newObjectGRN = (bucketName, objectName) => {
    const name = [bucketName, objectName].join('/');
    return {
        name,
        resType: types.ResourceType.RESOURCE_TYPE_OBJECT,
        groupOwner: '',
    };
};
const newGroupGRN = (owner, groupName) => {
    return {
        resType: types.ResourceType.RESOURCE_TYPE_GROUP,
        groupOwner: owner,
        name: groupName,
    };
};
const GRNToString = (grn) => {
    let res = '';
    switch (grn.resType) {
        case types.ResourceType.RESOURCE_TYPE_BUCKET:
            res = `grn:${BucketTypeAbbr}::${grn.name}`;
            break;
        case types.ResourceType.RESOURCE_TYPE_OBJECT:
            res = `grn:${ObjectTypeAbbr}::${grn.name}`;
            break;
        case types.ResourceType.RESOURCE_TYPE_GROUP:
            res = `grn:${GroupTypeAbbr}:${grn.groupOwner}:${grn.name}`;
            break;
        default:
            return '';
    }
    return res.trim();
};

const getUtcZeroTimestamp = () => {
    dayjs__default["default"].extend(utc__default["default"]);
    return dayjs__default["default"]().utc().valueOf();
};
const convertTimeStampToDate = (utcTimestamp) => {
    dayjs__default["default"].extend(utc__default["default"]);
    dayjs__default["default"].extend(timezone__default["default"]);
    // utc-0 timezone
    const tz = 'Iceland';
    return dayjs__default["default"](utcTimestamp).tz(tz).format();
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_bucket_read_records.md
const getListBucketReadRecordMetaInfo = (endpoint, params) => {
    const { bucketName, endTimeStamp, maxRecords, startTimeStamp } = params;
    const path = '/';
    const queryMap = {
        'list-read-record': 'null',
        'end-timestamp': String(endTimeStamp),
        'max-records': String(maxRecords),
        'start-timestamp': String(startTimeStamp),
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: url.hostname,
            query: url.searchParams.toString(),
            path,
        },
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
};
const parseListBucketReadRecordResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let readRecords = ((_a = res.GetBucketReadQuotaResult) === null || _a === void 0 ? void 0 : _a.ReadRecords) || [];
    if (readRecords) {
        if (!Array.isArray(readRecords)) {
            readRecords = [readRecords];
        }
        readRecords = readRecords.map((readRecord) => formatReadRecord(readRecord));
    }
    res.GetBucketReadQuotaResult = Object.assign(Object.assign({}, res.GetBucketReadQuotaResult), { ReadRecords: readRecords });
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_buckets_by_ids.md
const getListBucketsByIDsMetaInfo = (endpoint, params) => {
    const path = '/';
    const queryMap = {
        ids: params.ids.join(','),
        'buckets-query': 'null',
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseListBucketsByIdsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let BucketEntry = res.GfSpListBucketsByIDsResponse.BucketEntry || [];
    if (BucketEntry) {
        if (!Array.isArray(BucketEntry)) {
            BucketEntry = [BucketEntry];
        }
        BucketEntry = BucketEntry.map((item) => {
            let Value = item.Value;
            if (Value) {
                Value = Object.assign(Object.assign({}, item.Value), { BucketInfo: formatBucketInfo(item.Value.BucketInfo), 
                    // @ts-ignore
                    Removed: convertStrToBool(item.Value.Removed), UpdateAt: Number(item.Value.UpdateAt), DeleteAt: Number(item.Value.DeleteAt) });
            }
            return Object.assign(Object.assign({}, item), { Id: Number(item.Id), Value });
        });
    }
    res.GfSpListBucketsByIDsResponse = Object.assign(Object.assign({}, res.GfSpListBucketsByIDsResponse), { BucketEntry });
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_payment_account_streams.md
const getListBucketByPaymentMetaInfo = (endpoint, params) => {
    const path = '/';
    const queryMap = {
        'payment-buckets': 'null',
        'payment-account': params.paymentAccount,
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseListBucketByPaymentResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Buckets = res.GfSpListPaymentAccountStreamsResponse.Buckets || [];
    if (Buckets) {
        if (!Array.isArray(Buckets)) {
            Buckets = [Buckets];
        }
        Buckets = Buckets.map((item) => {
            return Object.assign(Object.assign({}, item), { BucketInfo: formatBucketInfo(item.BucketInfo), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), DeleteAt: Number(item.DeleteAt), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime) });
        });
    }
    res.GfSpListPaymentAccountStreamsResponse = {
        Buckets,
    };
    return res;
};

const parseError = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return {
        code: res.Error.Code,
        message: res.Error.Message,
    };
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/query_bucket_read_quota.md
const getQueryBucketReadQuotaMetaInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month, bucketName } = params;
    const currentDate = new Date();
    const finalYear = year ? year : currentDate.getFullYear();
    const finalMonth = month ? month : currentDate.getMonth() + 1;
    // format month to 2 digits, like "01"
    const formattedMonth = finalMonth.toString().padStart(2, '0');
    const path = '/';
    const queryMap = {
        'year-month': `${finalYear}-${formattedMonth}`,
        'read-quota': 'null',
    };
    const query = getSortQuery(queryMap);
    const url = `${generateUrlByBucketName(endpoint, bucketName)}${path}?${query}`;
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: new URL(url).hostname,
            query,
            path,
        },
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url,
        optionsWithOutHeaders,
        reqMeta,
    };
});
const parseReadQuotaResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return res;
});

function delayMs(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('request time out'));
        }, duration);
    });
}
const fetchWithTimeout = (fetchUrl = '', fetchOptions = {}, duration = 30000) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (yield Promise.race([
            delayMs(duration),
            fetch__default["default"](fetchUrl, fetchOptions),
        ]));
        return response;
    }
    catch (error) {
        return Promise.reject(error);
    }
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_object.md
const getGetObjectMetaInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName } = params;
    const path = `/${encodePath(objectName)}`;
    const query = '';
    const url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: new URL(url).hostname,
            query,
            path,
        },
        contentType: 'application/octet-stream',
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/put_object.md
const getPutObjectMetaInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName, txnHash, contentType, body, delegatedOpts } = params;
    const path = `/${encodePath(objectName)}`;
    let queryMap = {};
    if (delegatedOpts) {
        queryMap = {
            delegate: '',
            payload_size: String(body.size),
            visibility: delegatedOpts.visibility.toString(),
            is_update: String(delegatedOpts.isUpdate || false),
        };
    }
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        txnHash: txnHash,
        method: METHOD_PUT,
        url: {
            hostname: url.hostname,
            query: url.searchParams.toString(),
            path,
        },
        contentType,
    };
    const optionsWithOutHeaders = {
        method: METHOD_PUT,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
        file: body,
    };
});

let SpClient = class SpClient {
    callApi(url, options, timeout = 30000, customError) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const controller = new AbortController();
                const _id = setTimeout(() => controller.abort(), timeout);
                const response = yield fetchWithTimeout(url, Object.assign(Object.assign({}, options), { signal: controller.signal }), timeout);
                clearTimeout(_id);
                const { status } = response;
                if (status === SP_NOT_AVAILABLE_ERROR_CODE) {
                    throw {
                        code: SP_NOT_AVAILABLE_ERROR_CODE,
                        message: SP_NOT_AVAILABLE_ERROR_MSG,
                        statusCode: status,
                    };
                }
                if (!response.ok) {
                    const xmlError = yield response.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || (customError === null || customError === void 0 ? void 0 : customError.code),
                        message: message || (customError === null || customError === void 0 ? void 0 : customError.message),
                        statusCode: status,
                    };
                }
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    callApiV2(url, options, timeout = 30000, customError) {
        return __awaiter(this, void 0, void 0, function* () {
            assertHttpMethod(options.method);
            try {
                const R = new superagent__default["default"].Request(options.method, url);
                if (options.headers) {
                    options.headers.forEach((v, k) => {
                        R.set(k, v);
                    });
                }
                R.timeout(timeout);
                R.ok((res) => res.status < 500);
                const response = yield R.send();
                const { status } = response;
                if (status === SP_NOT_AVAILABLE_ERROR_CODE) {
                    throw {
                        code: SP_NOT_AVAILABLE_ERROR_CODE,
                        message: SP_NOT_AVAILABLE_ERROR_MSG,
                        statusCode: status,
                    };
                }
                if (!response.ok) {
                    const xmlError = response.text;
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || (customError === null || customError === void 0 ? void 0 : customError.code),
                        message: message || (customError === null || customError === void 0 ? void 0 : customError.message),
                        statusCode: status,
                    };
                }
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * just use for uploading object:
     * because fetch can't support upload progress
     */
    upload(url, options, timeout, uploadFile, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const R = superagent__default["default"].put(url);
            R.timeout(timeout);
            R.ok((res) => res.status < 500);
            if (options.headers) {
                options.headers.forEach((v, k) => {
                    R.set(k, v);
                });
            }
            if (callback && callback.onProgress) {
                R.on('progress', (e) => {
                    var _a;
                    (_a = callback.onProgress) === null || _a === void 0 ? void 0 : _a.call(callback, e);
                });
            }
            const file = assertFileType(uploadFile) ? uploadFile.content : uploadFile;
            // https://ladjs.github.io/superagent/docs/index.html#serializing-request-body
            const sendFile = browserOrNode.isNode && R.get('Content-Type') === 'application/json' ? file.toString() : file;
            if (browserOrNode.isNode) {
                R.buffer(true);
            }
            try {
                const response = yield R.send(sendFile);
                const { status } = response;
                if (status === SP_NOT_AVAILABLE_ERROR_CODE) {
                    throw {
                        code: SP_NOT_AVAILABLE_ERROR_CODE,
                        message: SP_NOT_AVAILABLE_ERROR_MSG,
                        statusCode: status,
                    };
                }
                if (!response.ok) {
                    const xmlError = response.text;
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: ((_a = callback === null || callback === void 0 ? void 0 : callback.customError) === null || _a === void 0 ? void 0 : _a.code) || code,
                        message: ((_b = callback === null || callback === void 0 ? void 0 : callback.customError) === null || _b === void 0 ? void 0 : _b.message) || message,
                        statusCode: status,
                    };
                }
                return response;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    signHeaders(reqMeta, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const metaHeaders = newRequestHeadersByMeta(reqMeta);
            if (authType.type === 'EDDSA') {
                const { domain, address, seed } = authType;
                const pubKey = bytes.hexlify(ed25519.ed25519.getPublicKey(seed.slice(2)));
                metaHeaders.set(HTTPHeaderUserAddress, address);
                metaHeaders.set(HTTPHeaderAppDomain, domain);
                metaHeaders.set(HTTPHeaderRegPubKey, pubKey.slice(2));
            }
            const canonicalRequest = getCanonicalRequest(reqMeta, metaHeaders);
            const auth = getAuthorization(canonicalRequest, authType);
            metaHeaders.set(HTTPHeaderAuthorization, auth);
            return metaHeaders;
        });
    }
    getMetaInfo() {
        return {
            PUT_OBJECT: getPutObjectMetaInfo,
            GET_OBJECT: getGetObjectMetaInfo,
        };
    }
};
SpClient = __decorate([
    tsyringe.injectable()
], SpClient);

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_group_list.md
const getListGroupMetaInfo = (endpoint, params) => {
    const { name, prefix, sourceType, limit, offset } = params;
    const path = '/';
    const queryMap = {
        'group-query': 'null',
        name,
        prefix,
        'source-type': sourceType,
        limit: String(limit),
        offset: String(offset),
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseListGroupsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetGroupListResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return Object.assign(Object.assign({}, item), { CreateAt: Number(item.CreateAt), CreateTime: Number(item.CreateTime), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), Group: formatGroupInfo(item.Group) });
        });
    }
    res.GfSpGetGroupListResponse = {
        Groups: Groups,
        Count: Number(res.GfSpGetGroupListResponse.Count),
    };
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_group_members.md
const parseListGroupsMembersResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetGroupMembersResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return Object.assign(Object.assign({}, item), { CreateAt: Number(item.CreateAt), CreateTime: Number(item.CreateTime), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), Group: formatGroupInfo(item.Group) });
        });
    }
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_user_groups.md
const parseListUserGroupsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetUserGroupsResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return Object.assign(Object.assign({}, item), { CreateAt: Number(item.CreateAt), CreateTime: Number(item.CreateTime), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), Group: formatGroupInfo(item.Group) });
        });
    }
    res.GfSpGetUserGroupsResponse = {
        Groups: Groups,
    };
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_user_owned_groups.md
const parseListUserOwnedGroupsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetUserOwnedGroupsResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return Object.assign(Object.assign({}, item), { CreateAt: Number(item.CreateAt), CreateTime: Number(item.CreateTime), UpdateAt: Number(item.UpdateAt), UpdateTime: Number(item.UpdateTime), 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), Group: formatGroupInfo(item.Group) });
        });
    }
    res.GfSpGetUserOwnedGroupsResponse = {
        Groups: Groups,
    };
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/verify_permission.md
const parseVerifyPermissionResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.QueryVerifyPermissionResponse = Object.assign(Object.assign({}, res.QueryVerifyPermissionResponse), { Effect: Number(res.QueryVerifyPermissionResponse.Effect) });
    return res;
});

const MsgSettleSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'global_virtual_group_family_id',
            type: 'uint32',
        },
        {
            name: 'global_virtual_group_ids',
            type: 'uint32[]',
        },
        {
            name: 'storage_provider',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

let VirtualGroup = class VirtualGroup {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    params() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.Params();
        });
    }
    getGlobalVirtualGroup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.GlobalVirtualGroup(request);
        });
    }
    getGlobalVirtualGroupByFamilyID(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.GlobalVirtualGroupByFamilyID(request);
        });
    }
    getGlobalVirtualGroupFamilies(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.GlobalVirtualGroupFamilies(request);
        });
    }
    getGlobalVirtualGroupFamily(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.GlobalVirtualGroupFamily(request);
        });
    }
    getSpOptimalGlobalVirtualGroupFamily(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.QuerySpOptimalGlobalVirtualGroupFamily(request);
        });
    }
    getSpAvailableGlobalVirtualGroupFamilies(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getVirtualGroupClient();
            return yield rpc.QuerySpAvailableGlobalVirtualGroupFamilies(request);
        });
    }
    settle(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSettleTypeUrl, address, MsgSettleSDKTypeEIP712, tx$4.MsgSettle.toSDK(msg), tx$4.MsgSettle.encode(msg).finish());
        });
    }
};
VirtualGroup = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], VirtualGroup);

let Sp = class Sp {
    constructor() {
        this.bucket = tsyringe.container.resolve(Bucket);
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
        this.virtualGroup = tsyringe.container.resolve(VirtualGroup);
        this.spClient = tsyringe.container.resolve(SpClient);
    }
    getStorageProviders() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            const res = yield rpc.StorageProviders();
            return res.sps;
        });
    }
    getStorageProviderInfo(spId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            const res = yield rpc.StorageProvider({
                id: spId,
            });
            return res.storageProvider;
        });
    }
    getQuerySpStoragePrice(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            return yield rpc.QuerySpStoragePrice(request);
        });
    }
    getQueryGlobalSpStorePriceByTime(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            return yield rpc.QueryGlobalSpStorePriceByTime(request);
        });
    }
    getStorageProviderByOperatorAddress(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            return yield rpc.StorageProviderByOperatorAddress(request);
        });
    }
    getStorageProviderMaintenanceRecordsByOperatorAddress(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            return yield rpc.StorageProviderMaintenanceRecordsByOperatorAddress(request);
        });
    }
    getSPUrlById(primaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const spList = yield this.getStorageProviders();
            return spList.filter((sp) => sp.id === primaryId)[0].endpoint;
        });
    }
    getSPUrlByBucket(bucketName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketInfo } = yield this.bucket.headBucket(bucketName);
            if (!bucketInfo)
                throw new Error('Get bucket info error');
            const familyResp = yield this.virtualGroup.getGlobalVirtualGroupFamily({
                familyId: bucketInfo.globalVirtualGroupFamilyId,
            });
            const spList = yield this.getStorageProviders();
            const spId = (_a = familyResp.globalVirtualGroupFamily) === null || _a === void 0 ? void 0 : _a.primarySpId;
            return spList.filter((sp) => sp.id === spId)[0].endpoint;
        });
    }
    getSPUrlByPrimaryAddr(parimaryAddr) {
        return __awaiter(this, void 0, void 0, function* () {
            const sps = yield this.getStorageProviders();
            return sps.filter((sp) => sp.operatorAddress === parimaryAddr)[0].endpoint;
        });
    }
    params() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getSpQueryClient();
            return yield rpc.Params();
        });
    }
    getInServiceSP() {
        return __awaiter(this, void 0, void 0, function* () {
            const sps = yield this.getStorageProviders();
            const spList = sps.filter((sp) => sp.status === types$1.Status.STATUS_IN_SERVICE);
            if (spList.length === 0)
                throw new Error('No storage provider found');
            return spList[0];
        });
    }
    listGroups(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, prefix } = params;
                let res = {
                    GfSpGetGroupListResponse: {
                        Groups: [],
                        Count: 0,
                    },
                };
                if (name === '' || prefix === '') {
                    return {
                        code: 0,
                        message: 'success',
                        body: res,
                    };
                }
                const sp = yield this.getInServiceSP();
                const { url } = getListGroupMetaInfo(sp.endpoint, params);
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                res = yield parseListGroupsResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    verifyPermission(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { action, bucketName, objectName, operator } = params;
                const sp = yield this.getInServiceSP();
                let url = `${sp.endpoint}/permission/${operator}/${bucketName}/${common.actionTypeFromJSON(action)}`;
                if (objectName) {
                    url += `?object=${encodePath(objectName)}`;
                }
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseVerifyPermissionResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listGroupsMembers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId, limit, startAfter } = params;
                const sp = yield this.getInServiceSP();
                let url = `${sp.endpoint}?group-members&group-id=${groupId}`;
                if (limit) {
                    url += `&limit=${limit}`;
                }
                if (startAfter) {
                    url += `&start-after=${startAfter}`;
                }
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListGroupsMembersResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listUserGroups(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, limit, startAfter } = params;
                const sp = yield this.getInServiceSP();
                let url = `${sp.endpoint}?user-groups`;
                if (limit) {
                    url += `&limit=${limit}`;
                }
                if (startAfter) {
                    url += `&start-after=${startAfter}`;
                }
                const headers = new Headers({
                    [HTTPHeaderUserAddress]: address,
                });
                const result = yield this.spClient.callApi(url, {
                    headers,
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListUserGroupsResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listUserOwnedGroups(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, limit, startAfter } = params;
                const sp = yield this.getInServiceSP();
                let url = `${sp.endpoint}?owned-groups`;
                if (limit) {
                    url += `&limit=${limit}`;
                }
                if (startAfter) {
                    url += `&start-after=${startAfter}`;
                }
                const headers = new Headers({
                    [HTTPHeaderUserAddress]: address,
                });
                const result = yield this.spClient.callApi(url, {
                    headers,
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListUserOwnedGroupsResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
};
Sp = __decorate([
    tsyringe.injectable()
], Sp);

let Storage = class Storage {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    params() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.Params();
        });
    }
    putPolicy(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const toSdk = tx$5.MsgPutPolicy.toSDK(msg);
            return yield this.txClient.tx(MsgPutPolicyTypeUrl, msg.operator, getMsgPutPolicySDKTypeEIP712(msg.statements[0].resources), Object.assign(Object.assign({}, toSdk), { expiration_time: msg.expirationTime ? helpers.fromTimestamp(msg.expirationTime) : '', statements: toSdk.statements.map((e) => {
                    if (e.expiration_time) {
                        // @ts-ignore
                        e.expiration_time = helpers.fromTimestamp(e.expiration_time);
                    }
                    else {
                        // @ts-ignore
                        e.expiration_time = '';
                    }
                    if (e.resources.length == 0) {
                        // @ts-ignore
                        e.resources = null;
                    }
                    return e;
                }) }), tx$5.MsgPutPolicy.encode(msg).finish());
        });
    }
    deletePolicy(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDeletePolicyTypeUrl, msg.operator, MsgDeletePolicySDKTypeEIP712, tx$5.MsgDeletePolicy.toSDK(msg), tx$5.MsgDeletePolicy.encode(msg).finish());
        });
    }
    setTag(msg) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const isTagsEmpty = ((_b = (_a = msg === null || msg === void 0 ? void 0 : msg.tags) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.length) === 0;
            const MsgSetTagSDKTypeEIP712 = getMsgSetTagSDKTypeEIP712(isTagsEmpty);
            return yield this.txClient.tx(MsgSetTagTypeUrl, msg.operator, MsgSetTagSDKTypeEIP712, tx$5.MsgSetTag.toSDK(msg), tx$5.MsgSetTag.encode(msg).finish());
        });
    }
    getPolicyForGroup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryPolicyForGroup(request);
        });
    }
    getQueryPolicyForAccount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryPolicyForAccount(request);
        });
    }
    getQueryPolicyForGroup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryPolicyForGroup(request);
        });
    }
    getQueryPolicyById(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryPolicyById(request);
        });
    }
    queryLockFee(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryLockFee(request);
        });
    }
    queryGroupMembersExist(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryGroupMembersExist(request);
        });
    }
    queryGroupExist(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryGroupsExist(request);
        });
    }
    queryGroupsExistById(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.QueryGroupsExistById(request);
        });
    }
};
Storage = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Storage);

const MsgCancelMigrateBucketSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bucket_name',
            type: 'string',
        },
        {
            name: 'operator',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
};

let Bucket = class Bucket {
    constructor(txClient, sp, storage, virtualGroup) {
        this.txClient = txClient;
        this.sp = sp;
        this.storage = storage;
        this.virtualGroup = virtualGroup;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
        this.spClient = tsyringe.container.resolve(SpClient);
    }
    setPaymentAccountFlowRateLimit(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSetBucketFlowRateLimitTypeUrl, msg.operator, MsgSetBucketFlowRateLimitSDKTypeEIP712, tx$5.MsgSetBucketFlowRateLimit.toSDK(msg), tx$5.MsgSetBucketFlowRateLimit.encode(msg).finish());
        });
    }
    createBucket(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            assertStringRequire(msg.primarySpAddress, 'Primary sp address is missing');
            assertStringRequire(msg.creator, 'Empty creator address');
            verifyBucketName(msg.bucketName);
            const { storageProvider } = yield this.sp.getStorageProviderByOperatorAddress({
                operatorAddress: msg.primarySpAddress,
            });
            if (!storageProvider) {
                throw new Error(`Storage provider ${msg.primarySpAddress} not found`);
            }
            const { globalVirtualGroupFamilyId } = yield this.virtualGroup.getSpOptimalGlobalVirtualGroupFamily({
                spId: storageProvider.id,
                pickVgfStrategy: common$2.PickVGFStrategy.Strategy_Oldest_Create_Time,
            });
            const createBucketMsg = Object.assign(Object.assign({}, msg), { primarySpApproval: {
                    globalVirtualGroupFamilyId: globalVirtualGroupFamilyId,
                    expiredHeight: Long__default["default"].fromInt(0),
                    sig: Uint8Array.from([]),
                } });
            return yield this.txClient.tx(MsgCreateBucketTypeUrl, msg.creator, MsgCreateBucketSDKTypeEIP712, Object.assign(Object.assign({}, tx$5.MsgCreateBucket.toSDK(createBucketMsg)), { primary_sp_approval: {
                    expired_height: '0',
                    global_virtual_group_family_id: globalVirtualGroupFamilyId,
                }, charged_read_quota: createBucketMsg.chargedReadQuota.toString() }), tx$5.MsgCreateBucket.encode(createBucketMsg).finish());
        });
    }
    deleteBucket(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDeleteBucketTypeUrl, msg.operator, MsgDeleteBucketSDKTypeEIP712, tx$5.MsgDeleteBucket.toSDK(msg), tx$5.MsgDeleteBucket.encode(msg).finish());
        });
    }
    toggleSpAsDelegatedAgent(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketInfo } = yield this.headBucket(msg.bucketName);
            if (!bucketInfo) {
                throw new Error(`Bucket ${msg.bucketName} not found`);
            }
            return yield this.txClient.tx(MsgToggleSPAsDelegatedAgentTypeUrl, msg.operator, MsgToggleSPAsDelegatedAgentSDKTypeEIP712, tx$5.MsgToggleSPAsDelegatedAgent.toSDK(msg), tx$5.MsgToggleSPAsDelegatedAgent.encode(msg).finish());
        });
    }
    headBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadBucket({
                bucketName,
            });
        });
    }
    headBucketById(bucketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadBucketById({
                bucketId,
            });
        });
    }
    headBucketExtra(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadBucketExtra({
                bucketName,
            });
        });
    }
    headBucketNFT(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadBucketNFT(request);
        });
    }
    getVerifyPermission(bucketName, operator, actionType) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return rpc.VerifyPermission({
                bucketName,
                operator,
                objectName: '',
                actionType,
            });
        });
    }
    listBuckets(configParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, duration = 30000, endpoint } = configParam;
                verifyAddress(address);
                verifyUrl(endpoint);
                const { url } = getUserBucketMetaInfo(endpoint);
                const headers = new fetch.Headers({
                    [HTTPHeaderUserAddress]: address,
                });
                const result = yield this.spClient.callApi(url, {
                    headers,
                    method: METHOD_GET,
                }, duration);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'Get bucket error.',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseGetUserBucketsResponse(xmlData);
                return {
                    code: 0,
                    message: 'Get bucket success.',
                    statusCode: status,
                    body: res.GfSpGetUserBucketsResponse.Buckets,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    getBucketReadQuota(params, authType) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bucketName, duration = 30000 } = params;
                verifyBucketName(bucketName);
                assertAuthType(authType);
                let endpoint = params.endpoint;
                if (!endpoint) {
                    endpoint = yield this.sp.getSPUrlByBucket(bucketName);
                }
                const { url, optionsWithOutHeaders, reqMeta } = yield getQueryBucketReadQuotaMetaInfo(endpoint, params);
                const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), duration, {
                    code: -1,
                    message: 'Get Bucket Quota error.',
                });
                const xmlData = yield result.text();
                const res = yield parseReadQuotaResponse(xmlData);
                return {
                    code: 0,
                    body: {
                        readQuota: Number((_a = res.GetReadQuotaResult.ReadQuotaSize) !== null && _a !== void 0 ? _a : '0'),
                        freeQuota: Number((_b = res.GetReadQuotaResult.SPFreeReadQuotaSize) !== null && _b !== void 0 ? _b : '0'),
                        consumedQuota: Number((_c = res.GetReadQuotaResult.ReadConsumedSize) !== null && _c !== void 0 ? _c : '0'),
                        freeConsumedSize: Number((_d = res.GetReadQuotaResult.FreeConsumedSize) !== null && _d !== void 0 ? _d : '0'),
                        monthlyFreeQuota: Number((_e = res.GetReadQuotaResult.MonthlyFreeQuota) !== null && _e !== void 0 ? _e : '0'),
                        monthlyQuotaConsumedSize: Number((_f = res.GetReadQuotaResult.MonthlyQuotaConsumedSize) !== null && _f !== void 0 ? _f : '0'),
                    },
                    message: 'Get bucket read quota.',
                    statusCode: result.status,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    updateBucketInfo(srcMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = Object.assign(Object.assign({}, srcMsg), { visibility: common$1.visibilityTypeFromJSON(srcMsg.visibility), chargedReadQuota: wrapper.UInt64Value.fromPartial({
                    value: Long__default["default"].fromString(srcMsg.chargedReadQuota),
                }) });
            return yield this.txClient.tx(MsgUpdateBucketInfoTypeUrl, msg.operator, MsgUpdateBucketInfoSDKTypeEIP712, Object.assign(Object.assign({}, tx$5.MsgUpdateBucketInfo.toSDK(msg)), { charged_read_quota: {
                    value: srcMsg.chargedReadQuota,
                } }), tx$5.MsgUpdateBucketInfo.encode(msg).finish());
        });
    }
    putBucketPolicy(bucketName, srcMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newBucketGRN(bucketName));
            const msg = Object.assign(Object.assign({}, srcMsg), { resource });
            return this.storage.putPolicy(msg);
        });
    }
    deleteBucketPolicy(operator, bucketName, principalAddr, principalType) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newBucketGRN(bucketName));
            const principal = {
                type: common.principalTypeFromJSON(principalType),
                value: principalAddr,
            };
            const msg = {
                resource,
                principal,
                operator: operator,
            };
            return yield this.storage.deletePolicy(msg);
        });
    }
    getBucketPolicy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return rpc.QueryPolicyForAccount(request);
        });
    }
    getMigrateBucketApproval(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            assertAuthType(authType);
            const { bucketName, operator, dstPrimarySpId } = params;
            try {
                let endpoint = params.endpoint;
                if (!endpoint) {
                    endpoint = yield this.sp.getSPUrlById(params.dstPrimarySpId);
                }
                const { reqMeta, optionsWithOutHeaders, url } = getApprovalMetaInfo(endpoint, 'MigrateBucket', {
                    operator: operator,
                    bucket_name: bucketName,
                    dst_primary_sp_id: dstPrimarySpId,
                    dst_primary_sp_approval: {
                        expired_height: '0',
                        sig: '',
                        global_virtual_group_family_id: 0,
                    },
                });
                const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), 30000);
                const signedMsgString = result.headers.get('X-Gnfd-Signed-Msg') || '';
                const signedMsg = decodeObjectFromHexString(signedMsgString);
                return {
                    code: 0,
                    message: 'Get migrate bucket approval success.',
                    body: signedMsgString,
                    statusCode: result.status,
                    signedMsg: signedMsg,
                };
            }
            catch (error) {
                throw {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    migrateBucket(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            assertAuthType(authType);
            const { signedMsg } = yield this.getMigrateBucketApproval(params, authType);
            if (!signedMsg) {
                throw new Error('Get migrate bucket approval error');
            }
            const msg = {
                bucketName: signedMsg.bucket_name,
                operator: signedMsg.operator,
                dstPrimarySpId: signedMsg.dst_primary_sp_id,
                dstPrimarySpApproval: {
                    expiredHeight: Long__default["default"].fromString(signedMsg.dst_primary_sp_approval.expired_height),
                    globalVirtualGroupFamilyId: signedMsg.dst_primary_sp_approval.global_virtual_group_family_id,
                    sig: helpers.bytesFromBase64(signedMsg.dst_primary_sp_approval.sig),
                },
            };
            return yield this.migrateBucketTx(msg, signedMsg);
        });
    }
    cancelMigrateBucket(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgCancelMigrateBucketTypeUrl, msg.operator, MsgCancelMigrateBucketSDKTypeEIP712, tx$5.MsgCancelMigrateBucket.toSDK(msg), tx$5.MsgCancelMigrateBucket.encode(msg).finish());
        });
    }
    migrateBucketTx(msg, signedMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgMigrateBucketTypeUrl, msg.operator, MsgMigrateBucketSDKTypeEIP712, Object.assign(Object.assign({}, signedMsg), { type: MsgMigrateBucketTypeUrl, primary_sp_approval: {
                    expired_height: signedMsg.dst_primary_sp_approval.expired_height,
                    global_virtual_group_family_id: signedMsg.dst_primary_sp_approval.global_virtual_group_family_id,
                    sig: signedMsg.dst_primary_sp_approval.sig,
                } }), tx$5.MsgMigrateBucket.encode(msg).finish());
        });
    }
    getBucketMeta(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketName } = params;
            verifyBucketName(bucketName);
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            }
            const { url } = getBucketMetaInfo(endpoint, params);
            const result = yield this.spClient.callApi(url, {
                method: METHOD_GET,
            });
            const xml = yield result.text();
            const res = yield parseGetBucketMetaResponse(xml);
            return {
                code: 0,
                message: 'get bucket meta success.',
                statusCode: result.status,
                body: res,
            };
        });
    }
    listBucketReadRecords(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                assertAuthType(authType);
                const { bucketName } = params;
                let endpoint = params.endpoint;
                if (!endpoint) {
                    endpoint = yield this.sp.getSPUrlByBucket(bucketName);
                }
                verifyUrl(endpoint);
                const { url, optionsWithOutHeaders, reqMeta } = getListBucketReadRecordMetaInfo(endpoint, params);
                const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), 3000, {
                    code: -1,
                    message: 'Get Bucket Quota error.',
                });
                const xmlData = yield result.text();
                const res = yield parseListBucketReadRecordResponse(xmlData);
                return {
                    code: 0,
                    body: res,
                    message: 'success',
                    statusCode: result.status,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listBucketsByIds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ids } = params;
                const sp = yield this.sp.getInServiceSP();
                const { url } = getListBucketsByIDsMetaInfo(sp.endpoint, { ids });
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListBucketsByIdsResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listBucketsByPaymentAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sp = yield this.sp.getInServiceSP();
                const { url } = getListBucketByPaymentMetaInfo(sp.endpoint, params);
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                });
                const xmlData = yield result.text();
                const res = parseListBucketByPaymentResponse(xmlData);
                return {
                    code: 0,
                    message: 'Get bucket success.',
                    statusCode: result.status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
};
Bucket = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __param(1, tsyringe.inject(tsyringe.delay(() => Sp))),
    __param(2, tsyringe.inject(tsyringe.delay(() => Storage))),
    __param(3, tsyringe.inject(tsyringe.delay(() => VirtualGroup))),
    __metadata("design:paramtypes", [TxClient,
        Sp,
        Storage,
        VirtualGroup])
], Bucket);

let Challenge = class Challenge {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    submitChallenge(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSubmitTypeUrl, address, MsgSubmitSDKTypeEIP712, tx$6.MsgSubmit.toSDK(msg), tx$6.MsgSubmit.encode(msg).finish());
        });
    }
    attestChallenge(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgAttestTypeUrl, address, MsgAttestSDKTypeEIP712, tx$6.MsgAttest.toSDK(msg), tx$6.MsgAttest.encode(msg).finish());
        });
    }
    latestAttestedChallenges() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getChallengeQueryClient();
            return yield rpc.LatestAttestedChallenges();
        });
    }
    inturnAttestationSubmitter() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getChallengeQueryClient();
            return yield rpc.InturnAttestationSubmitter();
        });
    }
    params() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getChallengeQueryClient();
            return yield rpc.Params();
        });
    }
};
Challenge = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Challenge);

const MsgClaimSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'from_address',
            type: 'string',
        },
        {
            name: 'src_chain_id',
            type: 'uint32',
        },
        {
            name: 'dest_chain_id',
            type: 'uint32',
        },
        {
            name: 'sequence',
            type: 'uint64',
        },
        {
            name: 'timestamp',
            type: 'uint64',
        },
    ],
};

let CrossChain = class CrossChain {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    transferOut(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgTransferOutTypeUrl, msg.from, MsgTransferOutSDKTypeEIP712, tx$7.MsgTransferOut.toSDK(msg), tx$7.MsgTransferOut.encode(msg).finish());
        });
    }
    claims(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgClaimTypeUrl, msg.fromAddress, MsgClaimSDKTypeEIP712, tx$8.MsgClaim.toSDK(msg), tx$8.MsgClaim.encode(msg).finish());
        });
    }
    getChannelSendSequence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getCrosschainQueryClient();
            return yield rpc.SendSequence(request);
        });
    }
    getChannelReceiveSequence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getCrosschainQueryClient();
            return yield rpc.ReceiveSequence(request);
        });
    }
    getInturnRelayer(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getOracleQueryClient();
            return yield rpc.InturnRelayer(request);
        });
    }
    getCrosschainPackage(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getCrosschainQueryClient();
            return yield rpc.CrossChainPackage(request);
        });
    }
    mirrorGroup(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgMirrorGroupTypeUrl, msg.operator, MsgMirrorGroupSDKTypeEIP712, tx$5.MsgMirrorGroup.toSDK(msg), tx$5.MsgMirrorGroup.encode(msg).finish());
        });
    }
    mirrorBucket(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgMirrorBucketTypeUrl, msg.operator, MsgMirrorBucketSDKTypeEIP712, tx$5.MsgMirrorBucket.toSDK(msg), tx$5.MsgMirrorBucket.encode(msg).finish());
        });
    }
    mirrorObject(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgMirrorObjectTypeUrl, msg.operator, MsgMirrorObjectSDKTypeEIP712, tx$5.MsgMirrorObject.toSDK(msg), tx$5.MsgMirrorObject.encode(msg).finish());
        });
    }
    getParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getBridgeQueryClient();
            return rpc.Params();
        });
    }
};
CrossChain = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], CrossChain);

const MsgFundCommunityPoolTypeUrlSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'amount',
            type: 'TypeMsg1Amount[]',
        },
        {
            name: 'depositor',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
    TypeMsg1Amount: [
        {
            name: 'amount',
            type: 'string',
        },
        {
            name: 'denom',
            type: 'string',
        },
    ],
};

const MsgSetWithdrawAddressSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'delegator_address',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'withdraw_address',
            type: 'string',
        },
    ],
};

const MsgWithdrawDelegatorRewardSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'delegator_address',
            type: 'string',
        },
        {
            name: 'validator_address',
            type: 'string',
        },
    ],
};

const MsgWithdrawValidatorCommissionSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'validator_address',
            type: 'string',
        },
    ],
};

let Distribution = class Distribution {
    constructor(txClient) {
        this.txClient = txClient;
    }
    setWithdrawAddress(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSetWithdrawAddressTypeUrl, msg.delegatorAddress, MsgSetWithdrawAddressSDKTypeEIP712, tx.MsgSetWithdrawAddress.toSDK(msg), tx.MsgSetWithdrawAddress.encode(msg).finish());
        });
    }
    withdrawValidatorCommission(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgWithdrawValidatorCommissionTypeUrl, address, MsgWithdrawValidatorCommissionSDKTypeEIP712, tx.MsgWithdrawValidatorCommission.toSDK(msg), tx.MsgWithdrawValidatorCommission.encode(msg).finish());
        });
    }
    withdrawDelegatorReward(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgWithdrawDelegatorRewardTypeUrl, msg.delegatorAddress, MsgWithdrawDelegatorRewardSDKTypeEIP712, tx.MsgWithdrawDelegatorReward.toSDK(msg), tx.MsgWithdrawDelegatorReward.encode(msg).finish());
        });
    }
    fundCommunityPoolundComm(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgFundCommunityPoolTypeUrl, address, MsgFundCommunityPoolTypeUrlSDKTypeEIP712, tx.MsgFundCommunityPool.toSDK(msg), tx.MsgFundCommunityPool.encode(msg).finish());
        });
    }
};
Distribution = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Distribution);

const MsgGrantAllowanceSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'granter',
            type: 'string',
        },
        {
            name: 'grantee',
            type: 'string',
        },
        {
            name: 'allowance',
            type: 'TypeAny',
        },
    ],
    TypeAny: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'value',
            type: 'bytes',
        },
    ],
};

const MsgRevokeAllowanceSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'granter',
            type: 'string',
        },
        {
            name: 'grantee',
            type: 'string',
        },
    ],
};

let FeeGrant = class FeeGrant {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    grantAllowance(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, denom, allowedMessages, grantee, granter, expirationTime } = params;
            const basicAllowance = newBasicAllowance(amount, denom, expirationTime);
            const allowedMsgAllowance = newAllowedMsgAllowance(allowedMessages, basicAllowance);
            const grantAllowance = newMsgGrantAllowance(grantee, granter, allowedMsgAllowance);
            const marshal = newMarshal(amount, denom, allowedMessages, expirationTime);
            return yield this.txClient.tx(MsgGrantAllowanceTypeUrl, granter, MsgGrantAllowanceSDKTypeEIP712, Object.assign(Object.assign({}, tx$9.MsgGrantAllowance.toSDK(grantAllowance)), { allowance: {
                    // @ts-ignore
                    type: (_a = grantAllowance.allowance) === null || _a === void 0 ? void 0 : _a.typeUrl,
                    value: helpers.base64FromBytes(bytes.arrayify('0x' + encodeToHex(JSON.stringify(marshal)))),
                    // TODO: @roshan next version should return hex string
                    // value: '0x' + encodeToHex(JSON.stringify(marshal)),
                } }), tx$9.MsgGrantAllowance.encode(grantAllowance).finish());
        });
    }
    revokeAllowance(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgRevokeAllowanceTypeUrl, msg.granter, MsgRevokeAllowanceSDKTypeEIP712, tx$9.MsgRevokeAllowance.toSDK(msg), tx$9.MsgRevokeAllowance.encode(msg).finish());
        });
    }
    getAllowence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getFeeGrantQueryClient();
            return yield rpc.Allowance(request);
        });
    }
    getAllowences(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getFeeGrantQueryClient();
            return yield rpc.Allowances(request);
        });
    }
};
FeeGrant = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], FeeGrant);

let Gashub = class Gashub {
    constructor() {
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    getMsgGasParams(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getGashubClient();
            return yield rpc.MsgGasParams(request);
        });
    }
    getParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getGashubClient();
            return yield rpc.Params();
        });
    }
};
Gashub = __decorate([
    tsyringe.injectable()
], Gashub);

let Group = class Group {
    constructor(txClient, storage) {
        this.txClient = txClient;
        this.storage = storage;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    createGroup(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgCreateGroupTypeUrl, msg.creator, MsgCreateGroupSDKTypeEIP712, tx$5.MsgCreateGroup.toSDK(msg), tx$5.MsgCreateGroup.encode(msg).finish());
        });
    }
    deleteGroup(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDeleteGroupTypeUrl, msg.operator, MsgDeleteGroupSDKTypeEIP712, tx$5.MsgDeleteGroup.toSDK(msg), tx$5.MsgDeleteGroup.encode(msg).finish());
        });
    }
    updateGroupMember(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.groupName === '') {
                throw new Error('group name is empty');
            }
            if (msg.membersToAdd.length === 0 && msg.membersToDelete.length === 0) {
                throw new Error('no update member');
            }
            return yield this.txClient.tx(MsgUpdateGroupMemberTypeUrl, msg.operator, getMsgUpdateGroupMemberSDKTypeEIP712({
                membersToAdd: msg.membersToAdd,
                membersToDelete: msg.membersToDelete,
            }), Object.assign(Object.assign({}, tx$5.MsgUpdateGroupMember.toSDK(msg)), { members_to_add: msg.membersToAdd.map((x) => {
                    return {
                        member: x.member,
                        expiration_time: x.expirationTime && helpers.fromTimestamp(x.expirationTime),
                    };
                }) }), tx$5.MsgUpdateGroupMember.encode(msg).finish());
        });
    }
    updateGroupExtra(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgUpdateGroupExtraTypeUrl, msg.operator, MsgUpdateGroupExtraSDKTypeEIP712, tx$5.MsgUpdateGroupExtra.toSDK(msg), tx$5.MsgUpdateGroupExtra.encode(msg).finish());
        });
    }
    leaveGroup(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgLeaveGroupTypeUrl, address, MsgLeaveGroupSDKTypeEIP712, tx$5.MsgLeaveGroup.toSDK(msg), tx$5.MsgLeaveGroup.encode(msg).finish());
        });
    }
    headGroup(groupName, groupOwner) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadGroup({
                groupName,
                groupOwner,
            });
        });
    }
    headGroupMember(groupName, groupOwner, member) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadGroupMember({
                groupName,
                groupOwner,
                member,
            });
        });
    }
    headGroupNFT(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadGroupNFT(request);
        });
    }
    listGroup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.ListGroups(request);
        });
    }
    getPolicyOfGroup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.getPolicyForGroup(request);
        });
    }
    getBucketPolicyOfGroup(bucketName, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newBucketGRN(bucketName));
            return yield this.storage.getPolicyForGroup({
                resource,
                principalGroupId: groupId.toString(),
            });
        });
    }
    getObjectPolicyOfGroup(bucketName, objectName, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newObjectGRN(bucketName, objectName));
            return yield this.storage.getPolicyForGroup({
                resource,
                principalGroupId: groupId.toString(),
            });
        });
    }
    putGroupPolicy(owner, groupName, srcMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newGroupGRN(owner, groupName));
            const msg = Object.assign(Object.assign({}, srcMsg), { resource });
            return this.storage.putPolicy(msg);
        });
    }
};
Group = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __param(1, tsyringe.inject(tsyringe.delay(() => Storage))),
    __metadata("design:paramtypes", [TxClient,
        Storage])
], Group);

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/resumable_put_object.md
const getResumablePutObjectMetaInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName, contentType, body, offset, complete, delegatedOpts } = params;
    const path = `/${encodePath(objectName)}`;
    let queryMap = {
        offset: String(offset),
        complete: String(complete),
    };
    if (delegatedOpts) {
        queryMap = Object.assign(Object.assign({}, queryMap), { delegate: '', payload_size: String(body.size), visibility: delegatedOpts.visibility.toString(), is_update: String(delegatedOpts.isUpdate || false) });
    }
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        // txnHash: txnHash,
        method: METHOD_POST,
        url: {
            hostname: url.hostname,
            query: url.searchParams.toString(),
            path,
        },
        contentType,
    };
    const optionsWithOutHeaders = {
        method: METHOD_POST,
        body,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
});

const getDelegatedCreateFolderMetaInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName, delegatedOpts } = params;
    const path = `/${encodePath(objectName)}`;
    let queryMap = {};
    if (delegatedOpts) {
        queryMap = {
            'create-folder': '',
            payload_size: '0',
            visibility: delegatedOpts.visibility.toString(),
        };
    }
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_POST,
        url: {
            hostname: url.hostname,
            query: url.searchParams.toString(),
            path,
        },
        contentType: '',
    };
    const optionsWithOutHeaders = {
        method: METHOD_POST,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
});
const parseDelegatedCreateFolderResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_object_meta.md
const getObjectMetaInfo = (endpoint, params) => {
    const { objectName, bucketName } = params;
    const path = `${encodePath(objectName)}`;
    const queryMap = {
        'object-meta': '',
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseGetObjectMetaResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    const ObjectTmp = res.GfSpGetObjectMetaResponse.Object || {};
    if (ObjectTmp) {
        // @ts-ignore
        ObjectTmp.Removed = convertStrToBool(ObjectTmp.Removed);
        ObjectTmp.UpdateAt = Number(ObjectTmp.UpdateAt);
        ObjectTmp.DeleteAt = Number(ObjectTmp.DeleteAt);
        ObjectTmp.ObjectInfo = formatObjectInfo(ObjectTmp.ObjectInfo);
    }
    res.GfSpGetObjectMetaResponse = Object.assign(Object.assign({}, res.GfSpGetObjectMetaResponse), { Object: ObjectTmp });
    return res;
});

// Uploading object's offset
const getObjectOffsetInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName } = params;
    const path = `/${encodePath(objectName)}`;
    const queryMap = {
        'upload-context': '',
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: new URL(url).hostname,
            query: url.searchParams.toString(),
            path,
        },
        contentType: 'application/octet-stream',
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
});
const parseObjectOffsetResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.QueryResumeOffset.Offset = Number(res.QueryResumeOffset.Offset);
    return res;
};

// Object's upload-progress
const getObjectStatusInfo = (endpoint, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { bucketName, objectName } = params;
    const path = `/${encodePath(objectName)}`;
    const queryMap = {
        'upload-progress': '',
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: new URL(url).hostname,
            query: url.searchParams.toString(),
            path,
        },
        // contentType: 'application/octet-stream',
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
});
const parseObjectStatusResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return res;
};

const getListObjectPoliciesMetaInfo = (endpoint, params) => {
    const { actionType, bucketName, objectName, limit = '10', startAfter = '' } = params;
    const path = `/${encodePath(objectName)}`;
    const queryMap = {
        'object-policies': 'null',
        'start-after': startAfter,
        limit: String(limit),
        'action-type': String(common.actionTypeFromJSON(actionType)),
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseGetListObjectPoliciesResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Policies = res.GfSpListObjectPoliciesResponse.Policies || [];
    if (Policies) {
        if (!Array.isArray(Policies)) {
            Policies = [Policies];
        }
        Policies = Policies.map((item) => {
            return Object.assign(Object.assign({}, item), { PrincipalType: Number(item.ResourceType), ResourceType: Number(item.ResourceType), CreateTimestamp: Number(item.CreateTimestamp), UpdateTimestamp: Number(item.UpdateTimestamp), ExpirationTime: Number(item.ExpirationTime) });
        });
    }
    res.GfSpListObjectPoliciesResponse = {
        Policies,
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_objects_by_bucket.md
const parseListObjectsByBucketNameResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Objects = res.GfSpListObjectsByBucketNameResponse.Objects || [];
    if (Objects) {
        if (!Array.isArray(Objects)) {
            Objects = [Objects];
        }
        Objects = Objects.map((item) => {
            return Object.assign(Object.assign({}, item), { 
                // @ts-ignore
                Removed: convertStrToBool(item.Removed), UpdateAt: Number(item.UpdateAt), DeleteAt: Number(item.DeleteAt), ObjectInfo: formatObjectInfo(item.ObjectInfo) });
        });
    }
    let CommonPrefixes = res.GfSpListObjectsByBucketNameResponse.CommonPrefixes || [];
    if (CommonPrefixes) {
        if (!Array.isArray(CommonPrefixes)) {
            CommonPrefixes = [CommonPrefixes];
        }
    }
    res.GfSpListObjectsByBucketNameResponse = Object.assign(Object.assign({}, res.GfSpListObjectsByBucketNameResponse), { Objects,
        CommonPrefixes, 
        // @ts-ignore
        IsTruncated: convertStrToBool(res.GfSpListObjectsByBucketNameResponse.IsTruncated) });
    return res;
});

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_objects_by_ids.md
const getListObjectsByIDsMetaInfo = (endpoint, params) => {
    const path = '';
    const queryMap = {
        ids: params.ids.join(','),
        'objects-query': 'null',
    };
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseListObjectsByIdsResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let ObjectEntry = res.GfSpListObjectsByIDsResponse.ObjectEntry;
    if (ObjectEntry) {
        if (!Array.isArray(ObjectEntry)) {
            ObjectEntry = [ObjectEntry];
        }
        ObjectEntry = ObjectEntry.map((item) => {
            let Value = item.Value;
            if (Value) {
                Value = Object.assign(Object.assign({}, item.Value), { ObjectInfo: formatObjectInfo(item.Value.ObjectInfo), 
                    // @ts-ignore
                    Removed: convertStrToBool(item.Value.Removed), UpdateAt: Number(item.Value.UpdateAt), DeleteAt: Number(item.Value.DeleteAt) });
            }
            return Object.assign(Object.assign({}, item), { Id: Number(item.Id), Value });
        });
    }
    res.GfSpListObjectsByIDsResponse = Object.assign(Object.assign({}, res.GfSpListObjectsByIDsResponse), { ObjectEntry });
    return res;
});

let Objects = class Objects {
    constructor(txClient, storage, sp) {
        this.txClient = txClient;
        this.storage = storage;
        this.sp = sp;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
        this.spClient = tsyringe.container.resolve(SpClient);
    }
    createObject(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            verifyBucketName(msg.bucketName);
            verifyObjectName(msg.objectName);
            checkObjectName(msg.objectName);
            assertStringRequire(msg.creator, 'empty creator address');
            const createObjMsg = Object.assign(Object.assign({}, msg), { primarySpApproval: {
                    globalVirtualGroupFamilyId: 0,
                    expiredHeight: Long__default["default"].fromInt(0),
                    sig: Uint8Array.from([]),
                } });
            return yield this.txClient.tx(MsgCreateObjectTypeUrl, msg.creator, MsgCreateObjectSDKTypeEIP712, Object.assign(Object.assign({}, tx$5.MsgCreateObject.toSDK(createObjMsg)), { primary_sp_approval: {
                    expired_height: '0',
                    global_virtual_group_family_id: 0,
                }, expect_checksums: createObjMsg.expectChecksums.map((e) => helpers.base64FromBytes(e)), payload_size: createObjMsg.payloadSize.toNumber() }), tx$5.MsgCreateObject.encode(createObjMsg).finish());
        });
    }
    delegateUploadObject(params, authType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketName, objectName, body, resumableOpts, timeout = 30000, delegatedOpts, onProgress, } = params;
            assertAuthType(authType);
            verifyBucketName(bucketName);
            verifyObjectName(objectName);
            const disableResumable = (_a = resumableOpts === null || resumableOpts === void 0 ? void 0 : resumableOpts.disableResumable) !== null && _a !== void 0 ? _a : true;
            const partSize = (_b = resumableOpts === null || resumableOpts === void 0 ? void 0 : resumableOpts.partSize) !== null && _b !== void 0 ? _b : DEFAULT_PART_SIZE;
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            }
            const { params: storageParams } = yield this.storage.params();
            const maxSegmentSize = storageParams.versionedParams.maxSegmentSize.toNumber();
            if (partSize % maxSegmentSize !== 0) {
                throw new Error('partSize should be an integer multiple of the segment size: ' + maxSegmentSize);
            }
            if (body.size <= partSize || disableResumable) {
                return this.putObject({
                    endpoint,
                    bucketName,
                    objectName,
                    body,
                    authType,
                    delegatedOpts,
                    duration: timeout,
                    txnHash: '',
                    onProgress,
                });
            }
            return yield this.putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, timeout, delegatedOpts);
        });
    }
    uploadObject(params, authType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketName, objectName, body, duration = 30000, resumableOpts, onProgress } = params;
            assertAuthType(authType);
            verifyBucketName(bucketName);
            verifyObjectName(objectName);
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            }
            let txnHash = params.txnHash;
            if (!txnHash) {
                const { body } = yield this.getObjectMeta({
                    bucketName,
                    objectName,
                    endpoint,
                });
                txnHash = body.GfSpGetObjectMetaResponse.Object.CreateTxHash;
            }
            const { params: storageParams } = yield this.storage.params();
            const maxSegmentSize = storageParams.versionedParams.maxSegmentSize.toNumber();
            const disableResumable = (_a = resumableOpts === null || resumableOpts === void 0 ? void 0 : resumableOpts.disableResumable) !== null && _a !== void 0 ? _a : true;
            const partSize = (_b = resumableOpts === null || resumableOpts === void 0 ? void 0 : resumableOpts.partSize) !== null && _b !== void 0 ? _b : DEFAULT_PART_SIZE;
            if (partSize % maxSegmentSize !== 0) {
                throw new Error('partSize should be an integer multiple of the segment size: ' + maxSegmentSize);
            }
            if (body.size <= partSize || disableResumable) {
                return this.putObject({
                    endpoint,
                    bucketName,
                    objectName,
                    body,
                    txnHash,
                    authType,
                    duration,
                    onProgress,
                });
            }
            return yield this.putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, duration);
        });
    }
    putObject(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authType, body, bucketName, delegatedOpts, duration, endpoint, objectName, txnHash, onProgress, } = params;
            const { reqMeta, optionsWithOutHeaders, url, file } = yield getPutObjectMetaInfo(endpoint, {
                bucketName,
                objectName,
                contentType: body.type,
                txnHash,
                body,
                delegatedOpts,
            });
            const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
            try {
                const result = yield this.spClient.upload(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), duration, file, {
                    onProgress,
                });
                const { status } = result;
                return { code: 0, message: 'Put object success.', statusCode: status };
            }
            catch (error) {
                return {
                    code: error.code || -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    splitPartInfo(objectSize, configuredPartSize) {
        const partSizeFlt = configuredPartSize;
        // Total parts count.
        const totalPartsCount = Math.ceil(objectSize / partSizeFlt);
        // Part size.
        const partSize = partSizeFlt;
        // Last part size.
        const lastPartSize = objectSize - (totalPartsCount - 1) * partSize;
        return {
            totalPartsCount,
            partSize,
            lastPartSize,
        };
    }
    putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, timeout, delegatedOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = 0;
            if (!delegatedOpts) {
                const isObjectExist = yield this.headSPObjectInfo(bucketName, objectName, authType);
                if (!isObjectExist) {
                    throw new Error('Object does not exist');
                }
                offset = yield this.getObjectResumableUploadOffset(bucketName, objectName, authType);
            }
            const { totalPartsCount } = this.splitPartInfo(body.size, partSize);
            // split file
            const file = assertFileType(body) ? body.content : body;
            const chunks = [];
            for (let i = 0; i < totalPartsCount; i++) {
                const start = i * partSize;
                const end = Math.min(start + partSize, body.size);
                const chunk = file.slice(start, end);
                chunks.push(chunk);
            }
            let startPartNumber = offset / partSize;
            while (startPartNumber < totalPartsCount) {
                const chunkFile = new File([chunks[startPartNumber]], '');
                const { reqMeta, optionsWithOutHeaders, url } = yield getResumablePutObjectMetaInfo(endpoint, {
                    bucketName,
                    objectName,
                    contentType: body.type,
                    body: chunkFile,
                    offset: startPartNumber * partSize,
                    complete: startPartNumber === totalPartsCount - 1,
                    delegatedOpts,
                });
                const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
                try {
                    yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), timeout);
                }
                catch (error) {
                    return {
                        code: -1,
                        message: error.message,
                        statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                    };
                }
                finally {
                    startPartNumber++;
                }
            }
            return { code: 0, message: 'Put all object parts success.', statusCode: 200 };
        });
    }
    headSPObjectInfo(bucketName, objectName, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = yield this.getObjectStatusFromSp(bucketName, objectName, authType);
            if (code === 0) {
                return true;
            }
            return false;
        });
    }
    getObjectResumableUploadOffset(bucketName, objectName, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { objectInfo } = yield this.headObject(bucketName, objectName);
            if (!objectInfo) {
                throw new Error('Object not found');
            }
            if (objectInfo.objectStatus == common$1.ObjectStatus.OBJECT_STATUS_CREATED) {
                const { code, body } = yield this.getObjectOffsetFromSP(bucketName, objectName, authType);
                if (body) {
                    return body.QueryResumeOffset.Offset;
                }
            }
            return 0;
        });
    }
    getObjectOffsetFromSP(bucketName, objectName, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            const { url, optionsWithOutHeaders, reqMeta } = yield getObjectOffsetInfo(endpoint, {
                bucketName,
                objectName,
            });
            const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
            try {
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), 5000);
                // console.log('upload-context result', result);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    return {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                        body: {
                            QueryResumeOffset: {
                                Offset: 0,
                            },
                        },
                    };
                }
                const xmlData = yield result.text();
                const res = parseObjectOffsetResponse(xmlData);
                return { code: 0, message: 'get upload offset success', statusCode: status, body: res };
            }
            catch (error) {
                // console.log('err', error);
                const message = error.message;
                if (message.includes('no uploading record')) {
                    return {
                        code: -1,
                        message: message,
                        statusCode: error.code,
                        body: {
                            QueryResumeOffset: {
                                Offset: 0,
                            },
                        },
                    };
                }
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    getObjectStatusFromSp(bucketName, objectName, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            const { url, optionsWithOutHeaders, reqMeta } = yield getObjectStatusInfo(endpoint, {
                bucketName,
                objectName,
            });
            const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
            try {
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), 5000);
                // console.log('upload-progress result', result);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = parseObjectStatusResponse(xmlData);
                return { code: 0, message: 'success', statusCode: status, body: res };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    cancelCreateObject(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgCancelCreateObjectTypeUrl, msg.operator, MsgCancelCreateObjectSDKTypeEIP712, tx$5.MsgCancelCreateObject.toSDK(msg), tx$5.MsgCancelCreateObject.encode(msg).finish());
        });
    }
    deleteObject(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDeleteObjectTypeUrl, msg.operator, MsgDeleteObjectSDKTypeEIP712, tx$5.MsgDeleteObject.toSDK(msg), tx$5.MsgDeleteObject.encode(msg).finish());
        });
    }
    updateObjectInfo(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgUpdateObjectInfoTypeUrl, msg.operator, MsgUpdateObjectInfoSDKTypeEIP712, tx$5.MsgUpdateObjectInfo.toSDK(msg), tx$5.MsgUpdateObjectInfo.encode(msg).finish());
        });
    }
    headObject(bucketName, objectName) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return rpc.HeadObject({
                bucketName,
                objectName,
            });
        });
    }
    headObjectById(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return rpc.HeadObjectById({
                objectId,
            });
        });
    }
    headObjectNFT(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.HeadObjectNFT(request);
        });
    }
    getObject(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                assertAuthType(authType);
                const { bucketName, objectName, duration = 30000 } = params;
                verifyBucketName(bucketName);
                verifyObjectName(objectName);
                let endpoint = params.endpoint;
                if (!endpoint) {
                    endpoint = yield this.sp.getSPUrlByBucket(bucketName);
                }
                const { reqMeta, optionsWithOutHeaders, url } = yield getGetObjectMetaInfo(endpoint, {
                    bucketName,
                    objectName,
                });
                const headers = yield this.spClient.signHeaders(reqMeta, authType);
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers }), duration);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    return {
                        code: code || -1,
                        message: message || 'Get object error.',
                        statusCode: status,
                    };
                }
                const fileBlob = yield result.blob();
                return {
                    code: 0,
                    body: fileBlob,
                    message: 'Get object success.',
                    statusCode: status,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    getObjectPreviewUrl(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            assertAuthType(authType);
            if (authType.type === 'ECDSA') {
                throw new Error('Get object preview url only support EDDSA');
            }
            const { bucketName, objectName, queryMap } = params;
            verifyBucketName(bucketName);
            verifyObjectName(objectName);
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            }
            const path = '/' + encodePath(objectName);
            const url = generateUrlByBucketName(endpoint, bucketName) + path;
            let pubKey = '';
            if (authType.type === 'EDDSA') {
                pubKey = bytes.hexlify(ed25519.ed25519.getPublicKey(authType.seed.slice(2)));
            }
            const queryRaw = getSortQuery(Object.assign(Object.assign({}, queryMap), { [HTTPHeaderRegPubKey]: pubKey.slice(2) }));
            const canonicalRequest = [
                METHOD_GET,
                `/${encodePath(objectName)}`,
                queryRaw,
                new URL(url).host,
                '\n',
            ].join('\n');
            const auth = getAuthorization(canonicalRequest, authType);
            return `${url}?Authorization=${encodeURIComponent(auth)}&${queryRaw}`;
        });
    }
    downloadFile(configParam, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { objectName } = configParam;
                const getObjectResult = yield this.getObject(configParam, authType);
                if (getObjectResult.code !== 0) {
                    throw new Error(getObjectResult.message);
                }
                const file = getObjectResult === null || getObjectResult === void 0 ? void 0 : getObjectResult.body;
                if (file) {
                    // const {file} = getObjectResult;
                    const fileURL = URL.createObjectURL(file);
                    // create <a> tag dynamically
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    // it forces the name of the downloaded file
                    fileLink.download = objectName;
                    // triggers the click event
                    fileLink.click();
                }
                return;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listObjects(configParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bucketName, endpoint, duration = 30000, query = new URLSearchParams() } = configParam;
                verifyBucketName(bucketName);
                verifyUrl(endpoint);
                const url = `${generateUrlByBucketName(endpoint, bucketName)}?${query === null || query === void 0 ? void 0 : query.toString()}`;
                const headers = new fetch.Headers();
                const result = yield this.spClient.callApi(url, {
                    headers,
                    method: METHOD_GET,
                }, duration);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    return {
                        code: code || -1,
                        message: message || 'List object error.',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListObjectsByBucketNameResponse(xmlData);
                return {
                    code: 0,
                    message: 'List object success.',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    createFolder(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.objectName.endsWith('/')) {
                throw new Error('failed to create folder. Folder names must end with a forward slash (/) character');
            }
            /**
             * const file = new File([], 'scc', { type: 'text/plain' });
              const fileBytes = await file.arrayBuffer();
              console.log('fileBytes', fileBytes);
              const rs = new ReedSolomon();
              const fileBytes = await file.arrayBuffer();
              const expectCheckSums = rs.encode(new Uint8Array(fileBytes));
             */
            const newMsg = Object.assign(Object.assign({}, msg), { payloadSize: Long__default["default"].fromInt(0), contentType: 'text/plain', expectChecksums: [
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                    '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                ].map((x) => helpers.bytesFromBase64(x)) });
            return this.createObject(newMsg);
        });
    }
    delegateCreateFolder(params, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketName, objectName, delegatedOpts, timeout = 10000 } = params;
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(bucketName);
            }
            const { reqMeta, optionsWithOutHeaders, url } = yield getDelegatedCreateFolderMetaInfo(endpoint, {
                bucketName: bucketName,
                objectName: objectName,
                // contentType: '',
                delegatedOpts,
            });
            const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
            try {
                const result = yield this.spClient.callApiV2(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }), timeout);
                const { status } = result;
                //@ts-ignore
                const xmlData = result.text;
                const res = parseDelegatedCreateFolderResponse(xmlData);
                return { code: 0, message: 'Create folder success.', statusCode: status, body: res };
            }
            catch (error) {
                return {
                    code: error.code || -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    putObjectPolicy(bucketName, objectName, 
    // expirationTime: Date,
    srcMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newObjectGRN(bucketName, objectName));
            const msg = Object.assign(Object.assign({}, srcMsg), { resource });
            return yield this.storage.putPolicy(msg);
        });
    }
    isObjectPermissionAllowed(bucketName, objectName, actionType, operator) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            return yield rpc.VerifyPermission({
                bucketName,
                objectName,
                actionType,
                operator,
            });
        });
    }
    getObjectPolicy(bucketName, objectName, principalAddr) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getStorageQueryClient();
            const resource = GRNToString(newObjectGRN(bucketName, objectName));
            return yield rpc.QueryPolicyForAccount({
                resource,
                principalAddress: principalAddr,
            });
        });
    }
    deleteObjectPolicy(operator, bucketName, objectName, principalAddr, principalType) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = GRNToString(newObjectGRN(bucketName, objectName));
            const principal = {
                type: common.principalTypeFromJSON(principalType),
                value: principalAddr,
            };
            const msg = {
                resource,
                principal,
                operator: operator,
            };
            return yield this.storage.deletePolicy(msg);
        });
    }
    getObjectMeta(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucketName, objectName, endpoint } = params;
            verifyBucketName(bucketName);
            verifyObjectName(objectName);
            const { url } = getObjectMetaInfo(endpoint, params);
            const result = yield this.spClient.callApi(url, {
                method: METHOD_GET,
            });
            const xml = yield result.text();
            const res = yield parseGetObjectMetaResponse(xml);
            return {
                code: 0,
                message: 'get object meta success.',
                statusCode: result.status,
                body: res,
            };
        });
    }
    listObjectsByIds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sp = yield this.sp.getInServiceSP();
                const { url } = getListObjectsByIDsMetaInfo(sp.endpoint, params);
                const result = yield this.spClient.callApi(url, {
                    headers: {},
                    method: METHOD_GET,
                }, 3000);
                const { status } = result;
                if (!result.ok) {
                    const xmlError = yield result.text();
                    const { code, message } = yield parseError(xmlError);
                    throw {
                        code: code || -1,
                        message: message || 'error',
                        statusCode: status,
                    };
                }
                const xmlData = yield result.text();
                const res = yield parseListObjectsByIdsResponse(xmlData);
                return {
                    code: 0,
                    message: 'success',
                    statusCode: status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
    listObjectPolicies(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = yield this.sp.getSPUrlByBucket(params.bucketName);
            }
            const { url } = getListObjectPoliciesMetaInfo(endpoint, params);
            const result = yield this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            });
            const xml = yield result.text();
            const res = parseGetListObjectPoliciesResponse(xml);
            return {
                code: 0,
                message: 'success',
                statusCode: result.status,
                body: res,
            };
        });
    }
    getObjectUploadProgress(bucketName, objectName, authType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { objectInfo } = yield this.headObject(bucketName, objectName);
            if (!objectInfo) {
                throw new Error('object not exist');
            }
            if (objectInfo.objectStatus == common$1.ObjectStatus.OBJECT_STATUS_CREATED) {
                const { body, message } = yield this.getObjectStatusFromSp(bucketName, objectName, authType);
                if (!body) {
                    throw new Error('fail to fetch object uploading progress from sp ' + message);
                }
                return body.QueryUploadProgress.ProgressDescription;
            }
            return objectInfo.objectStatus.toString();
        });
    }
};
Objects = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __param(1, tsyringe.inject(tsyringe.delay(() => Storage))),
    __param(2, tsyringe.inject(tsyringe.delay(() => Sp))),
    __metadata("design:paramtypes", [TxClient,
        Storage,
        Sp])
], Objects);

const updateUserAccountKey = ({ address, domain, sp, pubKey, expireDate, authorization, }) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    const url = `${sp.endpoint}/auth/update_key_v2`;
    const headers = new fetch.Headers({
        'X-Gnfd-User-Address': address,
        'X-Gnfd-App-Domain': domain,
        'X-Gnfd-App-Reg-Public-Key': pubKey,
        'X-Gnfd-Expiry-Timestamp': expireDate,
        Authorization: authorization,
    });
    try {
        result = yield fetchWithTimeout(url, {
            headers,
            method: 'POST',
        });
        if (!result.ok) {
            return { code: -1, data: { address }, message: 'upload sp pubKey error.' };
        }
    }
    catch (error) {
        return { code: -1, data: { address }, message: 'upload sp pubKey error.' };
    }
    return {
        code: 0,
        data: Object.assign({}, sp),
    };
});

const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const updateSpsPubKey = ({ address, sps, domain, pubKey, expireDate, authorization, }) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all(sps.map((sp) => Promise.race([
        updateUserAccountKey({
            address,
            domain,
            sp,
            pubKey,
            expireDate,
            authorization,
        }),
        delay(3000, { code: -1, data: { address } }),
    ])));
});
const genSecondSignMsg = ({ domain, address, pubKey, chainId, issuedDate, expireDate, }) => {
    // NOTICE: DO NOT CHANGE THE TEMPLATE FORMAT
    return `${domain} wants you to sign in with your Moca Chain account:${address}
Register your identity public key ${pubKey}
URI: ${domain}
Version: 1
Chain ID: ${chainId}
Issued At: ${issuedDate}
Expiration Time: ${expireDate}
`;
};
const personalSign = ({ message, address, provider }) => __awaiter(void 0, void 0, void 0, function* () {
    const sign = yield provider.request({
        method: 'personal_sign',
        params: [message, address],
    });
    return sign;
});

let OffChainAuth = class OffChainAuth {
    genOffChainAuthKeyPairAndUpload({ sps, address, domain, expirationMs, chainId }, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { privateKey, publicKey } = this.generateKeys();
                const curUtcZeroTimestamp = getUtcZeroTimestamp();
                const expirationTime = curUtcZeroTimestamp + expirationMs;
                const issuedDate = convertTimeStampToDate(curUtcZeroTimestamp);
                const expireDate = convertTimeStampToDate(expirationTime);
                const signMsg = genSecondSignMsg({
                    domain,
                    address,
                    pubKey: bytes.hexlify(publicKey).slice(2),
                    chainId,
                    issuedDate,
                    expireDate,
                });
                const signRes = yield personalSign({ message: signMsg, address, provider });
                const jsonSignMsg = JSON.stringify(signMsg).replace(/\"/g, '');
                const authorization = `GNFD1-ETH-PERSONAL_SIGN,SignedMsg=${jsonSignMsg},Signature=${signRes}`;
                const res = yield updateSpsPubKey({
                    address,
                    sps,
                    domain,
                    pubKey: bytes.hexlify(publicKey).slice(2),
                    expireDate,
                    authorization,
                });
                const uploadSpsPubkeyFailed = res
                    .filter((item) => item.code !== 0)
                    .map((item) => item.data.address);
                if (uploadSpsPubkeyFailed.length === sps.length) {
                    throw new Error(`No SP service is available. Please try again later.`);
                }
                const successSps = [];
                res.forEach((item) => {
                    if (item.code === 0) {
                        successSps.push(item.data.address);
                    }
                });
                return {
                    code: 0,
                    body: {
                        seedString: bytes.hexlify(privateKey),
                        keypairs: {
                            privateKey: bytes.hexlify(privateKey).slice(2),
                            publicKey: bytes.hexlify(publicKey).slice(2),
                        },
                        expirationTime,
                        spAddresses: successSps,
                        failedSpAddresses: uploadSpsPubkeyFailed,
                    },
                    message: 'Sign and upload public key success',
                };
            }
            catch (error) {
                return { code: -1, message: error.message, statusCode: (error === null || error === void 0 ? void 0 : error.status) || NORMAL_ERROR_CODE };
            }
        });
    }
    generateKeys() {
        const privateKey = ed25519.ed25519.utils.randomPrivateKey();
        const publicKey = ed25519.ed25519.getPublicKey(privateKey);
        return {
            privateKey,
            publicKey,
        };
    }
};
OffChainAuth = __decorate([
    tsyringe.injectable()
], OffChainAuth);

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_user_payment_accounts.md
const getListUserPaymentAccountMetaInfo = (endpoint, params) => {
    const path = '/';
    const queryMap = {
        'user-payments': 'null',
    };
    const query = getSortQuery(queryMap);
    let url = new URL(path, endpoint);
    url = getSortQueryParams(url, queryMap);
    const reqMeta = {
        contentSHA256: EMPTY_STRING_SHA256,
        method: METHOD_GET,
        url: {
            hostname: new URL(url).hostname,
            query,
            path,
        },
        userAddress: params.account,
    };
    const optionsWithOutHeaders = {
        method: METHOD_GET,
    };
    return {
        url: url.href,
        optionsWithOutHeaders,
        reqMeta,
    };
};
const parseListUserPaymentAccountResponse = (data) => {
    const xmlParser = new fastXmlParser.XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let PaymentAccounts = res.GfSpListUserPaymentAccountsResponse.PaymentAccounts || [];
    if (PaymentAccounts) {
        if (!Array.isArray(PaymentAccounts)) {
            PaymentAccounts = [PaymentAccounts];
        }
        PaymentAccounts = PaymentAccounts.map((item) => {
            item.PaymentAccount = Object.assign(Object.assign({}, item.PaymentAccount), { 
                // @ts-ignore
                Refundable: convertStrToBool(item.PaymentAccount.Refundable), UpdateAt: Number(item.PaymentAccount.UpdateAt), UpdateTime: Number(item.PaymentAccount.UpdateTime) });
            return item;
        });
    }
    res.GfSpListUserPaymentAccountsResponse.PaymentAccounts = PaymentAccounts;
    return res;
};

let Payment = class Payment {
    constructor(txClient, sp) {
        this.txClient = txClient;
        this.sp = sp;
        this.spClient = tsyringe.container.resolve(SpClient);
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
    }
    getStreamRecord(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.StreamRecord({
                account,
            });
        });
    }
    getStreamRecordAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.StreamRecords(request);
        });
    }
    params() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.Params();
        });
    }
    paramsByTimestamp(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.ParamsByTimestamp(request);
        });
    }
    getPaymentAccountCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccountCount(request);
        });
    }
    getPaymentAccountCounts(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccountCounts(request);
        });
    }
    paymentAccount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccount(request);
        });
    }
    paymentAccountAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccounts(request);
        });
    }
    dynamicBalance(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.DynamicBalance(request);
        });
    }
    getPaymentAccountsByOwner(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.PaymentAccountsByOwner(request);
        });
    }
    getAutoSettleRecords(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.AutoSettleRecords(request);
        });
    }
    getOutFlows(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = yield this.queryClient.getPaymentQueryClient();
            return yield rpc.OutFlows(request);
        });
    }
    deposit(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDepositTypeUrl, msg.creator, MsgDepositSDKTypeEIP712, tx$3.MsgDeposit.toSDK(msg), tx$3.MsgDeposit.encode(msg).finish());
        });
    }
    withdraw(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgWithdrawTypeUrl, msg.creator, MsgWithdrawSDKTypeEIP712, tx$3.MsgWithdraw.toSDK(msg), tx$3.MsgWithdraw.encode(msg).finish());
        });
    }
    disableRefund(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgDisableRefundTypeUrl, msg.owner, MsgDisableRefundSDKTypeEIP712, tx$3.MsgDisableRefund.toSDK(msg), tx$3.MsgDisableRefund.encode(msg).finish());
        });
    }
    listUserPaymentAccounts(params, authType, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                assertAuthType(authType);
                let endpoint = '';
                if (config && config.endpoint) {
                    endpoint = config.endpoint;
                }
                else {
                    const sp = yield this.sp.getInServiceSP();
                    endpoint = sp.endpoint;
                }
                const { url, optionsWithOutHeaders, reqMeta } = getListUserPaymentAccountMetaInfo(endpoint, params);
                const signHeaders = yield this.spClient.signHeaders(reqMeta, authType);
                const result = yield this.spClient.callApi(url, Object.assign(Object.assign({}, optionsWithOutHeaders), { headers: signHeaders }));
                const xml = yield result.text();
                const res = parseListUserPaymentAccountResponse(xml);
                return {
                    code: 0,
                    message: 'Get bucket success.',
                    statusCode: result.status,
                    body: res,
                };
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || NORMAL_ERROR_CODE,
                };
            }
        });
    }
};
Payment = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __param(1, tsyringe.inject(tsyringe.delay(() => Sp))),
    __metadata("design:paramtypes", [TxClient,
        Sp])
], Payment);

const MsgSubmitProposalSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'initial_deposit',
            type: 'TypeMsg1InitialDeposit[]',
        },
        {
            name: 'messages',
            type: 'TypeAny[]',
        },
        {
            name: 'metadata',
            type: 'string',
        },
        {
            name: 'proposer',
            type: 'string',
        },
        {
            name: 'summary',
            type: 'string',
        },
        {
            name: 'title',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
    ],
    TypeMsg1InitialDeposit: [
        {
            name: 'amount',
            type: 'string',
        },
        {
            name: 'denom',
            type: 'string',
        },
    ],
    TypeAny: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'value',
            type: 'bytes',
        },
    ],
};

const MsgVoteSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'metadata',
            type: 'string',
        },
        {
            name: 'option',
            type: 'string',
        },
        {
            name: 'proposal_id',
            type: 'uint64',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'voter',
            type: 'string',
        },
    ],
};

let Proposal = class Proposal {
    constructor(txClient) {
        this.txClient = txClient;
    }
    voteProposal(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgVoteTypeUrl, msg.voter, MsgVoteSDKTypeEIP712, Object.assign(Object.assign({}, tx$a.MsgVote.toSDK(msg)), { option: gov.voteOptionToJSON(msg.option), proposal_id: msg.proposalId.toNumber() }), tx$a.MsgVote.encode(msg).finish());
        });
    }
    submitProposal(createMsg, submitMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgSubmitProposalTypeUrl, submitMsg.proposer, MsgSubmitProposalSDKTypeEIP712, Object.assign(Object.assign({}, tx$a.MsgSubmitProposal.toSDK(submitMsg)), { messages: [
                    {
                        type: '/cosmos.staking.v1beta1.MsgCreateValidator',
                        value: encodeToHex(JSON.stringify(createMsg)),
                        // base64FromBytes(arrayify('0x' + encodeToHex(JSON.stringify(createMsg)))),
                    },
                ] }), tx$a.MsgSubmitProposal.encode(submitMsg).finish());
        });
    }
};
Proposal = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Proposal);

const MsgCreateValidatorSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bls_key',
            type: 'string',
        },
        {
            name: 'bls_proof',
            type: 'string',
        },
        {
            name: 'challenger_address',
            type: 'string',
        },
        {
            name: 'commission',
            type: 'TypeMsg1Commission',
        },
        {
            name: 'delegator_address',
            type: 'string',
        },
        {
            name: 'description',
            type: 'TypeMsg1Description',
        },
        {
            name: 'from',
            type: 'string',
        },
        {
            name: 'min_self_delegation',
            type: 'string',
        },
        {
            name: 'pubkey',
            type: 'TypeAny',
        },
        {
            name: 'relayer_address',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'validator_address',
            type: 'string',
        },
        {
            name: 'value',
            type: 'TypeMsg1Value',
        },
    ],
    TypeMsg1Commission: [
        {
            name: 'max_change_rate',
            type: 'string',
        },
        {
            name: 'max_rate',
            type: 'string',
        },
        {
            name: 'rate',
            type: 'string',
        },
    ],
    TypeMsg1Description: [
        {
            name: 'details',
            type: 'string',
        },
        {
            name: 'identity',
            type: 'string',
        },
        {
            name: 'moniker',
            type: 'string',
        },
        {
            name: 'security_contact',
            type: 'string',
        },
        {
            name: 'website',
            type: 'string',
        },
    ],
    TypeMsg1Value: [
        {
            name: 'amount',
            type: 'string',
        },
        {
            name: 'denom',
            type: 'string',
        },
    ],
    TypeAny: [
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'value',
            type: 'bytes',
        },
    ],
};

const MsgEditValidatorSDKTypeEIP712 = {
    Msg1: [
        {
            name: 'bls_key',
            type: 'string',
        },
        {
            name: 'bls_proof',
            type: 'string',
        },
        {
            name: 'challenger_address',
            type: 'string',
        },
        {
            name: 'commission_rate',
            type: 'string',
        },
        {
            name: 'description',
            type: 'TypeMsg1Description',
        },
        {
            name: 'min_self_delegation',
            type: 'string',
        },
        {
            name: 'relayer_address',
            type: 'string',
        },
        {
            name: 'type',
            type: 'string',
        },
        {
            name: 'validator_address',
            type: 'string',
        },
    ],
    TypeMsg1Description: [
        {
            name: 'details',
            type: 'string',
        },
        {
            name: 'identity',
            type: 'string',
        },
        {
            name: 'moniker',
            type: 'string',
        },
        {
            name: 'security_contact',
            type: 'string',
        },
        {
            name: 'website',
            type: 'string',
        },
    ],
};

let Validator = class Validator {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = tsyringe.container.resolve(RpcQueryClient);
        this.proposal = tsyringe.container.resolve(Proposal);
    }
    listValidators(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.queryClient.getStakingClient();
            return client.Validators(request);
        });
    }
    createValidator(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgCreateValidatorTypeUrl, address, MsgCreateValidatorSDKTypeEIP712, tx$b.MsgCreateValidator.toSDK(msg), tx$b.MsgCreateValidator.encode(msg).finish());
        });
    }
    editValidator(address, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.txClient.tx(MsgEditValidatorTypeUrl, address, MsgEditValidatorSDKTypeEIP712, tx$b.MsgEditValidator.toSDK(msg), tx$b.MsgEditValidator.encode(msg).finish());
        });
    }
};
Validator = __decorate([
    tsyringe.injectable(),
    __param(0, tsyringe.inject(tsyringe.delay(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Validator);

class Client {
    /**
     * @rpcUrl string
     * @chaidId string
     * @wasmURL optional, need setting only used for browser
     */
    static create(rpcUrl, chainId) {
        tsyringe.container.register('RPC_URL', { useValue: rpcUrl });
        tsyringe.container.register('CHAIN_ID', { useValue: chainId });
        const account = tsyringe.container.resolve(Account);
        const basic = tsyringe.container.resolve(Basic);
        const bucket = tsyringe.container.resolve(Bucket);
        const challenge = tsyringe.container.resolve(Challenge);
        const crosschain = tsyringe.container.resolve(CrossChain);
        const distribution = tsyringe.container.resolve(Distribution);
        const feegrant = tsyringe.container.resolve(FeeGrant);
        const gashub = tsyringe.container.resolve(Gashub);
        const group = tsyringe.container.resolve(Group);
        const objects = tsyringe.container.resolve(Objects);
        const payment = tsyringe.container.resolve(Payment);
        const proposal = tsyringe.container.resolve(Proposal);
        const queryClient = tsyringe.container.resolve(RpcQueryClient);
        const sp = tsyringe.container.resolve(Sp);
        const spClient = tsyringe.container.resolve(SpClient);
        const storage = tsyringe.container.resolve(Storage);
        const txClient = tsyringe.container.resolve(TxClient);
        const offchainauth = tsyringe.container.resolve(OffChainAuth);
        const validator = tsyringe.container.resolve(Validator);
        const virtualGroup = tsyringe.container.resolve(VirtualGroup);
        return new Client(account, basic, bucket, challenge, crosschain, distribution, feegrant, gashub, group, objects, payment, proposal, queryClient, sp, spClient, storage, txClient, offchainauth, validator, virtualGroup);
    }
    constructor(account, basic, bucket, challenge, crosschain, distribution, feegrant, gashub, group, object, payment, proposal, queryClient, sp, spClient, storage, txClient, offchainauth, validator, virtualGroup) {
        this.account = account;
        this.basic = basic;
        this.bucket = bucket;
        this.challenge = challenge;
        this.crosschain = crosschain;
        this.distribution = distribution;
        this.feegrant = feegrant;
        this.gashub = gashub;
        this.group = group;
        this.object = object;
        this.payment = payment;
        this.proposal = proposal;
        this.queryClient = queryClient;
        this.sp = sp;
        this.spClient = spClient;
        this.storage = storage;
        this.txClient = txClient;
        this.offchainauth = offchainauth;
        this.validator = validator;
        this.virtualGroup = virtualGroup;
    }
}

const SpMetaInfo = {
    getGetObjectMetaInfo,
    getPutObjectMetaInfo,
    getQueryBucketReadQuotaMetaInfo,
};

Object.defineProperty(exports, 'Long', {
    enumerable: true,
    get: function () { return Long__default["default"]; }
});
exports.PermissionTypes = common__namespace;
Object.defineProperty(exports, 'BucketStatus', {
    enumerable: true,
    get: function () { return common$1.BucketStatus; }
});
Object.defineProperty(exports, 'ObjectStatus', {
    enumerable: true,
    get: function () { return common$1.ObjectStatus; }
});
Object.defineProperty(exports, 'RedundancyType', {
    enumerable: true,
    get: function () { return common$1.RedundancyType; }
});
Object.defineProperty(exports, 'SourceType', {
    enumerable: true,
    get: function () { return common$1.SourceType; }
});
exports.StorageEnums = common__namespace$1;
Object.defineProperty(exports, 'VisibilityType', {
    enumerable: true,
    get: function () { return common$1.VisibilityType; }
});
exports.TimestampTypes = timestamp__namespace;
exports.AllowedMsgAllowanceTypeUrl = AllowedMsgAllowanceTypeUrl;
exports.BasicAllowanceTypeUrl = BasicAllowanceTypeUrl;
exports.Client = Client;
exports.DEFAULT_DENOM = DEFAULT_DENOM;
exports.DEFAULT_PART_SIZE = DEFAULT_PART_SIZE;
exports.EMPTY_STRING_SHA256 = EMPTY_STRING_SHA256;
exports.GRNToString = GRNToString;
exports.METHOD_GET = METHOD_GET;
exports.METHOD_POST = METHOD_POST;
exports.METHOD_PUT = METHOD_PUT;
exports.MsgAttestTypeUrl = MsgAttestTypeUrl;
exports.MsgCancelCreateObjectTypeUrl = MsgCancelCreateObjectTypeUrl;
exports.MsgCancelMigrateBucketTypeUrl = MsgCancelMigrateBucketTypeUrl;
exports.MsgClaimTypeUrl = MsgClaimTypeUrl;
exports.MsgCreateBucketTypeUrl = MsgCreateBucketTypeUrl;
exports.MsgCreateGroupTypeUrl = MsgCreateGroupTypeUrl;
exports.MsgCreateObjectTypeUrl = MsgCreateObjectTypeUrl;
exports.MsgCreatePaymentAccountTypeUrl = MsgCreatePaymentAccountTypeUrl;
exports.MsgCreateValidatorTypeUrl = MsgCreateValidatorTypeUrl;
exports.MsgDeleteBucketTypeUrl = MsgDeleteBucketTypeUrl;
exports.MsgDeleteGroupTypeUrl = MsgDeleteGroupTypeUrl;
exports.MsgDeleteObjectTypeUrl = MsgDeleteObjectTypeUrl;
exports.MsgDeletePolicyTypeUrl = MsgDeletePolicyTypeUrl;
exports.MsgDepositTypeUrl = MsgDepositTypeUrl;
exports.MsgDisableRefundTypeUrl = MsgDisableRefundTypeUrl;
exports.MsgEditValidatorTypeUrl = MsgEditValidatorTypeUrl;
exports.MsgFundCommunityPoolTypeUrl = MsgFundCommunityPoolTypeUrl;
exports.MsgGrantAllowanceTypeUrl = MsgGrantAllowanceTypeUrl;
exports.MsgLeaveGroupTypeUrl = MsgLeaveGroupTypeUrl;
exports.MsgMigrateBucketTypeUrl = MsgMigrateBucketTypeUrl;
exports.MsgMirrorBucketTypeUrl = MsgMirrorBucketTypeUrl;
exports.MsgMirrorGroupTypeUrl = MsgMirrorGroupTypeUrl;
exports.MsgMirrorObjectTypeUrl = MsgMirrorObjectTypeUrl;
exports.MsgMultiSendTypeUrl = MsgMultiSendTypeUrl;
exports.MsgPutPolicyTypeUrl = MsgPutPolicyTypeUrl;
exports.MsgRevokeAllowanceTypeUrl = MsgRevokeAllowanceTypeUrl;
exports.MsgSendTypeUrl = MsgSendTypeUrl;
exports.MsgSetBucketFlowRateLimitTypeUrl = MsgSetBucketFlowRateLimitTypeUrl;
exports.MsgSetTagTypeUrl = MsgSetTagTypeUrl;
exports.MsgSetWithdrawAddressTypeUrl = MsgSetWithdrawAddressTypeUrl;
exports.MsgSettleTypeUrl = MsgSettleTypeUrl;
exports.MsgSubmitProposalTypeUrl = MsgSubmitProposalTypeUrl;
exports.MsgSubmitTypeUrl = MsgSubmitTypeUrl;
exports.MsgToggleSPAsDelegatedAgentTypeUrl = MsgToggleSPAsDelegatedAgentTypeUrl;
exports.MsgTransferOutTypeUrl = MsgTransferOutTypeUrl;
exports.MsgUpdateBucketInfoTypeUrl = MsgUpdateBucketInfoTypeUrl;
exports.MsgUpdateGroupExtraTypeUrl = MsgUpdateGroupExtraTypeUrl;
exports.MsgUpdateGroupMemberTypeUrl = MsgUpdateGroupMemberTypeUrl;
exports.MsgUpdateObjectInfoTypeUrl = MsgUpdateObjectInfoTypeUrl;
exports.MsgVoteTypeUrl = MsgVoteTypeUrl;
exports.MsgWithdrawDelegatorRewardTypeUrl = MsgWithdrawDelegatorRewardTypeUrl;
exports.MsgWithdrawTypeUrl = MsgWithdrawTypeUrl;
exports.MsgWithdrawValidatorCommissionTypeUrl = MsgWithdrawValidatorCommissionTypeUrl;
exports.NORMAL_ERROR_CODE = NORMAL_ERROR_CODE;
exports.SP_NOT_AVAILABLE_ERROR_CODE = SP_NOT_AVAILABLE_ERROR_CODE;
exports.SP_NOT_AVAILABLE_ERROR_MSG = SP_NOT_AVAILABLE_ERROR_MSG;
exports.SpMetaInfo = SpMetaInfo;
exports.ZERO_PUBKEY = ZERO_PUBKEY;
exports.assertAuthType = assertAuthType;
exports.assertFileType = assertFileType;
exports.assertHttpMethod = assertHttpMethod;
exports.assertPrivateKey = assertPrivateKey;
exports.assertStringRequire = assertStringRequire;
exports.checkObjectName = checkObjectName;
exports.convertTimeStampToDate = convertTimeStampToDate;
exports.createEIP712 = createEIP712;
exports.decodeFromHex = decodeFromHex;
exports.decodeObjectFromHexString = decodeObjectFromHexString;
exports.eip712Hash = eip712Hash;
exports.encodeObjectToHexString = encodeObjectToHexString;
exports.encodePath = encodePath;
exports.encodeToHex = encodeToHex;
exports.encodeToHexString = encodeToHexString;
exports.generateFee = generateFee;
exports.generateMessage = generateMessage;
exports.generateMsg = generateMsg;
exports.generateTypes = generateTypes;
exports.generateUrlByBucketName = generateUrlByBucketName;
exports.getGasFeeBySimulate = getGasFeeBySimulate;
exports.getUtcZeroTimestamp = getUtcZeroTimestamp;
exports.makeCosmsPubKey = makeCosmsPubKey;
exports.mergeMultiEip712 = mergeMultiEip712;
exports.mergeMultiMessage = mergeMultiMessage;
exports.newAllowedMsgAllowance = newAllowedMsgAllowance;
exports.newBasicAllowance = newBasicAllowance;
exports.newBucketGRN = newBucketGRN;
exports.newGroupGRN = newGroupGRN;
exports.newMarshal = newMarshal;
exports.newMsgGrantAllowance = newMsgGrantAllowance;
exports.newObjectGRN = newObjectGRN;
exports.recoverPk = recoverPk;
exports.sign712Tx = sign712Tx;
exports.trimString = trimString;
exports.typeWrapper = typeWrapper;
exports.verifyAddress = verifyAddress;
exports.verifyBucketName = verifyBucketName;
exports.verifyObjectName = verifyObjectName;
exports.verifyUrl = verifyUrl;
Object.keys(helpers).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return helpers[k]; }
    });
});
//# sourceMappingURL=index.js.map
