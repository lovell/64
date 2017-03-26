{
  'target_defaults': {
    'include_dirs': ['src'],
    'cflags': [
      '-fexceptions',
      '-Wall',
      '-O3'
    ],
    'cflags_cc': [
      '-fexceptions',
      '-Wall',
      '-O3'
    ],
    'xcode_settings': {
      'CLANG_CXX_LANGUAGE_STANDARD': 'c++11',
      'CLANG_CXX_LIBRARY': 'libc++',
      'MACOSX_DEPLOYMENT_TARGET': '10.7',
      'OTHER_CFLAGS': [
        '-fexceptions',
        '-Wall',
        '-O3'
      ],
      'OTHER_CPLUSPLUSFLAGS': [
        '-fexceptions',
        '-Wall',
        '-O3'
      ]
    },
    'msvs_settings': {
      'VCCLCompilerTool': {
        'ExceptionHandling': 1,
        'DisableSpecificWarnings': ['4267']
      }
    }
  },
  'targets': [
    {
      'target_name': 'base64_avx2',
      'type': 'static_library',
      'sources': ['src/lib/arch/avx2/codec.c'],
      'cflags': ['-mavx2'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-mavx2']
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          'AdditionalOptions': ['/arch:AVX2']
        }
      }
    }, {
      'target_name': 'base64_avx',
      'type': 'static_library',
      'sources': ['src/lib/arch/avx/codec.c'],
      'cflags': ['-mavx'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-mavx']
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          'AdditionalOptions': ['/arch:AVX']
        }
      }
    }, {
      'target_name': 'base64_sse42',
      'type': 'static_library',
      'sources': ['src/lib/arch/sse42/codec.c'],
      'cflags': ['-msse4.2'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-msse4.2']
      }
    }, {
      'target_name': 'base64_sse41',
      'type': 'static_library',
      'sources': ['src/lib/arch/sse41/codec.c'],
      'cflags': ['-msse4.1'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-msse4.1']
      }
    }, {
      'target_name': 'base64_ssse3',
      'type': 'static_library',
      'sources': ['src/lib/arch/ssse3/codec.c'],
      'cflags': ['-mssse3'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['-mssse3']
      }
    }, {
      'target_name': 'base64_neon64',
      'type': 'static_library',
      'sources': ['src/lib/arch/neon64/codec.c']
    }, {
      'target_name': 'base64_neon32',
      'type': 'static_library',
      'sources': ['src/lib/arch/neon32/codec.c']
    }, {
      'target_name': 'base64_generic',
      'type': 'static_library',
      'sources': ['src/lib/arch/generic/codec.c']
    }, {
      'target_name': 'base64',
      'dependencies': [
        'base64_avx2',
        'base64_avx',
        'base64_sse42',
        'base64_sse41',
        'base64_ssse3',
        'base64_neon64',
        'base64_neon32',
        'base64_generic'
      ],
      'sources': [
        'src/lib/lib.c',
        'src/lib/codec_choose.c',
        'src/binding.cc'
      ],
      'include_dirs': ['<!(node -e "require(\'nan\')")'],
      'cflags_cc': ['-flto']
    }
  ]
}
