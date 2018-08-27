//
//  Bridge.m
//  openland
//
//  Created by Steve Kite on 8/19/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Bridge.h"


@interface RCT_EXTERN_MODULE(AggressiveImageManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(source, NSString)
RCT_EXPORT_VIEW_PROPERTY(capInsets, UIEdgeInsets)
@end

@interface RCT_EXTERN_MODULE(RNAsyncViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(configKey, NSString)
@end

@interface RCT_EXTERN_MODULE(RNAsyncConfigManager, NSObject)
RCT_EXTERN_METHOD(setConfig:(NSString *)key config:(NSString *)config)
@end

@interface RCT_EXTERN_MODULE(RNAsyncViewEventEmitter, RCTEventEmitter)
RCT_EXTERN_METHOD(supportedEvents)
@end

@interface RCT_EXTERN_MODULE(RNAsyncDataViewManager, NSObject)
RCT_EXTERN_METHOD(dataViewInit:(NSString *)dataSourceKey config: (NSString *)config)
RCT_EXTERN_METHOD(dataViewAddItem:(NSString *)dataSourceKey key: (NSString *)key config: (NSString *)config index: (nonnull NSNumber)key)
RCT_EXTERN_METHOD(dataViewUpdateItem:(NSString *)dataSourceKey key: (NSString *)key config: (NSString *)config index: (nonnull NSNumber)key)
RCT_EXTERN_METHOD(dataViewRemoveItem:(NSString *)dataSourceKey key: (NSString *)key index: (nonnull NSNumber)key)
RCT_EXTERN_METHOD(dataViewMoveItem:(NSString *)dataSourceKey key: (NSString *)key fromIndex: (nonnull NSNumber)fromIndex toIndex: (nonnull NSNumber)toIndex)
@end
