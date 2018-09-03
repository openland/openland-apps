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
    let res = self.layer.superlayer!.convert(self.layer.frame, to: nil)
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: self.key, frame: res, instanceKey: nil)
  }
  
  override var isHighlighted: Bool {
    willSet {
      if newValue {
          self.backgroundColor = self.higlightColor
      } else {
        UIView.animate(withDuration: 0.5) {
          self.backgroundColor = UIColor.clear
        }
      }
    }
  }
}
