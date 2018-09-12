//
//  RNSAnimated-Bridge.m
//  openland
//
//  Created by Steve Kite on 9/12/18.
//  Copyright © 2018 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNSAnimated-Bridge.h"

@interface RCT_EXTERN_MODULE(RNSAnimatedViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(animatedKey, NSString)
RCT_EXTERN_METHOD(animate: (NSString *)spec)
@end
