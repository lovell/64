'use strict';

const assert = require('assert');
const crypto = require('crypto');

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
    const input = Buffer.from(test);
    const expected = Buffer.from(tests[test]);

    const encoded = base64.encode(input);
    assert.strictEqual(true, expected.equals(encoded));

    const decoded = base64.decode(encoded);
    assert.strictEqual(true, input.equals(decoded));
  });

for (let i = 1; i < 10000; i++) {
  const input = crypto.randomBytes(i);
  const encoded = base64.encode(input);
  const decoded = base64.decode(encoded);
  assert.strictEqual(true, input.equals(decoded));
}
