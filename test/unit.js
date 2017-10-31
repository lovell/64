'use strict';

const crypto = require('crypto');
const ava = require('ava');

const base64 = require('../');

const tests = {
  '': '',
  f: 'Zg==',
  fo: 'Zm8=',
  foo: 'Zm9v',
  foob: 'Zm9vYg==',
  fooba: 'Zm9vYmE=',
  foobar: 'Zm9vYmFy',
  base64: 'YmFzZTY0',
  'The quick brown fox jumped over the lazy sleeping dog': 'VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wZWQgb3ZlciB0aGUgbGF6eSBzbGVlcGluZyBkb2c='
};

Object
  .keys(tests)
  .forEach(function (test) {
    ava(`Roundtrip encode/decode of '${test}'`, function (t) {
      t.plan(2);

      const encoded = base64.encode(Buffer.from(test));
      t.is(encoded.toString(), tests[test]);

      const decoded = base64.decode(encoded);
      t.is(decoded.toString(), test);
    });
  });

[2, 20, 200, 2000, 20000, 200000]
  .forEach(function (length) {
    ava(`Roundtrip encode/decode of ${length} random bytes`, function (t) {
      t.plan(1);
      const input = crypto.randomBytes(length);
      const encoded = base64.encode(input);
      const decoded = base64.decode(encoded);
      t.true(input.equals(decoded));
    });
  });

[null, '', 'test', 1, -0.3, {}, true]
  .forEach(function (invalidInput) {
    ava(`Invalid input ${JSON.stringify(invalidInput)} throws`, function (t) {
      t.plan(2);
      t.throws(function () {
        base64.encode(invalidInput);
      });
      t.throws(function () {
        base64.decode(invalidInput);
      });
    });
  });
