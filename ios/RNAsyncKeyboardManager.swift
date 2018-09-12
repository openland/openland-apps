//
//  RNAsyncKeyboardManager.swift
//  openland
//
//  Created by Steve Kite on 9/9/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

protocol RNAsyncKeyboardManagerDelegate {
  func keyboardWillChangeHeight(ctx: String, height: CGFloat)
  func keyboardWillShow(ctx: String, height: CGFloat, duration: Double, curve: Int)
  func keyboardWillHide(ctx: String, height: CGFloat, duration: Double, curve: Int)
}

@objc class RNAsyncKeyboardManager: NSObject {
  
  static var sharedInstance: RNAsyncKeyboardManager = RNAsyncKeyboardManager()
  
  var keyboardHeight: Float = 0.0
  var currentView: RNAsyncKeyboardView? = nil
  var lastCtx: String = "default"
  
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
  
  func reportRealHeight(ctx: String, height: Float) {
    print("Report Height \(height)")
    self.keyboardHeight = height
    for i in self.watchers {
      i.value.keyboardWillChangeHeight(ctx: ctx, height: CGFloat(height))
    }
  }
  
  func keyboardWillShow(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    let curve = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! Int
    let duration = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! Double
    let context = (UIResponder.current as? UIView)?.resolveKeyboardContextKey()
    self.lastCtx = context?.keyboardContextKey ?? "default"
    NSLog("[KEYBOARD] (\(context?.keyboardContextKey)) willShow: \(endRect)")
    if let tr = currentView  {
      NSLog("[KEYBOARD] (\(context?.keyboardContextKey)) height: \(tr.keyboardHeightWithAccessory)")
      let h = tr.keyboardHeightWithAccessory
      if let ctx = context?.keyboardContextKey {
        for i in self.watchers {
          i.value.keyboardWillShow(ctx: ctx, height: h, duration: duration, curve: curve)
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
    // let context = (UIResponder.current as? UIView)?.resolveKeyboardContextKey()
    // self.lastCtx = context?.keyboardContextKey ?? "default"
    NSLog("[KEYBOARD] (\(self.lastCtx)) willHide: \(endRect), \(duration)")
    if let tr = currentView  {
      NSLog("[KEYBOARD] (\(self.lastCtx)) height: \(tr.keyboardHeightWithAccessory)")
      let h = tr.keyboardHeightWithAccessory
      for i in self.watchers {
        i.value.keyboardWillHide(ctx: self.lastCtx, height: h, duration: duration, curve: curve)
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
    delegate.keyboardWillChangeHeight(ctx: self.lastCtx, height: CGFloat(keyboardHeight))
    return {
      self.watchers[key] = nil
    }
  }
}
