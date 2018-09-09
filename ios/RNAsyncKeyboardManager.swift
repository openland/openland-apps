//
//  RNAsyncKeyboardManager.swift
//  openland
//
//  Created by Steve Kite on 9/9/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

protocol RNAsyncKeyboardManagerDelegate {
  func keyboardWillChangeHeight(height: CGFloat)
  func keyboardWillShow(height: CGFloat, duration: Double, curve: Int)
  func keyboardWillHide(height: CGFloat, duration: Double, curve: Int)
}

@objc class RNAsyncKeyboardManager: NSObject {
  
  static var sharedInstance: RNAsyncKeyboardManager = RNAsyncKeyboardManager()
  
  var keyboardHeight: Float = 0.0
  var trackingView: TrackingView? = nil
  
  private var watchers: [String : RNAsyncKeyboardManagerDelegate] = [:]
  
  private override init() {
    super.init()
  }
  
  @objc func start() {
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidShow), name: NSNotification.Name.UIKeyboardDidShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillChangeFrame), name: NSNotification.Name.UIKeyboardWillChangeFrame, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidHide), name: NSNotification.Name.UIKeyboardDidHide, object: nil)
  }
  
  @objc func stop() {
    NotificationCenter.default.removeObserver(self)
  }
  
  func reportRealHeigh(height: Float) {
    self.keyboardHeight = height
    for i in self.watchers {
      i.value.keyboardWillChangeHeight(height: CGFloat(height))
    }
  }
  
  func keyboardWillShow(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    let curve = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! Int
    let duration = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! Double
    NSLog("[KEYBOARD] willShow: \(endRect)")
    if let tr = trackingView  {
      NSLog("[KEYBOARD] height: \(tr.keyboardHeight)")
      if let ct = tr.container {
        let h = tr.keyboardHeight + ct.bounds.size.height
        for i in self.watchers {
          i.value.keyboardWillShow(height: h, duration: duration, curve: curve)
        }
      }
    }
  }
  
  func keyboardDidShow(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    NSLog("[KEYBOARD] didShow: \(endRect)")
  }
  
  func keyboardWillChangeFrame(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    NSLog("[KEYBOARD] willChange: \(endRect)")
  }
  
  func keyboardWillHide(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    let curve = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! Int
    let duration = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! Double
    NSLog("[KEYBOARD] willHide: \(endRect)")
    if let tr = trackingView  {
      if let ct = tr.container {
        NSLog("[KEYBOARD] height: \(tr.keyboardHeight)")
        let h = tr.keyboardHeight + ct.bounds.size.height
        for i in self.watchers {
          i.value.keyboardWillHide(height: h, duration: duration, curve: curve)
        }
      }
    }
  }
  
  func keyboardDidHide(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    NSLog("[KEYBOARD] didHide: \(endRect)")
  }
  
  func watch(delegate: RNAsyncKeyboardManagerDelegate) -> ()-> Void {
    let key = UUID().uuidString
    self.watchers[key] = delegate
    delegate.keyboardWillChangeHeight(height: CGFloat(keyboardHeight))
    return {
      self.watchers[key] = nil
    }
  }
}
