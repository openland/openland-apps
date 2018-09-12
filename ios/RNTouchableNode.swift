//
//  RNTouchableNode.swift
//  openland
//
//  Created by Steve Kite on 8/26/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNTouchableNode: ASControlNode, UIGestureRecognizerDelegate {
  
  let key: String;
  let higlightColor: UIColor;
  
  init(key: String, higlightColor: UIColor) {
    self.key = key
    self.higlightColor = higlightColor;
    super.init()
    self.backgroundColor = UIColor.clear
    self.isLayerBacked = false
    self.isUserInteractionEnabled = true
  }
  
  override func didLoad() {
    super.didLoad()
    
    let longTap = UILongPressGestureRecognizer(target: self, action: #selector(self.longPressHandler))
    longTap.delegate = self
    longTap.minimumPressDuration = 1.0
    view.addGestureRecognizer(longTap)
    let singleTap = UITapGestureRecognizer(target: self, action: #selector(self.handler))
    singleTap.require(toFail: longTap)
    singleTap.delegate = self
    view.addGestureRecognizer(singleTap)
  }
  
  func longPressHandler(sender: UILongPressGestureRecognizer) {
    if sender.state == .began {
      let res = self.layer.superlayer!.convert(self.layer.frame, to: nil)
      AsyncViewEventEmitter.sharedInstance.dispatchOnLongPress(key: self.key, frame: res, instanceKey: nil)
    }
  }
  
  func handler() {
    let res = self.layer.superlayer!.convert(self.layer.frame, to: nil)
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: self.key, frame: res, instanceKey: nil)
    self.backgroundColor = self.higlightColor
    UIView.animate(withDuration: 0.5) {
      self.backgroundColor = UIColor.clear
    }
  }
  
  func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    return true
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
