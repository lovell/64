#ifndef BASE64_ENV_H
#define BASE64_ENV_H

// This header file contains macro definitions that describe certain aspects of
// the compile-time environment. Compatibility and portability macros go here.

// Define machine endianness. This is for GCC:
#if (__BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__)
#  define BASE64_LITTLE_ENDIAN 1
#else
#  define BASE64_LITTLE_ENDIAN 0
#endif

// This is for Clang:
#ifdef __LITTLE_ENDIAN__
#  define BASE64_LITTLE_ENDIAN 1
#endif

#ifdef __BIG_ENDIAN__
#  define BASE64_LITTLE_ENDIAN 0
#endif

// Endian conversion functions:
#if BASE64_LITTLE_ENDIAN
#  ifdef _MSC_VER
//   Microsoft Visual C++:
#    define BASE64_HTOBE32(x)	_byteswap_ulong(x)
#    define BASE64_HTOBE64(x)	_byteswap_uint64(x)
#  else
//   GCC and Clang:
#    define BASE64_HTOBE32(x)	__builtin_bswap32(x)
#    define BASE64_HTOBE64(x)	__builtin_bswap64(x)
#  endif
#else
// No conversion needed:
#  define BASE64_HTOBE32(x)	(x)
#  define BASE64_HTOBE64(x)	(x)
#endif

// Detect word size:
#ifdef _INTEGRAL_MAX_BITS
#  define BASE64_WORDSIZE _INTEGRAL_MAX_BITS
#else
#  define BASE64_WORDSIZE __WORDSIZE
#endif

// End-of-file definitions.
// Almost end-of-file when waiting for the last '=' character:
#define BASE64_AEOF 1
// End-of-file when stream end has been reached or invalid input provided:
#define BASE64_EOF 2

// GCC 7 defaults to issuing a warning for fallthrough in switch statements,
// unless the fallthrough cases are marked with an attribute. As we use
// fallthrough deliberately, define an alias for the attribute:
#if __GNUC__ >= 7
#  define BASE64_FALLTHROUGH  __attribute__((fallthrough));
#else
#  define BASE64_FALLTHROUGH
#endif

#endif	// BASE64_ENV_H
