# 64

High performance Base64 encoding and decoding for Node.js
using SIMD (AVX2, AVX, SSE4.2, SSE4.1, SSSE3) acceleration.
Uses Alfred Klomp's [base64](https://github.com/aklomp/base64) library.

When compared with Base64 encoding/decoding via Node's Buffer object,
expected performance gains are up to ~6x depending on length.

Due to the cost of making a shared library call,
it is less suitable for very short Buffers,
typically those less than ~300 bytes when encoding
and less than ~150 bytes when decoding.

Pre-compiled binaries are provided for Node 6, 8 and 10 on the most common platforms.

## Requirements

* Node.js v6+
* Linux, OS X or Windows
* x86 or x64 CPU

## Install

```sh
npm install 64
```

## Usage

```javascript
import { encode, decode } from '64';

const input = Buffer.from('The quick brown fox jumped over the lazy sleeping dog');

const encoded = encode(input); // VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wZWQgb3ZlciB0aGUgbGF6eSBzbGVlcGluZyBkb2c=
const decoded = decode(encoded);
```

## API

### encode(input)

* `input` is a Buffer containing the data to be Base64 encoded.

Returns a Buffer containing the Base64 encoded version of `input`.

A TypeError will be thrown if `input` is not a Buffer.

### decode(encoded)

* `encoded` is a Buffer containing Base64 encoded data.

Returns a Buffer containing the Base64 decoded version of `encoded`.

A TypeError will be thrown if `encoded` is not a Buffer.

## Performance

* [Intel i3-4170](http://ark.intel.com/products/77490/Intel-Core-i3-4170-Processor-3M-Cache-3_70-GHz)
* Ubuntu 16.04.3 LTS
* Node.js v8.1.3

![](https://raw.githubusercontent.com/lovell/64/master/test/bench.png)

## Licence

Copyright 2017, 2018 Lovell Fuller.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Copyright (c) 2005-2007, Nick Galbreath
Copyright (c) 2013-2017, Alfred Klomp
Copyright (c) 2015-2017, Wojciech Mula
Copyright (c) 2016-2017, Matthieu Darbois
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
