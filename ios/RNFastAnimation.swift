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
  
  private weak var manager: RNFastAnimatedViewManager!
  private var animatedKeyValue: String!
  private var isRegistered = false
  
  init(manager: RNFastAnimatedViewManager) {
    self.manager = manager
    super.init(frame: CGRect.zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setAnimatedKey(_ value: String) {
    self.animatedKeyValue = value
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame)
    if !self.isRegistered {
      self.isRegistered = true
      self.manager?.registerView(key: self.animatedKeyValue, view: self)
    }
  }
}

@objc(RNFastAnimatedViewManager)
class RNFastAnimatedViewManager: RCTViewManager, RCTUIManagerObserver {
  
  //
  // Registration of views
  //
  
  private var registeredViews = WeakMap<RNFastAnimatedView>()
  private var pendingAnimations: [RNFastAnimationTransactionSpec] = []
  private var isRegistered = false
  
  func registerView(key: String, view: RNFastAnimatedView) {
    self.registeredViews.set(key: key, value: view)
    self.resolvePendingAnimations()
  }
  
  //
  // Exported methods
  //
  
  @objc(animate:)
  func animate(spec: String) {
    let spec = parseAnimationSpec(spec: spec)
    pendingAnimations.append(spec)
    
    if !self.isRegistered {
      self.isRegistered = true
      bridge.uiManager.observerCoordinator.add(self)
      bridge.uiManager.addUIBlock { (m, u) in
        self.resolvePendingAnimations()
      }
    }
  }
  
  func uiManagerWillPerformMounting(_ manager: RCTUIManager!) {
    bridge.uiManager.addUIBlock { (m, u) in
      self.resolvePendingAnimations()
    }
  }
  
  private func resolvePendingAnimations() {
    if self.pendingAnimations.count > 0 {
      var missing: [RNFastAnimationTransactionSpec] = []
      for spec in self.pendingAnimations {
        var views: [String: RNFastAnimatedView] = [:]
        var allViews = true
        for a in spec.animations {
          let registered = self.registeredViews.get(key: a.viewKey)
          views[a.viewKey] = registered
          if registered == nil {
            if !a.optional {
              allViews = false
              print("unable to find view: " + a.viewKey)
            }
          }
        }
        
        if allViews {
          self.doAnimations(spec: spec, views: views)
        } else {
          missing.append(spec)
        }
      }
      self.pendingAnimations = missing
    }
  }
  
  private func resolveDuration(source: Double) -> Double {
    #if (arch(i386) || arch(x86_64)) && os(iOS)
    return source * Double(UIAnimationDragCoefficient())
    #else
    return source
    #endif
  }
  
  private func doAnimations(spec: RNFastAnimationTransactionSpec, views: [String: RNFastAnimatedView]) {
    CATransaction.begin()
    
    CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut))
    CATransaction.setAnimationDuration(resolveDuration(source: spec.duration))
    for s in spec.animations {
      if let view = views[s.viewKey] {
        
        // Resolving Key Path
        let keyPath: String
        if s.property == "opacity" {
          keyPath = "opacity"
        } else if s.property == "translateX" {
          keyPath = "position.x"
        } else if s.property == "translateY" {
          keyPath = "position.y"
        } else {
          continue
        }
        
        // Resolving Animation Type
        let animation: CABasicAnimation
        if s.type == RNFastAnimationType.timing {
          animation = CABasicAnimation(keyPath: keyPath)
        } else if s.type == RNFastAnimationType.spring {
          let spring = CASpringAnimation(keyPath: keyPath)
          spring.mass = 3.0
          spring.stiffness = 1000.0
          spring.damping = 500.0
          spring.duration = resolveDuration(source: 0.5)
          spring.timingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionLinear)
          animation = spring
        } else {
          continue
        }
        
        // Resolving values
        animation.fromValue = s.from
        animation.toValue = s.to
        animation.isAdditive = true
        animation.fillMode = kCAFillModeForwards
        animation.isRemovedOnCompletion = false
        
        // Resolving parameters
        if let duration = s.duration {
          animation.duration = resolveDuration(source: duration)
        }
        
        // Add animation to layer
        view.layer.add(animation, forKey: "rn-native-" + s.property)
        
        print("animate " + s.viewKey + " - " + s.property)
      } else {
        print("animate " + s.viewKey + " FAILED")
      }
    }
    CATransaction.commit()
  }
  
  //
  // Wiring
  //
  
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
}

