'use strict';

const crypto = require('crypto');
const benchmark = require('benchmark');

const base64 = require('../');

[10000, 100000, 1000000, 10000000]
  .forEach(function (length) {
    const plain = crypto.randomBytes(length);
    (new benchmark.Suite())
      .add('Buffer', function () {
        plain.toString('base64');
      })
      .add('64', function () {
        base64.encode(plain);
      })
      .on('cycle', function (event) {
        console.log(event.target.toString());
      })
      .on('complete', function () {
        console.log(`Fastest encoder for ${length} bytes is ${this.filter('fastest').map('name')}`);
      })
      .run();

    const encoded = base64.encode(plain);
    const encodedString = encoded.toString();
    (new benchmark.Suite())
      .add('Buffer', function () {
        Buffer.from(encodedString, 'base64');
      })
      .add('64', function () {
        base64.decode(encoded);
      })
      .on('cycle', function (event) {
        console.log(event.target.toString());
      })
      .on('complete', function () {
        console.log(`Fastest decoder for ${length} bytes is ${this.filter('fastest').map('name')}`);
      })
      .run();
  });
