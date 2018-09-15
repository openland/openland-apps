//
//  RNSAnimatedViewManager.swift
//  openland
//
//  Created by Steve Kite on 9/12/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

@objc(RNSAnimatedViewManager)
class RNSAnimatedViewManager: RCTViewManager, RCTUIManagerObserver {
  
  private var isRegistered = false // Is regisetered in UI Manager
  private var registeredViews = WeakMap<RNSAnimatedView>() // Known views
  private var pendingAnimationsLock = NSObject()
  private var pendingAnimations: [RNSAnimationTransactionSpec] = [] // Pending animations
  
  /*
   * Register views that are ready for animation
   * [UI THREAD]
   */
  func registerView(key: String, view: RNSAnimatedView) {
    self.registeredViews.set(key: key, value: view)
    self.resolvePendingAnimations()
  }
  
  /*
   * Method to start animations
   * [BACKGROUND THREAD]
   */
  @objc(animate:)
  func animate(spec: String) {
    let spec = RNSAnimationTransactionSpec.parse(spec: spec)
    
    lock(self.pendingAnimationsLock) {
      pendingAnimations.append(spec)
    }
    
    if !self.isRegistered {
      self.isRegistered = true
      bridge.uiManager.observerCoordinator.add(self)
      bridge.uiManager.addUIBlock { (m, u) in
        self.resolvePendingAnimations()
      }
    }
  }
  
  @objc(hasPending:)
  func hasPending(callback: RCTResponseSenderBlock) {
    let a = self.bridge.module(for: RCTEventDispatcher) as! RCTEventDispatcher
    let r = a.value(forKey: "_eventsDispatchScheduled") as! Bool
    callback([r])
  }
  
  /*
   * Handling event before mounting views to be able to apply animations right before initial render
   */
  func uiManagerWillPerformMounting(_ manager: RCTUIManager!) {
    bridge.uiManager.addUIBlock { (m, u) in
      self.resolvePendingAnimations()
    }
  }
  
  /*
   * Trying to start pending animations
   */
  private func resolvePendingAnimations() {
    lock(self.pendingAnimationsLock) {
      if self.pendingAnimations.count > 0 {
        var missing: [RNSAnimationTransactionSpec] = []
        for spec in self.pendingAnimations {
          var views: [String: RNSAnimatedView] = [:]
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
          for a in spec.valueSets {
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
  }
  
  /*
   * Performing actual animations
   */
  private func doAnimations(spec: RNSAnimationTransactionSpec, views: [String: RNSAnimatedView]) {
    
    // Reset Values
    for s in spec.animations {
      if let view = views[s.viewKey] {
        if s.property == "opacity" {
          if view.wasSetOpacity {
            view.wasSetOpacity = false
            view.layer.opacity = 0.0
          }
        } else if s.property == "translateX" {
          if view.wasSetTranslateX {
            view.wasSetTranslateX = false
            view.layer.position.x = view.bounds.width/2
          }
        } else if s.property == "translateY" {
          if view.wasSetTranslateY {
            view.wasSetTranslateY = false
            view.layer.position.y = view.bounds.height/2
          }
        }
      }
    }
    
    // Set Values
    for s in spec.valueSets {
      if let view = views[s.viewKey] {
        if s.property == "opacity" {
          view.layer.opacity = Float(s.value)
          view.wasSetOpacity = true
        } else if s.property == "translateX" {
          view.layer.position.x = view.bounds.width/2 + s.value
          view.wasSetTranslateX = true
        } else if s.property == "translateY" {
          view.layer.position.y = view.bounds.height/2 + s.value
          view.wasSetTranslateY = true
        } else {
          continue
        }
        view.layer.removeAnimation(forKey: "rn-native-" + s.property)
      }
    }
    
    if spec.animations.count > 0 {
      CATransaction.begin()
      if spec.transactionKey != nil {
        CATransaction.setCompletionBlock {
          RNSAnimatedEventEmitter.sharedInstance.onAnimationCompleted(key: spec.transactionKey!)
        }
      }
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
          if s.type == RNSAnimationType.timing {
            animation = CABasicAnimation(keyPath: keyPath)
          } else if s.type == RNSAnimationType.spring {
            let spring = CASpringAnimation(keyPath: keyPath)
            spring.mass = 3.0
            spring.stiffness = 1000.0
            spring.damping = 500.0
            spring.duration = resolveDuration(source: 0.5)
            spring.timingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionLinear)
            if let velocity = s.velocity {
              spring.initialVelocity = velocity
            }
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
        }
      }
      CATransaction.commit()
    } else {
      if spec.transactionKey != nil {
        RNSAnimatedEventEmitter.sharedInstance.onAnimationCompleted(key: spec.transactionKey!)
      }
    }
  }
  
  //
  // Wiring
  //
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func view() -> UIView! {
    return RNSAnimatedView(manager: self)
  }
  
  override var methodQueue: DispatchQueue! {
    // UI Manager listener requires to watch for changes in it's queue
    get { return RCTGetUIManagerQueue() }
  }
}
