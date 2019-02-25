//
//  RNSDevice-Bridge.m
//  openland
//
//  Created by Steve Kite on 2/25/19.
//  Copyright © 2019 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNSDevice-Bridge.h"

@interface RCT_EXTERN_MODULE(RNSDevice, NSObject)
RCT_EXTERN_METHOD(proximityEnable)
RCT_EXTERN_METHOD(proximityDisable)
@end
