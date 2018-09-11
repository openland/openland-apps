//
//  RNFastAnimation.swift
//  openland
//
//  Created by Steve Kite on 9/10/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

#if (arch(i386) || arch(x86_64)) && os(iOS)
@_silgen_name("UIAnimationDragCoefficient") func UIAnimationDragCoefficient() -> Float
#endif

class RNFastAnimatedView: RCTView {
  
  weak var manager: RNFastAnimatedViewManager!
  var animatedKeyValue: String!
  var lastTranslateX: CGFloat = 0.0
  
  init(manager: RNFastAnimatedViewManager) {
    self.manager = manager
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setAnimatedKey(_ value: String) {
    self.animatedKeyValue = value
    self.manager?.registeredViews.set(key: value, value: self)
  }
}

@objc(RNFastAnimatedViewManager)
class RNFastAnimatedViewManager: RCTViewManager {
  
  var registeredViews = WeakMap<RNFastAnimatedView>()
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func view() -> UIView! {
    return RNFastAnimatedView(manager: self)
  }
  
  // Use UI Manager queue to sync changes to UI
  override var methodQueue: DispatchQueue! {
    get { return RCTGetUIManagerQueue() }
  }
  
  //
  // Exported methods
  //
  
  @objc(animate:)
  func animate(spec: String) {
    bridge.uiManager.addUIBlock { (m, u) in
      let spec = parseAnimationSpec(spec: spec)
      let viewKeys = Set(spec.animations.map( { (spec) -> String in spec.viewKey }))
      var views: [String: RNFastAnimatedView] = [:]
      for vk in viewKeys {
        views[vk] = self.registeredViews.get(key: vk)
      }
      
      CATransaction.begin()

      #if (arch(i386) || arch(x86_64)) && os(iOS)
      CATransaction.setAnimationDuration(spec.duration * Double(UIAnimationDragCoefficient()))
      #else
      CATransaction.setAnimationDuration(spec.duration)
      #endif
      
      CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut))
      for s in spec.animations {
        if let view = views[s.viewKey] {
          if s.property == "opacity" {
            let opacityAnimation = CABasicAnimation(keyPath: #keyPath(CALayer.opacity))
            view.layer.opacity = Float(s.to)
            opacityAnimation.fromValue = s.from - s.to
            opacityAnimation.toValue = 0
            opacityAnimation.isAdditive = true
            view.layer.add(opacityAnimation, forKey: nil)
          } else if s.property == "translateX" {
            let opacityAnimation = CASpringAnimation(keyPath: "position.x")
            opacityAnimation.fromValue = s.from
            opacityAnimation.toValue = s.to
            opacityAnimation.isAdditive = true
            opacityAnimation.mass = 3.0
            opacityAnimation.stiffness = 1000.0
            opacityAnimation.damping = 500.0
            opacityAnimation.duration = 0.5
            opacityAnimation.timingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionLinear)
            opacityAnimation.fillMode = kCAFillModeForwards
            opacityAnimation.isRemovedOnCompletion = false
            view.layer.add(opacityAnimation, forKey: "-x-translate")
          }
        }
      }
      CATransaction.commit()
    }
  }
}
