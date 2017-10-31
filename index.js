'use strict';

const base64 = require('./build/Release/base64.node');
const base64encode = base64.encode;
const base64decode = base64.decode;

const encodeCostThreshold = process.platform === 'darwin' ? 512 : 256;
const decodeCostThreshold = process.platform === 'darwin' ? 256 : 128;

const expectedBuffer = new Error('Expected Buffer');

function throwExpectedBuffer () {
  throw expectedBuffer;
}

function encode (input) {
  return input.length < encodeCostThreshold
    ? (Buffer.isBuffer(input) && Buffer.from(input.toString('base64'), 'ascii')) || throwExpectedBuffer()
    : base64encode(input);
}

function decode (input) {
  return input.length < decodeCostThreshold
    ? (Buffer.isBuffer(input) && Buffer.from(input.toString('ascii'), 'base64')) || throwExpectedBuffer()
    : base64decode(input);
}

module.exports = {
  encode: encode,
  decode: decode
};
