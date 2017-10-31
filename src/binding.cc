// Copyright 2017 Lovell Fuller.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <stdlib.h>
#include <node.h>
#include <nan.h>

#include "include/libbase64.h"

NAN_METHOD(Encode) {
  Nan::HandleScope();

  v8::Local<v8::Object> buffer = info[0].As<v8::Object>();
  if (node::Buffer::HasInstance(buffer)) {
    char const* in = node::Buffer::Data(buffer);
    size_t inLen = node::Buffer::Length(buffer);

    size_t const outAlloc = 4 + inLen * 4 / 3;
    char* out = static_cast<char*>(malloc(outAlloc));
    size_t outLen;

    base64_encode(in, inLen, out, &outLen, 0);

    info
      .GetReturnValue()
      .Set(Nan::NewBuffer(out, outLen).ToLocalChecked());
  } else {
    Nan::ThrowTypeError("Expected Buffer");
  }
}

NAN_METHOD(Decode) {
  Nan::HandleScope();

  v8::Local<v8::Object> buffer = info[0].As<v8::Object>();
  if (node::Buffer::HasInstance(buffer)) {
    char const* in = node::Buffer::Data(buffer);
    size_t inLen = node::Buffer::Length(buffer);

    size_t const outAlloc = 1 + inLen * 3 / 4;
    char* out = static_cast<char*>(malloc(outAlloc));
    size_t outLen;

    base64_decode(in, inLen, out, &outLen, 0);

    info
      .GetReturnValue()
      .Set(Nan::NewBuffer(out, outLen).ToLocalChecked());
  } else {
    Nan::ThrowTypeError("Expected Buffer");
  }
}

NAN_MODULE_INIT(init) {
  Nan::Set(target, Nan::New("encode").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Encode)).ToLocalChecked());
  Nan::Set(target, Nan::New("decode").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Decode)).ToLocalChecked());
}

NODE_MODULE(base64, init)
