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
  .forEach(test =>
    ava(test, t => {
      t.plan(2);

      const encoded = base64.encode(Buffer.from(test));
      t.is(encoded.toString(), tests[test]);

      const decoded = base64.decode(encoded);
      t.is(decoded.toString(), test);
    })
  );

for (let length = 1; length < 10000; length++) {
  ava(`roundtrip encode/decode of ${length} bytes`, t => {
    t.plan(1);
    const input = crypto.randomBytes(length);
    const encoded = base64.encode(input);
    const decoded = base64.decode(encoded);
    t.true(input.equals(decoded));
  });
}
