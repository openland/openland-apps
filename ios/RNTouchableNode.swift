//
//  RNTouchableNode.swift
//  openland
//
//  Created by Steve Kite on 8/26/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNTouchableNode: ASControlNode {
  
  let key: String;
  let higlightColor: UIColor;
  
  init(key: String, higlightColor: UIColor) {
    self.key = key
    self.higlightColor = higlightColor;
    super.init()
    self.backgroundColor = UIColor.clear
    self.addTarget(self, action: #selector(self.handler), forControlEvents: ASControlNodeEvent.touchUpInside)
  }
  
  func handler() {
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: self.key)
  }
  
  override var isHighlighted: Bool {
    willSet {
      if newValue {
        self.backgroundColor = self.higlightColor
      } else {
        self.backgroundColor = UIColor.clear
      }
    }
  }
}
