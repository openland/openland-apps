//
//  RNAsyncViewEventEmitter.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class AsyncViewEventEmitter {
  public static var sharedInstance = AsyncViewEventEmitter()
  private var nativeInstance: RNAsyncViewEventEmitter!
  private init() { }
  
  // When React Native instantiates the emitter it is registered here.
  func registerEventEmitter(eventEmitter: RNAsyncViewEventEmitter) {
    self.nativeInstance = eventEmitter
  }
  
  func dispatchOnPress(key: String) {
    nativeInstance.sendEvent(withName: "onPress", body: key)
  }
  
  func dispatchOnLoadMore(key: String) {
    nativeInstance.sendEvent(withName: "onLoadMore", body: key)
  }
}

@objc(RNAsyncViewEventEmitter)
class RNAsyncViewEventEmitter: RCTEventEmitter {
  
  override init() {
    super.init()
    AsyncViewEventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
  }
  
  override func supportedEvents() -> [String]! {
    return ["onPress", "onLoadMore"]
  }
}
