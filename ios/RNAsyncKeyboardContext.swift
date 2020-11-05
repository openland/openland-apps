//
//  RNAsyncKeyboardContext.swift
//  openland
//
//  Created by Steve Kite on 9/9/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

@objc(RNAsyncKeyboardContextView)
class RNAsyncKeyboardContextView: RCTView, RNAsyncKeyboardManagerDelegate {

  var keyboardContextKey: String!
  var safeInset: CGFloat = 0.0
  
  private var onKeyboardCallback: RCTDirectEventBlock?
  private var subscription: (() -> Void)? = nil
  
  @objc public func setContextKey(_ contextKey: String) {
    self.keyboardContextKey = contextKey
    self.subscription = RNAsyncKeyboardManager.sharedInstance.watch(delegate: self, ctx: nil)
  }
  
  @objc public func setBottomSafeInset(_ inset: CGFloat) {
    self.safeInset = inset
  }
  
  @objc func keyboardWillChangeHeight(ctx: String, kbHeight: CGFloat, acHeight: CGFloat) {
    
  }
  
  @objc func stickersKeyboardWillShow() {
    
  }
  
  @objc func stickersKeyboardWillHide(noKeyboard: Bool) {
    
  }
  
  @objc func keyboardWillHide(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int) {
    if let clb = self.onKeyboardCallback {
      if ctx == self.keyboardContextKey {
        let contentOffset = NSMutableDictionary()
        contentOffset.setValue(kbHeight + acHeight, forKey: "height")
        contentOffset.setValue(acHeight, forKey: "acHeight")
        contentOffset.setValue(duration, forKey: "duration")
        contentOffset.setValue(curve, forKey: "curve")
        contentOffset.setValue("keyboardWillHide", forKey: "name")
        let body = NSMutableDictionary()
        body.setValue(contentOffset, forKey: "state")
        clb(body as! [AnyHashable : Any])
      } else {
        let contentOffset = NSMutableDictionary()
        contentOffset.setValue(0, forKey: "height")
        contentOffset.setValue(0, forKey: "acHeight")
        contentOffset.setValue("keyboardAborted", forKey: "name")
        let body = NSMutableDictionary()
        body.setValue(contentOffset, forKey: "state")
        clb(body as! [AnyHashable : Any])
      }
    }
  }
  
  @objc func keyboardWillShow(ctx: String, kbHeight: CGFloat, acHeight: CGFloat, duration: Double, curve: Int) {
    if let clb = self.onKeyboardCallback {
      if ctx == self.keyboardContextKey {
        let contentOffset = NSMutableDictionary()
        contentOffset.setValue(kbHeight + acHeight, forKey: "height")
        contentOffset.setValue(acHeight, forKey: "acHeight")
        contentOffset.setValue(duration, forKey: "duration")
        contentOffset.setValue(curve, forKey: "curve")
        contentOffset.setValue("keyboardWillShow", forKey: "name")
        let body = NSMutableDictionary()
        body.setValue(contentOffset, forKey: "state")
        clb(body as! [AnyHashable : Any])
      } else {
        let contentOffset = NSMutableDictionary()
        contentOffset.setValue(0, forKey: "height")
        contentOffset.setValue(0, forKey: "acHeight")
        contentOffset.setValue("keyboardAborted", forKey: "name")
        let body = NSMutableDictionary()
        body.setValue(contentOffset, forKey: "state")
        clb(body as! [AnyHashable : Any])
      }
    }
  }
  
  @objc public func setOnKeyboardChanged(_ callback: RCTDirectEventBlock?) {
    self.onKeyboardCallback = callback
  }
}

@objc(RNAsyncKeyboardContextViewManager)
class RNAsyncKeyboardContextViewManager: RCTViewManager {
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func view() -> UIView! {
    return RNAsyncKeyboardContextView()
  }
}


class RNKeyboardChangedEvent:NSObject, RCTEvent {
  var viewTag: NSNumber
  
  var height: CGFloat
  var curve: Int
  var duration: Double
  
  var eventName: String = "onKeyboardChanged"
  var coalescingKey: UInt16 = 0
  
  init(viewTag: NSNumber, height: CGFloat, curve: Int, duration: Double) {
    self.viewTag = viewTag
    self.height = height
    self.curve = curve
    self.duration = duration
    super.init()
  }
  
  func canCoalesce() -> Bool {
    return true
  }
  
  func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
    return newEvent
  }
  
  static func moduleDotMethod() -> String! {
    return "RCTEventEmitter.receiveEvent"
  }
  
  func arguments() -> [Any]! {
    let contentOffset = NSMutableDictionary()
    contentOffset.setValue(self.height, forKey: "height")
    contentOffset.setValue(self.curve, forKey: "curve")
    contentOffset.setValue(self.duration, forKey: "duration")
    let body = NSMutableDictionary()
    body.setValue(contentOffset, forKey: "state")
    return [self.viewTag, RCTNormalizeInputEventName(self.eventName), body]
  }
}
