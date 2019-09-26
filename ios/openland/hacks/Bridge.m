//
//  Bridge.m
//  openland
//
//  Created by Steve Kite on 8/19/18.
//  Copyright © 2018 Openland. All rights reserved.
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

@interface RCT_EXTERN_MODULE(RNAsyncListViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(dataViewKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(contentPaddingTop, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(overflowColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(loaderColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(contentPaddingBottom, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(headerPadding, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(inverted, BOOL)
RCT_EXPORT_VIEW_PROPERTY(overscrollCompensation, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onScroll, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(applyModes, NSArray)
@end

@interface RCT_EXTERN_MODULE(RNAsyncKeyboardViewManager, RCTViewManager)
@end

@interface RCT_EXTERN_MODULE(RNAsyncKeyboardContextViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(contextKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(bottomSafeInset, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(onKeyboardChanged, RCTDirectEventBlock)
@end

@interface RCT_EXTERN_MODULE(RNAsyncConfigManager, NSObject)
RCT_EXTERN_METHOD(setConfig:(NSString *)key config:(NSString *)config)
RCT_EXTERN_METHOD(setSuspended:(NSString *)key suspended:(nonnull BOOL)suspended)
@end

@interface RCT_EXTERN_MODULE(RNBackgroundTask, NSObject)
RCT_EXTERN_METHOD(startTask:)
RCT_EXTERN_METHOD(stopTask)
@end

@interface RCT_EXTERN_MODULE(RNAsyncViewEventEmitter, RCTEventEmitter)
RCT_EXTERN_METHOD(supportedEvents)
@end

@interface RCT_EXTERN_MODULE(RNNotificationHandler, RCTEventEmitter)
RCT_EXTERN_METHOD(supportedEvents)
RCT_EXTERN_METHOD(requestInitialUrl)
@end

@interface RCT_EXTERN_MODULE(RNAsyncDataViewManager, NSObject)
RCT_EXTERN_METHOD(dataViewInit:(NSString *)dataSourceKey config: (NSString *)config completed: (nonnull BOOL)completed completedForward: (nonnull BOOL)completedForward anchor: (NSString *)anchor)
RCT_EXTERN_METHOD(dataViewAddItem:(NSString *)dataSourceKey key: (NSString *)key config: (NSString *)config index: (nonnull NSNumber)key isAnchor: (nonnull BOOL)isAnchor)
RCT_EXTERN_METHOD(dataViewUpdateItem:(NSString *)dataSourceKey key: (NSString *)key config: (NSString *)config index: (nonnull NSNumber)key)
RCT_EXTERN_METHOD(dataViewRemoveItem:(NSString *)dataSourceKey key: (NSString *)key index: (nonnull NSNumber)key)
RCT_EXTERN_METHOD(dataViewMoveItem:(NSString *)dataSourceKey key: (NSString *)key fromIndex: (nonnull NSNumber)fromIndex toIndex: (nonnull NSNumber)toIndex)
RCT_EXTERN_METHOD(dataViewLoadedMore:(NSString *)dataSourceKey config: (NSString *)config completed: (nonnull BOOL) completed)
RCT_EXTERN_METHOD(dataViewLoadedMoreForward:(NSString *)dataSourceKey config: (NSString *)config completed: (nonnull BOOL)completed)
RCT_EXTERN_METHOD(dataViewScrollToKeyReqested:(NSString *)dataSourceKey scrollToKey: (NSString *)scrollToKey)
RCT_EXTERN_METHOD(dataViewCompleted:(NSString *)dataSourceKey)
RCT_EXTERN_METHOD(dataViewCompletedForward:(NSString *)dataSourceKey)
@end
