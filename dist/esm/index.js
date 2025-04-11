import 'reflect-metadata';
import { injectable, inject, container, delay as delay$1 } from 'tsyringe';
import { Any } from '@bnb-chain/greenfield-cosmos-types/google/protobuf/any';
import * as base64 from '@ethersproject/base64';
import { hexlify, arrayify, joinSignature } from '@ethersproject/bytes';
import { toUtf8String, toUtf8Bytes } from '@ethersproject/strings';
import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';
import mapValues from 'lodash.mapvalues';
import set from 'lodash.set';
import sortBy from 'lodash.sortby';
import { TypedDataUtils, SignTypedDataVersion, signTypedData } from '@metamask/eth-sig-util';
import { ServiceClientImpl as ServiceClientImpl$1 } from '@bnb-chain/greenfield-cosmos-types/cosmos/base/tendermint/v1beta1/query';
import Long from 'long';
export { default as Long } from 'long';
import { QueryClientImpl } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/query';
import { QueryClientImpl as QueryClientImpl$1 } from '@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/query';
import { QueryClientImpl as QueryClientImpl$5 } from '@bnb-chain/greenfield-cosmos-types/cosmos/crosschain/v1/query';
import { MsgClientImpl, MsgSetWithdrawAddress, MsgWithdrawValidatorCommission, MsgWithdrawDelegatorReward, MsgFundCommunityPool } from '@bnb-chain/greenfield-cosmos-types/cosmos/distribution/v1beta1/tx';
import { QueryClientImpl as QueryClientImpl$8 } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/query';
import { QueryClientImpl as QueryClientImpl$a } from '@bnb-chain/greenfield-cosmos-types/cosmos/gashub/v1beta1/query';
import { QueryClientImpl as QueryClientImpl$6 } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/query';
import { QueryClientImpl as QueryClientImpl$c } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/query';
import { QueryClientImpl as QueryClientImpl$7 } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/query';
import { QueryClientImpl as QueryClientImpl$4 } from '@bnb-chain/greenfield-cosmos-types/greenfield/challenge/query';
import { QueryClientImpl as QueryClientImpl$2 } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/query';
import { QueryClientImpl as QueryClientImpl$3 } from '@bnb-chain/greenfield-cosmos-types/greenfield/sp/query';
import { QueryClientImpl as QueryClientImpl$9 } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import { QueryClientImpl as QueryClientImpl$b } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/query';
import { QueryClient, setupAuthExtension, setupAuthzExtension, setupBankExtension, setupDistributionExtension, setupFeegrantExtension, setupGovExtension, setupIbcExtension, setupMintExtension, setupSlashingExtension, setupStakingExtension, setupTxExtension, createProtobufRpcClient, StargateClient } from '@cosmjs/stargate';
import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
import { UInt64Value } from '@bnb-chain/greenfield-cosmos-types/greenfield/common/wrapper';
import { actionTypeFromJSON, principalTypeFromJSON } from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import * as common from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
export { common as PermissionTypes };
import { visibilityTypeFromJSON, ObjectStatus } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import * as common$1 from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
export { common$1 as StorageEnums };
export { BucketStatus, ObjectStatus, RedundancyType, SourceType, VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import { MsgPutPolicy, MsgDeletePolicy, MsgSetTag, MsgSetBucketFlowRateLimit, MsgCreateBucket, MsgDeleteBucket, MsgToggleSPAsDelegatedAgent, MsgUpdateBucketInfo, MsgCancelMigrateBucket, MsgMigrateBucket, MsgMirrorGroup, MsgMirrorBucket, MsgMirrorObject, MsgCreateGroup, MsgDeleteGroup, MsgUpdateGroupMember, MsgUpdateGroupExtra, MsgLeaveGroup, MsgCreateObject, MsgCancelCreateObject, MsgDeleteObject, MsgUpdateObjectInfo } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { PickVGFStrategy } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/common';
import { fromTimestamp, bytesFromBase64, base64FromBytes } from '@bnb-chain/greenfield-cosmos-types/helpers';
export * from '@bnb-chain/greenfield-cosmos-types/helpers';
import fetch, { Headers as Headers$1 } from 'cross-fetch';
import { MsgSubmit, MsgAttest } from '@bnb-chain/greenfield-cosmos-types/greenfield/challenge/tx';
import { MsgClaim } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/tx';
import { MsgTransferOut } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/tx';
import { MsgGrantAllowance, MsgRevokeAllowance } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/tx';
import { recoverPublicKey, computePublicKey, SigningKey } from '@ethersproject/signing-key';
import { MsgCreatePaymentAccount, MsgDeposit, MsgWithdraw, MsgDisableRefund } from '@bnb-chain/greenfield-cosmos-types/greenfield/payment/tx';
import { voteOptionToJSON } from '@bnb-chain/greenfield-cosmos-types/cosmos/gov/v1/gov';
import { MsgVote, MsgSubmitProposal } from '@bnb-chain/greenfield-cosmos-types/cosmos/gov/v1/tx';
import { XMLParser } from 'fast-xml-parser';
import superagent from 'superagent';
import { BasicAllowance, AllowedMsgAllowance } from '@bnb-chain/greenfield-cosmos-types/cosmos/feegrant/v1beta1/feegrant';
import { MsgCreateValidator, MsgEditValidator } from '@bnb-chain/greenfield-cosmos-types/cosmos/staking/v1beta1/tx';
import { MsgSettle } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/tx';
import { PubKey } from '@bnb-chain/greenfield-cosmos-types/cosmos/crypto/secp256k1/keys';
import * as timestamp from '@bnb-chain/greenfield-cosmos-types/google/protobuf/timestamp';
export { timestamp as TimestampTypes };
import { ResourceType } from '@bnb-chain/greenfield-cosmos-types/greenfield/resource/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { formatEther } from '@ethersproject/units';
import { isNode } from 'browser-or-node';
import { Status } from '@bnb-chain/greenfield-cosmos-types/greenfield/sp/types';
import { ServiceClientImpl, SimulateRequest } from '@bnb-chain/greenfield-cosmos-types/cosmos/tx/v1beta1/service';
import { TxRaw, TxBody, Tx, AuthInfo } from '@bnb-chain/greenfield-cosmos-types/cosmos/tx/v1beta1/tx';
import { makeAuthInfoBytes } from '@cosmjs/proto-signing';
import { BaseAccount } from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth';
import { MsgMultiSend, MsgSend } from '@bnb-chain/greenfield-cosmos-types/cosmos/bank/v1beta1/tx';

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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const typeWrapper = (type, msg) => {
    return {
        ...msg,
        type,
    };
};
const generateMsg = (typeUrl, msgBytes) => {
    return Any.fromPartial({
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
        res = {
            ...res,
            ...msg,
        };
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
    return mapValues(types, (o) => {
        return sortBy(o, ['name']);
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
        res[`msg${index + 1}`] = {
            ...msg,
            type: txs[index].typeUrl,
        };
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
    const resData = cloneDeep(msgData);
    fields.forEach((field) => {
        const path = field.join('.');
        const anyValue = get(resData, path);
        // console.log('path', path, anyValue);
        if (anyValue.startsWith('ZXl')) {
            // TypeAny: need base64 decode
            set(resData, path, toUtf8String(base64.decode(anyValue)));
        }
        else if (anyValue.startsWith('eyJ')) {
            // TypeAny[]: need base64 decode and encode hex
            set(resData, path, hexlify(base64.decode(anyValue)));
        }
        else ;
    });
    return resData;
};

function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
// copied from utils
function isBytes$3(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
function bytes(b, ...lengths) {
    if (!isBytes$3(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(h.outputLen);
    number(h.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output$1(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
const assert = { number, bool, bytes, hash, exists, output: output$1 };

const crypto$1 = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
// Cast array to view
const createView$1 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// The byte swap operation for uint32
const byteSwap = (word) => ((word << 24) & 0xff000000) |
    ((word << 8) & 0xff0000) |
    ((word >>> 8) & 0xff00) |
    ((word >>> 24) & 0xff);
// In place byte swap for Uint32Array
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
    }
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes$2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex$2(bytes$1) {
    bytes(bytes$1);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes$1.length; i++) {
        hex += hexes$2[bytes$1[i]];
    }
    return hex;
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes$2(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes$1(data) {
    if (typeof data === 'string')
        data = utf8ToBytes$2(data);
    bytes(data);
    return data;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes$2(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        bytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// For runtime check if class implements interface
class Hash$1 {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
function wrapConstructor$1(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes$1(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes$1(bytesLength = 32) {
    if (crypto$1 && typeof crypto$1.getRandomValues === 'function') {
        return crypto$1.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}

// Polyfill for Safari 14
function setBigUint64$1(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Choice: a ? b : c
const Chi = (a, b, c) => (a & b) ^ (~a & c);
// Majority function, true if any two inpust is true
const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
/**
 * Merkle-Damgard hash construction base class.
 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
 */
class HashMD$1 extends Hash$1 {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView$1(this.buffer);
    }
    update(data) {
        exists(this);
        const { view, buffer, blockLen } = this;
        data = toBytes$1(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = createView$1(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        exists(this);
        output$1(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64$1(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = createView$1(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}

// SHA2-256 need to try 2^128 hashes to execute birthday attack.
// BTC network is doing 2^67 hashes/sec as per early 2023.
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = /* @__PURE__ */ new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
// Initial state:
// first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19
// prettier-ignore
const SHA256_IV = /* @__PURE__ */ new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD$1 {
    constructor() {
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ (W15 >>> 3);
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = (sigma0 + Maj(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
const sha256 = /* @__PURE__ */ wrapConstructor$1(() => new SHA256());

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// 100 lines of code in the file are duplicated from noble-hashes (utils).
// This is OK: `abstract` directory does not use noble-hashes.
// User may opt-in into using different hashing library. This way, noble-hashes
// won't be included into their bundle.
const _0n$8 = /* @__PURE__ */ BigInt(0);
const _1n$a = /* @__PURE__ */ BigInt(1);
const _2n$7 = /* @__PURE__ */ BigInt(2);
function isBytes$2(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
function abytes$2(item) {
    if (!isBytes$2(item))
        throw new Error('Uint8Array expected');
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex$1(bytes) {
    abytes$2(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes$1[bytes[i]];
    }
    return hex;
}
function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber$1(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
// We use optimized technique to convert hex string to byte array
const asciis$1 = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16$1(char) {
    if (char >= asciis$1._0 && char <= asciis$1._9)
        return char - asciis$1._0;
    if (char >= asciis$1._A && char <= asciis$1._F)
        return char - (asciis$1._A - 10);
    if (char >= asciis$1._a && char <= asciis$1._f)
        return char - (asciis$1._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes$2(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16$1(hex.charCodeAt(hi));
        const n2 = asciiToBase16$1(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
// BE: Big Endian, LE: Little Endian
function bytesToNumberBE$1(bytes) {
    return hexToNumber$1(bytesToHex$1(bytes));
}
function bytesToNumberLE$1(bytes) {
    abytes$2(bytes);
    return hexToNumber$1(bytesToHex$1(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE$1(n, len) {
    return hexToBytes$2(n.toString(16).padStart(len * 2, '0'));
}
function numberToBytesLE$1(n, len) {
    return numberToBytesBE$1(n, len).reverse();
}
// Unpadded, rarely used
function numberToVarBytesBE(n) {
    return hexToBytes$2(numberToHexUnpadded(n));
}
/**
 * Takes hex string or Uint8Array, converts to Uint8Array.
 * Validates output length.
 * Will throw error for other types.
 * @param title descriptive title for an error e.g. 'private key'
 * @param hex hex string or Uint8Array
 * @param expectedLength optional, will compare to result array's length
 * @returns
 */
function ensureBytes$1(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') {
        try {
            res = hexToBytes$2(hex);
        }
        catch (e) {
            throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
        }
    }
    else if (isBytes$2(hex)) {
        // Uint8Array.from() instead of hash.slice() because node.js Buffer
        // is instance of Uint8Array, and its slice() creates **mutable** copy
        res = Uint8Array.from(hex);
    }
    else {
        throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength)
        throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes$1(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes$2(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// Compares 2 u8a-s in kinda constant time
function equalBytes(a, b) {
    if (a.length !== b.length)
        return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
    return diff === 0;
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes$1(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
// Bit operations
/**
 * Calculates amount of bits in a bigint.
 * Same as `n.toString(2).length`
 */
function bitLen$1(n) {
    let len;
    for (len = 0; n > _0n$8; n >>= _1n$a, len += 1)
        ;
    return len;
}
/**
 * Gets single bit at position.
 * NOTE: first bit position is 0 (same as arrays)
 * Same as `!!+Array.from(n.toString(2)).reverse()[pos]`
 */
function bitGet(n, pos) {
    return (n >> BigInt(pos)) & _1n$a;
}
/**
 * Sets single bit at position.
 */
function bitSet(n, pos, value) {
    return n | ((value ? _1n$a : _0n$8) << BigInt(pos));
}
/**
 * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
 * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
 */
const bitMask$1 = (n) => (_2n$7 << BigInt(n - 1)) - _1n$a;
// DRBG
const u8n = (data) => new Uint8Array(data); // creates Uint8Array
const u8fr = (arr) => Uint8Array.from(arr); // another shortcut
/**
 * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
 * @returns function that will call DRBG until 2nd arg returns something meaningful
 * @example
 *   const drbg = createHmacDRBG<Key>(32, 32, hmac);
 *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined
 */
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== 'number' || hashLen < 2)
        throw new Error('hashLen must be a number');
    if (typeof qByteLen !== 'number' || qByteLen < 2)
        throw new Error('qByteLen must be a number');
    if (typeof hmacFn !== 'function')
        throw new Error('hmacFn must be a function');
    // Step B, Step C: set hashLen to 8*ceil(hlen/8)
    let v = u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
    let k = u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same
    let i = 0; // Iterations counter, will throw when over 1000
    const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = (seed = u8n()) => {
        // HMAC-DRBG reseed() function. Steps D-G
        k = h(u8fr([0x00]), seed); // k = hmac(k || v || 0x00 || seed)
        v = h(); // v = hmac(k || v)
        if (seed.length === 0)
            return;
        k = h(u8fr([0x01]), seed); // k = hmac(k || v || 0x01 || seed)
        v = h(); // v = hmac(k || v)
    };
    const gen = () => {
        // HMAC-DRBG generate() function
        if (i++ >= 1000)
            throw new Error('drbg: tried 1000 values');
        let len = 0;
        const out = [];
        while (len < qByteLen) {
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
        }
        return concatBytes$1(...out);
    };
    const genUntil = (seed, pred) => {
        reset();
        reseed(seed); // Steps D-G
        let res = undefined; // Step H: grind until k is in [1..n-1]
        while (!(res = pred(gen())))
            reseed();
        reset();
        return res;
    };
    return genUntil;
}
// Validating curves and fields
const validatorFns$1 = {
    bigint: (val) => typeof val === 'bigint',
    function: (val) => typeof val === 'function',
    boolean: (val) => typeof val === 'boolean',
    string: (val) => typeof val === 'string',
    stringOrUint8Array: (val) => typeof val === 'string' || isBytes$2(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === 'function' && Number.isSafeInteger(val.outputLen),
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function validateObject$1(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns$1[type];
        if (typeof checkVal !== 'function')
            throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === undefined)
            return;
        if (!checkVal(val, object)) {
            throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
        }
    };
    for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
    return object;
}
// validate type tests
// const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };
// const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!
// // Should fail type-check
// const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });
// const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });
// const z3 = validateObject(o, { test: 'boolean', z: 'bug' });
// const z4 = validateObject(o, { a: 'boolean', z: 'bug' });

var ut = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isBytes: isBytes$2,
  abytes: abytes$2,
  bytesToHex: bytesToHex$1,
  numberToHexUnpadded: numberToHexUnpadded,
  hexToNumber: hexToNumber$1,
  hexToBytes: hexToBytes$2,
  bytesToNumberBE: bytesToNumberBE$1,
  bytesToNumberLE: bytesToNumberLE$1,
  numberToBytesBE: numberToBytesBE$1,
  numberToBytesLE: numberToBytesLE$1,
  numberToVarBytesBE: numberToVarBytesBE,
  ensureBytes: ensureBytes$1,
  concatBytes: concatBytes$1,
  equalBytes: equalBytes,
  utf8ToBytes: utf8ToBytes$1,
  bitLen: bitLen$1,
  bitGet: bitGet,
  bitSet: bitSet,
  bitMask: bitMask$1,
  createHmacDrbg: createHmacDrbg,
  validateObject: validateObject$1
});

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// prettier-ignore
const _0n$7 = BigInt(0), _1n$9 = BigInt(1), _2n$6 = BigInt(2), _3n$2 = BigInt(3);
// prettier-ignore
const _4n$1 = BigInt(4), _5n$2 = BigInt(5), _8n$3 = BigInt(8);
// prettier-ignore
BigInt(9); BigInt(16);
// Calculates a modulo b
function mod$1(a, b) {
    const result = a % b;
    return result >= _0n$7 ? result : b + result;
}
/**
 * Efficiently raise num to power and do modular division.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 * @example
 * pow(2n, 6n, 11n) // 64n % 11n == 9n
 */
// TODO: use field version && remove
function pow$1(num, power, modulo) {
    if (modulo <= _0n$7 || power < _0n$7)
        throw new Error('Expected power/modulo > 0');
    if (modulo === _1n$9)
        return _0n$7;
    let res = _1n$9;
    while (power > _0n$7) {
        if (power & _1n$9)
            res = (res * num) % modulo;
        num = (num * num) % modulo;
        power >>= _1n$9;
    }
    return res;
}
// Does x ^ (2 ^ power) mod p. pow2(30, 4) == 30 ^ (2 ^ 4)
function pow2$1(x, power, modulo) {
    let res = x;
    while (power-- > _0n$7) {
        res *= res;
        res %= modulo;
    }
    return res;
}
// Inverses number over modulo
function invert$1(number, modulo) {
    if (number === _0n$7 || modulo <= _0n$7) {
        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    // Euclidean GCD https://brilliant.org/wiki/extended-euclidean-algorithm/
    // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
    let a = mod$1(number, modulo);
    let b = modulo;
    // prettier-ignore
    let x = _0n$7, u = _1n$9;
    while (a !== _0n$7) {
        // JIT applies optimization if those two lines follow each other
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        // prettier-ignore
        b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n$9)
        throw new Error('invert: does not exist');
    return mod$1(x, modulo);
}
/**
 * Tonelli-Shanks square root search algorithm.
 * 1. https://eprint.iacr.org/2012/685.pdf (page 12)
 * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
 * Will start an infinite loop if field order P is not prime.
 * @param P field order
 * @returns function that takes field Fp (created from P) and number n
 */
function tonelliShanks$1(P) {
    // Legendre constant: used to calculate Legendre symbol (a | p),
    // which denotes the value of a^((p-1)/2) (mod p).
    // (a | p) ≡ 1    if a is a square (mod p)
    // (a | p) ≡ -1   if a is not a square (mod p)
    // (a | p) ≡ 0    if a ≡ 0 (mod p)
    const legendreC = (P - _1n$9) / _2n$6;
    let Q, S, Z;
    // Step 1: By factoring out powers of 2 from p - 1,
    // find q and s such that p - 1 = q*(2^s) with q odd
    for (Q = P - _1n$9, S = 0; Q % _2n$6 === _0n$7; Q /= _2n$6, S++)
        ;
    // Step 2: Select a non-square z such that (z | p) ≡ -1 and set c ≡ zq
    for (Z = _2n$6; Z < P && pow$1(Z, legendreC, P) !== P - _1n$9; Z++)
        ;
    // Fast-path
    if (S === 1) {
        const p1div4 = (P + _1n$9) / _4n$1;
        return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Slow-path
    const Q1div2 = (Q + _1n$9) / _2n$6;
    return function tonelliSlow(Fp, n) {
        // Step 0: Check that n is indeed a square: (n | p) should not be ≡ -1
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
            throw new Error('Cannot find square root');
        let r = S;
        // TODO: will fail at Fp2/etc
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q); // will update both x and b
        let x = Fp.pow(n, Q1div2); // first guess at the square root
        let b = Fp.pow(n, Q); // first guess at the fudge factor
        while (!Fp.eql(b, Fp.ONE)) {
            if (Fp.eql(b, Fp.ZERO))
                return Fp.ZERO; // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm (4. If t = 0, return r = 0)
            // Find m such b^(2^m)==1
            let m = 1;
            for (let t2 = Fp.sqr(b); m < r; m++) {
                if (Fp.eql(t2, Fp.ONE))
                    break;
                t2 = Fp.sqr(t2); // t2 *= t2
            }
            // NOTE: r-m-1 can be bigger than 32, need to convert to bigint before shift, otherwise there will be overflow
            const ge = Fp.pow(g, _1n$9 << BigInt(r - m - 1)); // ge = 2^(r-m-1)
            g = Fp.sqr(ge); // g = ge * ge
            x = Fp.mul(x, ge); // x *= ge
            b = Fp.mul(b, g); // b *= g
            r = m;
        }
        return x;
    };
}
function FpSqrt$1(P) {
    // NOTE: different algorithms can give different roots, it is up to user to decide which one they want.
    // For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
    // P ≡ 3 (mod 4)
    // √n = n^((P+1)/4)
    if (P % _4n$1 === _3n$2) {
        // Not all roots possible!
        // const ORDER =
        //   0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
        // const NUM = 72057594037927816n;
        const p1div4 = (P + _1n$9) / _4n$1;
        return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            // Throw if root**2 != n
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Atkin algorithm for q ≡ 5 (mod 8), https://eprint.iacr.org/2012/685.pdf (page 10)
    if (P % _8n$3 === _5n$2) {
        const c1 = (P - _5n$2) / _8n$3;
        return function sqrt5mod8(Fp, n) {
            const n2 = Fp.mul(n, _2n$6);
            const v = Fp.pow(n2, c1);
            const nv = Fp.mul(n, v);
            const i = Fp.mul(Fp.mul(nv, _2n$6), v);
            const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Other cases: Tonelli-Shanks algorithm
    return tonelliShanks$1(P);
}
// prettier-ignore
const FIELD_FIELDS$1 = [
    'create', 'isValid', 'is0', 'neg', 'inv', 'sqrt', 'sqr',
    'eql', 'add', 'sub', 'mul', 'pow', 'div',
    'addN', 'subN', 'mulN', 'sqrN'
];
function validateField$1(field) {
    const initial = {
        ORDER: 'bigint',
        MASK: 'bigint',
        BYTES: 'isSafeInteger',
        BITS: 'isSafeInteger',
    };
    const opts = FIELD_FIELDS$1.reduce((map, val) => {
        map[val] = 'function';
        return map;
    }, initial);
    return validateObject$1(field, opts);
}
// Generic field functions
/**
 * Same as `pow` but for Fp: non-constant-time.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 */
function FpPow$1(f, num, power) {
    // Should have same speed as pow for bigints
    // TODO: benchmark!
    if (power < _0n$7)
        throw new Error('Expected power > 0');
    if (power === _0n$7)
        return f.ONE;
    if (power === _1n$9)
        return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n$7) {
        if (power & _1n$9)
            p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n$9;
    }
    return p;
}
/**
 * Efficiently invert an array of Field elements.
 * `inv(0)` will return `undefined` here: make sure to throw an error.
 */
function FpInvertBatch$1(f, nums) {
    const tmp = new Array(nums.length);
    // Walk from first to last, multiply them by each other MOD p
    const lastMultiplied = nums.reduce((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
    }, f.ONE);
    // Invert last element
    const inverted = f.inv(lastMultiplied);
    // Walk from last to first, multiply them by inverted each other MOD p
    nums.reduceRight((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
    }, inverted);
    return tmp;
}
// CURVE.n lengths
function nLength$1(n, nBitLength) {
    // Bit size, byte size of CURVE.n
    const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
}
/**
 * Initializes a finite field over prime. **Non-primes are not supported.**
 * Do not init in loop: slow. Very fragile: always run a benchmark on a change.
 * Major performance optimizations:
 * * a) denormalized operations like mulN instead of mul
 * * b) same object shape: never add or remove keys
 * * c) Object.freeze
 * @param ORDER prime positive bigint
 * @param bitLen how many bits the field consumes
 * @param isLE (def: false) if encoding / decoding should be in little-endian
 * @param redef optional faster redefinitions of sqrt and other methods
 */
function Field$1(ORDER, bitLen, isLE = false, redef = {}) {
    if (ORDER <= _0n$7)
        throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength$1(ORDER, bitLen);
    if (BYTES > 2048)
        throw new Error('Field lengths over 2048 bytes are not supported');
    const sqrtP = FpSqrt$1(ORDER);
    const f = Object.freeze({
        ORDER,
        BITS,
        BYTES,
        MASK: bitMask$1(BITS),
        ZERO: _0n$7,
        ONE: _1n$9,
        create: (num) => mod$1(num, ORDER),
        isValid: (num) => {
            if (typeof num !== 'bigint')
                throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
            return _0n$7 <= num && num < ORDER; // 0 is valid element, but it's not invertible
        },
        is0: (num) => num === _0n$7,
        isOdd: (num) => (num & _1n$9) === _1n$9,
        neg: (num) => mod$1(-num, ORDER),
        eql: (lhs, rhs) => lhs === rhs,
        sqr: (num) => mod$1(num * num, ORDER),
        add: (lhs, rhs) => mod$1(lhs + rhs, ORDER),
        sub: (lhs, rhs) => mod$1(lhs - rhs, ORDER),
        mul: (lhs, rhs) => mod$1(lhs * rhs, ORDER),
        pow: (num, power) => FpPow$1(f, num, power),
        div: (lhs, rhs) => mod$1(lhs * invert$1(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num) => num * num,
        addN: (lhs, rhs) => lhs + rhs,
        subN: (lhs, rhs) => lhs - rhs,
        mulN: (lhs, rhs) => lhs * rhs,
        inv: (num) => invert$1(num, ORDER),
        sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
        invertBatch: (lst) => FpInvertBatch$1(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c) => (c ? b : a),
        toBytes: (num) => (isLE ? numberToBytesLE$1(num, BYTES) : numberToBytesBE$1(num, BYTES)),
        fromBytes: (bytes) => {
            if (bytes.length !== BYTES)
                throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes.length}`);
            return isLE ? bytesToNumberLE$1(bytes) : bytesToNumberBE$1(bytes);
        },
    });
    return Object.freeze(f);
}
/**
 * Returns total number of bytes consumed by the field element.
 * For example, 32 bytes for usual 256-bit weierstrass curve.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of field
 */
function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== 'bigint')
        throw new Error('field order must be bigint');
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
}
/**
 * Returns minimal amount of bytes that can be safely reduced
 * by field order.
 * Should be 2^-128 for 128-bit curve such as P256.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of target hash
 */
function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
}
/**
 * "Constant-time" private key generation utility.
 * Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
 * and convert them into private scalar, with the modulo bias being negligible.
 * Needs at least 48 bytes of input for 32-byte private key.
 * https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
 * FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
 * RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
 * @param hash hash output from SHA3 or a similar function
 * @param groupOrder size of subgroup - (e.g. secp256k1.CURVE.n)
 * @param isLE interpret hash bytes as LE num
 * @returns valid private scalar
 */
function mapHashToField(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    // No small numbers: need to understand bias story. No huge numbers: easier to detect JS timings.
    if (len < 16 || len < minLen || len > 1024)
        throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE ? bytesToNumberBE$1(key) : bytesToNumberLE$1(key);
    // `mod(x, 11)` can sometimes produce 0. `mod(x, 10) + 1` is the same, but no 0
    const reduced = mod$1(num, fieldOrder - _1n$9) + _1n$9;
    return isLE ? numberToBytesLE$1(reduced, fieldLen) : numberToBytesBE$1(reduced, fieldLen);
}

// HMAC (RFC 2104)
class HMAC extends Hash$1 {
    constructor(hash$1, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        hash(hash$1);
        const key = toBytes$1(_key);
        this.iHash = hash$1.create();
        if (typeof this.iHash.update !== 'function')
            throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash$1.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash$1.create();
        // Undo internal XOR && apply outer XOR
        for (let i = 0; i < pad.length; i++)
            pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        pad.fill(0);
    }
    update(buf) {
        exists(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        exists(this);
        bytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
/**
 * HMAC: RFC2104 message authentication code.
 * @param hash - function that would be used e.g. sha256
 * @param key - message key
 * @param message - message data
 */
const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$6 = BigInt(0);
const _1n$8 = BigInt(1);
// Elliptic curve multiplication of Point by scalar. Fragile.
// Scalars should always be less than curve order: this should be checked inside of a curve itself.
// Creates precomputation tables for fast multiplication:
// - private scalar is split by fixed size windows of W bits
// - every window point is collected from window's table & added to accumulator
// - since windows are different, same point inside tables won't be accessed more than once per calc
// - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
// - +1 window is neccessary for wNAF
// - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
// TODO: Research returning 2d JS array of windows, instead of a single window. This would allow
// windows to be in different memory locations
function wNAF$1(c, bits) {
    const constTimeNegate = (condition, item) => {
        const neg = item.negate();
        return condition ? neg : item;
    };
    const opts = (W) => {
        const windows = Math.ceil(bits / W) + 1; // +1, because
        const windowSize = 2 ** (W - 1); // -1 because we skip zero
        return { windows, windowSize };
    };
    return {
        constTimeNegate,
        // non-const time multiplication ladder
        unsafeLadder(elm, n) {
            let p = c.ZERO;
            let d = elm;
            while (n > _0n$6) {
                if (n & _1n$8)
                    p = p.add(d);
                d = d.double();
                n >>= _1n$8;
            }
            return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @returns precomputed point tables flattened to a single array
         */
        precomputeWindow(elm, W) {
            const { windows, windowSize } = opts(W);
            const points = [];
            let p = elm;
            let base = p;
            for (let window = 0; window < windows; window++) {
                base = p;
                points.push(base);
                // =1, because we skip zero
                for (let i = 1; i < windowSize; i++) {
                    base = base.add(p);
                    points.push(base);
                }
                p = base.double();
            }
            return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */
        wNAF(W, precomputes, n) {
            // TODO: maybe check that scalar is less than group order? wNAF behavious is undefined otherwise
            // But need to carefully remove other checks before wNAF. ORDER == bits here
            const { windows, windowSize } = opts(W);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
                const offset = window * windowSize;
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n$8;
                }
                // This code was first written with assumption that 'f' and 'p' will never be infinity point:
                // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
                // there is negate now: it is possible that negated element from low value
                // would be the same as high element, which will create carry into next window.
                // It's not obvious how this can fail, but still worth investigating later.
                // Check if we're onto Zero point.
                // Add random point inside current window to f.
                const offset1 = offset;
                const offset2 = offset + Math.abs(wbits) - 1; // -1 because we skip zero
                const cond1 = window % 2 !== 0;
                const cond2 = wbits < 0;
                if (wbits === 0) {
                    // The most important part for const-time getPublicKey
                    f = f.add(constTimeNegate(cond1, precomputes[offset1]));
                }
                else {
                    p = p.add(constTimeNegate(cond2, precomputes[offset2]));
                }
            }
            // JIT-compiler should not eliminate f here, since it will later be used in normalizeZ()
            // Even if the variable is still unused, there are some checks which will
            // throw an exception, so compiler needs to prove they won't happen, which is hard.
            // At this point there is a way to F be infinity-point even if p is not,
            // which makes it less const-time: around 1 bigint multiply.
            return { p, f };
        },
        wNAFCached(P, precomputesMap, n, transform) {
            // @ts-ignore
            const W = P._WINDOW_SIZE || 1;
            // Calculate precomputes on a first run, reuse them after
            let comp = precomputesMap.get(P);
            if (!comp) {
                comp = this.precomputeWindow(P, W);
                if (W !== 1) {
                    precomputesMap.set(P, transform(comp));
                }
            }
            return this.wNAF(W, comp, n);
        },
    };
}
function validateBasic$1(curve) {
    validateField$1(curve.Fp);
    validateObject$1(curve, {
        n: 'bigint',
        h: 'bigint',
        Gx: 'field',
        Gy: 'field',
    }, {
        nBitLength: 'isSafeInteger',
        nByteLength: 'isSafeInteger',
    });
    // Set defaults
    return Object.freeze({
        ...nLength$1(curve.n, curve.nBitLength),
        ...curve,
        ...{ p: curve.Fp.ORDER },
    });
}

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function validatePointOpts(curve) {
    const opts = validateBasic$1(curve);
    validateObject$1(opts, {
        a: 'field',
        b: 'field',
    }, {
        allowedPrivateKeyLengths: 'array',
        wrapPrivateKey: 'boolean',
        isTorsionFree: 'function',
        clearCofactor: 'function',
        allowInfinityPoint: 'boolean',
        fromBytes: 'function',
        toBytes: 'function',
    });
    const { endo, Fp, a } = opts;
    if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
            throw new Error('Endomorphism can only be defined for Koblitz curves that have a=0');
        }
        if (typeof endo !== 'object' ||
            typeof endo.beta !== 'bigint' ||
            typeof endo.splitScalar !== 'function') {
            throw new Error('Expected endomorphism with beta: bigint and splitScalar: function');
        }
    }
    return Object.freeze({ ...opts });
}
// ASN.1 DER encoding utilities
const { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
const DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
        constructor(m = '') {
            super(m);
        }
    },
    _parseInt(data) {
        const { Err: E } = DER;
        if (data.length < 2 || data[0] !== 0x02)
            throw new E('Invalid signature integer tag');
        const len = data[1];
        const res = data.subarray(2, len + 2);
        if (!len || res.length !== len)
            throw new E('Invalid signature integer: wrong length');
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        if (res[0] & 0b10000000)
            throw new E('Invalid signature integer: negative');
        if (res[0] === 0x00 && !(res[1] & 0b10000000))
            throw new E('Invalid signature integer: unnecessary leading zero');
        return { d: b2n(res), l: data.subarray(len + 2) }; // d is data, l is left
    },
    toSig(hex) {
        // parse DER signature
        const { Err: E } = DER;
        const data = typeof hex === 'string' ? h2b(hex) : hex;
        abytes$2(data);
        let l = data.length;
        if (l < 2 || data[0] != 0x30)
            throw new E('Invalid signature tag');
        if (data[1] !== l - 2)
            throw new E('Invalid signature: incorrect length');
        const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
        const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
        if (rBytesLeft.length)
            throw new E('Invalid signature: left bytes after parsing');
        return { r, s };
    },
    hexFromSig(sig) {
        // Add leading zero if first byte has negative bit enabled. More details in '_parseInt'
        const slice = (s) => (Number.parseInt(s[0], 16) & 0b1000 ? '00' + s : s);
        const h = (num) => {
            const hex = num.toString(16);
            return hex.length & 1 ? `0${hex}` : hex;
        };
        const s = slice(h(sig.s));
        const r = slice(h(sig.r));
        const shl = s.length / 2;
        const rhl = r.length / 2;
        const sl = h(shl);
        const rl = h(rhl);
        return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    },
};
// Be friendly to bad ECMAScript parsers by not using bigint literals
// prettier-ignore
const _0n$5 = BigInt(0), _1n$7 = BigInt(1); BigInt(2); const _3n$1 = BigInt(3); BigInt(4);
function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp } = CURVE; // All curves has same field / group length as for now, but they can differ
    const toBytes = CURVE.toBytes ||
        ((_c, point, _isCompressed) => {
            const a = point.toAffine();
            return concatBytes$1(Uint8Array.from([0x04]), Fp.toBytes(a.x), Fp.toBytes(a.y));
        });
    const fromBytes = CURVE.fromBytes ||
        ((bytes) => {
            // const head = bytes[0];
            const tail = bytes.subarray(1);
            // if (head !== 0x04) throw new Error('Only non-compressed encoding is supported');
            const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
            const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
            return { x, y };
        });
    /**
     * y² = x³ + ax + b: Short weierstrass curve formula
     * @returns y²
     */
    function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x); // x * x
        const x3 = Fp.mul(x2, x); // x2 * x
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b); // x3 + a * x + b
    }
    // Validate whether the passed curve params are valid.
    // We check if curve equation works for generator point.
    // `assertValidity()` won't work: `isTorsionFree()` is not available at this point in bls12-381.
    // ProjectivePoint class has not been initialized yet.
    if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
        throw new Error('bad generator point: equation left != right');
    // Valid group elements reside in range 1..n-1
    function isWithinCurveOrder(num) {
        return typeof num === 'bigint' && _0n$5 < num && num < CURVE.n;
    }
    function assertGE(num) {
        if (!isWithinCurveOrder(num))
            throw new Error('Expected valid bigint: 0 < bigint < curve.n');
    }
    // Validates if priv key is valid and converts it to bigint.
    // Supports options allowedPrivateKeyLengths and wrapPrivateKey.
    function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
        if (lengths && typeof key !== 'bigint') {
            if (isBytes$2(key))
                key = bytesToHex$1(key);
            // Normalize to hex string, pad. E.g. P521 would norm 130-132 char hex to 132-char bytes
            if (typeof key !== 'string' || !lengths.includes(key.length))
                throw new Error('Invalid key');
            key = key.padStart(nByteLength * 2, '0');
        }
        let num;
        try {
            num =
                typeof key === 'bigint'
                    ? key
                    : bytesToNumberBE$1(ensureBytes$1('private key', key, nByteLength));
        }
        catch (error) {
            throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
        }
        if (wrapPrivateKey)
            num = mod$1(num, n); // disabled by default, enabled for BLS
        assertGE(num); // num in range [1..N-1]
        return num;
    }
    const pointPrecomputes = new Map();
    function assertPrjPoint(other) {
        if (!(other instanceof Point))
            throw new Error('ProjectivePoint expected');
    }
    /**
     * Projective Point works in 3d / projective (homogeneous) coordinates: (x, y, z) ∋ (x=x/z, y=y/z)
     * Default Point works in 2d / affine coordinates: (x, y)
     * We're doing calculations in projective, because its operations don't require costly inversion.
     */
    class Point {
        constructor(px, py, pz) {
            this.px = px;
            this.py = py;
            this.pz = pz;
            if (px == null || !Fp.isValid(px))
                throw new Error('x required');
            if (py == null || !Fp.isValid(py))
                throw new Error('y required');
            if (pz == null || !Fp.isValid(pz))
                throw new Error('z required');
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
            const { x, y } = p || {};
            if (!p || !Fp.isValid(x) || !Fp.isValid(y))
                throw new Error('invalid affine point');
            if (p instanceof Point)
                throw new Error('projective point not allowed');
            const is0 = (i) => Fp.eql(i, Fp.ZERO);
            // fromAffine(x:0, y:0) would produce (x:0, y:0, z:1), but we need (x:0, y:1, z:0)
            if (is0(x) && is0(y))
                return Point.ZERO;
            return new Point(x, y, Fp.ONE);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */
        static normalizeZ(points) {
            const toInv = Fp.invertBatch(points.map((p) => p.pz));
            return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */
        static fromHex(hex) {
            const P = Point.fromAffine(fromBytes(ensureBytes$1('pointHex', hex)));
            P.assertValidity();
            return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
            return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
            this._WINDOW_SIZE = windowSize;
            pointPrecomputes.delete(this);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
            if (this.is0()) {
                // (0, 1, 0) aka ZERO is invalid in most contexts.
                // In BLS, ZERO can be serialized, so we allow it.
                // (0, 0, 0) is wrong representation of ZERO and is always invalid.
                if (CURVE.allowInfinityPoint && !Fp.is0(this.py))
                    return;
                throw new Error('bad point: ZERO');
            }
            // Some 3rd-party test vectors require different wording between here & `fromCompressedHex`
            const { x, y } = this.toAffine();
            // Check if x, y are valid field elements
            if (!Fp.isValid(x) || !Fp.isValid(y))
                throw new Error('bad point: x or y not FE');
            const left = Fp.sqr(y); // y²
            const right = weierstrassEquation(x); // x³ + ax + b
            if (!Fp.eql(left, right))
                throw new Error('bad point: equation left != right');
            if (!this.isTorsionFree())
                throw new Error('bad point: not in prime-order subgroup');
        }
        hasEvenY() {
            const { y } = this.toAffine();
            if (Fp.isOdd)
                return !Fp.isOdd(y);
            throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
            return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
            const { a, b } = CURVE;
            const b3 = Fp.mul(b, _3n$1);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            let t0 = Fp.mul(X1, X1); // step 1
            let t1 = Fp.mul(Y1, Y1);
            let t2 = Fp.mul(Z1, Z1);
            let t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3); // step 5
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3); // step 10
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3); // step 15
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0); // step 20
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1); // step 25
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3); // step 30
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            const a = CURVE.a;
            const b3 = Fp.mul(CURVE.b, _3n$1);
            let t0 = Fp.mul(X1, X2); // step 1
            let t1 = Fp.mul(Y1, Y2);
            let t2 = Fp.mul(Z1, Z2);
            let t3 = Fp.add(X1, Y1);
            let t4 = Fp.add(X2, Y2); // step 5
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            let t5 = Fp.add(X2, Z2); // step 10
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2); // step 15
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2); // step 20
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0); // step 25
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2); // step 30
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4); // step 35
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0); // step 40
            return new Point(X3, Y3, Z3);
        }
        subtract(other) {
            return this.add(other.negate());
        }
        is0() {
            return this.equals(Point.ZERO);
        }
        wNAF(n) {
            return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
                const toInv = Fp.invertBatch(comp.map((p) => p.pz));
                return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
            });
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(n) {
            const I = Point.ZERO;
            if (n === _0n$5)
                return I;
            assertGE(n); // Will throw on 0
            if (n === _1n$7)
                return this;
            const { endo } = CURVE;
            if (!endo)
                return wnaf.unsafeLadder(this, n);
            // Apply endomorphism
            let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
            let k1p = I;
            let k2p = I;
            let d = this;
            while (k1 > _0n$5 || k2 > _0n$5) {
                if (k1 & _1n$7)
                    k1p = k1p.add(d);
                if (k2 & _1n$7)
                    k2p = k2p.add(d);
                d = d.double();
                k1 >>= _1n$7;
                k2 >>= _1n$7;
            }
            if (k1neg)
                k1p = k1p.negate();
            if (k2neg)
                k2p = k2p.negate();
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
            assertGE(scalar);
            let n = scalar;
            let point, fake; // Fake point is used to const-time mult
            const { endo } = CURVE;
            if (endo) {
                const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
                let { p: k1p, f: f1p } = this.wNAF(k1);
                let { p: k2p, f: f2p } = this.wNAF(k2);
                k1p = wnaf.constTimeNegate(k1neg, k1p);
                k2p = wnaf.constTimeNegate(k2neg, k2p);
                k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
                point = k1p.add(k2p);
                fake = f1p.add(f2p);
            }
            else {
                const { p, f } = this.wNAF(n);
                point = p;
                fake = f;
            }
            // Normalize `z` for both points, but return only real one
            return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
            const G = Point.BASE; // No Strauss-Shamir trick: we have 10% faster G precomputes
            const mul = (P, a // Select faster multiply() method
            ) => (a === _0n$5 || a === _1n$7 || !P.equals(G) ? P.multiplyUnsafe(a) : P.multiply(a));
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? undefined : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
            const { px: x, py: y, pz: z } = this;
            const is0 = this.is0();
            // If invZ was 0, we return zero point. However we still want to execute
            // all operations, so we replace invZ with a random number, 1.
            if (iz == null)
                iz = is0 ? Fp.ONE : Fp.inv(z);
            const ax = Fp.mul(x, iz);
            const ay = Fp.mul(y, iz);
            const zz = Fp.mul(z, iz);
            if (is0)
                return { x: Fp.ZERO, y: Fp.ZERO };
            if (!Fp.eql(zz, Fp.ONE))
                throw new Error('invZ was invalid');
            return { x: ax, y: ay };
        }
        isTorsionFree() {
            const { h: cofactor, isTorsionFree } = CURVE;
            if (cofactor === _1n$7)
                return true; // No subgroups, always torsion-free
            if (isTorsionFree)
                return isTorsionFree(Point, this);
            throw new Error('isTorsionFree() has not been declared for the elliptic curve');
        }
        clearCofactor() {
            const { h: cofactor, clearCofactor } = CURVE;
            if (cofactor === _1n$7)
                return this; // Fast-path
            if (clearCofactor)
                return clearCofactor(Point, this);
            return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
            this.assertValidity();
            return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
            return bytesToHex$1(this.toRawBytes(isCompressed));
        }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
    Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF$1(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    // Validate if generator point is on curve
    return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder,
    };
}
function validateOpts$1(curve) {
    const opts = validateBasic$1(curve);
    validateObject$1(opts, {
        hash: 'hash',
        hmac: 'function',
        randomBytes: 'function',
    }, {
        bits2int: 'function',
        bits2int_modN: 'function',
        lowS: 'boolean',
    });
    return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
    const CURVE = validateOpts$1(curveDef);
    const { Fp, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp.BYTES + 1; // e.g. 33 for 32
    const uncompressedLen = 2 * Fp.BYTES + 1; // e.g. 65 for 32
    function isValidFieldElement(num) {
        return _0n$5 < num && num < Fp.ORDER; // 0 is banned since it's not invertible FE
    }
    function modN(a) {
        return mod$1(a, CURVE_ORDER);
    }
    function invN(a) {
        return invert$1(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder, } = weierstrassPoints({
        ...CURVE,
        toBytes(_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp.toBytes(a.x);
            const cat = concatBytes$1;
            if (isCompressed) {
                return cat(Uint8Array.from([point.hasEvenY() ? 0x02 : 0x03]), x);
            }
            else {
                return cat(Uint8Array.from([0x04]), x, Fp.toBytes(a.y));
            }
        },
        fromBytes(bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            // this.assertValidity() is done inside of fromHex
            if (len === compressedLen && (head === 0x02 || head === 0x03)) {
                const x = bytesToNumberBE$1(tail);
                if (!isValidFieldElement(x))
                    throw new Error('Point is not on curve');
                const y2 = weierstrassEquation(x); // y² = x³ + ax + b
                let y;
                try {
                    y = Fp.sqrt(y2); // y = y² ^ (p+1)/4
                }
                catch (sqrtError) {
                    const suffix = sqrtError instanceof Error ? ': ' + sqrtError.message : '';
                    throw new Error('Point is not on curve' + suffix);
                }
                const isYOdd = (y & _1n$7) === _1n$7;
                // ECDSA
                const isHeadOdd = (head & 1) === 1;
                if (isHeadOdd !== isYOdd)
                    y = Fp.neg(y);
                return { x, y };
            }
            else if (len === uncompressedLen && head === 0x04) {
                const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
                const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
                return { x, y };
            }
            else {
                throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
            }
        },
    });
    const numToNByteStr = (num) => bytesToHex$1(numberToBytesBE$1(num, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n$7;
        return number > HALF;
    }
    function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
    }
    // slice bytes num
    const slcNum = (b, from, to) => bytesToNumberBE$1(b.slice(from, to));
    /**
     * ECDSA signature with its (r, s) properties. Supports DER & compact representations.
     */
    class Signature {
        constructor(r, s, recovery) {
            this.r = r;
            this.s = s;
            this.recovery = recovery;
            this.assertValidity();
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
            const l = CURVE.nByteLength;
            hex = ensureBytes$1('compactSignature', hex, l * 2);
            return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
            const { r, s } = DER.toSig(ensureBytes$1('DER', hex));
            return new Signature(r, s);
        }
        assertValidity() {
            // can use assertGE here
            if (!isWithinCurveOrder(this.r))
                throw new Error('r must be 0 < r < CURVE.n');
            if (!isWithinCurveOrder(this.s))
                throw new Error('s must be 0 < s < CURVE.n');
        }
        addRecoveryBit(recovery) {
            return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
            const { r, s, recovery: rec } = this;
            const h = bits2int_modN(ensureBytes$1('msgHash', msgHash)); // Truncate hash
            if (rec == null || ![0, 1, 2, 3].includes(rec))
                throw new Error('recovery id invalid');
            const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
            if (radj >= Fp.ORDER)
                throw new Error('recovery id 2 or 3 invalid');
            const prefix = (rec & 1) === 0 ? '02' : '03';
            const R = Point.fromHex(prefix + numToNByteStr(radj));
            const ir = invN(radj); // r^-1
            const u1 = modN(-h * ir); // -hr^-1
            const u2 = modN(s * ir); // sr^-1
            const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2); // (sr^-1)R-(hr^-1)G = -(hr^-1)G + (sr^-1)
            if (!Q)
                throw new Error('point at infinify'); // unsafe is fine: no priv data leaked
            Q.assertValidity();
            return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
            return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
            return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
            return hexToBytes$2(this.toDERHex());
        }
        toDERHex() {
            return DER.hexFromSig({ r: this.r, s: this.s });
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
            return hexToBytes$2(this.toCompactHex());
        }
        toCompactHex() {
            return numToNByteStr(this.r) + numToNByteStr(this.s);
        }
    }
    const utils = {
        isValidPrivateKey(privateKey) {
            try {
                normPrivateKeyToScalar(privateKey);
                return true;
            }
            catch (error) {
                return false;
            }
        },
        normPrivateKeyToScalar: normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */
        randomPrivateKey: () => {
            const length = getMinHashLength(CURVE.n);
            return mapHashToField(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */
        precompute(windowSize = 8, point = Point.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3)); // 3 is arbitrary, just need any number here
            return point;
        },
    };
    /**
     * Computes public key for a private key. Checks for validity of the private key.
     * @param privateKey private key
     * @param isCompressed whether to return compact (default), or full key
     * @returns Public key, full when isCompressed=false; short when isCompressed=true
     */
    function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    /**
     * Quick and dirty check for item being public key. Does not validate hex, or being on-curve.
     */
    function isProbPub(item) {
        const arr = isBytes$2(item);
        const str = typeof item === 'string';
        const len = (arr || str) && item.length;
        if (arr)
            return len === compressedLen || len === uncompressedLen;
        if (str)
            return len === 2 * compressedLen || len === 2 * uncompressedLen;
        if (item instanceof Point)
            return true;
        return false;
    }
    /**
     * ECDH (Elliptic Curve Diffie Hellman).
     * Computes shared public key from private key and public key.
     * Checks: 1) private key validity 2) shared key is on-curve.
     * Does NOT hash the result.
     * @param privateA private key
     * @param publicB different public key
     * @param isCompressed whether to return compact (default), or full key
     * @returns shared public key
     */
    function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA))
            throw new Error('first arg must be private key');
        if (!isProbPub(publicB))
            throw new Error('second arg must be public key');
        const b = Point.fromHex(publicB); // check for being on-curve
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    // RFC6979: ensure ECDSA msg is X bytes and < N. RFC suggests optional truncating via bits2octets.
    // FIPS 186-4 4.6 suggests the leftmost min(nBitLen, outLen) bits, which matches bits2int.
    // bits2int can produce res>N, we can do mod(res, N) since the bitLen is the same.
    // int2octets can't be used; pads small msgs with 0: unacceptatble for trunc as per RFC vectors
    const bits2int = CURVE.bits2int ||
        function (bytes) {
            // For curves with nBitLength % 8 !== 0: bits2octets(bits2octets(m)) !== bits2octets(m)
            // for some cases, since bytes.length * 8 is not actual bitLength.
            const num = bytesToNumberBE$1(bytes); // check for == u8 done here
            const delta = bytes.length * 8 - CURVE.nBitLength; // truncate to nBitLength leftmost bits
            return delta > 0 ? num >> BigInt(delta) : num;
        };
    const bits2int_modN = CURVE.bits2int_modN ||
        function (bytes) {
            return modN(bits2int(bytes)); // can't use bytesToNumberBE here
        };
    // NOTE: pads output with zero as per spec
    const ORDER_MASK = bitMask$1(CURVE.nBitLength);
    /**
     * Converts to bytes. Checks if num in `[0..ORDER_MASK-1]` e.g.: `[0..2^256-1]`.
     */
    function int2octets(num) {
        if (typeof num !== 'bigint')
            throw new Error('bigint expected');
        if (!(_0n$5 <= num && num < ORDER_MASK))
            throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
        // works with order, can have different size than numToField!
        return numberToBytesBE$1(num, CURVE.nByteLength);
    }
    // Steps A, D of RFC6979 3.2
    // Creates RFC6979 seed; converts msg/privKey to numbers.
    // Used only in sign, not in verify.
    // NOTE: we cannot assume here that msgHash has same amount of bytes as curve order, this will be wrong at least for P521.
    // Also it can be bigger for P224 + SHA256
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if (['recovered', 'canonical'].some((k) => k in opts))
            throw new Error('sign() legacy options not supported');
        const { hash, randomBytes } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts; // generates low-s sigs by default
        if (lowS == null)
            lowS = true; // RFC6979 3.2: we skip step A, because we already provide hash
        msgHash = ensureBytes$1('msgHash', msgHash);
        if (prehash)
            msgHash = ensureBytes$1('prehashed msgHash', hash(msgHash));
        // We can't later call bits2octets, since nested bits2int is broken for curves
        // with nBitLength % 8 !== 0. Because of that, we unwrap it here as int2octets call.
        // const bits2octets = (bits) => int2octets(bits2int_modN(bits))
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey); // validate private key, convert to bigint
        const seedArgs = [int2octets(d), int2octets(h1int)];
        // extraEntropy. RFC6979 3.6: additional k' (optional).
        if (ent != null && ent !== false) {
            // K = HMAC_K(V || 0x00 || int2octets(x) || bits2octets(h1) || k')
            const e = ent === true ? randomBytes(Fp.BYTES) : ent; // generate random bytes OR pass as-is
            seedArgs.push(ensureBytes$1('extraEntropy', e)); // check for being bytes
        }
        const seed = concatBytes$1(...seedArgs); // Step D of RFC6979 3.2
        const m = h1int; // NOTE: no need to call bits2int second time here, it is inside truncateHash!
        // Converts signature params into point w r/s, checks result for validity.
        function k2sig(kBytes) {
            // RFC 6979 Section 3.2, step 3: k = bits2int(T)
            const k = bits2int(kBytes); // Cannot use fields methods, since it is group element
            if (!isWithinCurveOrder(k))
                return; // Important: all mod() calls here must be done over N
            const ik = invN(k); // k^-1 mod n
            const q = Point.BASE.multiply(k).toAffine(); // q = Gk
            const r = modN(q.x); // r = q.x mod n
            if (r === _0n$5)
                return;
            // Can use scalar blinding b^-1(bm + bdr) where b ∈ [1,q−1] according to
            // https://tches.iacr.org/index.php/TCHES/article/view/7337/6509. We've decided against it:
            // a) dependency on CSPRNG b) 15% slowdown c) doesn't really help since bigints are not CT
            const s = modN(ik * modN(m + r * d)); // Not using blinding here
            if (s === _0n$5)
                return;
            let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n$7); // recovery bit (2 or 3, when q.x > n)
            let normS = s;
            if (lowS && isBiggerThanHalfOrder(s)) {
                normS = normalizeS(s); // if lowS was passed, ensure s is always
                recovery ^= 1; // // in the bottom half of N
            }
            return new Signature(r, normS, recovery); // use normS, not s
        }
        return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    /**
     * Signs message hash with a private key.
     * ```
     * sign(m, d, k) where
     *   (x, y) = G × k
     *   r = x mod n
     *   s = (m + dr)/k mod n
     * ```
     * @param msgHash NOT message. msg needs to be hashed to `msgHash`, or use `prehash`.
     * @param privKey private key
     * @param opts lowS for non-malleable sigs. extraEntropy for mixing randomness into k. prehash will hash first arg.
     * @returns signature with recovery param
     */
    function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts); // Steps A, D of RFC6979 3.2.
        const C = CURVE;
        const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig); // Steps B, C, D, E, F, G
    }
    // Enable precomputes. Slows down first publicKey computation by 20ms.
    Point.BASE._setWindowSize(8);
    // utils.precompute(8, ProjectivePoint.BASE)
    /**
     * Verifies a signature against message hash and public key.
     * Rejects lowS signatures by default: to override,
     * specify option `{lowS: false}`. Implements section 4.1.4 from https://www.secg.org/sec1-v2.pdf:
     *
     * ```
     * verify(r, s, h, P) where
     *   U1 = hs^-1 mod n
     *   U2 = rs^-1 mod n
     *   R = U1⋅G - U2⋅P
     *   mod(R.x, n) == r
     * ```
     */
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = ensureBytes$1('msgHash', msgHash);
        publicKey = ensureBytes$1('publicKey', publicKey);
        if ('strict' in opts)
            throw new Error('options.strict was renamed to lowS');
        const { lowS, prehash } = opts;
        let _sig = undefined;
        let P;
        try {
            if (typeof sg === 'string' || isBytes$2(sg)) {
                // Signature can be represented in 2 ways: compact (2*nByteLength) & DER (variable-length).
                // Since DER can also be 2*nByteLength bytes, we check for it first.
                try {
                    _sig = Signature.fromDER(sg);
                }
                catch (derError) {
                    if (!(derError instanceof DER.Err))
                        throw derError;
                    _sig = Signature.fromCompact(sg);
                }
            }
            else if (typeof sg === 'object' && typeof sg.r === 'bigint' && typeof sg.s === 'bigint') {
                const { r, s } = sg;
                _sig = new Signature(r, s);
            }
            else {
                throw new Error('PARSE');
            }
            P = Point.fromHex(publicKey);
        }
        catch (error) {
            if (error.message === 'PARSE')
                throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
            return false;
        }
        if (lowS && _sig.hasHighS())
            return false;
        if (prehash)
            msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash); // Cannot use fields methods, since it is group element
        const is = invN(s); // s^-1
        const u1 = modN(h * is); // u1 = hs^-1 mod n
        const u2 = modN(r * is); // u2 = rs^-1 mod n
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine(); // R = u1⋅G + u2⋅P
        if (!R)
            return false;
        const v = modN(R.x);
        return v === r;
    }
    return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils,
    };
}

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// connects noble-curves to noble-hashes
function getHash(hash) {
    return {
        hash,
        hmac: (key, ...msgs) => hmac(hash, key, concatBytes$2(...msgs)),
        randomBytes: randomBytes$1,
    };
}
function createCurve(curveDef, defHash) {
    const create = (hash) => weierstrass({ ...curveDef, ...getHash(hash) });
    return Object.freeze({ ...create(defHash), create });
}

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const secp256k1P = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
const secp256k1N = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
const _1n$6 = BigInt(1);
const _2n$5 = BigInt(2);
const divNearest = (a, b) => (a + b / _2n$5) / b;
/**
 * √n = n^((p+1)/4) for fields p = 3 mod 4. We unwrap the loop and multiply bit-by-bit.
 * (P+1n/4n).toString(2) would produce bits [223x 1, 0, 22x 1, 4x 0, 11, 00]
 */
function sqrtMod(y) {
    const P = secp256k1P;
    // prettier-ignore
    const _3n = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    // prettier-ignore
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = (y * y * y) % P; // x^3, 11
    const b3 = (b2 * b2 * y) % P; // x^7
    const b6 = (pow2$1(b3, _3n, P) * b3) % P;
    const b9 = (pow2$1(b6, _3n, P) * b3) % P;
    const b11 = (pow2$1(b9, _2n$5, P) * b2) % P;
    const b22 = (pow2$1(b11, _11n, P) * b11) % P;
    const b44 = (pow2$1(b22, _22n, P) * b22) % P;
    const b88 = (pow2$1(b44, _44n, P) * b44) % P;
    const b176 = (pow2$1(b88, _88n, P) * b88) % P;
    const b220 = (pow2$1(b176, _44n, P) * b44) % P;
    const b223 = (pow2$1(b220, _3n, P) * b3) % P;
    const t1 = (pow2$1(b223, _23n, P) * b22) % P;
    const t2 = (pow2$1(t1, _6n, P) * b2) % P;
    const root = pow2$1(t2, _2n$5, P);
    if (!Fp$1.eql(Fp$1.sqr(root), y))
        throw new Error('Cannot find square root');
    return root;
}
const Fp$1 = Field$1(secp256k1P, undefined, undefined, { sqrt: sqrtMod });
const secp256k1 = createCurve({
    a: BigInt(0), // equation params: a, b
    b: BigInt(7), // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
    Fp: Fp$1, // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
    n: secp256k1N, // Curve order, total count of valid points in the field
    // Base point (x, y) aka generator point
    Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
    Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
    h: BigInt(1), // Cofactor
    lowS: true, // Allow only low-S signatures by default in sign() and verify()
    /**
     * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
     * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
     * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
     * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
     */
    endo: {
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee'),
        splitScalar: (k) => {
            const n = secp256k1N;
            const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
            const b1 = -_1n$6 * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
            const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
            const b2 = a1;
            const POW_2_128 = BigInt('0x100000000000000000000000000000000'); // (2n**128n).toString(16)
            const c1 = divNearest(b2 * k, n);
            const c2 = divNearest(-b1 * k, n);
            let k1 = mod$1(k - c1 * a1 - c2 * a2, n);
            let k2 = mod$1(-c1 * b1 - c2 * b2, n);
            const k1neg = k1 > POW_2_128;
            const k2neg = k2 > POW_2_128;
            if (k1neg)
                k1 = n - k1;
            if (k2neg)
                k2 = n - k2;
            if (k1 > POW_2_128 || k2 > POW_2_128) {
                throw new Error('splitScalar: Endomorphism failed, k=' + k);
            }
            return { k1neg, k1, k2neg, k2 };
        },
    },
}, sha256);
// Schnorr signatures are superior to ECDSA from above. Below is Schnorr-specific BIP0340 code.
// https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
BigInt(0);
secp256k1.ProjectivePoint;

const assertBool = assert.bool;
const assertBytes = assert.bytes;
// Internal utils
function wrapHash(hash) {
    return (msg) => {
        assert.bytes(msg);
        return hash(msg);
    };
}
// TODO(v3): switch away from node crypto, remove this unnecessary variable.
(() => {
    const webCrypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : undefined;
    const nodeRequire = typeof module !== "undefined" &&
        typeof module.require === "function" &&
        module.require.bind(module);
    return {
        node: nodeRequire && !webCrypto ? nodeRequire("crypto") : undefined,
        web: webCrypto
    };
})();

// Use `secp256k1` module directly.
// This is a legacy compatibility layer for the npm package `secp256k1` via noble-secp256k1
secp256k1.ProjectivePoint;
secp256k1.CURVE.n;
function output(out = (len) => new Uint8Array(len), length, value) {
    if (typeof out === "function") {
        out = out(length);
    }
    assertBytes(out, length);
    if (value) {
        out.set(value);
    }
    return out;
}
function publicKeyCreate(privateKey, compressed = true, out) {
    assertBytes(privateKey, 32);
    assertBool(compressed);
    const res = secp256k1.getPublicKey(privateKey, compressed);
    return output(out, compressed ? 33 : 65, res);
}

/**
 * @priKey 0x prefix
 */
const getPubKeyByPriKey = (priKey) => {
    const privateKeyBytes = arrayify(priKey);
    const publicKeyBytes = publicKeyCreate(privateKeyBytes);
    const pk = hexlify(arrayify(publicKeyBytes));
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
    const uncompressedPubKey = recoverPublicKey(messageHash, signature);
    return computePublicKey(uncompressedPubKey, true);
};
/**
 * @pk compressed public key from signature
 * @return eg. { typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey', value: 'CiEC+hp2uVKio9T7x0goOPyHgwUYiRsZ8MeYUrfRX8MxrzM=' }
 */
const makeCosmsPubKey = (pk) => {
    const pubKey = PubKey.fromPartial({
        key: arrayify(pk),
    });
    return {
        typeUrl: '/cosmos.crypto.eth.ethsecp256k1.PubKey',
        value: PubKey.encode(pubKey).finish(),
    };
};
const eip712Hash = (message) => {
    return TypedDataUtils.eip712Hash(JSON.parse(message), SignTypedDataVersion.V4);
};

/**
 * @addr wallet address
 * @message sign typed v4 data
 */
const sign712Tx = async (addr, message) => {
    // TODO: eth-sig-utils
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const signature = await window.ethereum?.request({
        method: 'eth_signTypedData_v4',
        params: [addr, message],
    });
    const messageHash = eip712Hash(message);
    return {
        signature,
        messageHash,
    };
};
const defaultSignTypedData = async (addr, message) => {
    const signature = await window.ethereum?.request({
        method: 'eth_signTypedData_v4',
        params: [addr, message],
    });
    return signature;
};

const getGasFeeBySimulate = (simulateTxInfo, denom = 'BNB') => {
    if (!simulateTxInfo.gasInfo)
        throw new Error('gasInfo not found');
    const gasLimit = BigInt(simulateTxInfo.gasInfo?.gasUsed.toNumber());
    const gasPrice = simulateTxInfo.gasInfo?.minGasPrice.replace(denom, '');
    const gasFee = gasLimit * BigInt(gasPrice);
    return {
        gasLimit,
        gasPrice,
        gasFee: formatEther(String(gasFee)),
    };
};

let RpcQueryClient = class RpcQueryClient {
    constructor(rpcUrl) {
        this.rpcUrl = rpcUrl;
        this.rpcClient = null;
        this.txQueryClient = null;
        this.rpcUrl = rpcUrl;
    }
    async getRpcClient() {
        if (!this.rpcClient) {
            this.rpcClient = await makeRpcClient(this.rpcUrl);
        }
        return this.rpcClient;
    }
    async getQueryClient() {
        if (!this.txQueryClient) {
            const [client] = await makeClientWithExtension(this.rpcUrl);
            this.txQueryClient = client;
        }
        return this.txQueryClient;
    }
    async getAuthQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl(rpcClient);
    }
    async getBankQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$1(rpcClient);
    }
    async getPaymentQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$2(rpcClient);
    }
    async getSpQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$3(rpcClient);
    }
    async getChallengeQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$4(rpcClient);
    }
    async getCrosschainQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$5(rpcClient);
    }
    async getOracleQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$6(rpcClient);
    }
    async getBridgeQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$7(rpcClient);
    }
    async getFeeGrantQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$8(rpcClient);
    }
    async getStorageQueryClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$9(rpcClient);
    }
    async getMsgClient() {
        const rpcClient = await this.getRpcClient();
        return new MsgClientImpl(rpcClient);
    }
    async getGashubClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$a(rpcClient);
    }
    async getVirtualGroupClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$b(rpcClient);
    }
    async getStakingClient() {
        const rpcClient = await this.getRpcClient();
        return new QueryClientImpl$c(rpcClient);
    }
};
RpcQueryClient = __decorate([
    injectable(),
    __param(0, inject('RPC_URL')),
    __metadata("design:paramtypes", [String])
], RpcQueryClient);
const makeClientWithExtension = async (rpcUrl) => {
    const tmClient = await Tendermint37Client.connect(rpcUrl);
    return [
        QueryClient.withExtensions(tmClient, setupAuthExtension, setupAuthzExtension, setupBankExtension, setupDistributionExtension, setupFeegrantExtension, setupGovExtension, setupIbcExtension, setupMintExtension, setupSlashingExtension, setupStakingExtension, setupTxExtension),
        tmClient,
    ];
};
const makeRpcClient = async (rpcUrl) => {
    const [, tmClient] = await makeClientWithExtension(rpcUrl);
    const rpc = createProtobufRpcClient(new QueryClient(tmClient));
    return rpc;
};

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
        this.account = container.resolve(Account);
        this.rpcQueryClient = container.resolve(RpcQueryClient);
        this.rpcUrl = rpcUrl;
        this.chainId = chainId;
    }
    async tx(typeUrl, address, MsgSDKTypeEIP712, MsgSDK, msgBytes) {
        const txBodyBytes = this.getBodyBytes([
            {
                typeUrl,
                msgBytes,
            },
        ]);
        const tx = await this.multiTx([
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
    }
    async txRaw({ address, txRawHex, eip712MsgType, msgData, }) {
        const accountInfo = await this.account.getAccount(address);
        const txRawBytes = arrayify(txRawHex);
        const txRawData = TxRaw.decode(txRawBytes);
        return {
            simulate: async (opts) => {
                return await this.simulateRawTx(txRawData.bodyBytes, accountInfo, opts);
            },
            broadcast: async (opts) => {
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
                    : await this.getSignByWallet(eip712, accountInfo.address, signTypedDataCallback);
                const authInfoBytes = this.getAuthInfoBytes({
                    denom,
                    sequence: accountInfo.sequence + '',
                    gasLimit,
                    gasPrice,
                    pubKey,
                    granter,
                    payer,
                });
                const txRaw = TxRaw.fromPartial({
                    bodyBytes: txRawData.bodyBytes,
                    authInfoBytes,
                    signatures: [arrayify(signature)],
                });
                const txBytes = TxRaw.encode(txRaw).finish();
                // console.log('txBytes', hexlify(txBytes));
                return await this.broadcastRawTx(txBytes);
            },
        };
    }
    getBodyBytes(params) {
        const multiMsgBytes = params.map((tx) => {
            return generateMsg(tx.typeUrl, tx.msgBytes);
        });
        const txBody = TxBody.fromPartial({
            messages: multiMsgBytes,
        });
        const txBodyBytes = TxBody.encode(txBody).finish();
        return txBodyBytes;
    }
    getSignByPriKey(eip712, privateKey) {
        assertPrivateKey(privateKey);
        const pubKey = getPubKeyByPriKey(privateKey);
        const signature = signTypedData({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: eip712,
            version: SignTypedDataVersion.V4,
            privateKey: Buffer.from(arrayify(privateKey)),
        });
        return {
            pubKey,
            signature,
        };
    }
    async getSignByWallet(eip712, address, signTypedDataCallback) {
        const signature = await signTypedDataCallback(address, JSON.stringify(eip712));
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
        const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubKey, sequence: Number(sequence) }], feeAmount, gasLimit, granter, payer, 
        // @ts-ignore
        712);
        return authInfoBytes;
    }
    async simulateRawTx(txBodyBytes, accountInfo, options) {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl(rpcClient);
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
        const tx = Tx.fromPartial({
            authInfo: AuthInfo.decode(authInfoBytes),
            body: TxBody.decode(txBodyBytes),
            signatures: [Uint8Array.from([])],
        });
        const request = SimulateRequest.fromPartial({
            txBytes: Tx.encode(tx).finish(),
        });
        const res = await rpc.Simulate(request);
        return getGasFeeBySimulate(res, denom);
    }
    async broadcastRawTx(txRawBytes) {
        const tmClient = await Tendermint37Client.connect(this.rpcUrl);
        const client = await StargateClient.create(tmClient);
        return await client.broadcastTx(txRawBytes);
    }
    async multiTx(txResList) {
        const txs = txResList.map((txRes) => txRes.metaTxInfo);
        const accountInfo = await this.account.getAccount(txs[0].address);
        const txBodyBytes = this.getBodyBytes(txs);
        return {
            simulate: async (opts) => {
                return await this.simulateRawTx(txBodyBytes, accountInfo, opts);
            },
            broadcast: async (opts) => {
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
                    : await this.getSignByWallet(eip712, accountInfo.address, signTypedDataCallback);
                const authInfoBytes = this.getAuthInfoBytes({
                    denom,
                    sequence: accountInfo.sequence + '',
                    gasLimit,
                    gasPrice,
                    pubKey,
                    granter,
                    payer,
                });
                const txRaw = TxRaw.fromPartial({
                    bodyBytes: txBodyBytes,
                    authInfoBytes,
                    signatures: [arrayify(signature)],
                });
                const txBytes = TxRaw.encode(txRaw).finish();
                // console.log('txBytes', hexlify(txBytes));
                return await this.broadcastRawTx(txBytes);
            },
        };
    }
};
TxClient = __decorate([
    injectable(),
    __param(0, inject('RPC_URL')),
    __param(1, inject('CHAIN_ID')),
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
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async multiTransfer(address, msg) {
        return await this.txClient.tx(MsgMultiSendTypeUrl, address, MsgMultiSendSDKTypeEIP712, MsgMultiSend.toSDK(msg), MsgMultiSend.encode(msg).finish());
    }
    async createPaymentAccount(msg) {
        return await this.txClient.tx(MsgCreatePaymentAccountTypeUrl, msg.creator, MsgCreatePaymentAccountSDKTypeEIP712, MsgCreatePaymentAccount.toSDK(msg), MsgCreatePaymentAccount.encode(msg).finish());
    }
    async getPaymentAccountsByOwner(owner) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccountsByOwner({
            owner,
        });
    }
    async getModuleAccountByName(name) {
        const rpc = await this.queryClient.getAuthQueryClient();
        return rpc.ModuleAccountByName({
            name,
        });
    }
    async getModuleAccounts() {
        const rpc = await this.queryClient.getAuthQueryClient();
        return await rpc.ModuleAccounts();
    }
    async getAccountBalance(request) {
        const rpc = await this.queryClient.getBankQueryClient();
        return await rpc.Balance(request);
    }
    async getAccount(address) {
        const client = await this.queryClient.getQueryClient();
        const account = await client.auth.account(address);
        if (!account)
            return BaseAccount.fromJSON({});
        return BaseAccount.toJSON(BaseAccount.decode(account.value));
    }
    async transfer(msg) {
        return await this.txClient.tx(MsgSendTypeUrl, msg.fromAddress, MsgSendSDKTypeEIP712, MsgSend.toSDK(msg), MsgSend.encode(msg).finish());
    }
};
Account = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Account);

let Basic = class Basic {
    constructor() {
        this.rpcQueryClient = container.resolve(RpcQueryClient);
    }
    async getNodeInfo() {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl$1(rpcClient);
        return await rpc.GetNodeInfo();
    }
    async getLatestBlock() {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl$1(rpcClient);
        return await rpc.GetLatestBlock();
    }
    async getLatestBlockHeight() {
        const latestBlock = await this.getLatestBlock();
        const height = latestBlock.sdkBlock?.header?.height;
        if (!height)
            return 0;
        return height.toNumber();
    }
    async getSyncing() {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl$1(rpcClient);
        const syncing = await rpc.GetSyncing();
        return syncing.syncing;
    }
    async getBlockByHeight(height) {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl$1(rpcClient);
        return await rpc.GetBlockByHeight({
            height: Long.fromInt(height),
        });
    }
    async GetLatestValidatorSet(request) {
        const rpcClient = await this.rpcQueryClient.getRpcClient();
        const rpc = new ServiceClientImpl$1(rpcClient);
        const validatorSet = await rpc.GetLatestValidatorSet(request);
        return validatorSet.blockHeight.toNumber();
    }
};
Basic = __decorate([
    injectable()
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
    const res = cloneDeep(MsgPutPolicySDKTypeEIP712);
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
    const res = cloneDeep(MsgSetTagSDKTypeEIP712);
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
    const res = cloneDeep(MsgUpdateGroupMemberSDKTypeEIP712);
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

/**
 * Internal assertion helpers.
 * @module
 */
/** Is number an Uint8Array? Copied from utils for perf. */
function isBytes$1(a) {
    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
}
/** Asserts something is Uint8Array. */
function abytes$1(b, ...lengths) {
    if (!isBytes$1(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
/** Asserts output is properly-sized byte array */
function aoutput(out, instance) {
    abytes$1(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}

const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */
// Cast array to view
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/**
 * Convert JS string to byte array.
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error('utf8ToBytes expected string, got ' + typeof str);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    abytes$1(data);
    return data;
}
/** For runtime check if class implements interface */
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
/** Wraps hash function, creating an interface on top of it */
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
function randomBytes(bytesLength = 32) {
    if (crypto && typeof crypto.getRandomValues === 'function') {
        return crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (crypto && typeof crypto.randomBytes === 'function') {
        return crypto.randomBytes(bytesLength);
    }
    throw new Error('crypto.getRandomValues must be defined');
}

/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */
/** Polyfill for Safari 14. https://caniuse.com/mdn-javascript_builtins_dataview_setbiguint64 */
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
/**
 * Merkle-Damgard hash construction base class.
 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
 */
class HashMD extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
    }
    update(data) {
        aexists(this);
        const { view, buffer, blockLen } = this;
        data = toBytes(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = createView(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        aexists(this);
        aoutput(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}

/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */
const U32_MASK64$1 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n$1 = /* @__PURE__ */ BigInt(32);
function fromBig$1(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64$1), l: Number((n >> _32n$1) & U32_MASK64$1) };
    return { h: Number((n >> _32n$1) & U32_MASK64$1) | 0, l: Number(n & U32_MASK64$1) | 0 };
}
function split$1(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig$1(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
const toBig = (h, l) => (BigInt(h >>> 0) << _32n$1) | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l) => l;
const rotr32L = (h, _l) => h;
// Left rotate for Shift in [1, 32)
const rotlSH$1 = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL$1 = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH$1 = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL$1 = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
// prettier-ignore
const u64 = {
    fromBig: fromBig$1, split: split$1, toBig,
    shrSH, shrSL,
    rotrSH, rotrSL, rotrBH, rotrBL,
    rotr32H, rotr32L,
    rotlSH: rotlSH$1, rotlSL: rotlSL$1, rotlBH: rotlBH$1, rotlBL: rotlBL$1,
    add, add3L, add3H, add4L, add4H, add5H, add5L,
};

/**
 * SHA2-512 a.k.a. sha512 and sha384. It is slower than sha256 in js because u64 operations are slow.
 *
 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
 * [the paper on truncated SHA512/256](https://eprint.iacr.org/2010/548.pdf).
 * @module
 */
// Round contants (first 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409):
// prettier-ignore
const [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64.split([
    '0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc',
    '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118',
    '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2',
    '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694',
    '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65',
    '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5',
    '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4',
    '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70',
    '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df',
    '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b',
    '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30',
    '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8',
    '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8',
    '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3',
    '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec',
    '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b',
    '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178',
    '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b',
    '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c',
    '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'
].map(n => BigInt(n))))();
// Temporary buffer, not used to store anything between runs
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends HashMD {
    constructor() {
        super(128, 64, 16, false);
        // We cannot use array here since array allows indexing by variable which means optimizer/compiler cannot use registers.
        // Also looks cleaner and easier to verify with spec.
        // Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
        // h -- high 32 bits, l -- low 32 bits
        this.Ah = 0x6a09e667 | 0;
        this.Al = 0xf3bcc908 | 0;
        this.Bh = 0xbb67ae85 | 0;
        this.Bl = 0x84caa73b | 0;
        this.Ch = 0x3c6ef372 | 0;
        this.Cl = 0xfe94f82b | 0;
        this.Dh = 0xa54ff53a | 0;
        this.Dl = 0x5f1d36f1 | 0;
        this.Eh = 0x510e527f | 0;
        this.El = 0xade682d1 | 0;
        this.Fh = 0x9b05688c | 0;
        this.Fl = 0x2b3e6c1f | 0;
        this.Gh = 0x1f83d9ab | 0;
        this.Gl = 0xfb41bd6b | 0;
        this.Hh = 0x5be0cd19 | 0;
        this.Hl = 0x137e2179 | 0;
    }
    // prettier-ignore
    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32((offset += 4));
        }
        for (let i = 16; i < 80; i++) {
            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        // Compression function main loop, 80 rounds
        for (let i = 0; i < 80; i++) {
            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const CHIh = (Eh & Fh) ^ (~Eh & Gh);
            const CHIl = (El & Fl) ^ (~El & Gl);
            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
            // prettier-ignore
            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
            const MAJh = (Ah & Bh) ^ (Ah & Ch) ^ (Bh & Ch);
            const MAJl = (Al & Bl) ^ (Al & Cl) ^ (Bl & Cl);
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64.add3L(T1l, sigma0l, MAJl);
            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        // Add the compressed chunk to the current hash value
        ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
        SHA512_W_H.fill(0);
        SHA512_W_L.fill(0);
    }
    destroy() {
        this.buffer.fill(0);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
/** SHA2-512 hash function. */
const sha512 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

/**
 * Hex, bytes and number utilities.
 * @module
 */
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// 100 lines of code in the file are duplicated from noble-hashes (utils).
// This is OK: `abstract` directory does not use noble-hashes.
// User may opt-in into using different hashing library. This way, noble-hashes
// won't be included into their bundle.
const _0n$4 = /* @__PURE__ */ BigInt(0);
const _1n$5 = /* @__PURE__ */ BigInt(1);
const _2n$4 = /* @__PURE__ */ BigInt(2);
function isBytes(a) {
    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
}
function abytes(item) {
    if (!isBytes(item))
        throw new Error('Uint8Array expected');
}
function abool(title, value) {
    if (typeof value !== 'boolean')
        throw new Error(title + ' boolean expected, got ' + value);
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    abytes(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    return hex === '' ? _0n$4 : BigInt('0x' + hex); // Big Endian
}
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes$1(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
// BE: Big Endian, LE: Little Endian
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
    abytes(bytes);
    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
    return hexToBytes$1(n.toString(16).padStart(len * 2, '0'));
}
function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
}
/**
 * Takes hex string or Uint8Array, converts to Uint8Array.
 * Validates output length.
 * Will throw error for other types.
 * @param title descriptive title for an error e.g. 'private key'
 * @param hex hex string or Uint8Array
 * @param expectedLength optional, will compare to result array's length
 * @returns
 */
function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') {
        try {
            res = hexToBytes$1(hex);
        }
        catch (e) {
            throw new Error(title + ' must be hex string or Uint8Array, cause: ' + e);
        }
    }
    else if (isBytes(hex)) {
        // Uint8Array.from() instead of hash.slice() because node.js Buffer
        // is instance of Uint8Array, and its slice() creates **mutable** copy
        res = Uint8Array.from(hex);
    }
    else {
        throw new Error(title + ' must be hex string or Uint8Array');
    }
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength)
        throw new Error(title + ' of length ' + expectedLength + ' expected, got ' + len);
    return res;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// Is positive bigint
const isPosBig = (n) => typeof n === 'bigint' && _0n$4 <= n;
function inRange(n, min, max) {
    return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
/**
 * Asserts min <= n < max. NOTE: It's < max and not <= max.
 * @example
 * aInRange('x', x, 1n, 256n); // would assume x is in (1n..255n)
 */
function aInRange(title, n, min, max) {
    // Why min <= n < max and not a (min < n < max) OR b (min <= n <= max)?
    // consider P=256n, min=0n, max=P
    // - a for min=0 would require -1:          `inRange('x', x, -1n, P)`
    // - b would commonly require subtraction:  `inRange('x', x, 0n, P - 1n)`
    // - our way is the cleanest:               `inRange('x', x, 0n, P)
    if (!inRange(n, min, max))
        throw new Error('expected valid ' + title + ': ' + min + ' <= n < ' + max + ', got ' + n);
}
// Bit operations
/**
 * Calculates amount of bits in a bigint.
 * Same as `n.toString(2).length`
 */
function bitLen(n) {
    let len;
    for (len = 0; n > _0n$4; n >>= _1n$5, len += 1)
        ;
    return len;
}
/**
 * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
 * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
 */
const bitMask = (n) => (_2n$4 << BigInt(n - 1)) - _1n$5;
// Validating curves and fields
const validatorFns = {
    bigint: (val) => typeof val === 'bigint',
    function: (val) => typeof val === 'function',
    boolean: (val) => typeof val === 'boolean',
    string: (val) => typeof val === 'string',
    stringOrUint8Array: (val) => typeof val === 'string' || isBytes(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === 'function' && Number.isSafeInteger(val.outputLen),
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns[type];
        if (typeof checkVal !== 'function')
            throw new Error('invalid validator function');
        const val = object[fieldName];
        if (isOptional && val === undefined)
            return;
        if (!checkVal(val, object)) {
            throw new Error('param ' + String(fieldName) + ' is invalid. Expected ' + type + ', got ' + val);
        }
    };
    for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
    return object;
}
/**
 * Memoizes (caches) computation result.
 * Uses WeakMap: the value is going auto-cleaned by GC after last reference is removed.
 */
function memoized(fn) {
    const map = new WeakMap();
    return (arg, ...args) => {
        const val = map.get(arg);
        if (val !== undefined)
            return val;
        const computed = fn(arg, ...args);
        map.set(arg, computed);
        return computed;
    };
}

/**
 * Utils for modular division and finite fields.
 * A finite field over 11 is integer number operations `mod 11`.
 * There is no division: it is replaced by modular multiplicative inverse.
 * @module
 */
// prettier-ignore
const _0n$3 = BigInt(0), _1n$4 = BigInt(1), _2n$3 = /* @__PURE__ */ BigInt(2), _3n = /* @__PURE__ */ BigInt(3);
// prettier-ignore
const _4n = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5), _8n$2 = /* @__PURE__ */ BigInt(8);
// Calculates a modulo b
function mod(a, b) {
    const result = a % b;
    return result >= _0n$3 ? result : b + result;
}
/**
 * Efficiently raise num to power and do modular division.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 * @todo use field version && remove
 * @example
 * pow(2n, 6n, 11n) // 64n % 11n == 9n
 */
function pow(num, power, modulo) {
    if (power < _0n$3)
        throw new Error('invalid exponent, negatives unsupported');
    if (modulo <= _0n$3)
        throw new Error('invalid modulus');
    if (modulo === _1n$4)
        return _0n$3;
    let res = _1n$4;
    while (power > _0n$3) {
        if (power & _1n$4)
            res = (res * num) % modulo;
        num = (num * num) % modulo;
        power >>= _1n$4;
    }
    return res;
}
/** Does `x^(2^power)` mod p. `pow2(30, 4)` == `30^(2^4)` */
function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n$3) {
        res *= res;
        res %= modulo;
    }
    return res;
}
/**
 * Inverses number over modulo.
 * Implemented using [Euclidean GCD](https://brilliant.org/wiki/extended-euclidean-algorithm/).
 */
function invert(number, modulo) {
    if (number === _0n$3)
        throw new Error('invert: expected non-zero number');
    if (modulo <= _0n$3)
        throw new Error('invert: expected positive modulus, got ' + modulo);
    // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
    let a = mod(number, modulo);
    let b = modulo;
    // prettier-ignore
    let x = _0n$3, u = _1n$4;
    while (a !== _0n$3) {
        // JIT applies optimization if those two lines follow each other
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        // prettier-ignore
        b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n$4)
        throw new Error('invert: does not exist');
    return mod(x, modulo);
}
/**
 * Tonelli-Shanks square root search algorithm.
 * 1. https://eprint.iacr.org/2012/685.pdf (page 12)
 * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
 * Will start an infinite loop if field order P is not prime.
 * @param P field order
 * @returns function that takes field Fp (created from P) and number n
 */
function tonelliShanks(P) {
    // Legendre constant: used to calculate Legendre symbol (a | p),
    // which denotes the value of a^((p-1)/2) (mod p).
    // (a | p) ≡ 1    if a is a square (mod p)
    // (a | p) ≡ -1   if a is not a square (mod p)
    // (a | p) ≡ 0    if a ≡ 0 (mod p)
    const legendreC = (P - _1n$4) / _2n$3;
    let Q, S, Z;
    // Step 1: By factoring out powers of 2 from p - 1,
    // find q and s such that p - 1 = q*(2^s) with q odd
    for (Q = P - _1n$4, S = 0; Q % _2n$3 === _0n$3; Q /= _2n$3, S++)
        ;
    // Step 2: Select a non-square z such that (z | p) ≡ -1 and set c ≡ zq
    for (Z = _2n$3; Z < P && pow(Z, legendreC, P) !== P - _1n$4; Z++) {
        // Crash instead of infinity loop, we cannot reasonable count until P.
        if (Z > 1000)
            throw new Error('Cannot find square root: likely non-prime P');
    }
    // Fast-path
    if (S === 1) {
        const p1div4 = (P + _1n$4) / _4n;
        return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Slow-path
    const Q1div2 = (Q + _1n$4) / _2n$3;
    return function tonelliSlow(Fp, n) {
        // Step 0: Check that n is indeed a square: (n | p) should not be ≡ -1
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
            throw new Error('Cannot find square root');
        let r = S;
        // TODO: will fail at Fp2/etc
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q); // will update both x and b
        let x = Fp.pow(n, Q1div2); // first guess at the square root
        let b = Fp.pow(n, Q); // first guess at the fudge factor
        while (!Fp.eql(b, Fp.ONE)) {
            if (Fp.eql(b, Fp.ZERO))
                return Fp.ZERO; // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm (4. If t = 0, return r = 0)
            // Find m such b^(2^m)==1
            let m = 1;
            for (let t2 = Fp.sqr(b); m < r; m++) {
                if (Fp.eql(t2, Fp.ONE))
                    break;
                t2 = Fp.sqr(t2); // t2 *= t2
            }
            // NOTE: r-m-1 can be bigger than 32, need to convert to bigint before shift, otherwise there will be overflow
            const ge = Fp.pow(g, _1n$4 << BigInt(r - m - 1)); // ge = 2^(r-m-1)
            g = Fp.sqr(ge); // g = ge * ge
            x = Fp.mul(x, ge); // x *= ge
            b = Fp.mul(b, g); // b *= g
            r = m;
        }
        return x;
    };
}
/**
 * Square root for a finite field. It will try to check if optimizations are applicable and fall back to 4:
 *
 * 1. P ≡ 3 (mod 4)
 * 2. P ≡ 5 (mod 8)
 * 3. P ≡ 9 (mod 16)
 * 4. Tonelli-Shanks algorithm
 *
 * Different algorithms can give different roots, it is up to user to decide which one they want.
 * For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
 */
function FpSqrt(P) {
    // P ≡ 3 (mod 4)
    // √n = n^((P+1)/4)
    if (P % _4n === _3n) {
        // Not all roots possible!
        // const ORDER =
        //   0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
        // const NUM = 72057594037927816n;
        const p1div4 = (P + _1n$4) / _4n;
        return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            // Throw if root**2 != n
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Atkin algorithm for q ≡ 5 (mod 8), https://eprint.iacr.org/2012/685.pdf (page 10)
    if (P % _8n$2 === _5n$1) {
        const c1 = (P - _5n$1) / _8n$2;
        return function sqrt5mod8(Fp, n) {
            const n2 = Fp.mul(n, _2n$3);
            const v = Fp.pow(n2, c1);
            const nv = Fp.mul(n, v);
            const i = Fp.mul(Fp.mul(nv, _2n$3), v);
            const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Other cases: Tonelli-Shanks algorithm
    return tonelliShanks(P);
}
// Little-endian check for first LE bit (last BE bit);
const isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$4) === _1n$4;
// prettier-ignore
const FIELD_FIELDS = [
    'create', 'isValid', 'is0', 'neg', 'inv', 'sqrt', 'sqr',
    'eql', 'add', 'sub', 'mul', 'pow', 'div',
    'addN', 'subN', 'mulN', 'sqrN'
];
function validateField(field) {
    const initial = {
        ORDER: 'bigint',
        MASK: 'bigint',
        BYTES: 'isSafeInteger',
        BITS: 'isSafeInteger',
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
        map[val] = 'function';
        return map;
    }, initial);
    return validateObject(field, opts);
}
// Generic field functions
/**
 * Same as `pow` but for Fp: non-constant-time.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 */
function FpPow(f, num, power) {
    // Should have same speed as pow for bigints
    // TODO: benchmark!
    if (power < _0n$3)
        throw new Error('invalid exponent, negatives unsupported');
    if (power === _0n$3)
        return f.ONE;
    if (power === _1n$4)
        return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n$3) {
        if (power & _1n$4)
            p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n$4;
    }
    return p;
}
/**
 * Efficiently invert an array of Field elements.
 * `inv(0)` will return `undefined` here: make sure to throw an error.
 */
function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    // Walk from first to last, multiply them by each other MOD p
    const lastMultiplied = nums.reduce((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
    }, f.ONE);
    // Invert last element
    const inverted = f.inv(lastMultiplied);
    // Walk from last to first, multiply them by inverted each other MOD p
    nums.reduceRight((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
    }, inverted);
    return tmp;
}
// CURVE.n lengths
function nLength(n, nBitLength) {
    // Bit size, byte size of CURVE.n
    const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
}
/**
 * Initializes a finite field over prime.
 * Major performance optimizations:
 * * a) denormalized operations like mulN instead of mul
 * * b) same object shape: never add or remove keys
 * * c) Object.freeze
 * Fragile: always run a benchmark on a change.
 * Security note: operations don't check 'isValid' for all elements for performance reasons,
 * it is caller responsibility to check this.
 * This is low-level code, please make sure you know what you're doing.
 * @param ORDER prime positive bigint
 * @param bitLen how many bits the field consumes
 * @param isLE (def: false) if encoding / decoding should be in little-endian
 * @param redef optional faster redefinitions of sqrt and other methods
 */
function Field(ORDER, bitLen, isLE = false, redef = {}) {
    if (ORDER <= _0n$3)
        throw new Error('invalid field: expected ORDER > 0, got ' + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
    if (BYTES > 2048)
        throw new Error('invalid field: expected ORDER of <= 2048 bytes');
    let sqrtP; // cached sqrtP
    const f = Object.freeze({
        ORDER,
        isLE,
        BITS,
        BYTES,
        MASK: bitMask(BITS),
        ZERO: _0n$3,
        ONE: _1n$4,
        create: (num) => mod(num, ORDER),
        isValid: (num) => {
            if (typeof num !== 'bigint')
                throw new Error('invalid field element: expected bigint, got ' + typeof num);
            return _0n$3 <= num && num < ORDER; // 0 is valid element, but it's not invertible
        },
        is0: (num) => num === _0n$3,
        isOdd: (num) => (num & _1n$4) === _1n$4,
        neg: (num) => mod(-num, ORDER),
        eql: (lhs, rhs) => lhs === rhs,
        sqr: (num) => mod(num * num, ORDER),
        add: (lhs, rhs) => mod(lhs + rhs, ORDER),
        sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
        mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
        pow: (num, power) => FpPow(f, num, power),
        div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num) => num * num,
        addN: (lhs, rhs) => lhs + rhs,
        subN: (lhs, rhs) => lhs - rhs,
        mulN: (lhs, rhs) => lhs * rhs,
        inv: (num) => invert(num, ORDER),
        sqrt: redef.sqrt ||
            ((n) => {
                if (!sqrtP)
                    sqrtP = FpSqrt(ORDER);
                return sqrtP(f, n);
            }),
        invertBatch: (lst) => FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c) => (c ? b : a),
        toBytes: (num) => (isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES)),
        fromBytes: (bytes) => {
            if (bytes.length !== BYTES)
                throw new Error('Field.fromBytes: expected ' + BYTES + ' bytes, got ' + bytes.length);
            return isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
        },
    });
    return Object.freeze(f);
}

/**
 * Methods for elliptic curve multiplication by scalars.
 * Contains wNAF, pippenger
 * @module
 */
const _0n$2 = BigInt(0);
const _1n$3 = BigInt(1);
function constTimeNegate(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
}
function validateW(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
        throw new Error('invalid window size, expected [1..' + bits + '], got W=' + W);
}
function calcWOpts(W, bits) {
    validateW(W, bits);
    const windows = Math.ceil(bits / W) + 1; // +1, because
    const windowSize = 2 ** (W - 1); // -1 because we skip zero
    return { windows, windowSize };
}
function validateMSMPoints(points, c) {
    if (!Array.isArray(points))
        throw new Error('array expected');
    points.forEach((p, i) => {
        if (!(p instanceof c))
            throw new Error('invalid point at index ' + i);
    });
}
function validateMSMScalars(scalars, field) {
    if (!Array.isArray(scalars))
        throw new Error('array of scalars expected');
    scalars.forEach((s, i) => {
        if (!field.isValid(s))
            throw new Error('invalid scalar at index ' + i);
    });
}
// Since points in different groups cannot be equal (different object constructor),
// we can have single place to store precomputes
const pointPrecomputes = new WeakMap();
const pointWindowSizes = new WeakMap(); // This allows use make points immutable (nothing changes inside)
function getW(P) {
    return pointWindowSizes.get(P) || 1;
}
/**
 * Elliptic curve multiplication of Point by scalar. Fragile.
 * Scalars should always be less than curve order: this should be checked inside of a curve itself.
 * Creates precomputation tables for fast multiplication:
 * - private scalar is split by fixed size windows of W bits
 * - every window point is collected from window's table & added to accumulator
 * - since windows are different, same point inside tables won't be accessed more than once per calc
 * - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
 * - +1 window is neccessary for wNAF
 * - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
 *
 * @todo Research returning 2d JS array of windows, instead of a single window.
 * This would allow windows to be in different memory locations
 */
function wNAF(c, bits) {
    return {
        constTimeNegate,
        hasPrecomputes(elm) {
            return getW(elm) !== 1;
        },
        // non-const time multiplication ladder
        unsafeLadder(elm, n, p = c.ZERO) {
            let d = elm;
            while (n > _0n$2) {
                if (n & _1n$3)
                    p = p.add(d);
                d = d.double();
                n >>= _1n$3;
            }
            return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @param elm Point instance
         * @param W window size
         * @returns precomputed point tables flattened to a single array
         */
        precomputeWindow(elm, W) {
            const { windows, windowSize } = calcWOpts(W, bits);
            const points = [];
            let p = elm;
            let base = p;
            for (let window = 0; window < windows; window++) {
                base = p;
                points.push(base);
                // =1, because we skip zero
                for (let i = 1; i < windowSize; i++) {
                    base = base.add(p);
                    points.push(base);
                }
                p = base.double();
            }
            return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */
        wNAF(W, precomputes, n) {
            // TODO: maybe check that scalar is less than group order? wNAF behavious is undefined otherwise
            // But need to carefully remove other checks before wNAF. ORDER == bits here
            const { windows, windowSize } = calcWOpts(W, bits);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
                const offset = window * windowSize;
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n$3;
                }
                // This code was first written with assumption that 'f' and 'p' will never be infinity point:
                // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
                // there is negate now: it is possible that negated element from low value
                // would be the same as high element, which will create carry into next window.
                // It's not obvious how this can fail, but still worth investigating later.
                // Check if we're onto Zero point.
                // Add random point inside current window to f.
                const offset1 = offset;
                const offset2 = offset + Math.abs(wbits) - 1; // -1 because we skip zero
                const cond1 = window % 2 !== 0;
                const cond2 = wbits < 0;
                if (wbits === 0) {
                    // The most important part for const-time getPublicKey
                    f = f.add(constTimeNegate(cond1, precomputes[offset1]));
                }
                else {
                    p = p.add(constTimeNegate(cond2, precomputes[offset2]));
                }
            }
            // JIT-compiler should not eliminate f here, since it will later be used in normalizeZ()
            // Even if the variable is still unused, there are some checks which will
            // throw an exception, so compiler needs to prove they won't happen, which is hard.
            // At this point there is a way to F be infinity-point even if p is not,
            // which makes it less const-time: around 1 bigint multiply.
            return { p, f };
        },
        /**
         * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @param acc accumulator point to add result of multiplication
         * @returns point
         */
        wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
            const { windows, windowSize } = calcWOpts(W, bits);
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
                const offset = window * windowSize;
                if (n === _0n$2)
                    break; // No need to go over empty scalar
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n$3;
                }
                if (wbits === 0)
                    continue;
                let curr = precomputes[offset + Math.abs(wbits) - 1]; // -1 because we skip zero
                if (wbits < 0)
                    curr = curr.negate();
                // NOTE: by re-using acc, we can save a lot of additions in case of MSM
                acc = acc.add(curr);
            }
            return acc;
        },
        getPrecomputes(W, P, transform) {
            // Calculate precomputes on a first run, reuse them after
            let comp = pointPrecomputes.get(P);
            if (!comp) {
                comp = this.precomputeWindow(P, W);
                if (W !== 1)
                    pointPrecomputes.set(P, transform(comp));
            }
            return comp;
        },
        wNAFCached(P, n, transform) {
            const W = getW(P);
            return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
        },
        wNAFCachedUnsafe(P, n, transform, prev) {
            const W = getW(P);
            if (W === 1)
                return this.unsafeLadder(P, n, prev); // For W=1 ladder is ~x2 faster
            return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
        },
        // We calculate precomputes for elliptic curve point multiplication
        // using windowed method. This specifies window size and
        // stores precomputed values. Usually only base point would be precomputed.
        setWindowSize(P, W) {
            validateW(W, bits);
            pointWindowSizes.set(P, W);
            pointPrecomputes.delete(P);
        },
    };
}
/**
 * Pippenger algorithm for multi-scalar multiplication (MSM, Pa + Qb + Rc + ...).
 * 30x faster vs naive addition on L=4096, 10x faster with precomputes.
 * For N=254bit, L=1, it does: 1024 ADD + 254 DBL. For L=5: 1536 ADD + 254 DBL.
 * Algorithmically constant-time (for same L), even when 1 point + scalar, or when scalar = 0.
 * @param c Curve Point constructor
 * @param fieldN field over CURVE.N - important that it's not over CURVE.P
 * @param points array of L curve points
 * @param scalars array of L scalars (aka private keys / bigints)
 */
function pippenger(c, fieldN, points, scalars) {
    // If we split scalars by some window (let's say 8 bits), every chunk will only
    // take 256 buckets even if there are 4096 scalars, also re-uses double.
    // TODO:
    // - https://eprint.iacr.org/2024/750.pdf
    // - https://tches.iacr.org/index.php/TCHES/article/view/10287
    // 0 is accepted in scalars
    validateMSMPoints(points, c);
    validateMSMScalars(scalars, fieldN);
    if (points.length !== scalars.length)
        throw new Error('arrays of points and scalars must have equal length');
    const zero = c.ZERO;
    const wbits = bitLen(BigInt(points.length));
    const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1; // in bits
    const MASK = (1 << windowSize) - 1;
    const buckets = new Array(MASK + 1).fill(zero); // +1 for zero array
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i = lastBits; i >= 0; i -= windowSize) {
        buckets.fill(zero);
        for (let j = 0; j < scalars.length; j++) {
            const scalar = scalars[j];
            const wbits = Number((scalar >> BigInt(i)) & BigInt(MASK));
            buckets[wbits] = buckets[wbits].add(points[j]);
        }
        let resI = zero; // not using this will do small speed-up, but will lose ct
        // Skip first bucket, because it is zero
        for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
            sumI = sumI.add(buckets[j]);
            resI = resI.add(sumI);
        }
        sum = sum.add(resI);
        if (i !== 0)
            for (let j = 0; j < windowSize; j++)
                sum = sum.double();
    }
    return sum;
}
function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
        n: 'bigint',
        h: 'bigint',
        Gx: 'field',
        Gy: 'field',
    }, {
        nBitLength: 'isSafeInteger',
        nByteLength: 'isSafeInteger',
    });
    // Set defaults
    return Object.freeze({
        ...nLength(curve.n, curve.nBitLength),
        ...curve,
        ...{ p: curve.Fp.ORDER },
    });
}

/**
 * Twisted Edwards curve. The formula is: ax² + y² = 1 + dx²y².
 * For design rationale of types / exports, see weierstrass module documentation.
 * @module
 */
// Be friendly to bad ECMAScript parsers by not using bigint literals
// prettier-ignore
const _0n$1 = BigInt(0), _1n$2 = BigInt(1), _2n$2 = BigInt(2), _8n$1 = BigInt(8);
// verification rule is either zip215 or rfc8032 / nist186-5. Consult fromHex:
const VERIFY_DEFAULT = { zip215: true };
function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(curve, {
        hash: 'function',
        a: 'bigint',
        d: 'bigint',
        randomBytes: 'function',
    }, {
        adjustScalarBytes: 'function',
        domain: 'function',
        uvRatio: 'function',
        mapToCurve: 'function',
    });
    // Set defaults
    return Object.freeze({ ...opts });
}
/**
 * Creates Twisted Edwards curve with EdDSA signatures.
 * @example
 * import { Field } from '@noble/curves/abstract/modular';
 * // Before that, define BigInt-s: a, d, p, n, Gx, Gy, h
 * const curve = twistedEdwards({ a, d, Fp: Field(p), n, Gx, Gy, h })
 */
function twistedEdwards(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp, n: CURVE_ORDER, prehash: prehash, hash: cHash, randomBytes, nByteLength, h: cofactor, } = CURVE;
    // Important:
    // There are some places where Fp.BYTES is used instead of nByteLength.
    // So far, everything has been tested with curves of Fp.BYTES == nByteLength.
    // TODO: test and find curves which behave otherwise.
    const MASK = _2n$2 << (BigInt(nByteLength * 8) - _1n$2);
    const modP = Fp.create; // Function overrides
    const Fn = Field(CURVE.n, CURVE.nBitLength);
    // sqrt(u/v)
    const uvRatio = CURVE.uvRatio ||
        ((u, v) => {
            try {
                return { isValid: true, value: Fp.sqrt(u * Fp.inv(v)) };
            }
            catch (e) {
                return { isValid: false, value: _0n$1 };
            }
        });
    const adjustScalarBytes = CURVE.adjustScalarBytes || ((bytes) => bytes); // NOOP
    const domain = CURVE.domain ||
        ((data, ctx, phflag) => {
            abool('phflag', phflag);
            if (ctx.length || phflag)
                throw new Error('Contexts/pre-hash are not supported');
            return data;
        }); // NOOP
    // 0 <= n < MASK
    // Coordinates larger than Fp.ORDER are allowed for zip215
    function aCoordinate(title, n) {
        aInRange('coordinate ' + title, n, _0n$1, MASK);
    }
    function assertPoint(other) {
        if (!(other instanceof Point))
            throw new Error('ExtendedPoint expected');
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    const toAffineMemo = memoized((p, iz) => {
        const { ex: x, ey: y, ez: z } = p;
        const is0 = p.is0();
        if (iz == null)
            iz = is0 ? _8n$1 : Fp.inv(z); // 8 was chosen arbitrarily
        const ax = modP(x * iz);
        const ay = modP(y * iz);
        const zz = modP(z * iz);
        if (is0)
            return { x: _0n$1, y: _1n$2 };
        if (zz !== _1n$2)
            throw new Error('invZ was invalid');
        return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p) => {
        const { a, d } = CURVE;
        if (p.is0())
            throw new Error('bad point: ZERO'); // TODO: optimize, with vars below?
        // Equation in affine coordinates: ax² + y² = 1 + dx²y²
        // Equation in projective coordinates (X/Z, Y/Z, Z):  (aX² + Y²)Z² = Z⁴ + dX²Y²
        const { ex: X, ey: Y, ez: Z, et: T } = p;
        const X2 = modP(X * X); // X²
        const Y2 = modP(Y * Y); // Y²
        const Z2 = modP(Z * Z); // Z²
        const Z4 = modP(Z2 * Z2); // Z⁴
        const aX2 = modP(X2 * a); // aX²
        const left = modP(Z2 * modP(aX2 + Y2)); // (aX² + Y²)Z²
        const right = modP(Z4 + modP(d * modP(X2 * Y2))); // Z⁴ + dX²Y²
        if (left !== right)
            throw new Error('bad point: equation left != right (1)');
        // In Extended coordinates we also have T, which is x*y=T/Z: check X*Y == Z*T
        const XY = modP(X * Y);
        const ZT = modP(Z * T);
        if (XY !== ZT)
            throw new Error('bad point: equation left != right (2)');
        return true;
    });
    // Extended Point works in extended coordinates: (x, y, z, t) ∋ (x=x/z, y=y/z, t=xy).
    // https://en.wikipedia.org/wiki/Twisted_Edwards_curve#Extended_coordinates
    class Point {
        constructor(ex, ey, ez, et) {
            this.ex = ex;
            this.ey = ey;
            this.ez = ez;
            this.et = et;
            aCoordinate('x', ex);
            aCoordinate('y', ey);
            aCoordinate('z', ez);
            aCoordinate('t', et);
            Object.freeze(this);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        static fromAffine(p) {
            if (p instanceof Point)
                throw new Error('extended point not allowed');
            const { x, y } = p || {};
            aCoordinate('x', x);
            aCoordinate('y', y);
            return new Point(x, y, _1n$2, modP(x * y));
        }
        static normalizeZ(points) {
            const toInv = Fp.invertBatch(points.map((p) => p.ez));
            return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        // Multiscalar Multiplication
        static msm(points, scalars) {
            return pippenger(Point, Fn, points, scalars);
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
            wnaf.setWindowSize(this, windowSize);
        }
        // Not required for fromHex(), which always creates valid points.
        // Could be useful for fromAffine().
        assertValidity() {
            assertValidMemo(this);
        }
        // Compare one point to another.
        equals(other) {
            assertPoint(other);
            const { ex: X1, ey: Y1, ez: Z1 } = this;
            const { ex: X2, ey: Y2, ez: Z2 } = other;
            const X1Z2 = modP(X1 * Z2);
            const X2Z1 = modP(X2 * Z1);
            const Y1Z2 = modP(Y1 * Z2);
            const Y2Z1 = modP(Y2 * Z1);
            return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
        }
        is0() {
            return this.equals(Point.ZERO);
        }
        negate() {
            // Flips point sign to a negative one (-x, y in affine coords)
            return new Point(modP(-this.ex), this.ey, this.ez, modP(-this.et));
        }
        // Fast algo for doubling Extended Point.
        // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
        // Cost: 4M + 4S + 1*a + 6add + 1*2.
        double() {
            const { a } = CURVE;
            const { ex: X1, ey: Y1, ez: Z1 } = this;
            const A = modP(X1 * X1); // A = X12
            const B = modP(Y1 * Y1); // B = Y12
            const C = modP(_2n$2 * modP(Z1 * Z1)); // C = 2*Z12
            const D = modP(a * A); // D = a*A
            const x1y1 = X1 + Y1;
            const E = modP(modP(x1y1 * x1y1) - A - B); // E = (X1+Y1)2-A-B
            const G = D + B; // G = D+B
            const F = G - C; // F = G-C
            const H = D - B; // H = D-B
            const X3 = modP(E * F); // X3 = E*F
            const Y3 = modP(G * H); // Y3 = G*H
            const T3 = modP(E * H); // T3 = E*H
            const Z3 = modP(F * G); // Z3 = F*G
            return new Point(X3, Y3, Z3, T3);
        }
        // Fast algo for adding 2 Extended Points.
        // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
        // Cost: 9M + 1*a + 1*d + 7add.
        add(other) {
            assertPoint(other);
            const { a, d } = CURVE;
            const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
            const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
            // Faster algo for adding 2 Extended Points when curve's a=-1.
            // http://hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html#addition-add-2008-hwcd-4
            // Cost: 8M + 8add + 2*2.
            // Note: It does not check whether the `other` point is valid.
            if (a === BigInt(-1)) {
                const A = modP((Y1 - X1) * (Y2 + X2));
                const B = modP((Y1 + X1) * (Y2 - X2));
                const F = modP(B - A);
                if (F === _0n$1)
                    return this.double(); // Same point. Tests say it doesn't affect timing
                const C = modP(Z1 * _2n$2 * T2);
                const D = modP(T1 * _2n$2 * Z2);
                const E = D + C;
                const G = B + A;
                const H = D - C;
                const X3 = modP(E * F);
                const Y3 = modP(G * H);
                const T3 = modP(E * H);
                const Z3 = modP(F * G);
                return new Point(X3, Y3, Z3, T3);
            }
            const A = modP(X1 * X2); // A = X1*X2
            const B = modP(Y1 * Y2); // B = Y1*Y2
            const C = modP(T1 * d * T2); // C = T1*d*T2
            const D = modP(Z1 * Z2); // D = Z1*Z2
            const E = modP((X1 + Y1) * (X2 + Y2) - A - B); // E = (X1+Y1)*(X2+Y2)-A-B
            const F = D - C; // F = D-C
            const G = D + C; // G = D+C
            const H = modP(B - a * A); // H = B-a*A
            const X3 = modP(E * F); // X3 = E*F
            const Y3 = modP(G * H); // Y3 = G*H
            const T3 = modP(E * H); // T3 = E*H
            const Z3 = modP(F * G); // Z3 = F*G
            return new Point(X3, Y3, Z3, T3);
        }
        subtract(other) {
            return this.add(other.negate());
        }
        wNAF(n) {
            return wnaf.wNAFCached(this, n, Point.normalizeZ);
        }
        // Constant-time multiplication.
        multiply(scalar) {
            const n = scalar;
            aInRange('scalar', n, _1n$2, CURVE_ORDER); // 1 <= scalar < L
            const { p, f } = this.wNAF(n);
            return Point.normalizeZ([p, f])[0];
        }
        // Non-constant-time multiplication. Uses double-and-add algorithm.
        // It's faster, but should only be used when you don't care about
        // an exposed private key e.g. sig verification.
        // Does NOT allow scalars higher than CURVE.n.
        // Accepts optional accumulator to merge with multiply (important for sparse scalars)
        multiplyUnsafe(scalar, acc = Point.ZERO) {
            const n = scalar;
            aInRange('scalar', n, _0n$1, CURVE_ORDER); // 0 <= scalar < L
            if (n === _0n$1)
                return I;
            if (this.is0() || n === _1n$2)
                return this;
            return wnaf.wNAFCachedUnsafe(this, n, Point.normalizeZ, acc);
        }
        // Checks if point is of small order.
        // If you add something to small order point, you will have "dirty"
        // point with torsion component.
        // Multiplies point by cofactor and checks if the result is 0.
        isSmallOrder() {
            return this.multiplyUnsafe(cofactor).is0();
        }
        // Multiplies point by curve order and checks if the result is 0.
        // Returns `false` is the point is dirty.
        isTorsionFree() {
            return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
        }
        // Converts Extended point to default (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        toAffine(iz) {
            return toAffineMemo(this, iz);
        }
        clearCofactor() {
            const { h: cofactor } = CURVE;
            if (cofactor === _1n$2)
                return this;
            return this.multiplyUnsafe(cofactor);
        }
        // Converts hash string or Uint8Array to Point.
        // Uses algo from RFC8032 5.1.3.
        static fromHex(hex, zip215 = false) {
            const { d, a } = CURVE;
            const len = Fp.BYTES;
            hex = ensureBytes('pointHex', hex, len); // copy hex to a new array
            abool('zip215', zip215);
            const normed = hex.slice(); // copy again, we'll manipulate it
            const lastByte = hex[len - 1]; // select last byte
            normed[len - 1] = lastByte & ~0x80; // clear last bit
            const y = bytesToNumberLE(normed);
            // zip215=true is good for consensus-critical apps. =false follows RFC8032 / NIST186-5.
            // RFC8032 prohibits >= p, but ZIP215 doesn't
            // zip215=true:  0 <= y < MASK (2^256 for ed25519)
            // zip215=false: 0 <= y < P (2^255-19 for ed25519)
            const max = zip215 ? MASK : Fp.ORDER;
            aInRange('pointHex.y', y, _0n$1, max);
            // Ed25519: x² = (y²-1)/(dy²+1) mod p. Ed448: x² = (y²-1)/(dy²-1) mod p. Generic case:
            // ax²+y²=1+dx²y² => y²-1=dx²y²-ax² => y²-1=x²(dy²-a) => x²=(y²-1)/(dy²-a)
            const y2 = modP(y * y); // denominator is always non-0 mod p.
            const u = modP(y2 - _1n$2); // u = y² - 1
            const v = modP(d * y2 - a); // v = d y² + 1.
            let { isValid, value: x } = uvRatio(u, v); // √(u/v)
            if (!isValid)
                throw new Error('Point.fromHex: invalid y coordinate');
            const isXOdd = (x & _1n$2) === _1n$2; // There are 2 square roots. Use x_0 bit to select proper
            const isLastByteOdd = (lastByte & 0x80) !== 0; // x_0, last bit
            if (!zip215 && x === _0n$1 && isLastByteOdd)
                // if x=0 and x_0 = 1, fail
                throw new Error('Point.fromHex: x=0 and x_0=1');
            if (isLastByteOdd !== isXOdd)
                x = modP(-x); // if x_0 != x mod 2, set x = p-x
            return Point.fromAffine({ x, y });
        }
        static fromPrivateKey(privKey) {
            return getExtendedPublicKey(privKey).point;
        }
        toRawBytes() {
            const { x, y } = this.toAffine();
            const bytes = numberToBytesLE(y, Fp.BYTES); // each y has 2 x values (x, -y)
            bytes[bytes.length - 1] |= x & _1n$2 ? 0x80 : 0; // when compressing, it's enough to store y
            return bytes; // and use the last byte to encode sign of x
        }
        toHex() {
            return bytesToHex(this.toRawBytes()); // Same as toRawBytes, but returns string.
        }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$2, modP(CURVE.Gx * CURVE.Gy));
    Point.ZERO = new Point(_0n$1, _1n$2, _1n$2, _0n$1); // 0, 1, 1, 0
    const { BASE: G, ZERO: I } = Point;
    const wnaf = wNAF(Point, nByteLength * 8);
    function modN(a) {
        return mod(a, CURVE_ORDER);
    }
    // Little-endian SHA512 with modulo n
    function modN_LE(hash) {
        return modN(bytesToNumberLE(hash));
    }
    /** Convenience method that creates public key and other stuff. RFC8032 5.1.5 */
    function getExtendedPublicKey(key) {
        const len = Fp.BYTES;
        key = ensureBytes('private key', key, len);
        // Hash private key with curve's hash function to produce uniformingly random input
        // Check byte lengths: ensure(64, h(ensure(32, key)))
        const hashed = ensureBytes('hashed private key', cHash(key), 2 * len);
        const head = adjustScalarBytes(hashed.slice(0, len)); // clear first half bits, produce FE
        const prefix = hashed.slice(len, 2 * len); // second half is called key prefix (5.1.6)
        const scalar = modN_LE(head); // The actual private scalar
        const point = G.multiply(scalar); // Point on Edwards curve aka public key
        const pointBytes = point.toRawBytes(); // Uint8Array representation
        return { head, prefix, scalar, point, pointBytes };
    }
    // Calculates EdDSA pub key. RFC8032 5.1.5. Privkey is hashed. Use first half with 3 bits cleared
    function getPublicKey(privKey) {
        return getExtendedPublicKey(privKey).pointBytes;
    }
    // int('LE', SHA512(dom2(F, C) || msgs)) mod N
    function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
        const msg = concatBytes(...msgs);
        return modN_LE(cHash(domain(msg, ensureBytes('context', context), !!prehash)));
    }
    /** Signs message with privateKey. RFC8032 5.1.6 */
    function sign(msg, privKey, options = {}) {
        msg = ensureBytes('message', msg);
        if (prehash)
            msg = prehash(msg); // for ed25519ph etc.
        const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
        const r = hashDomainToScalar(options.context, prefix, msg); // r = dom2(F, C) || prefix || PH(M)
        const R = G.multiply(r).toRawBytes(); // R = rG
        const k = hashDomainToScalar(options.context, R, pointBytes, msg); // R || A || PH(M)
        const s = modN(r + k * scalar); // S = (r + k * s) mod L
        aInRange('signature.s', s, _0n$1, CURVE_ORDER); // 0 <= s < l
        const res = concatBytes(R, numberToBytesLE(s, Fp.BYTES));
        return ensureBytes('result', res, Fp.BYTES * 2); // 64-byte signature
    }
    const verifyOpts = VERIFY_DEFAULT;
    /**
     * Verifies EdDSA signature against message and public key. RFC8032 5.1.7.
     * An extended group equation is checked.
     */
    function verify(sig, msg, publicKey, options = verifyOpts) {
        const { context, zip215 } = options;
        const len = Fp.BYTES; // Verifies EdDSA signature against message and public key. RFC8032 5.1.7.
        sig = ensureBytes('signature', sig, 2 * len); // An extended group equation is checked.
        msg = ensureBytes('message', msg);
        publicKey = ensureBytes('publicKey', publicKey, len);
        if (zip215 !== undefined)
            abool('zip215', zip215);
        if (prehash)
            msg = prehash(msg); // for ed25519ph, etc
        const s = bytesToNumberLE(sig.slice(len, 2 * len));
        let A, R, SB;
        try {
            // zip215=true is good for consensus-critical apps. =false follows RFC8032 / NIST186-5.
            // zip215=true:  0 <= y < MASK (2^256 for ed25519)
            // zip215=false: 0 <= y < P (2^255-19 for ed25519)
            A = Point.fromHex(publicKey, zip215);
            R = Point.fromHex(sig.slice(0, len), zip215);
            SB = G.multiplyUnsafe(s); // 0 <= s < l is done inside
        }
        catch (error) {
            return false;
        }
        if (!zip215 && A.isSmallOrder())
            return false;
        const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
        const RkA = R.add(A.multiplyUnsafe(k));
        // Extended group equation
        // [8][S]B = [8]R + [8][k]A'
        return RkA.subtract(SB).clearCofactor().equals(Point.ZERO);
    }
    G._setWindowSize(8); // Enable precomputes. Slows down first publicKey computation by 20ms.
    const utils = {
        getExtendedPublicKey,
        // ed25519 private keys are uniform 32b. No need to check for modulo bias, like in secp256k1.
        randomPrivateKey: () => randomBytes(Fp.BYTES),
        /**
         * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
         * values. This slows down first getPublicKey() by milliseconds (see Speed section),
         * but allows to speed-up subsequent getPublicKey() calls up to 20x.
         * @param windowSize 2, 4, 8, 16
         */
        precompute(windowSize = 8, point = Point.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3));
            return point;
        },
    };
    return {
        CURVE,
        getPublicKey,
        sign,
        verify,
        ExtendedPoint: Point,
        utils,
    };
}

/**
 * Montgomery curve methods. It's not really whole montgomery curve,
 * just bunch of very specific methods for X25519 / X448 from
 * [RFC 7748](https://www.rfc-editor.org/rfc/rfc7748)
 * @module
 */
BigInt(0);
BigInt(1);

/**
 * ed25519 Twisted Edwards curve with following addons:
 * - X25519 ECDH
 * - Ristretto cofactor elimination
 * - Elligator hash-to-group / point indistinguishability
 * @module
 */
const ED25519_P = BigInt('57896044618658097711785492504343953926634992332820282019728792003956564819949');
// √(-1) aka √(a) aka 2^((p-1)/4)
const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt('19681161376707505956807079304988542015446066515923890162744021073123829784752');
// prettier-ignore
BigInt(0); const _1n$1 = BigInt(1), _2n$1 = BigInt(2); BigInt(3);
// prettier-ignore
const _5n = BigInt(5), _8n = BigInt(8);
function ed25519_pow_2_252_3(x) {
    // prettier-ignore
    const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
    const P = ED25519_P;
    const x2 = (x * x) % P;
    const b2 = (x2 * x) % P; // x^3, 11
    const b4 = (pow2(b2, _2n$1, P) * b2) % P; // x^15, 1111
    const b5 = (pow2(b4, _1n$1, P) * x) % P; // x^31
    const b10 = (pow2(b5, _5n, P) * b5) % P;
    const b20 = (pow2(b10, _10n, P) * b10) % P;
    const b40 = (pow2(b20, _20n, P) * b20) % P;
    const b80 = (pow2(b40, _40n, P) * b40) % P;
    const b160 = (pow2(b80, _80n, P) * b80) % P;
    const b240 = (pow2(b160, _80n, P) * b80) % P;
    const b250 = (pow2(b240, _10n, P) * b10) % P;
    const pow_p_5_8 = (pow2(b250, _2n$1, P) * x) % P;
    // ^ To pow to (p+3)/8, multiply it by x.
    return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
    // Section 5: For X25519, in order to decode 32 random bytes as an integer scalar,
    // set the three least significant bits of the first byte
    bytes[0] &= 248; // 0b1111_1000
    // and the most significant bit of the last to zero,
    bytes[31] &= 127; // 0b0111_1111
    // set the second most significant bit of the last byte to 1
    bytes[31] |= 64; // 0b0100_0000
    return bytes;
}
// sqrt(u/v)
function uvRatio(u, v) {
    const P = ED25519_P;
    const v3 = mod(v * v * v, P); // v³
    const v7 = mod(v3 * v3 * v, P); // v⁷
    // (p+3)/8 and (p-5)/8
    const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
    let x = mod(u * v3 * pow, P); // (uv³)(uv⁷)^(p-5)/8
    const vx2 = mod(v * x * x, P); // vx²
    const root1 = x; // First root candidate
    const root2 = mod(x * ED25519_SQRT_M1, P); // Second root candidate
    const useRoot1 = vx2 === u; // If vx² = u (mod p), x is a square root
    const useRoot2 = vx2 === mod(-u, P); // If vx² = -u, set x <-- x * 2^((p-1)/4)
    const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P); // There is no valid root, vx² = -u√(-1)
    if (useRoot1)
        x = root1;
    if (useRoot2 || noRoot)
        x = root2; // We return root2 anyway, for const-time
    if (isNegativeLE(x, P))
        x = mod(-x, P);
    return { isValid: useRoot1 || useRoot2, value: x };
}
const Fp = /* @__PURE__ */ (() => Field(ED25519_P, undefined, true))();
const ed25519Defaults = /* @__PURE__ */ (() => ({
    // Param: a
    a: BigInt(-1), // Fp.create(-1) is proper; our way still works and is faster
    // d is equal to -121665/121666 over finite field.
    // Negative number is P - number, and division is invert(number, P)
    d: BigInt('37095705934669439343138083508754565189542113879843219016388785533085940283555'),
    // Finite field 𝔽p over which we'll do calculations; 2n**255n - 19n
    Fp,
    // Subgroup order: how many points curve has
    // 2n**252n + 27742317777372353535851937790883648493n;
    n: BigInt('7237005577332262213973186563042994240857116359379907606001950938285454250989'),
    // Cofactor
    h: _8n,
    // Base point (x, y) aka generator point
    Gx: BigInt('15112221349535400772501151409588531511454012693041857206046113283949847762202'),
    Gy: BigInt('46316835694926478169428394003475163141307993866256225615783033603165251855960'),
    hash: sha512,
    randomBytes,
    adjustScalarBytes,
    // dom2
    // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
    // Constant-time, u/√v
    uvRatio,
}))();
/**
 * ed25519 curve with EdDSA signatures.
 * @example
 * import { ed25519 } from '@noble/curves/ed25519';
 * const priv = ed25519.utils.randomPrivateKey();
 * const pub = ed25519.getPublicKey(priv);
 * const msg = new TextEncoder().encode('hello');
 * const sig = ed25519.sign(msg, priv);
 * ed25519.verify(sig, msg, pub); // Default mode: follows ZIP215
 * ed25519.verify(sig, msg, pub, { zip215: false }); // RFC8032 / FIPS 186-5
 */
const ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();

const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));

// SHA3 (keccak) is based on a new design: basically, the internal state is bigger than output size.
// It's called a sponge function.
// Various per round constants calculations
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
    // Pi
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((((round + 1) * (round + 2)) / 2) % 64);
    // Iota
    let t = _0n;
    for (let j = 0; j < 7; j++) {
        R = ((R << _1n) ^ ((R >> _7n) * _0x71n)) % _256n;
        if (R & _2n)
            t ^= _1n << ((_1n << /* @__PURE__ */ BigInt(j)) - _1n);
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s) => (s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s));
const rotlL = (h, l, s) => (s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s));
// Same as keccakf1600, but allows to skip some rounds
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for (let round = 24 - rounds; round < 24; round++) {
        // Theta θ
        for (let x = 0; x < 10; x++)
            B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++)
                B[x] = s[y + x];
            for (let x = 0; x < 10; x++)
                s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
class Keccak extends Hash$1 {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        number(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = u32(this.state);
    }
    keccak() {
        if (!isLE)
            byteSwap32(this.state32);
        keccakP(this.state32, this.rounds);
        if (!isLE)
            byteSwap32(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        exists(this);
        const { blockLen, state } = this;
        data = toBytes$1(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
                state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
                this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished)
            return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1)
            this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        exists(this, false);
        bytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen)
                this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF)
            throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        number(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        output$1(out, this);
        if (this.finished)
            throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen) => wrapConstructor$1(() => new Keccak(blockLen, suffix, outputLen));
/**
 * keccak-256 hash function. Different from SHA3-256.
 * @param message - that would be hashed
 */
const keccak_256 = /* @__PURE__ */ gen(0x01, 136, 256 / 8);

const keccak256 = (() => {
    const k = wrapHash(keccak_256);
    k.create = keccak_256.create;
    return k;
})();

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
    const canonicalHeaders = getCanonicalHeaders(reqMeta, reqHeaders);
    const signedHeaders = getSignedHeaders(reqHeaders);
    const canonicalRequestArr = [
        reqMeta.method,
        reqMeta.url?.path,
        reqMeta.url?.query,
        canonicalHeaders,
        signedHeaders,
    ];
    const canonicalRequest = canonicalRequestArr.join('\n');
    return canonicalRequest;
};
const getAuthorization = (canonicalRequest, authType) => {
    // console.log('canonicalRequest', canonicalRequest);
    const unsignedMsg = getMsgToSign(utf8ToBytes$2(canonicalRequest));
    let authorization = '';
    if (authType.type === 'ECDSA') {
        const sig = secpSign(unsignedMsg, authType.privateKey);
        authorization = `GNFD1-ECDSA, Signature=${sig.slice(2)}`;
    }
    else {
        const sig = hexlify(ed25519.sign(hexlify(unsignedMsg).slice(2), authType.seed.slice(2)));
        authorization = `GNFD2-EDDSA,Signature=${sig.slice(2)}`;
    }
    return authorization;
};
const newRequestHeadersByMeta = (meta) => {
    const headers = new Headers$1();
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
    const signingKey = new SigningKey(privateKey);
    const signature = signingKey.signDigest(digestBz);
    let res = joinSignature(signature);
    const v = res.slice(-2);
    if (v === '1c')
        res = res.slice(0, -2) + '01';
    if (v === '1b')
        res = res.slice(0, -2) + '00';
    return res;
};
const getMsgToSign = (unsignedBytes) => {
    const res = keccak256(unsignedBytes);
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
                const u = toUtf8Bytes(s);
                for (let i = 0; i < u.length; i++) {
                    const hexStr = hexlify(u[i]);
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
    const unSignedMessageInHex = bytesToHex$2(utf8ToBytes$2(JSON.stringify(msg)));
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
    return {
        ...vgf,
        Id: Number(vgf.Id),
        PrimarySpId: Number(vgf.PrimarySpId),
        // GlobalVirtualGroupIds: vgf.GlobalVirtualGroupIds.map((id) => Number(id)),
    };
}
function formatBucketInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return {
        ...o,
        // PrimarySpId: Number(item.BucketInfo.PrimarySpId),
        BucketStatus: Number(o.BucketStatus),
        ChargedReadQuota: Number(o.ChargedReadQuota),
        CreateAt: Number(o.CreateAt),
        GlobalVirtualGroupFamilyId: Number(o.GlobalVirtualGroupFamilyId),
        SourceType: Number(o.SourceType),
        Visibility: Number(o.Visibility),
        // @ts-ignore
        SpAsDelegatedAgentDisabled: convertStrToBool(o.SpAsDelegatedAgentDisabled),
        Tags: {
            Tags: tags,
        },
    };
}
function formatObjectInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return {
        ...o,
        CreateAt: Number(o.CreateAt),
        Id: Number(o.Id),
        LocalVirtualGroupId: Number(o.LocalVirtualGroupId),
        ObjectStatus: Number(o.ObjectStatus),
        PayloadSize: Number(o.PayloadSize),
        RedundancyType: Number(o.RedundancyType),
        SourceType: Number(o.SourceType),
        Visibility: Number(o.Visibility),
        Tags: {
            Tags: tags,
        },
    };
}
function convertStrToBool(str) {
    return String(str).toLowerCase() === 'true';
}
function formatReadRecord(o) {
    return {
        ...o,
        ReadTimestampUs: Number(o.ReadTimestampUs),
        ReadSize: Number(o.ReadSize),
    };
}
function formatGroupInfo(o) {
    let tags = o.Tags.Tags || [];
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    return {
        ...o,
        SourceType: Number(o.SourceType),
        Id: Number(o.Id),
        Tags: {
            Tags: tags,
        },
    };
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
const parseGetBucketMetaResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.GfSpGetBucketMetaResponse.Bucket = {
        ...res.GfSpGetBucketMetaResponse.Bucket,
        BucketInfo: formatBucketInfo(res.GfSpGetBucketMetaResponse.Bucket.BucketInfo),
        DeleteAt: Number(res.GfSpGetBucketMetaResponse.Bucket.DeleteAt),
        UpdateAt: Number(res.GfSpGetBucketMetaResponse.Bucket.UpdateAt),
        UpdateTime: Number(res.GfSpGetBucketMetaResponse.Bucket.UpdateTime),
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_user_buckets.md
const getUserBucketMetaInfo = (endpoint) => {
    return {
        url: endpoint,
    };
};
const parseGetUserBucketsResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Buckets = res.GfSpGetUserBucketsResponse.Buckets || [];
    if (Buckets) {
        if (!Array.isArray(Buckets)) {
            Buckets = [Buckets];
        }
        Buckets = Buckets.map((item) => {
            return {
                ...item,
                BucketInfo: formatBucketInfo(item.BucketInfo),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                DeleteAt: Number(item.DeleteAt),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
                Vgf: formatVGF(item.Vgf),
            };
        });
    }
    res.GfSpGetUserBucketsResponse = {
        Buckets,
    };
    return res;
};

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
        allowance: Any.fromPartial({
            typeUrl: BasicAllowanceTypeUrl,
            value: BasicAllowance.encode(basicAllowance).finish(),
        }),
    };
};
const newMsgGrantAllowance = (grantee, granter, allowedMsgAllowance) => {
    return {
        grantee,
        granter,
        allowance: Any.fromPartial({
            typeUrl: AllowedMsgAllowanceTypeUrl,
            value: AllowedMsgAllowance.encode(allowedMsgAllowance).finish(),
        }),
    };
};
const newMarshal = (amount, denom = DEFAULT_DENOM, allowed_messages, expirationTime) => {
    return {
        '@type': AllowedMsgAllowanceTypeUrl,
        allowance: {
            '@type': BasicAllowanceTypeUrl,
            expiration: fromTimestamp(expirationTime),
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
    catch {
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
        resType: ResourceType.RESOURCE_TYPE_BUCKET,
        groupOwner: '',
        name: bucketName,
    };
};
const newObjectGRN = (bucketName, objectName) => {
    const name = [bucketName, objectName].join('/');
    return {
        name,
        resType: ResourceType.RESOURCE_TYPE_OBJECT,
        groupOwner: '',
    };
};
const newGroupGRN = (owner, groupName) => {
    return {
        resType: ResourceType.RESOURCE_TYPE_GROUP,
        groupOwner: owner,
        name: groupName,
    };
};
const GRNToString = (grn) => {
    let res = '';
    switch (grn.resType) {
        case ResourceType.RESOURCE_TYPE_BUCKET:
            res = `grn:${BucketTypeAbbr}::${grn.name}`;
            break;
        case ResourceType.RESOURCE_TYPE_OBJECT:
            res = `grn:${ObjectTypeAbbr}::${grn.name}`;
            break;
        case ResourceType.RESOURCE_TYPE_GROUP:
            res = `grn:${GroupTypeAbbr}:${grn.groupOwner}:${grn.name}`;
            break;
        default:
            return '';
    }
    return res.trim();
};

const getUtcZeroTimestamp = () => {
    dayjs.extend(utc);
    return dayjs().utc().valueOf();
};
const convertTimeStampToDate = (utcTimestamp) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    // utc-0 timezone
    const tz = 'Iceland';
    return dayjs(utcTimestamp).tz(tz).format();
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
const parseListBucketReadRecordResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let readRecords = res.GetBucketReadQuotaResult?.ReadRecords || [];
    if (readRecords) {
        if (!Array.isArray(readRecords)) {
            readRecords = [readRecords];
        }
        readRecords = readRecords.map((readRecord) => formatReadRecord(readRecord));
    }
    res.GetBucketReadQuotaResult = {
        ...res.GetBucketReadQuotaResult,
        ReadRecords: readRecords,
    };
    return res;
};

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
const parseListBucketsByIdsResponse = async (data) => {
    const xmlParser = new XMLParser({
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
                Value = {
                    ...item.Value,
                    BucketInfo: formatBucketInfo(item.Value.BucketInfo),
                    // @ts-ignore
                    Removed: convertStrToBool(item.Value.Removed),
                    UpdateAt: Number(item.Value.UpdateAt),
                    DeleteAt: Number(item.Value.DeleteAt),
                };
            }
            return {
                ...item,
                Id: Number(item.Id),
                Value,
            };
        });
    }
    res.GfSpListBucketsByIDsResponse = {
        ...res.GfSpListBucketsByIDsResponse,
        BucketEntry,
    };
    return res;
};

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
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Buckets = res.GfSpListPaymentAccountStreamsResponse.Buckets || [];
    if (Buckets) {
        if (!Array.isArray(Buckets)) {
            Buckets = [Buckets];
        }
        Buckets = Buckets.map((item) => {
            return {
                ...item,
                BucketInfo: formatBucketInfo(item.BucketInfo),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                DeleteAt: Number(item.DeleteAt),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
            };
        });
    }
    res.GfSpListPaymentAccountStreamsResponse = {
        Buckets,
    };
    return res;
};

const parseError = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return {
        code: res.Error.Code,
        message: res.Error.Message,
    };
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/query_bucket_read_quota.md
const getQueryBucketReadQuotaMetaInfo = async (endpoint, params) => {
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
};
const parseReadQuotaResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    return res;
};

function delayMs(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('request time out'));
        }, duration);
    });
}
const fetchWithTimeout = async (fetchUrl = '', fetchOptions = {}, duration = 30000) => {
    try {
        const response = (await Promise.race([
            delayMs(duration),
            fetch(fetchUrl, fetchOptions),
        ]));
        return response;
    }
    catch (error) {
        return Promise.reject(error);
    }
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_object.md
const getGetObjectMetaInfo = async (endpoint, params) => {
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
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/put_object.md
const getPutObjectMetaInfo = async (endpoint, params) => {
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
};

let SpClient = class SpClient {
    async callApi(url, options, timeout = 30000, customError) {
        try {
            const controller = new AbortController();
            const _id = setTimeout(() => controller.abort(), timeout);
            const response = await fetchWithTimeout(url, {
                ...options,
                signal: controller.signal,
            }, timeout);
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
                const xmlError = await response.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || customError?.code,
                    message: message || customError?.message,
                    statusCode: status,
                };
            }
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async callApiV2(url, options, timeout = 30000, customError) {
        assertHttpMethod(options.method);
        try {
            const R = new superagent.Request(options.method, url);
            if (options.headers) {
                options.headers.forEach((v, k) => {
                    R.set(k, v);
                });
            }
            R.timeout(timeout);
            R.ok((res) => res.status < 500);
            const response = await R.send();
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
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || customError?.code,
                    message: message || customError?.message,
                    statusCode: status,
                };
            }
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * just use for uploading object:
     * because fetch can't support upload progress
     */
    async upload(url, options, timeout, uploadFile, callback) {
        const R = superagent.put(url);
        R.timeout(timeout);
        R.ok((res) => res.status < 500);
        if (options.headers) {
            options.headers.forEach((v, k) => {
                R.set(k, v);
            });
        }
        if (callback && callback.onProgress) {
            R.on('progress', (e) => {
                callback.onProgress?.(e);
            });
        }
        const file = assertFileType(uploadFile) ? uploadFile.content : uploadFile;
        // https://ladjs.github.io/superagent/docs/index.html#serializing-request-body
        const sendFile = isNode && R.get('Content-Type') === 'application/json' ? file.toString() : file;
        if (isNode) {
            R.buffer(true);
        }
        try {
            const response = await R.send(sendFile);
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
                const { code, message } = await parseError(xmlError);
                throw {
                    code: callback?.customError?.code || code,
                    message: callback?.customError?.message || message,
                    statusCode: status,
                };
            }
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async signHeaders(reqMeta, authType) {
        const metaHeaders = newRequestHeadersByMeta(reqMeta);
        if (authType.type === 'EDDSA') {
            const { domain, address, seed } = authType;
            const pubKey = hexlify(ed25519.getPublicKey(seed.slice(2)));
            metaHeaders.set(HTTPHeaderUserAddress, address);
            metaHeaders.set(HTTPHeaderAppDomain, domain);
            metaHeaders.set(HTTPHeaderRegPubKey, pubKey.slice(2));
        }
        const canonicalRequest = getCanonicalRequest(reqMeta, metaHeaders);
        const auth = getAuthorization(canonicalRequest, authType);
        metaHeaders.set(HTTPHeaderAuthorization, auth);
        return metaHeaders;
    }
    getMetaInfo() {
        return {
            PUT_OBJECT: getPutObjectMetaInfo,
            GET_OBJECT: getGetObjectMetaInfo,
        };
    }
};
SpClient = __decorate([
    injectable()
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
const parseListGroupsResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetGroupListResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return {
                ...item,
                CreateAt: Number(item.CreateAt),
                CreateTime: Number(item.CreateTime),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                Group: formatGroupInfo(item.Group),
            };
        });
    }
    res.GfSpGetGroupListResponse = {
        Groups: Groups,
        Count: Number(res.GfSpGetGroupListResponse.Count),
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_group_members.md
const parseListGroupsMembersResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetGroupMembersResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return {
                ...item,
                CreateAt: Number(item.CreateAt),
                CreateTime: Number(item.CreateTime),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                Group: formatGroupInfo(item.Group),
            };
        });
    }
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_user_groups.md
const parseListUserGroupsResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetUserGroupsResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return {
                ...item,
                CreateAt: Number(item.CreateAt),
                CreateTime: Number(item.CreateTime),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                Group: formatGroupInfo(item.Group),
            };
        });
    }
    res.GfSpGetUserGroupsResponse = {
        Groups: Groups,
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_user_owned_groups.md
const parseListUserOwnedGroupsResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Groups = res.GfSpGetUserOwnedGroupsResponse.Groups || [];
    if (Groups) {
        if (!Array.isArray(Groups)) {
            Groups = [Groups];
        }
        Groups = Groups.map((item) => {
            return {
                ...item,
                CreateAt: Number(item.CreateAt),
                CreateTime: Number(item.CreateTime),
                UpdateAt: Number(item.UpdateAt),
                UpdateTime: Number(item.UpdateTime),
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                Group: formatGroupInfo(item.Group),
            };
        });
    }
    res.GfSpGetUserOwnedGroupsResponse = {
        Groups: Groups,
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/verify_permission.md
const parseVerifyPermissionResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.QueryVerifyPermissionResponse = {
        ...res.QueryVerifyPermissionResponse,
        Effect: Number(res.QueryVerifyPermissionResponse.Effect),
    };
    return res;
};

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
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async params() {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.Params();
    }
    async getGlobalVirtualGroup(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.GlobalVirtualGroup(request);
    }
    async getGlobalVirtualGroupByFamilyID(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.GlobalVirtualGroupByFamilyID(request);
    }
    async getGlobalVirtualGroupFamilies(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.GlobalVirtualGroupFamilies(request);
    }
    async getGlobalVirtualGroupFamily(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.GlobalVirtualGroupFamily(request);
    }
    async getSpOptimalGlobalVirtualGroupFamily(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.QuerySpOptimalGlobalVirtualGroupFamily(request);
    }
    async getSpAvailableGlobalVirtualGroupFamilies(request) {
        const rpc = await this.queryClient.getVirtualGroupClient();
        return await rpc.QuerySpAvailableGlobalVirtualGroupFamilies(request);
    }
    async settle(address, msg) {
        return await this.txClient.tx(MsgSettleTypeUrl, address, MsgSettleSDKTypeEIP712, MsgSettle.toSDK(msg), MsgSettle.encode(msg).finish());
    }
};
VirtualGroup = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], VirtualGroup);

let Sp = class Sp {
    constructor() {
        this.bucket = container.resolve(Bucket);
        this.queryClient = container.resolve(RpcQueryClient);
        this.virtualGroup = container.resolve(VirtualGroup);
        this.spClient = container.resolve(SpClient);
    }
    async getStorageProviders() {
        const rpc = await this.queryClient.getSpQueryClient();
        const res = await rpc.StorageProviders();
        return res.sps;
    }
    async getStorageProviderInfo(spId) {
        const rpc = await this.queryClient.getSpQueryClient();
        const res = await rpc.StorageProvider({
            id: spId,
        });
        return res.storageProvider;
    }
    async getQuerySpStoragePrice(request) {
        const rpc = await this.queryClient.getSpQueryClient();
        return await rpc.QuerySpStoragePrice(request);
    }
    async getQueryGlobalSpStorePriceByTime(request) {
        const rpc = await this.queryClient.getSpQueryClient();
        return await rpc.QueryGlobalSpStorePriceByTime(request);
    }
    async getStorageProviderByOperatorAddress(request) {
        const rpc = await this.queryClient.getSpQueryClient();
        return await rpc.StorageProviderByOperatorAddress(request);
    }
    async getStorageProviderMaintenanceRecordsByOperatorAddress(request) {
        const rpc = await this.queryClient.getSpQueryClient();
        return await rpc.StorageProviderMaintenanceRecordsByOperatorAddress(request);
    }
    async getSPUrlById(primaryId) {
        const spList = await this.getStorageProviders();
        return spList.filter((sp) => sp.id === primaryId)[0].endpoint;
    }
    async getSPUrlByBucket(bucketName) {
        const { bucketInfo } = await this.bucket.headBucket(bucketName);
        if (!bucketInfo)
            throw new Error('Get bucket info error');
        const familyResp = await this.virtualGroup.getGlobalVirtualGroupFamily({
            familyId: bucketInfo.globalVirtualGroupFamilyId,
        });
        const spList = await this.getStorageProviders();
        const spId = familyResp.globalVirtualGroupFamily?.primarySpId;
        return spList.filter((sp) => sp.id === spId)[0].endpoint;
    }
    async getSPUrlByPrimaryAddr(parimaryAddr) {
        const sps = await this.getStorageProviders();
        return sps.filter((sp) => sp.operatorAddress === parimaryAddr)[0].endpoint;
    }
    async params() {
        const rpc = await this.queryClient.getSpQueryClient();
        return await rpc.Params();
    }
    async getInServiceSP() {
        const sps = await this.getStorageProviders();
        const spList = sps.filter((sp) => sp.status === Status.STATUS_IN_SERVICE);
        if (spList.length === 0)
            throw new Error('No storage provider found');
        return spList[0];
    }
    async listGroups(params) {
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
            const sp = await this.getInServiceSP();
            const { url } = getListGroupMetaInfo(sp.endpoint, params);
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            res = await parseListGroupsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async verifyPermission(params) {
        try {
            const { action, bucketName, objectName, operator } = params;
            const sp = await this.getInServiceSP();
            let url = `${sp.endpoint}/permission/${operator}/${bucketName}/${actionTypeFromJSON(action)}`;
            if (objectName) {
                url += `?object=${encodePath(objectName)}`;
            }
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseVerifyPermissionResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listGroupsMembers(params) {
        try {
            const { groupId, limit, startAfter } = params;
            const sp = await this.getInServiceSP();
            let url = `${sp.endpoint}?group-members&group-id=${groupId}`;
            if (limit) {
                url += `&limit=${limit}`;
            }
            if (startAfter) {
                url += `&start-after=${startAfter}`;
            }
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListGroupsMembersResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listUserGroups(params) {
        try {
            const { address, limit, startAfter } = params;
            const sp = await this.getInServiceSP();
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
            const result = await this.spClient.callApi(url, {
                headers,
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListUserGroupsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listUserOwnedGroups(params) {
        try {
            const { address, limit, startAfter } = params;
            const sp = await this.getInServiceSP();
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
            const result = await this.spClient.callApi(url, {
                headers,
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListUserOwnedGroupsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
};
Sp = __decorate([
    injectable()
], Sp);

let Storage = class Storage {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async params() {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.Params();
    }
    async putPolicy(msg) {
        const toSdk = MsgPutPolicy.toSDK(msg);
        return await this.txClient.tx(MsgPutPolicyTypeUrl, msg.operator, getMsgPutPolicySDKTypeEIP712(msg.statements[0].resources), {
            ...toSdk,
            expiration_time: msg.expirationTime ? fromTimestamp(msg.expirationTime) : '',
            statements: toSdk.statements.map((e) => {
                if (e.expiration_time) {
                    // @ts-ignore
                    e.expiration_time = fromTimestamp(e.expiration_time);
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
            }),
        }, MsgPutPolicy.encode(msg).finish());
    }
    async deletePolicy(msg) {
        return await this.txClient.tx(MsgDeletePolicyTypeUrl, msg.operator, MsgDeletePolicySDKTypeEIP712, MsgDeletePolicy.toSDK(msg), MsgDeletePolicy.encode(msg).finish());
    }
    async setTag(msg) {
        const isTagsEmpty = msg?.tags?.tags?.length === 0;
        const MsgSetTagSDKTypeEIP712 = getMsgSetTagSDKTypeEIP712(isTagsEmpty);
        return await this.txClient.tx(MsgSetTagTypeUrl, msg.operator, MsgSetTagSDKTypeEIP712, MsgSetTag.toSDK(msg), MsgSetTag.encode(msg).finish());
    }
    async getPolicyForGroup(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryPolicyForGroup(request);
    }
    async getQueryPolicyForAccount(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryPolicyForAccount(request);
    }
    async getQueryPolicyForGroup(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryPolicyForGroup(request);
    }
    async getQueryPolicyById(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryPolicyById(request);
    }
    async queryLockFee(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryLockFee(request);
    }
    async queryGroupMembersExist(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryGroupMembersExist(request);
    }
    async queryGroupExist(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryGroupsExist(request);
    }
    async queryGroupsExistById(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.QueryGroupsExistById(request);
    }
};
Storage = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
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
        this.queryClient = container.resolve(RpcQueryClient);
        this.spClient = container.resolve(SpClient);
    }
    async setPaymentAccountFlowRateLimit(msg) {
        return await this.txClient.tx(MsgSetBucketFlowRateLimitTypeUrl, msg.operator, MsgSetBucketFlowRateLimitSDKTypeEIP712, MsgSetBucketFlowRateLimit.toSDK(msg), MsgSetBucketFlowRateLimit.encode(msg).finish());
    }
    async createBucket(msg) {
        assertStringRequire(msg.primarySpAddress, 'Primary sp address is missing');
        assertStringRequire(msg.creator, 'Empty creator address');
        verifyBucketName(msg.bucketName);
        const { storageProvider } = await this.sp.getStorageProviderByOperatorAddress({
            operatorAddress: msg.primarySpAddress,
        });
        if (!storageProvider) {
            throw new Error(`Storage provider ${msg.primarySpAddress} not found`);
        }
        const { globalVirtualGroupFamilyId } = await this.virtualGroup.getSpOptimalGlobalVirtualGroupFamily({
            spId: storageProvider.id,
            pickVgfStrategy: PickVGFStrategy.Strategy_Oldest_Create_Time,
        });
        const createBucketMsg = {
            ...msg,
            primarySpApproval: {
                globalVirtualGroupFamilyId: globalVirtualGroupFamilyId,
                expiredHeight: Long.fromInt(0),
                sig: Uint8Array.from([]),
            },
        };
        return await this.txClient.tx(MsgCreateBucketTypeUrl, msg.creator, MsgCreateBucketSDKTypeEIP712, {
            ...MsgCreateBucket.toSDK(createBucketMsg),
            primary_sp_approval: {
                expired_height: '0',
                global_virtual_group_family_id: globalVirtualGroupFamilyId,
            },
            charged_read_quota: createBucketMsg.chargedReadQuota.toString(),
        }, MsgCreateBucket.encode(createBucketMsg).finish());
    }
    async deleteBucket(msg) {
        return await this.txClient.tx(MsgDeleteBucketTypeUrl, msg.operator, MsgDeleteBucketSDKTypeEIP712, MsgDeleteBucket.toSDK(msg), MsgDeleteBucket.encode(msg).finish());
    }
    async toggleSpAsDelegatedAgent(msg) {
        const { bucketInfo } = await this.headBucket(msg.bucketName);
        if (!bucketInfo) {
            throw new Error(`Bucket ${msg.bucketName} not found`);
        }
        return await this.txClient.tx(MsgToggleSPAsDelegatedAgentTypeUrl, msg.operator, MsgToggleSPAsDelegatedAgentSDKTypeEIP712, MsgToggleSPAsDelegatedAgent.toSDK(msg), MsgToggleSPAsDelegatedAgent.encode(msg).finish());
    }
    async headBucket(bucketName) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadBucket({
            bucketName,
        });
    }
    async headBucketById(bucketId) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadBucketById({
            bucketId,
        });
    }
    async headBucketExtra(bucketName) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadBucketExtra({
            bucketName,
        });
    }
    async headBucketNFT(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadBucketNFT(request);
    }
    async getVerifyPermission(bucketName, operator, actionType) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return rpc.VerifyPermission({
            bucketName,
            operator,
            objectName: '',
            actionType,
        });
    }
    async listBuckets(configParam) {
        try {
            const { address, duration = 30000, endpoint } = configParam;
            verifyAddress(address);
            verifyUrl(endpoint);
            const { url } = getUserBucketMetaInfo(endpoint);
            const headers = new Headers$1({
                [HTTPHeaderUserAddress]: address,
            });
            const result = await this.spClient.callApi(url, {
                headers,
                method: METHOD_GET,
            }, duration);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'Get bucket error.',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseGetUserBucketsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async getBucketReadQuota(params, authType) {
        try {
            const { bucketName, duration = 30000 } = params;
            verifyBucketName(bucketName);
            assertAuthType(authType);
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = await this.sp.getSPUrlByBucket(bucketName);
            }
            const { url, optionsWithOutHeaders, reqMeta } = await getQueryBucketReadQuotaMetaInfo(endpoint, params);
            const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, duration, {
                code: -1,
                message: 'Get Bucket Quota error.',
            });
            const xmlData = await result.text();
            const res = await parseReadQuotaResponse(xmlData);
            return {
                code: 0,
                body: {
                    readQuota: Number(res.GetReadQuotaResult.ReadQuotaSize ?? '0'),
                    freeQuota: Number(res.GetReadQuotaResult.SPFreeReadQuotaSize ?? '0'),
                    consumedQuota: Number(res.GetReadQuotaResult.ReadConsumedSize ?? '0'),
                    freeConsumedSize: Number(res.GetReadQuotaResult.FreeConsumedSize ?? '0'),
                    monthlyFreeQuota: Number(res.GetReadQuotaResult.MonthlyFreeQuota ?? '0'),
                    monthlyQuotaConsumedSize: Number(res.GetReadQuotaResult.MonthlyQuotaConsumedSize ?? '0'),
                },
                message: 'Get bucket read quota.',
                statusCode: result.status,
            };
        }
        catch (error) {
            return {
                code: -1,
                message: error.message,
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async updateBucketInfo(srcMsg) {
        const msg = {
            ...srcMsg,
            visibility: visibilityTypeFromJSON(srcMsg.visibility),
            chargedReadQuota: UInt64Value.fromPartial({
                value: Long.fromString(srcMsg.chargedReadQuota),
            }),
        };
        return await this.txClient.tx(MsgUpdateBucketInfoTypeUrl, msg.operator, MsgUpdateBucketInfoSDKTypeEIP712, {
            ...MsgUpdateBucketInfo.toSDK(msg),
            charged_read_quota: {
                value: srcMsg.chargedReadQuota,
            },
        }, MsgUpdateBucketInfo.encode(msg).finish());
    }
    async putBucketPolicy(bucketName, srcMsg) {
        const resource = GRNToString(newBucketGRN(bucketName));
        const msg = {
            ...srcMsg,
            resource,
        };
        return this.storage.putPolicy(msg);
    }
    async deleteBucketPolicy(operator, bucketName, principalAddr, principalType) {
        const resource = GRNToString(newBucketGRN(bucketName));
        const principal = {
            type: principalTypeFromJSON(principalType),
            value: principalAddr,
        };
        const msg = {
            resource,
            principal,
            operator: operator,
        };
        return await this.storage.deletePolicy(msg);
    }
    async getBucketPolicy(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return rpc.QueryPolicyForAccount(request);
    }
    async getMigrateBucketApproval(params, authType) {
        assertAuthType(authType);
        const { bucketName, operator, dstPrimarySpId } = params;
        try {
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = await this.sp.getSPUrlById(params.dstPrimarySpId);
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
            const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, 30000);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async migrateBucket(params, authType) {
        assertAuthType(authType);
        const { signedMsg } = await this.getMigrateBucketApproval(params, authType);
        if (!signedMsg) {
            throw new Error('Get migrate bucket approval error');
        }
        const msg = {
            bucketName: signedMsg.bucket_name,
            operator: signedMsg.operator,
            dstPrimarySpId: signedMsg.dst_primary_sp_id,
            dstPrimarySpApproval: {
                expiredHeight: Long.fromString(signedMsg.dst_primary_sp_approval.expired_height),
                globalVirtualGroupFamilyId: signedMsg.dst_primary_sp_approval.global_virtual_group_family_id,
                sig: bytesFromBase64(signedMsg.dst_primary_sp_approval.sig),
            },
        };
        return await this.migrateBucketTx(msg, signedMsg);
    }
    async cancelMigrateBucket(msg) {
        return await this.txClient.tx(MsgCancelMigrateBucketTypeUrl, msg.operator, MsgCancelMigrateBucketSDKTypeEIP712, MsgCancelMigrateBucket.toSDK(msg), MsgCancelMigrateBucket.encode(msg).finish());
    }
    async migrateBucketTx(msg, signedMsg) {
        return await this.txClient.tx(MsgMigrateBucketTypeUrl, msg.operator, MsgMigrateBucketSDKTypeEIP712, {
            ...signedMsg,
            type: MsgMigrateBucketTypeUrl,
            primary_sp_approval: {
                expired_height: signedMsg.dst_primary_sp_approval.expired_height,
                global_virtual_group_family_id: signedMsg.dst_primary_sp_approval.global_virtual_group_family_id,
                sig: signedMsg.dst_primary_sp_approval.sig,
            },
        }, MsgMigrateBucket.encode(msg).finish());
    }
    async getBucketMeta(params) {
        const { bucketName } = params;
        verifyBucketName(bucketName);
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(bucketName);
        }
        const { url } = getBucketMetaInfo(endpoint, params);
        const result = await this.spClient.callApi(url, {
            method: METHOD_GET,
        });
        const xml = await result.text();
        const res = await parseGetBucketMetaResponse(xml);
        return {
            code: 0,
            message: 'get bucket meta success.',
            statusCode: result.status,
            body: res,
        };
    }
    async listBucketReadRecords(params, authType) {
        try {
            assertAuthType(authType);
            const { bucketName } = params;
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = await this.sp.getSPUrlByBucket(bucketName);
            }
            verifyUrl(endpoint);
            const { url, optionsWithOutHeaders, reqMeta } = getListBucketReadRecordMetaInfo(endpoint, params);
            const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, 3000, {
                code: -1,
                message: 'Get Bucket Quota error.',
            });
            const xmlData = await result.text();
            const res = await parseListBucketReadRecordResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listBucketsByIds(params) {
        try {
            const { ids } = params;
            const sp = await this.sp.getInServiceSP();
            const { url } = getListBucketsByIDsMetaInfo(sp.endpoint, { ids });
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListBucketsByIdsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listBucketsByPaymentAccount(params) {
        try {
            const sp = await this.sp.getInServiceSP();
            const { url } = getListBucketByPaymentMetaInfo(sp.endpoint, params);
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            });
            const xmlData = await result.text();
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
};
Bucket = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __param(1, inject(delay$1(() => Sp))),
    __param(2, inject(delay$1(() => Storage))),
    __param(3, inject(delay$1(() => VirtualGroup))),
    __metadata("design:paramtypes", [TxClient,
        Sp,
        Storage,
        VirtualGroup])
], Bucket);

let Challenge = class Challenge {
    constructor(txClient) {
        this.txClient = txClient;
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async submitChallenge(address, msg) {
        return await this.txClient.tx(MsgSubmitTypeUrl, address, MsgSubmitSDKTypeEIP712, MsgSubmit.toSDK(msg), MsgSubmit.encode(msg).finish());
    }
    async attestChallenge(address, msg) {
        return await this.txClient.tx(MsgAttestTypeUrl, address, MsgAttestSDKTypeEIP712, MsgAttest.toSDK(msg), MsgAttest.encode(msg).finish());
    }
    async latestAttestedChallenges() {
        const rpc = await this.queryClient.getChallengeQueryClient();
        return await rpc.LatestAttestedChallenges();
    }
    async inturnAttestationSubmitter() {
        const rpc = await this.queryClient.getChallengeQueryClient();
        return await rpc.InturnAttestationSubmitter();
    }
    async params() {
        const rpc = await this.queryClient.getChallengeQueryClient();
        return await rpc.Params();
    }
};
Challenge = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
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
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async transferOut(msg) {
        return await this.txClient.tx(MsgTransferOutTypeUrl, msg.from, MsgTransferOutSDKTypeEIP712, MsgTransferOut.toSDK(msg), MsgTransferOut.encode(msg).finish());
    }
    async claims(msg) {
        return await this.txClient.tx(MsgClaimTypeUrl, msg.fromAddress, MsgClaimSDKTypeEIP712, MsgClaim.toSDK(msg), MsgClaim.encode(msg).finish());
    }
    async getChannelSendSequence(request) {
        const rpc = await this.queryClient.getCrosschainQueryClient();
        return await rpc.SendSequence(request);
    }
    async getChannelReceiveSequence(request) {
        const rpc = await this.queryClient.getCrosschainQueryClient();
        return await rpc.ReceiveSequence(request);
    }
    async getInturnRelayer(request) {
        const rpc = await this.queryClient.getOracleQueryClient();
        return await rpc.InturnRelayer(request);
    }
    async getCrosschainPackage(request) {
        const rpc = await this.queryClient.getCrosschainQueryClient();
        return await rpc.CrossChainPackage(request);
    }
    async mirrorGroup(msg) {
        return await this.txClient.tx(MsgMirrorGroupTypeUrl, msg.operator, MsgMirrorGroupSDKTypeEIP712, MsgMirrorGroup.toSDK(msg), MsgMirrorGroup.encode(msg).finish());
    }
    async mirrorBucket(msg) {
        return await this.txClient.tx(MsgMirrorBucketTypeUrl, msg.operator, MsgMirrorBucketSDKTypeEIP712, MsgMirrorBucket.toSDK(msg), MsgMirrorBucket.encode(msg).finish());
    }
    async mirrorObject(msg) {
        return await this.txClient.tx(MsgMirrorObjectTypeUrl, msg.operator, MsgMirrorObjectSDKTypeEIP712, MsgMirrorObject.toSDK(msg), MsgMirrorObject.encode(msg).finish());
    }
    async getParams() {
        const rpc = await this.queryClient.getBridgeQueryClient();
        return rpc.Params();
    }
};
CrossChain = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
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
    async setWithdrawAddress(msg) {
        return await this.txClient.tx(MsgSetWithdrawAddressTypeUrl, msg.delegatorAddress, MsgSetWithdrawAddressSDKTypeEIP712, MsgSetWithdrawAddress.toSDK(msg), MsgSetWithdrawAddress.encode(msg).finish());
    }
    async withdrawValidatorCommission(address, msg) {
        return await this.txClient.tx(MsgWithdrawValidatorCommissionTypeUrl, address, MsgWithdrawValidatorCommissionSDKTypeEIP712, MsgWithdrawValidatorCommission.toSDK(msg), MsgWithdrawValidatorCommission.encode(msg).finish());
    }
    async withdrawDelegatorReward(msg) {
        return await this.txClient.tx(MsgWithdrawDelegatorRewardTypeUrl, msg.delegatorAddress, MsgWithdrawDelegatorRewardSDKTypeEIP712, MsgWithdrawDelegatorReward.toSDK(msg), MsgWithdrawDelegatorReward.encode(msg).finish());
    }
    async fundCommunityPoolundComm(address, msg) {
        return await this.txClient.tx(MsgFundCommunityPoolTypeUrl, address, MsgFundCommunityPoolTypeUrlSDKTypeEIP712, MsgFundCommunityPool.toSDK(msg), MsgFundCommunityPool.encode(msg).finish());
    }
};
Distribution = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
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
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async grantAllowance(params) {
        const { amount, denom, allowedMessages, grantee, granter, expirationTime } = params;
        const basicAllowance = newBasicAllowance(amount, denom, expirationTime);
        const allowedMsgAllowance = newAllowedMsgAllowance(allowedMessages, basicAllowance);
        const grantAllowance = newMsgGrantAllowance(grantee, granter, allowedMsgAllowance);
        const marshal = newMarshal(amount, denom, allowedMessages, expirationTime);
        return await this.txClient.tx(MsgGrantAllowanceTypeUrl, granter, MsgGrantAllowanceSDKTypeEIP712, {
            ...MsgGrantAllowance.toSDK(grantAllowance),
            allowance: {
                // @ts-ignore
                type: grantAllowance.allowance?.typeUrl,
                value: base64FromBytes(arrayify('0x' + encodeToHex(JSON.stringify(marshal)))),
                // TODO: @roshan next version should return hex string
                // value: '0x' + encodeToHex(JSON.stringify(marshal)),
            },
        }, MsgGrantAllowance.encode(grantAllowance).finish());
    }
    async revokeAllowance(msg) {
        return await this.txClient.tx(MsgRevokeAllowanceTypeUrl, msg.granter, MsgRevokeAllowanceSDKTypeEIP712, MsgRevokeAllowance.toSDK(msg), MsgRevokeAllowance.encode(msg).finish());
    }
    async getAllowence(request) {
        const rpc = await this.queryClient.getFeeGrantQueryClient();
        return await rpc.Allowance(request);
    }
    async getAllowences(request) {
        const rpc = await this.queryClient.getFeeGrantQueryClient();
        return await rpc.Allowances(request);
    }
};
FeeGrant = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], FeeGrant);

let Gashub = class Gashub {
    constructor() {
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async getMsgGasParams(request) {
        const rpc = await this.queryClient.getGashubClient();
        return await rpc.MsgGasParams(request);
    }
    async getParams() {
        const rpc = await this.queryClient.getGashubClient();
        return await rpc.Params();
    }
};
Gashub = __decorate([
    injectable()
], Gashub);

let Group = class Group {
    constructor(txClient, storage) {
        this.txClient = txClient;
        this.storage = storage;
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async createGroup(msg) {
        return await this.txClient.tx(MsgCreateGroupTypeUrl, msg.creator, MsgCreateGroupSDKTypeEIP712, MsgCreateGroup.toSDK(msg), MsgCreateGroup.encode(msg).finish());
    }
    async deleteGroup(msg) {
        return await this.txClient.tx(MsgDeleteGroupTypeUrl, msg.operator, MsgDeleteGroupSDKTypeEIP712, MsgDeleteGroup.toSDK(msg), MsgDeleteGroup.encode(msg).finish());
    }
    async updateGroupMember(msg) {
        if (msg.groupName === '') {
            throw new Error('group name is empty');
        }
        if (msg.membersToAdd.length === 0 && msg.membersToDelete.length === 0) {
            throw new Error('no update member');
        }
        return await this.txClient.tx(MsgUpdateGroupMemberTypeUrl, msg.operator, getMsgUpdateGroupMemberSDKTypeEIP712({
            membersToAdd: msg.membersToAdd,
            membersToDelete: msg.membersToDelete,
        }), {
            ...MsgUpdateGroupMember.toSDK(msg),
            members_to_add: msg.membersToAdd.map((x) => {
                return {
                    member: x.member,
                    expiration_time: x.expirationTime && fromTimestamp(x.expirationTime),
                };
            }),
        }, MsgUpdateGroupMember.encode(msg).finish());
    }
    async updateGroupExtra(msg) {
        return await this.txClient.tx(MsgUpdateGroupExtraTypeUrl, msg.operator, MsgUpdateGroupExtraSDKTypeEIP712, MsgUpdateGroupExtra.toSDK(msg), MsgUpdateGroupExtra.encode(msg).finish());
    }
    async leaveGroup(address, msg) {
        return await this.txClient.tx(MsgLeaveGroupTypeUrl, address, MsgLeaveGroupSDKTypeEIP712, MsgLeaveGroup.toSDK(msg), MsgLeaveGroup.encode(msg).finish());
    }
    async headGroup(groupName, groupOwner) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadGroup({
            groupName,
            groupOwner,
        });
    }
    async headGroupMember(groupName, groupOwner, member) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadGroupMember({
            groupName,
            groupOwner,
            member,
        });
    }
    async headGroupNFT(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadGroupNFT(request);
    }
    async listGroup(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.ListGroups(request);
    }
    async getPolicyOfGroup(request) {
        return await this.storage.getPolicyForGroup(request);
    }
    async getBucketPolicyOfGroup(bucketName, groupId) {
        const resource = GRNToString(newBucketGRN(bucketName));
        return await this.storage.getPolicyForGroup({
            resource,
            principalGroupId: groupId.toString(),
        });
    }
    async getObjectPolicyOfGroup(bucketName, objectName, groupId) {
        const resource = GRNToString(newObjectGRN(bucketName, objectName));
        return await this.storage.getPolicyForGroup({
            resource,
            principalGroupId: groupId.toString(),
        });
    }
    async putGroupPolicy(owner, groupName, srcMsg) {
        const resource = GRNToString(newGroupGRN(owner, groupName));
        const msg = {
            ...srcMsg,
            resource,
        };
        return this.storage.putPolicy(msg);
    }
};
Group = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __param(1, inject(delay$1(() => Storage))),
    __metadata("design:paramtypes", [TxClient,
        Storage])
], Group);

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/resumable_put_object.md
const getResumablePutObjectMetaInfo = async (endpoint, params) => {
    const { bucketName, objectName, contentType, body, offset, complete, delegatedOpts } = params;
    const path = `/${encodePath(objectName)}`;
    let queryMap = {
        offset: String(offset),
        complete: String(complete),
    };
    if (delegatedOpts) {
        queryMap = {
            ...queryMap,
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
};

const getDelegatedCreateFolderMetaInfo = async (endpoint, params) => {
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
};
const parseDelegatedCreateFolderResponse = (data) => {
    const xmlParser = new XMLParser({
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
const parseGetObjectMetaResponse = async (data) => {
    const xmlParser = new XMLParser({
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
    res.GfSpGetObjectMetaResponse = {
        ...res.GfSpGetObjectMetaResponse,
        Object: ObjectTmp,
    };
    return res;
};

// Uploading object's offset
const getObjectOffsetInfo = async (endpoint, params) => {
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
};
const parseObjectOffsetResponse = (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    res.QueryResumeOffset.Offset = Number(res.QueryResumeOffset.Offset);
    return res;
};

// Object's upload-progress
const getObjectStatusInfo = async (endpoint, params) => {
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
};
const parseObjectStatusResponse = (data) => {
    const xmlParser = new XMLParser({
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
        'action-type': String(actionTypeFromJSON(actionType)),
    };
    let url = new URL(path, generateUrlByBucketName(endpoint, bucketName));
    url = getSortQueryParams(url, queryMap);
    return {
        url: url.href,
    };
};
const parseGetListObjectPoliciesResponse = (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Policies = res.GfSpListObjectPoliciesResponse.Policies || [];
    if (Policies) {
        if (!Array.isArray(Policies)) {
            Policies = [Policies];
        }
        Policies = Policies.map((item) => {
            return {
                ...item,
                PrincipalType: Number(item.ResourceType),
                ResourceType: Number(item.ResourceType),
                CreateTimestamp: Number(item.CreateTimestamp),
                UpdateTimestamp: Number(item.UpdateTimestamp),
                ExpirationTime: Number(item.ExpirationTime),
            };
        });
    }
    res.GfSpListObjectPoliciesResponse = {
        Policies,
    };
    return res;
};

// https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/list_objects_by_bucket.md
const parseListObjectsByBucketNameResponse = async (data) => {
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let Objects = res.GfSpListObjectsByBucketNameResponse.Objects || [];
    if (Objects) {
        if (!Array.isArray(Objects)) {
            Objects = [Objects];
        }
        Objects = Objects.map((item) => {
            return {
                ...item,
                // @ts-ignore
                Removed: convertStrToBool(item.Removed),
                UpdateAt: Number(item.UpdateAt),
                DeleteAt: Number(item.DeleteAt),
                ObjectInfo: formatObjectInfo(item.ObjectInfo),
            };
        });
    }
    let CommonPrefixes = res.GfSpListObjectsByBucketNameResponse.CommonPrefixes || [];
    if (CommonPrefixes) {
        if (!Array.isArray(CommonPrefixes)) {
            CommonPrefixes = [CommonPrefixes];
        }
    }
    res.GfSpListObjectsByBucketNameResponse = {
        ...res.GfSpListObjectsByBucketNameResponse,
        Objects,
        CommonPrefixes,
        // @ts-ignore
        IsTruncated: convertStrToBool(res.GfSpListObjectsByBucketNameResponse.IsTruncated),
    };
    return res;
};

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
const parseListObjectsByIdsResponse = async (data) => {
    const xmlParser = new XMLParser({
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
                Value = {
                    ...item.Value,
                    ObjectInfo: formatObjectInfo(item.Value.ObjectInfo),
                    // @ts-ignore
                    Removed: convertStrToBool(item.Value.Removed),
                    UpdateAt: Number(item.Value.UpdateAt),
                    DeleteAt: Number(item.Value.DeleteAt),
                };
            }
            return {
                ...item,
                Id: Number(item.Id),
                Value,
            };
        });
    }
    res.GfSpListObjectsByIDsResponse = {
        ...res.GfSpListObjectsByIDsResponse,
        ObjectEntry,
    };
    return res;
};

let Objects = class Objects {
    constructor(txClient, storage, sp) {
        this.txClient = txClient;
        this.storage = storage;
        this.sp = sp;
        this.queryClient = container.resolve(RpcQueryClient);
        this.spClient = container.resolve(SpClient);
    }
    async createObject(msg) {
        verifyBucketName(msg.bucketName);
        verifyObjectName(msg.objectName);
        checkObjectName(msg.objectName);
        assertStringRequire(msg.creator, 'empty creator address');
        const createObjMsg = {
            ...msg,
            primarySpApproval: {
                globalVirtualGroupFamilyId: 0,
                expiredHeight: Long.fromInt(0),
                sig: Uint8Array.from([]),
            },
        };
        return await this.txClient.tx(MsgCreateObjectTypeUrl, msg.creator, MsgCreateObjectSDKTypeEIP712, {
            ...MsgCreateObject.toSDK(createObjMsg),
            primary_sp_approval: {
                expired_height: '0',
                global_virtual_group_family_id: 0,
            },
            expect_checksums: createObjMsg.expectChecksums.map((e) => base64FromBytes(e)),
            payload_size: createObjMsg.payloadSize.toNumber(),
        }, MsgCreateObject.encode(createObjMsg).finish());
    }
    async delegateUploadObject(params, authType) {
        const { bucketName, objectName, body, resumableOpts, timeout = 30000, delegatedOpts, onProgress, } = params;
        assertAuthType(authType);
        verifyBucketName(bucketName);
        verifyObjectName(objectName);
        const disableResumable = resumableOpts?.disableResumable ?? true;
        const partSize = resumableOpts?.partSize ?? DEFAULT_PART_SIZE;
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(bucketName);
        }
        const { params: storageParams } = await this.storage.params();
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
        return await this.putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, timeout, delegatedOpts);
    }
    async uploadObject(params, authType) {
        const { bucketName, objectName, body, duration = 30000, resumableOpts, onProgress } = params;
        assertAuthType(authType);
        verifyBucketName(bucketName);
        verifyObjectName(objectName);
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(bucketName);
        }
        let txnHash = params.txnHash;
        if (!txnHash) {
            const { body } = await this.getObjectMeta({
                bucketName,
                objectName,
                endpoint,
            });
            txnHash = body.GfSpGetObjectMetaResponse.Object.CreateTxHash;
        }
        const { params: storageParams } = await this.storage.params();
        const maxSegmentSize = storageParams.versionedParams.maxSegmentSize.toNumber();
        const disableResumable = resumableOpts?.disableResumable ?? true;
        const partSize = resumableOpts?.partSize ?? DEFAULT_PART_SIZE;
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
        return await this.putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, duration);
    }
    async putObject(params) {
        const { authType, body, bucketName, delegatedOpts, duration, endpoint, objectName, txnHash, onProgress, } = params;
        const { reqMeta, optionsWithOutHeaders, url, file } = await getPutObjectMetaInfo(endpoint, {
            bucketName,
            objectName,
            contentType: body.type,
            txnHash,
            body,
            delegatedOpts,
        });
        const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
        try {
            const result = await this.spClient.upload(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, duration, file, {
                onProgress,
            });
            const { status } = result;
            return { code: 0, message: 'Put object success.', statusCode: status };
        }
        catch (error) {
            return {
                code: error.code || -1,
                message: error.message,
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
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
    async putResumableObject(endpoint, bucketName, objectName, body, partSize, authType, timeout, delegatedOpts) {
        let offset = 0;
        if (!delegatedOpts) {
            const isObjectExist = await this.headSPObjectInfo(bucketName, objectName, authType);
            if (!isObjectExist) {
                throw new Error('Object does not exist');
            }
            offset = await this.getObjectResumableUploadOffset(bucketName, objectName, authType);
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
            const { reqMeta, optionsWithOutHeaders, url } = await getResumablePutObjectMetaInfo(endpoint, {
                bucketName,
                objectName,
                contentType: body.type,
                body: chunkFile,
                offset: startPartNumber * partSize,
                complete: startPartNumber === totalPartsCount - 1,
                delegatedOpts,
            });
            const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
            try {
                await this.spClient.callApi(url, {
                    ...optionsWithOutHeaders,
                    headers: signHeaders,
                }, timeout);
            }
            catch (error) {
                return {
                    code: -1,
                    message: error.message,
                    statusCode: error?.statusCode || NORMAL_ERROR_CODE,
                };
            }
            finally {
                startPartNumber++;
            }
        }
        return { code: 0, message: 'Put all object parts success.', statusCode: 200 };
    }
    async headSPObjectInfo(bucketName, objectName, authType) {
        const { code } = await this.getObjectStatusFromSp(bucketName, objectName, authType);
        if (code === 0) {
            return true;
        }
        return false;
    }
    async getObjectResumableUploadOffset(bucketName, objectName, authType) {
        const { objectInfo } = await this.headObject(bucketName, objectName);
        if (!objectInfo) {
            throw new Error('Object not found');
        }
        if (objectInfo.objectStatus == ObjectStatus.OBJECT_STATUS_CREATED) {
            const { code, body } = await this.getObjectOffsetFromSP(bucketName, objectName, authType);
            if (body) {
                return body.QueryResumeOffset.Offset;
            }
        }
        return 0;
    }
    async getObjectOffsetFromSP(bucketName, objectName, authType) {
        const endpoint = await this.sp.getSPUrlByBucket(bucketName);
        const { url, optionsWithOutHeaders, reqMeta } = await getObjectOffsetInfo(endpoint, {
            bucketName,
            objectName,
        });
        const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
        try {
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, 5000);
            // console.log('upload-context result', result);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
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
            const xmlData = await result.text();
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async getObjectStatusFromSp(bucketName, objectName, authType) {
        const endpoint = await this.sp.getSPUrlByBucket(bucketName);
        const { url, optionsWithOutHeaders, reqMeta } = await getObjectStatusInfo(endpoint, {
            bucketName,
            objectName,
        });
        const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
        try {
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, 5000);
            // console.log('upload-progress result', result);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = parseObjectStatusResponse(xmlData);
            return { code: 0, message: 'success', statusCode: status, body: res };
        }
        catch (error) {
            return {
                code: -1,
                message: error.message,
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async cancelCreateObject(msg) {
        return await this.txClient.tx(MsgCancelCreateObjectTypeUrl, msg.operator, MsgCancelCreateObjectSDKTypeEIP712, MsgCancelCreateObject.toSDK(msg), MsgCancelCreateObject.encode(msg).finish());
    }
    async deleteObject(msg) {
        return await this.txClient.tx(MsgDeleteObjectTypeUrl, msg.operator, MsgDeleteObjectSDKTypeEIP712, MsgDeleteObject.toSDK(msg), MsgDeleteObject.encode(msg).finish());
    }
    async updateObjectInfo(msg) {
        return await this.txClient.tx(MsgUpdateObjectInfoTypeUrl, msg.operator, MsgUpdateObjectInfoSDKTypeEIP712, MsgUpdateObjectInfo.toSDK(msg), MsgUpdateObjectInfo.encode(msg).finish());
    }
    async headObject(bucketName, objectName) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return rpc.HeadObject({
            bucketName,
            objectName,
        });
    }
    async headObjectById(objectId) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return rpc.HeadObjectById({
            objectId,
        });
    }
    async headObjectNFT(request) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.HeadObjectNFT(request);
    }
    async getObject(params, authType) {
        try {
            assertAuthType(authType);
            const { bucketName, objectName, duration = 30000 } = params;
            verifyBucketName(bucketName);
            verifyObjectName(objectName);
            let endpoint = params.endpoint;
            if (!endpoint) {
                endpoint = await this.sp.getSPUrlByBucket(bucketName);
            }
            const { reqMeta, optionsWithOutHeaders, url } = await getGetObjectMetaInfo(endpoint, {
                bucketName,
                objectName,
            });
            const headers = await this.spClient.signHeaders(reqMeta, authType);
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers,
            }, duration);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                return {
                    code: code || -1,
                    message: message || 'Get object error.',
                    statusCode: status,
                };
            }
            const fileBlob = await result.blob();
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async getObjectPreviewUrl(params, authType) {
        assertAuthType(authType);
        if (authType.type === 'ECDSA') {
            throw new Error('Get object preview url only support EDDSA');
        }
        const { bucketName, objectName, queryMap } = params;
        verifyBucketName(bucketName);
        verifyObjectName(objectName);
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(bucketName);
        }
        const path = '/' + encodePath(objectName);
        const url = generateUrlByBucketName(endpoint, bucketName) + path;
        let pubKey = '';
        if (authType.type === 'EDDSA') {
            pubKey = hexlify(ed25519.getPublicKey(authType.seed.slice(2)));
        }
        const queryRaw = getSortQuery({
            ...queryMap,
            [HTTPHeaderRegPubKey]: pubKey.slice(2),
        });
        const canonicalRequest = [
            METHOD_GET,
            `/${encodePath(objectName)}`,
            queryRaw,
            new URL(url).host,
            '\n',
        ].join('\n');
        const auth = getAuthorization(canonicalRequest, authType);
        return `${url}?Authorization=${encodeURIComponent(auth)}&${queryRaw}`;
    }
    async downloadFile(configParam, authType) {
        try {
            const { objectName } = configParam;
            const getObjectResult = await this.getObject(configParam, authType);
            if (getObjectResult.code !== 0) {
                throw new Error(getObjectResult.message);
            }
            const file = getObjectResult?.body;
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
    }
    async listObjects(configParam) {
        try {
            const { bucketName, endpoint, duration = 30000, query = new URLSearchParams() } = configParam;
            verifyBucketName(bucketName);
            verifyUrl(endpoint);
            const url = `${generateUrlByBucketName(endpoint, bucketName)}?${query?.toString()}`;
            const headers = new Headers$1();
            const result = await this.spClient.callApi(url, {
                headers,
                method: METHOD_GET,
            }, duration);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                return {
                    code: code || -1,
                    message: message || 'List object error.',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListObjectsByBucketNameResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async createFolder(msg) {
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
        const newMsg = {
            ...msg,
            payloadSize: Long.fromInt(0),
            contentType: 'text/plain',
            expectChecksums: [
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
            ].map((x) => bytesFromBase64(x)),
        };
        return this.createObject(newMsg);
    }
    async delegateCreateFolder(params, authType) {
        const { bucketName, objectName, delegatedOpts, timeout = 10000 } = params;
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(bucketName);
        }
        const { reqMeta, optionsWithOutHeaders, url } = await getDelegatedCreateFolderMetaInfo(endpoint, {
            bucketName: bucketName,
            objectName: objectName,
            // contentType: '',
            delegatedOpts,
        });
        const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
        try {
            const result = await this.spClient.callApiV2(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            }, timeout);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async putObjectPolicy(bucketName, objectName, 
    // expirationTime: Date,
    srcMsg) {
        const resource = GRNToString(newObjectGRN(bucketName, objectName));
        const msg = {
            ...srcMsg,
            resource,
            // expirationTime: fromJsonTimestamp(expirationTime),
        };
        return await this.storage.putPolicy(msg);
    }
    async isObjectPermissionAllowed(bucketName, objectName, actionType, operator) {
        const rpc = await this.queryClient.getStorageQueryClient();
        return await rpc.VerifyPermission({
            bucketName,
            objectName,
            actionType,
            operator,
        });
    }
    async getObjectPolicy(bucketName, objectName, principalAddr) {
        const rpc = await this.queryClient.getStorageQueryClient();
        const resource = GRNToString(newObjectGRN(bucketName, objectName));
        return await rpc.QueryPolicyForAccount({
            resource,
            principalAddress: principalAddr,
        });
    }
    async deleteObjectPolicy(operator, bucketName, objectName, principalAddr, principalType) {
        const resource = GRNToString(newObjectGRN(bucketName, objectName));
        const principal = {
            type: principalTypeFromJSON(principalType),
            value: principalAddr,
        };
        const msg = {
            resource,
            principal,
            operator: operator,
        };
        return await this.storage.deletePolicy(msg);
    }
    async getObjectMeta(params) {
        const { bucketName, objectName, endpoint } = params;
        verifyBucketName(bucketName);
        verifyObjectName(objectName);
        const { url } = getObjectMetaInfo(endpoint, params);
        const result = await this.spClient.callApi(url, {
            method: METHOD_GET,
        });
        const xml = await result.text();
        const res = await parseGetObjectMetaResponse(xml);
        return {
            code: 0,
            message: 'get object meta success.',
            statusCode: result.status,
            body: res,
        };
    }
    async listObjectsByIds(params) {
        try {
            const sp = await this.sp.getInServiceSP();
            const { url } = getListObjectsByIDsMetaInfo(sp.endpoint, params);
            const result = await this.spClient.callApi(url, {
                headers: {},
                method: METHOD_GET,
            }, 3000);
            const { status } = result;
            if (!result.ok) {
                const xmlError = await result.text();
                const { code, message } = await parseError(xmlError);
                throw {
                    code: code || -1,
                    message: message || 'error',
                    statusCode: status,
                };
            }
            const xmlData = await result.text();
            const res = await parseListObjectsByIdsResponse(xmlData);
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
    async listObjectPolicies(params) {
        let endpoint = params.endpoint;
        if (!endpoint) {
            endpoint = await this.sp.getSPUrlByBucket(params.bucketName);
        }
        const { url } = getListObjectPoliciesMetaInfo(endpoint, params);
        const result = await this.spClient.callApi(url, {
            headers: {},
            method: METHOD_GET,
        });
        const xml = await result.text();
        const res = parseGetListObjectPoliciesResponse(xml);
        return {
            code: 0,
            message: 'success',
            statusCode: result.status,
            body: res,
        };
    }
    async getObjectUploadProgress(bucketName, objectName, authType) {
        const { objectInfo } = await this.headObject(bucketName, objectName);
        if (!objectInfo) {
            throw new Error('object not exist');
        }
        if (objectInfo.objectStatus == ObjectStatus.OBJECT_STATUS_CREATED) {
            const { body, message } = await this.getObjectStatusFromSp(bucketName, objectName, authType);
            if (!body) {
                throw new Error('fail to fetch object uploading progress from sp ' + message);
            }
            return body.QueryUploadProgress.ProgressDescription;
        }
        return objectInfo.objectStatus.toString();
    }
};
Objects = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __param(1, inject(delay$1(() => Storage))),
    __param(2, inject(delay$1(() => Sp))),
    __metadata("design:paramtypes", [TxClient,
        Storage,
        Sp])
], Objects);

const updateUserAccountKey = async ({ address, domain, sp, pubKey, expireDate, authorization, }) => {
    let result;
    const url = `${sp.endpoint}/auth/update_key_v2`;
    const headers = new Headers$1({
        'X-Gnfd-User-Address': address,
        'X-Gnfd-App-Domain': domain,
        'X-Gnfd-App-Reg-Public-Key': pubKey,
        'X-Gnfd-Expiry-Timestamp': expireDate,
        Authorization: authorization,
    });
    try {
        result = await fetchWithTimeout(url, {
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
        data: {
            ...sp,
        },
    };
};

const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const updateSpsPubKey = async ({ address, sps, domain, pubKey, expireDate, authorization, }) => {
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
};
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
const personalSign = async ({ message, address, provider }) => {
    const sign = await provider.request({
        method: 'personal_sign',
        params: [message, address],
    });
    return sign;
};

let OffChainAuth = class OffChainAuth {
    async genOffChainAuthKeyPairAndUpload({ sps, address, domain, expirationMs, chainId }, provider) {
        try {
            const { privateKey, publicKey } = this.generateKeys();
            const curUtcZeroTimestamp = getUtcZeroTimestamp();
            const expirationTime = curUtcZeroTimestamp + expirationMs;
            const issuedDate = convertTimeStampToDate(curUtcZeroTimestamp);
            const expireDate = convertTimeStampToDate(expirationTime);
            const signMsg = genSecondSignMsg({
                domain,
                address,
                pubKey: hexlify(publicKey).slice(2),
                chainId,
                issuedDate,
                expireDate,
            });
            const signRes = await personalSign({ message: signMsg, address, provider });
            const jsonSignMsg = JSON.stringify(signMsg).replace(/\"/g, '');
            const authorization = `GNFD1-ETH-PERSONAL_SIGN,SignedMsg=${jsonSignMsg},Signature=${signRes}`;
            const res = await updateSpsPubKey({
                address,
                sps,
                domain,
                pubKey: hexlify(publicKey).slice(2),
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
                    seedString: hexlify(privateKey),
                    keypairs: {
                        privateKey: hexlify(privateKey).slice(2),
                        publicKey: hexlify(publicKey).slice(2),
                    },
                    expirationTime,
                    spAddresses: successSps,
                    failedSpAddresses: uploadSpsPubkeyFailed,
                },
                message: 'Sign and upload public key success',
            };
        }
        catch (error) {
            return { code: -1, message: error.message, statusCode: error?.status || NORMAL_ERROR_CODE };
        }
    }
    generateKeys() {
        const privateKey = ed25519.utils.randomPrivateKey();
        const publicKey = ed25519.getPublicKey(privateKey);
        return {
            privateKey,
            publicKey,
        };
    }
};
OffChainAuth = __decorate([
    injectable()
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
    const xmlParser = new XMLParser({
        parseTagValue: false,
    });
    const res = xmlParser.parse(data);
    let PaymentAccounts = res.GfSpListUserPaymentAccountsResponse.PaymentAccounts || [];
    if (PaymentAccounts) {
        if (!Array.isArray(PaymentAccounts)) {
            PaymentAccounts = [PaymentAccounts];
        }
        PaymentAccounts = PaymentAccounts.map((item) => {
            item.PaymentAccount = {
                ...item.PaymentAccount,
                // @ts-ignore
                Refundable: convertStrToBool(item.PaymentAccount.Refundable),
                UpdateAt: Number(item.PaymentAccount.UpdateAt),
                UpdateTime: Number(item.PaymentAccount.UpdateTime),
            };
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
        this.spClient = container.resolve(SpClient);
        this.queryClient = container.resolve(RpcQueryClient);
    }
    async getStreamRecord(account) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.StreamRecord({
            account,
        });
    }
    async getStreamRecordAll(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.StreamRecords(request);
    }
    async params() {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.Params();
    }
    async paramsByTimestamp(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.ParamsByTimestamp(request);
    }
    async getPaymentAccountCount(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccountCount(request);
    }
    async getPaymentAccountCounts(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccountCounts(request);
    }
    async paymentAccount(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccount(request);
    }
    async paymentAccountAll(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccounts(request);
    }
    async dynamicBalance(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.DynamicBalance(request);
    }
    async getPaymentAccountsByOwner(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.PaymentAccountsByOwner(request);
    }
    async getAutoSettleRecords(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.AutoSettleRecords(request);
    }
    async getOutFlows(request) {
        const rpc = await this.queryClient.getPaymentQueryClient();
        return await rpc.OutFlows(request);
    }
    async deposit(msg) {
        return await this.txClient.tx(MsgDepositTypeUrl, msg.creator, MsgDepositSDKTypeEIP712, MsgDeposit.toSDK(msg), MsgDeposit.encode(msg).finish());
    }
    async withdraw(msg) {
        return await this.txClient.tx(MsgWithdrawTypeUrl, msg.creator, MsgWithdrawSDKTypeEIP712, MsgWithdraw.toSDK(msg), MsgWithdraw.encode(msg).finish());
    }
    async disableRefund(msg) {
        return await this.txClient.tx(MsgDisableRefundTypeUrl, msg.owner, MsgDisableRefundSDKTypeEIP712, MsgDisableRefund.toSDK(msg), MsgDisableRefund.encode(msg).finish());
    }
    async listUserPaymentAccounts(params, authType, config) {
        try {
            assertAuthType(authType);
            let endpoint = '';
            if (config && config.endpoint) {
                endpoint = config.endpoint;
            }
            else {
                const sp = await this.sp.getInServiceSP();
                endpoint = sp.endpoint;
            }
            const { url, optionsWithOutHeaders, reqMeta } = getListUserPaymentAccountMetaInfo(endpoint, params);
            const signHeaders = await this.spClient.signHeaders(reqMeta, authType);
            const result = await this.spClient.callApi(url, {
                ...optionsWithOutHeaders,
                headers: signHeaders,
            });
            const xml = await result.text();
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
                statusCode: error?.statusCode || NORMAL_ERROR_CODE,
            };
        }
    }
};
Payment = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __param(1, inject(delay$1(() => Sp))),
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
    async voteProposal(msg) {
        return await this.txClient.tx(MsgVoteTypeUrl, msg.voter, MsgVoteSDKTypeEIP712, {
            ...MsgVote.toSDK(msg),
            option: voteOptionToJSON(msg.option),
            proposal_id: msg.proposalId.toNumber(),
        }, MsgVote.encode(msg).finish());
    }
    async submitProposal(createMsg, submitMsg) {
        return await this.txClient.tx(MsgSubmitProposalTypeUrl, submitMsg.proposer, MsgSubmitProposalSDKTypeEIP712, {
            ...MsgSubmitProposal.toSDK(submitMsg),
            messages: [
                {
                    type: '/cosmos.staking.v1beta1.MsgCreateValidator',
                    value: encodeToHex(JSON.stringify(createMsg)),
                    // base64FromBytes(arrayify('0x' + encodeToHex(JSON.stringify(createMsg)))),
                },
            ],
        }, MsgSubmitProposal.encode(submitMsg).finish());
    }
};
Proposal = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
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
        this.queryClient = container.resolve(RpcQueryClient);
        this.proposal = container.resolve(Proposal);
    }
    async listValidators(request) {
        const client = await this.queryClient.getStakingClient();
        return client.Validators(request);
    }
    async createValidator(address, msg) {
        return await this.txClient.tx(MsgCreateValidatorTypeUrl, address, MsgCreateValidatorSDKTypeEIP712, MsgCreateValidator.toSDK(msg), MsgCreateValidator.encode(msg).finish());
    }
    async editValidator(address, msg) {
        return await this.txClient.tx(MsgEditValidatorTypeUrl, address, MsgEditValidatorSDKTypeEIP712, MsgEditValidator.toSDK(msg), MsgEditValidator.encode(msg).finish());
    }
};
Validator = __decorate([
    injectable(),
    __param(0, inject(delay$1(() => TxClient))),
    __metadata("design:paramtypes", [TxClient])
], Validator);

class Client {
    /**
     * @rpcUrl string
     * @chaidId string
     * @wasmURL optional, need setting only used for browser
     */
    static create(rpcUrl, chainId) {
        container.register('RPC_URL', { useValue: rpcUrl });
        container.register('CHAIN_ID', { useValue: chainId });
        const account = container.resolve(Account);
        const basic = container.resolve(Basic);
        const bucket = container.resolve(Bucket);
        const challenge = container.resolve(Challenge);
        const crosschain = container.resolve(CrossChain);
        const distribution = container.resolve(Distribution);
        const feegrant = container.resolve(FeeGrant);
        const gashub = container.resolve(Gashub);
        const group = container.resolve(Group);
        const objects = container.resolve(Objects);
        const payment = container.resolve(Payment);
        const proposal = container.resolve(Proposal);
        const queryClient = container.resolve(RpcQueryClient);
        const sp = container.resolve(Sp);
        const spClient = container.resolve(SpClient);
        const storage = container.resolve(Storage);
        const txClient = container.resolve(TxClient);
        const offchainauth = container.resolve(OffChainAuth);
        const validator = container.resolve(Validator);
        const virtualGroup = container.resolve(VirtualGroup);
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

export { AllowedMsgAllowanceTypeUrl, BasicAllowanceTypeUrl, Client, DEFAULT_DENOM, DEFAULT_PART_SIZE, EMPTY_STRING_SHA256, GRNToString, METHOD_GET, METHOD_POST, METHOD_PUT, MsgAttestTypeUrl, MsgCancelCreateObjectTypeUrl, MsgCancelMigrateBucketTypeUrl, MsgClaimTypeUrl, MsgCreateBucketTypeUrl, MsgCreateGroupTypeUrl, MsgCreateObjectTypeUrl, MsgCreatePaymentAccountTypeUrl, MsgCreateValidatorTypeUrl, MsgDeleteBucketTypeUrl, MsgDeleteGroupTypeUrl, MsgDeleteObjectTypeUrl, MsgDeletePolicyTypeUrl, MsgDepositTypeUrl, MsgDisableRefundTypeUrl, MsgEditValidatorTypeUrl, MsgFundCommunityPoolTypeUrl, MsgGrantAllowanceTypeUrl, MsgLeaveGroupTypeUrl, MsgMigrateBucketTypeUrl, MsgMirrorBucketTypeUrl, MsgMirrorGroupTypeUrl, MsgMirrorObjectTypeUrl, MsgMultiSendTypeUrl, MsgPutPolicyTypeUrl, MsgRevokeAllowanceTypeUrl, MsgSendTypeUrl, MsgSetBucketFlowRateLimitTypeUrl, MsgSetTagTypeUrl, MsgSetWithdrawAddressTypeUrl, MsgSettleTypeUrl, MsgSubmitProposalTypeUrl, MsgSubmitTypeUrl, MsgToggleSPAsDelegatedAgentTypeUrl, MsgTransferOutTypeUrl, MsgUpdateBucketInfoTypeUrl, MsgUpdateGroupExtraTypeUrl, MsgUpdateGroupMemberTypeUrl, MsgUpdateObjectInfoTypeUrl, MsgVoteTypeUrl, MsgWithdrawDelegatorRewardTypeUrl, MsgWithdrawTypeUrl, MsgWithdrawValidatorCommissionTypeUrl, NORMAL_ERROR_CODE, SP_NOT_AVAILABLE_ERROR_CODE, SP_NOT_AVAILABLE_ERROR_MSG, SpMetaInfo, ZERO_PUBKEY, assertAuthType, assertFileType, assertHttpMethod, assertPrivateKey, assertStringRequire, checkObjectName, convertTimeStampToDate, createEIP712, decodeFromHex, decodeObjectFromHexString, eip712Hash, encodeObjectToHexString, encodePath, encodeToHex, encodeToHexString, generateFee, generateMessage, generateMsg, generateTypes, generateUrlByBucketName, getGasFeeBySimulate, getUtcZeroTimestamp, makeCosmsPubKey, mergeMultiEip712, mergeMultiMessage, newAllowedMsgAllowance, newBasicAllowance, newBucketGRN, newGroupGRN, newMarshal, newMsgGrantAllowance, newObjectGRN, recoverPk, sign712Tx, trimString, typeWrapper, verifyAddress, verifyBucketName, verifyObjectName, verifyUrl };
//# sourceMappingURL=index.js.map
