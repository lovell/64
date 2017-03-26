'use strict';
const base64 = require('./build/Release/base64.node');

const encode = function (input, flags) {
  if (!Buffer.isBuffer(input)) {
    throw new Error('Expected Buffer');
  }
  return base64.encode(input, flags || 0);
};

const decode = function (input, flags) {
  if (!Buffer.isBuffer(input)) {
    throw new Error('Expected Buffer');
  }
  return base64.decode(input, flags || 0);
};

const flags = {
  avx2: 1 << 0,
  neon32: 1 << 1,
  neon64: 1 << 2,
  plain: 1 << 3,
  ssse3: 1 << 4,
  sse41: 1 << 5,
  sse42: 1 << 6,
  avx: 1 << 7
};

module.exports = {
  encode: encode,
  decode: decode,
  flags: flags
};
