'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('node:fs');
var path = require('node:path');
var mimeTypes = require('mime-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var mimeTypes__default = /*#__PURE__*/_interopDefaultLegacy(mimeTypes);

function createFile(filePath) {
    const stats = fs__default["default"].statSync(filePath);
    const fileSize = stats.size;
    const extname = path__default["default"].extname(filePath);
    const type = mimeTypes__default["default"].lookup(extname);
    if (!type)
        throw new Error(`Unsupported file type: ${filePath}`);
    return {
        name: filePath,
        type,
        size: fileSize,
        content: fs__default["default"].readFileSync(filePath),
    };
}

exports.createFile = createFile;
//# sourceMappingURL=adapter.js.map
