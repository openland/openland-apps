//
//  RNAsyncView.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

@objc(RNAsyncViewManager)
class RNAsyncViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return RNAsyncView()
  }
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}

@objc(RNAsyncView)
class RNAsyncView: RCTView {
  
  private var node = RNAsyncViewNode()
  
  @objc override init(frame: CGRect) {
    super.init(frame: frame);
    self.addSubview(node.view);
  }
  
  @objc required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setConfig(config: AsyncViewSpec) {
    self.node.setConfig(spec: config)
  }
  
  @objc public func setConfigKey(_ configKey: String) {
    RNAsyncConfigManager.views.set(key: configKey, value: self)
    if let ex = RNAsyncConfigManager.configs[configKey] {
      self.setConfig(config: ex)
    }
  }
  
  @objc override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    node.setFrame(frame: frame)
  }
}
