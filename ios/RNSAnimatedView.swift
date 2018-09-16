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
  var sourceSize = CGSize.zero
  var sourceCenter = CGPoint.zero
  
  init(manager: RNSAnimatedViewManager) {
    self.manager = manager
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  // Initizliaze animated view
  func setAnimatedKey(_ value: String) {
    self.animatedKeyValue = value
  }
  
  // Hack to avoid animation overwrite for opacity
  override var alpha: CGFloat {
    get {
      return super.alpha
    }
    set {
      if !isRegistered {
        super.alpha = newValue
      }
    }
  }
  
  private func viewDidLoad() {
    // Set initial state
    self.center = sourceCenter
    self.bounds = CGRect(origin: CGPoint.zero, size: sourceSize)
    
    // Register View
    self.manager?.registerView(key: self.animatedKeyValue, view: self)
  }
  
  private func viewDidUpdated() {
//    let dy = self.sourceCenter.y - self.center.y
//    let dx = self.sourceCenter.x - self.center.x
//    self.layer.position.x += dx
//    self.layer.position.y += dy
    self.center = sourceCenter
    self.bounds = CGRect(origin: CGPoint.zero, size: sourceSize)
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    sourceCenter = CGPoint(x: frame.midX, y: frame.midY)
    sourceSize = frame.size
    
    /*
      We are registering view here because we now have size of the view to start animations
     */
    if !self.isRegistered {
      self.isRegistered = true
      self.viewDidLoad()
    } else {
      self.viewDidUpdated()
    }
  }
}
