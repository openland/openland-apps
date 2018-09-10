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
  fileprivate weak var container: RNAsyncKeyboardView!
  
  init() {
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func didMoveToSuperview() {
    super.didMoveToSuperview()
    
    //Register current accessory view
    RNAsyncKeyboardManager.sharedInstance.currentView = self.container
    
    // Start watching
    if self.token != nil {
      self.token!.invalidate()
      self.token = nil
    }
    
    // Subscribe for changes
    self.token = self.superview?.observe(\.center, options: NSKeyValueObservingOptions.new) { [weak self] (view, val) in
      self?.container.recalculateSize()
    }
  }
  
  override func willMove(toSuperview newSuperview: UIView?) {
    if newSuperview == nil {
      
      // Unregister current accessory view
      RNAsyncKeyboardManager.sharedInstance.currentView = nil
      
      // Stop watching
      if self.token != nil {
        self.token!.invalidate()
        self.token = nil
      }
    }
  }
}

@objc(RNAsyncKeyboardView)
class RNAsyncKeyboardView: RCTView {
  private var token: NSKeyValueObservation!
  private var trackingView = TrackingView()
  var keyboardHeight: CGFloat = 0.0
  var keyboardHeightWithAccessory: CGFloat = 0.0
  var keyboardContext: RNAsyncKeyboardContextView?
  
  init() {
    super.init(frame: CGRect.zero)
    self.trackingView.container = self
    self.transform = CGAffineTransform(translationX: 0, y: 0)
    
    // Start traching own size
    self.token = self.observe(\.bounds, options: NSKeyValueObservingOptions.new) { [weak self] (v, val) in
      self?.recalculateSize()
    }
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  //
  // Layouting
  //
  
  fileprivate func recalculateSize() {
    let w = self.trackingView.window
    let kbview = self.trackingView.superview
    guard let ctx = self.keyboardContext else { return }
    
    if w == nil || kbview == nil {
      if self.keyboardHeight != 0 {
        self.keyboardHeight = 0
        self.transform = CGAffineTransform(translationX: 0, y: 0)
      }
      if self.keyboardHeightWithAccessory != self.bounds.size.height {
        self.keyboardHeightWithAccessory = self.bounds.size.height
        RNAsyncKeyboardManager.sharedInstance.reportRealHeight(ctx: ctx.keyboardContextKey, height: Float(self.bounds.size.height))
      }
    } else {
      let kbtop = kbview!.center.y - kbview!.bounds.size.height / 2
      let kbheight = w!.bounds.size.height - kbtop
      let height = max(kbheight - self.trackingView.bounds.height, ctx.safeInset) - ctx.safeInset // Skip first safeInset bytes before starting moving input bar
      
      let accessoryHeight = self.bounds.size.height
      let fullHeight = height + accessoryHeight
      
      print("kbheight: \(kbheight)")
      print("height: \(height)")
      print("accessory: \(self.bounds.size.height)")
      print("fullHeight: \(fullHeight)")
    
      if self.keyboardHeight != height {
        self.keyboardHeight = height
        self.transform = CGAffineTransform(translationX: 0, y: -height)
      }
    
      if self.keyboardHeightWithAccessory != fullHeight {
        self.keyboardHeightWithAccessory = fullHeight
        RNAsyncKeyboardManager.sharedInstance.reportRealHeight(ctx: ctx.keyboardContextKey, height: Float(fullHeight))
      }
    }
  }
  
  //
  // Wiring
  //
  
  override func didMoveToWindow() {
    super.didMoveToWindow()
    
    if self.window == nil {
      self.keyboardContext = nil
      return
    }
    
    // Need to do processing on next frame because there are no subviews yet
    DispatchQueue.main.async {
      
      // Resolve context key
      self.keyboardContext = self.resolveKeyboardContextKey()
      
      // Set accessory views in child nodes
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
      
      // Recalculate layout
      self.recalculateSize()
    }
  }
  
  override func willMove(toWindow newWindow: UIWindow?) {
    if newWindow == nil {
      self.keyboardContext = nil
    }
  }
}

@objc(RNAsyncKeyboardViewManager)
class RNAsyncKeyboardViewManager: RCTViewManager {
  override func view() -> UIView! {
    return RNAsyncKeyboardView()
  }
}

extension UIView {
  func resolveKeyboardContextKey() -> RNAsyncKeyboardContextView? {
    var pendingView = self.superview
    while pendingView != nil {
      if let ctx = pendingView as? RNAsyncKeyboardContextView {
        return ctx
      }
      pendingView = pendingView?.superview
    }
    return nil
  }
}
