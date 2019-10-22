//
//  RNSWindowManager-Bridge.m
//  openland
//
//  Created by Steve Korshakov on 10/21/19.
//  Copyright © 2019 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNSWindowManager-Bridge.h"

@interface RCT_EXTERN_MODULE(RNSWindowManager, NSObject)
RCT_EXTERN_METHOD(setStatusBarDarkContent)
RCT_EXTERN_METHOD(setStatusBarLightContent)
@end

