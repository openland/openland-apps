//
//  RNAsyncConfigManager.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(RNAsyncConfigManager)
class RNAsyncConfigManager: NSObject {
  
  static let views = WeakMap<RNAsyncView>()
  static let instances = WeakMap<ASDisplayNode>()
  static var configs:[String: AsyncViewSpec] = [:]
  
  @objc(setConfig:config:)
  func setConfig(key: String, config: String) -> Void {
    let parsed = parseSpec(config)
    RNAsyncConfigManager.configs[key] = parsed
    if let v = RNAsyncConfigManager.views.get(key: key) {
      v.setConfig(config: parsed)
    }
  }
  
  @objc(setSuspended:suspended:)
  func setSuspended(key: String, suspended: Bool) -> Void {
    if let i = RNAsyncConfigManager.instances.get(key: key) {
      if Thread.isMainThread {
        if suspended {
          i.alpha = 0.0
        } else {
          i.alpha = 1.0
        }
      } else {
        DispatchQueue.main.sync {
          if suspended {
            i.alpha = 0.0
          } else {
            i.alpha = 1.0
          }
        }
      }
    }
  }
}
