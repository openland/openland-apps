//
//  RNFastAnimation.swift
//  openland
//
//  Created by Steve Kite on 9/10/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNSAnimatedView: RCTView {
  
  private weak var manager: RNSAnimatedViewManager!
  private var animatedKeyValue: String!
  private var isRegistered = false
  
  init(manager: RNSAnimatedViewManager) {
    self.manager = manager
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setAnimatedKey(_ value: String) {
    self.animatedKeyValue = value
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame)
    
    /*
      We are registering view here because after set frame react is not going to change
      properties that we are going to animate.
      TODO: Find a better way to avoid collisions with react properties
     */
    
    if !self.isRegistered {
      self.isRegistered = true
      self.manager?.registerView(key: self.animatedKeyValue, view: self)
    }
  }
}
