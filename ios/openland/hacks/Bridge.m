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
RCT_EXPORT_VIEW_PROPERTY(config, NSString)
@end
