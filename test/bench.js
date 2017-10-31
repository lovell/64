'use strict';

const crypto = require('crypto');
const benchmark = require('benchmark');

const base64 = require('../');

const mapTestNameToResultsColumn = {
  'Buffer encode': 1,
  'Buffer decode': 2,
  '64 encode': 3,
  '64 decode': 4
};

const powersOfTwo = Array(12)
  .fill()
  .map(function (_, i) {
    return Math.pow(2, i + 6);
  });

const results = Array(powersOfTwo.length);

powersOfTwo.forEach(function (length, i) {
  results[i] = Array(5);
  results[i][0] = length;

  const plain = crypto.randomBytes(length);
  const encoded = base64.encode(plain);

  (new benchmark.Suite())
    .add('Buffer encode', function () {
      Buffer.from(plain.toString('base64'), 'ascii');
    })
    .add('64 encode', function () {
      base64.encode(plain);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
      results[i][mapTestNameToResultsColumn[event.target.name]] = Math.floor(event.target.hz);
    })
    .run();

  (new benchmark.Suite())
    .add('Buffer decode', function () {
      Buffer.from(encoded.toString('ascii'), 'base64');
    })
    .add('64 decode', function () {
      base64.decode(encoded);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
      results[i][mapTestNameToResultsColumn[event.target.name]] = Math.floor(event.target.hz);
    })
    .run();
});

console.log(results);
