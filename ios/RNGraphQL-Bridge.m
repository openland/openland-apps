//
//  RNGraphQL-Bridge.m
//  openland
//
//  Created by Steve Kite on 3/24/19.
//  Copyright © 2019 Openland. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNSDevice-Bridge.h"

@interface RCT_EXTERN_MODULE(RNGraphQL, RCTEventEmitter)
RCT_EXTERN_METHOD(createClient: (NSString *)key endpoint: (NSString *)endpoint token: (NSString *)token)
RCT_EXTERN_METHOD(closeClient: (NSString *)key)

RCT_EXTERN_METHOD(query: (NSString *)key id: (NSString *)id query: (NSString *)query arguments: (NSDictionary *)arguments
                  parameters: (NSDictionary *)parameters)
RCT_EXTERN_METHOD(watch: (NSString *)key id: (NSString *)id query: (NSString *)query arguments: (NSDictionary *)arguments
                  parameters: (NSDictionary *)parameters)
RCT_EXTERN_METHOD(watchEnd: (NSString *)key id: (NSString *)id)

RCT_EXTERN_METHOD(mutate: (NSString *)key id: (NSString *)id mutation: (NSString *)mutation arguments: (NSDictionary *)arguments)

RCT_EXTERN_METHOD(subscribe: (NSString *)key id: (NSString *)id query: (NSString *)query arguments: (NSDictionary *)arguments)
RCT_EXTERN_METHOD(subscribeUpdate: (NSString *)key id: (NSString *)id arguments: (NSDictionary *)arguments)
RCT_EXTERN_METHOD(unsubscribe: (NSString *)key id: (NSString *)id)

RCT_EXTERN_METHOD(read: (NSString *)key id: (NSString *)id query: (NSString *)query arguments: (NSDictionary *)arguments)
RCT_EXTERN_METHOD(write: (NSString *)key id: (NSString *)id data: (NSDictionary *)data query: (NSString *)query arguments: (NSDictionary *)arguments)
@end
