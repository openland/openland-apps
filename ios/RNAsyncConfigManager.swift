//
//  RNAsyncConfigManager.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

var configsViews: [String: RNAsyncView] = [:]
var configs: [String: AsyncViewSpec] = [:]

@objc(RNAsyncConfigManager)
class RNAsyncConfigManager: NSObject {
  
  @objc(setConfig:config:)
  func setConfig(key: String, config: String) -> Void {
    let parsed = parseSpec(config)
    configs[key] = parsed
    if let v = configsViews[key] {
      v.setConfig(config: parsed)
    }
  }
}
