//
//  RNAsyncKeyboardViewManager.swift
//  openland
//
//  Created by Steve Kite on 9/9/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation


class TrackingView: UIView {
  
  private var token: NSKeyValueObservation!
  var keyboardHeight: CGFloat = 0.0
  weak var container: RNAsyncKeyboardView!
  
  init() {
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func willMove(toWindow newWindow: UIWindow?) {
    super.willMove(toWindow: newWindow)
    print("willMove")
  }
  
  override func didMoveToWindow() {
    super.didMoveToWindow()
    print("didMoveToWindow")
  }
  
  override func didMoveToSuperview() {
    super.didMoveToSuperview()
    print("didMoveToSuperView")
    RNAsyncKeyboardManager.sharedInstance.trackingView = self
    if self.token != nil {
      self.token!.invalidate()
      self.token = nil
    }
    if self.superview != nil {
      let sw = self.container!
      self.token = self.superview!.observe(\.center, options: NSKeyValueObservingOptions.new) { (view, val) in
        if let w = self.window {
          let h = max(w.bounds.size.height - (view.center.y - self.superview!.bounds.size.height/2) - self.bounds.size.height, 34) - 34
          print("[KEYBOARD] keyboard height \(h), \(sw.bounds.size.height)")
          if let c = self.container {
            self.keyboardHeight = h
            c.updateTranslate(value: h)
            RNAsyncKeyboardManager.sharedInstance.reportRealHeigh(height: Float(h) + Float(sw.bounds.size.height))
          }
        }
      }
    }
  }
  
  override func willMove(toSuperview newSuperview: UIView?) {
    if newSuperview == nil {
      RNAsyncKeyboardManager.sharedInstance.trackingView = nil
    }
  }
}

@objc(RNAsyncKeyboardView)
class RNAsyncKeyboardView: RCTView {
  private var token: NSKeyValueObservation!
  private var trackingView = TrackingView()
  
  init() {
    super.init(frame: CGRect.zero)
    
    self.trackingView.container = self
    
    self.transform = CGAffineTransform(translationX: 0, y: 0)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  fileprivate func updateTranslate(value: CGFloat) {
    self.transform = CGAffineTransform(translationX: 0, y: -value)
  }
  
  override func didMoveToWindow() {
    super.didMoveToWindow()
    
    if self.window == nil {
      return
    }
    
    // Need to do processing on next frame because there are no subviews yet
    DispatchQueue.main.async {
      var pending: [UIView] = []
      pending.append(contentsOf: self.subviews)
      while(pending.count > 0) {
        let l = pending.popLast()!
        pending.append(contentsOf: l.subviews)
        if l is UITextView {
          (l as! UITextView).inputAccessoryView = self.trackingView
          l.reloadInputViews()
        }
      }
    }
  }
}

@objc(RNAsyncKeyboardViewManager)
class RNAsyncKeyboardViewManager: RCTViewManager {
  override func view() -> UIView! {
    return RNAsyncKeyboardView()
  }
}
