# 64

High performance Base64 encoding and decoding for Node.js
using SIMD (AVX2, AVX, SSE4.2, SSE4.1, SSSE3) acceleration.
Uses Alfred Klomp's [base64](https://github.com/aklomp/base64) library.

Suitable for use with Buffer objects with a length greater than about 5KB.

When compared with Base64 encoding/decoding via Node's Buffer object,
expected peformance gains are in the 3x-6x range.

## Requirements

* x64 CPU
* Linux (gcc v4.7+) or OS X
* Node.js v4+
* [node-gyp](https://github.com/nodejs/node-gyp#installation) and its dependencies

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

### encode(input, [flags])

* `input` is a Buffer containing the data to be Base64 encoded.
* `flags` is an optional Number to force use of a specific set of SIMD instructions, defaulting to best available at runtime.

Returns a Buffer containing the Base64 encoded version of `input`.

### decode(encoded, [flags])

* `encoded` is a Buffer containing Base64 encoded data.
* `flags` is an optional Number to force use of a specific set of SIMD instructions, defaulting to best available at runtime.

Returns a Buffer containing the Base64 decoded version of `encoded`.

### flags

An Object containing identifiers for all possible SIMD instruction sets. Not all will be available at runtime.

## Performance

* [Intel i3-4170](http://ark.intel.com/products/77490/Intel-Core-i3-4170-Processor-3M-Cache-3_70-GHz)
* Ubuntu 16.04.1 LTS
* Node.js v6.10.0

| Length | Method | Module | Ops/sec |
| -----: | :----- | :----- | ------: |
|   10KB | encode | Buffer | 122,312 |
|        |        | 64     | 321,902 |
|        | decode | Buffer |  63,551 |
|        |        | 64     | 272,640 |
|  100KB | encode | Buffer |  12,145 |
|        |        | 64     |  47,148 |
|        | decode | Buffer |   6,504 |
|        |        | 64     |  37,170 |
|    1MB | encode | Buffer |   1,315 |
|        |        | 64     |   4,983 |
|        | decode | Buffer |     599 |
|        |        | 64     |   3,876 |
|   10MB | encode | Buffer |     133 |
|        |        | 64     |     437 |
|        | decode | Buffer |      54 |
|        |        | 64     |     362 |

## Licence

Copyright 2017 Lovell Fuller.

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
