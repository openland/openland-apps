//
//  RNSWindowManager-Bridge.m
//  openland
//
//  Created by Steve Korshakov on 10/21/19.
//  Copyright © 2019 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "Stripe-Bridge.h"

@interface RCT_EXTERN_MODULE(RNStripe, RCTEventEmitter)
RCT_EXTERN_METHOD(confirmSetupIntent: (NSString *)callbackKey clientSecret: (NSString *)clientSecret)
RCT_EXTERN_METHOD(confirmPayment: (NSString *)paymentId clientSecret: (NSString *)clientSecret paymentMethod: (NSString *)paymentMethod)
@end

@interface RCT_EXTERN_MODULE(RNStripeCardViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(callbackKey, NSString)
@end
