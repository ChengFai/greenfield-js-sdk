'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_worker_threads = require('node:worker_threads');
var index = require('./index.js');
var utils = require('./utils.js');
require('ethereum-cryptography/sha256.js');
require('@ethersproject/base64');

class NodeAdapterReedSolomon extends index.ReedSolomon {
  async encodeInWorker(p, sourceData) {
    return new Promise((resolve, reject) => {
      if (node_worker_threads.isMainThread) {
        // RES is `encodeShards` Array
        const RES = [];
        const chunkList = utils.splitPrice(sourceData, this.segmentSize);
        const threads = new Set();

        for (let i = 0; i < chunkList.length; i++) {
          const worker = new node_worker_threads.Worker(p, {
            workerData: {
              index: i,
              chunk: chunkList[i],
            },
          });
          threads.add(worker);
        }

        for (const w of threads) {
          w.on('error', (err) => {
            throw err;
          });
          w.on('exit', () => {
            threads.delete(w);
            // console.log(`Thread exiting, ${threads.size} running...`)
            if (threads.size === 0) {
              const sortedRes = this.sortByIndex(RES);
              resolve(this.getChecksumsByEncodeShards(sortedRes));
            }
          });

          w.on('message', (message) => {
            // console.log('message', message.encodeData.index)
            RES[message.index] = message;
          });
        }
      } else {
        const { chunk, index } = node_worker_threads.workerData;

        const encodeShard = this.getEncodeShard(chunk, index);
        node_worker_threads.parentPort.postMessage(encodeShard);
      }
    });
  }
}

exports.NodeAdapterReedSolomon = NodeAdapterReedSolomon;
//# sourceMappingURL=node.adapter.js.map
