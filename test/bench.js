'use strict';

const crypto = require('crypto');
const benchmark = require('benchmark');

const base64 = require('../');

const powersOfTwo = Array(12)
  .fill()
  .map(function (_, i) {
    return Math.pow(2, i + 6);
  });

const encodeResults = [
  [
    'Buffer length',
    'Node (to string)',
    'Node (to Buffer)',
    '64.encode'
  ]
];

const decodeResults = [
  [
    'Buffer length',
    'Node (from string)',
    'Node (from Buffer)',
    '64.decode'
  ]
];

powersOfTwo.forEach(function (length, i) {
  const plain = crypto.randomBytes(length);
  const encoded = base64.encode(plain);
  const encodedString = encoded.toString('ascii');

  console.log('length=' + length);

  const encodeResult = [length];
  encodeResults.push(encodeResult);
  (new benchmark.Suite())
    .add('Node (to string)', function () {
      plain.toString('base64');
    })
    .add('Node (to Buffer)', function () {
      Buffer.from(plain.toString('base64'), 'ascii');
    })
    .add('64.encode', function () {
      base64.encode(plain);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
      encodeResult.push(Math.floor(event.target.hz));
    })
    .run();

  const decodeResult = [length];
  decodeResults.push(decodeResult);
  (new benchmark.Suite())
    .add('Node (from string)', function () {
      Buffer.from(encodedString, 'base64');
    })
    .add('Node (from Buffer)', function () {
      Buffer.from(encoded.toString('ascii'), 'base64');
    })
    .add('64.decode', function () {
      base64.decode(encoded);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
      decodeResult.push(Math.floor(event.target.hz));
    })
    .run();
});

function writeResultsArray (fieldName, resultsArray) {
  console.log('  ' + fieldName + ': [');
  resultsArray.forEach(function (row) {
    console.log('    ' + JSON.stringify(row) + ',');
  });
  console.log('  ],');
}

console.log('Content for "test/bench-results.js":');
console.log('var benchResults = {');
writeResultsArray('encode', encodeResults);
writeResultsArray('decode', decodeResults);
console.log('};');
