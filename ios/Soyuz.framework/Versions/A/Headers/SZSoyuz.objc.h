// Objective-C API for talking to github.com/openland/soyuz/mobile Go package.
//   gobind -lang=objc -prefix="SZ" github.com/openland/soyuz/mobile
//
// File is generated by gobind. Do not edit.

#ifndef __SZSoyuz_H__
#define __SZSoyuz_H__

@import Foundation;
#include "ref.h"
#include "Universe.objc.h"


FOUNDATION_EXPORT long SZSoyuzStoreCreate(NSString* _Nullable name);

FOUNDATION_EXPORT NSString* _Nonnull SZSoyuzStoreRead(long id_, NSString* _Nullable key);

FOUNDATION_EXPORT void SZSoyuzStoreWrite(long id_, NSString* _Nullable key, NSString* _Nullable value);

#endif
