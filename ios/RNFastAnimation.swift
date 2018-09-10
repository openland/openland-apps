//
//  RNFastAnimation.swift
//  openland
//
//  Created by Steve Kite on 9/10/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNFastAnimatedView: RCTView {
  let manager: RNFastAnimatedViewManager
  var animatedKeyValue: String!
  
  init(manager: RNFastAnimatedViewManager) {
    self.manager = manager
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setAnimatedKey(_ value: String) {
    self.animatedKeyValue = value
    lock(RNFastAnimatedViewManager.registeredViews) {
      RNFastAnimatedViewManager.registeredViews.set(key: value, value: self)
    }
  }
}

@objc(RNFastAnimatedViewManager)
class RNFastAnimatedViewManager: RCTViewManager {
  
  static var registeredViews = WeakMap<RNFastAnimatedView>()
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func view() -> UIView! {
    return RNFastAnimatedView(manager: self)
  }
  
  @objc(animate:)
  func animate(spec: String) {
    
    let spec = parseAnimationSpec(spec: spec)
    let viewKeys = Set(spec.animations.map( { (spec) -> String in spec.viewKey }))
    var views: [String: RNFastAnimatedView] = [:]
    for vk in viewKeys {
      lock(RNFastAnimatedViewManager.registeredViews) {
        views[vk] = RNFastAnimatedViewManager.registeredViews.get(key: vk)
      }
    }
    
    DispatchQueue.main.async {
      CATransaction.begin()
      CATransaction.setAnimationDuration(spec.duration)
      CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut))
      for s in spec.animations {
        if let view = views[s.viewKey] {
          let opacityAnimation = CABasicAnimation(keyPath: #keyPath(CALayer.opacity))
          opacityAnimation.fromValue = s.from
          opacityAnimation.toValue = s.to
          opacityAnimation.fillMode = kCAFillModeForwards
          opacityAnimation.isRemovedOnCompletion = false
          view.layer.add(opacityAnimation, forKey: #keyPath(CALayer.opacity))
        }
      }
      CATransaction.commit()
    }
  }
}
