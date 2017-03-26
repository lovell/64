'use strict';
const base64 = require('./build/Release/base64.node');

const encode = function (input, flags) {
  if (!Buffer.isBuffer(input)) {
    throw new Error('Expected Buffer');
  }
  return base64.encode(input);
};

const decode = function (input, flags) {
  if (!Buffer.isBuffer(input)) {
    throw new Error('Expected Buffer');
  }
  return base64.decode(input);
};

module.exports = {
  encode: encode,
  decode: decode
};
