'use strict';

const crypto = require('crypto');
const benchmark = require('benchmark');

const base64 = require('../');

const headers = [
  'Buffer length',
  'Buffer encode string',
  'Buffer decode string',
  'Buffer encode Buffer',
  'Buffer decode Buffer',
  '64 encode',
  '64 decode'
];

const powersOfTwo = Array(12)
  .fill()
  .map(function (_, i) {
    return Math.pow(2, i + 6);
  });

const results = [
  ['Buffer length', 'Buffer encode string', 'Buffer decode string', 'Buffer encode Buffer', 'Buffer decode Buffer', '64 encode', '64 decode'],
]

powersOfTwo.forEach(function (length, i) {
  const resultsForLength = [length];
  results.push(resultsForLength);

  const plain = crypto.randomBytes(length);
  const encoded = base64.encode(plain);
  const encodedString = encoded.toString('ascii');

  (new benchmark.Suite())
    .add('Buffer encode string', function () {
      plain.toString('base64');
    })
    .add('Buffer encode Buffer', function () {
      Buffer.from(plain.toString('base64'), 'ascii');
    })
    .add('64 encode', function () {
      base64.encode(plain);
    })
    .add('Buffer decode string', function () {
      Buffer.from(encodedString, 'base64');
    })
    .add('Buffer decode Buffer', function () {
      Buffer.from(encoded.toString('ascii'), 'base64');
    })
    .add('64 decode', function () {
      base64.decode(encoded);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
      resultsForLength.push(Math.floor(event.target.hz));
    })
    .run();
});

console.log(results);
