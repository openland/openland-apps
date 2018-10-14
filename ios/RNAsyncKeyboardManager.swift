//
//  RNAsyncKeyboardManager.swift
//  openland
//
//  Created by Steve Kite on 9/9/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

protocol RNAsyncKeyboardManagerDelegate {
  func keyboardWillChangeHeight(ctx: String, kbHeight: CGFloat, acHeight: CGFloat)
  func keyboardWillShow(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int)
  func keyboardWillHide(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int)
}



@objc class RNAsyncKeyboardManager: NSObject {
  
  static var sharedInstance: RNAsyncKeyboardManager = RNAsyncKeyboardManager()
  
  var keyboardHeight: Float = 0.0
  var keyboardAcHeight: Float = 0.0
  var currentView: RNAsyncKeyboardView? = nil
  var lastCtx: String = "default"
  private var lastWillHideRect: CGRect? = nil
  private var lastWillShowRect: CGRect? = nil
  
  private var watchers: [String : RNAsyncKeyboardManagerDelegate] = [:]
  
  private override init() {
    super.init()
  }
  
  @objc func start() {
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidShow), name: NSNotification.Name.UIKeyboardDidShow, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardDidHide), name: NSNotification.Name.UIKeyboardDidHide, object: nil)
  }
  
  @objc func stop() {
    NotificationCenter.default.removeObserver(self)
  }
  
  func reportRealHeight(ctx: String, kbHeight: Float, acHeight: Float) {
    print("Report Height \(kbHeight + acHeight)")
    self.keyboardHeight = kbHeight
    self.keyboardAcHeight = acHeight
    for i in self.watchers {
      i.value.keyboardWillChangeHeight(ctx: ctx, kbHeight: CGFloat(kbHeight), acHeight: CGFloat(acHeight))
    }
  }
  
  func keyboardWillShow(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    let curve = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! Int
    let duration = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! Double
    let context = (UIResponder.current as? UIView)?.resolveKeyboardContextKey()
    if self.lastWillShowRect != nil && endRect.equalTo(self.lastWillShowRect!) {
      return
    }
    self.lastWillShowRect = endRect
    
    print("[KEYBOARD] willShow \(endRect)")
    
    self.lastCtx = context?.keyboardContextKey ?? "default"
    if let tr = currentView  {
      let h = tr.keyboardHeightWithAccessory
      let kh = tr.keyboardHeight
      let ah = h - kh
      if let ctx = context?.keyboardContextKey {
        for i in self.watchers {
          i.value.keyboardWillShow(ctx: ctx, kbHeight: kh, acHeight: ah, duration: duration, curve: curve)
        }
      }
    }
  }
  
  func keyboardDidShow(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    print("[KEYBOARD] didShow: \(endRect)")
    
    self.lastWillShowRect = nil
  }
  
  func keyboardWillHide(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    let curve = aNotification.userInfo![UIKeyboardAnimationCurveUserInfoKey] as! Int
    let duration = aNotification.userInfo![UIKeyboardAnimationDurationUserInfoKey] as! Double
    if self.lastWillHideRect != nil && endRect.equalTo(self.lastWillHideRect!) {
      return
    }
    self.lastWillHideRect = endRect
    print("[KEYBOARD] willHide: \(endRect)")
    
    if let tr = currentView  {
      // print("[KEYBOARD] (\(self.lastCtx)) height: \(tr.keyboardHeightWithAccessory)")
      let h = tr.keyboardHeightWithAccessory
      let kh = tr.keyboardHeight
      let ah = h - kh
      for i in self.watchers {
        i.value.keyboardWillHide(ctx: self.lastCtx, kbHeight: kh, acHeight: ah, duration: duration, curve: curve)
      }
    }
  }
  
  func keyboardDidHide(aNotification: Notification) {
    let endRect = aNotification.userInfo![UIKeyboardFrameEndUserInfoKey] as! CGRect
    print("[KEYBOARD] didHide: \(endRect)")
    
    self.lastWillHideRect = nil
    self.lastCtx = "default"
  }
  
  func watch(delegate: RNAsyncKeyboardManagerDelegate) -> ()-> Void {
    let key = UUID().uuidString
    self.watchers[key] = delegate
    delegate.keyboardWillChangeHeight(ctx: self.lastCtx, kbHeight: CGFloat(keyboardHeight), acHeight: CGFloat(self.keyboardAcHeight))
    return {
      self.watchers[key] = nil
    }
  }
}
