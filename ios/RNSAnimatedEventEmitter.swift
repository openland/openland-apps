//
//  RNSAnimatedEventEmitter.swift
//  openland
//
//  Created by Steve Kite on 9/14/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

@objc(RNSAnimatedEventEmitter)
class RNSAnimatedEventEmitter: RCTEventEmitter {
  
  public static var sharedInstance: RNSAnimatedEventEmitter!
  
  override init() {
    super.init()
  }
  
  override func startObserving() {
    RNSAnimatedEventEmitter.sharedInstance = self
  }
  
  override func stopObserving() {
    if RNSAnimatedEventEmitter.sharedInstance == self {
      RNSAnimatedEventEmitter.sharedInstance = nil
    }
  }
  
  func onAnimationCompleted(key: String) {
    var dict:[String:Any] = [:]
    dict["key"] = key
    if self.bridge != nil {
      self.sendEvent(withName: "onAnimationCompleted", body: dict)
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["onAnimationCompleted"]
  }
}
