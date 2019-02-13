#import <Foundation/Foundation.h>

// Support React Native headers both in the React namespace, where they are in RN version 0.40+,
// and no namespace, for older versions of React Native
#if __has_include(<React/RCTEventEmitter.h>)
#import <React/RCTEventEmitter.h>
#else
#import "RCTEventEmitter.h"
#endif

@protocol MSCrashesDelegate;

@interface AppCenterReactNativeCrashesDelegate : NSObject<MSCrashesDelegate>

@property RCTEventEmitter* eventEmitter;

- (NSArray<NSString *> *)supportedEvents;
- (void)startObserving;
- (void)stopObserving;

@end
