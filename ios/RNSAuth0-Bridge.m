//
//  RNSAuth0-Bridge.m
//  openland
//
//  Created by Steve Kite on 9/25/18.
//  Copyright © 2018 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNSAuth0-Bridge.h"

@interface RCT_EXTERN_MODULE(RNSAuth0, NSObject)
RCT_EXTERN_METHOD(requestEmailAuth:(NSString *)email callback:(RCTResponseSenderBlock*)callback)
RCT_EXTERN_METHOD(completeEmailAuth:(NSString *)email code: (NSString *)code callback:(RCTResponseSenderBlock*)callback)
@end
