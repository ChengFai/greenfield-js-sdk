'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var base64 = require('@ethersproject/base64');
var sha256_js = require('ethereum-cryptography/sha256.js');

function concat(a, b) {
  let res = [];
  a.forEach((i) => {
    res.push(i);
  });
  b.forEach((i) => {
    res.push(i);
  });
  return res;
}

function getIntegrityUint8Array(uint8arr) {
  const arr = uint8arr.reduce((a, b) => {
    return concat(a, b);
  });

  return Uint8Array.from(arr);
}

function toBase64(hashList) {
  const res = [];
  for (let i = 0; i < hashList.length; i++) {
    res.push(base64.encode(hashList[i]));
  }
  return res;
}

/**
 * split data to same length price
 */
function splitPrice(data, size) {
  let chunkList = [];
  let cur = 0;

  while (cur < data.length) {
    chunkList.push(data.slice(cur, cur + size));
    cur += size;
  }

  return chunkList;
}

Object.defineProperty(exports, 'sha256', {
  enumerable: true,
  get: function () { return sha256_js.sha256; }
});
exports.concat = concat;
exports.getIntegrityUint8Array = getIntegrityUint8Array;
exports.splitPrice = splitPrice;
exports.toBase64 = toBase64;
//# sourceMappingURL=utils.js.map
