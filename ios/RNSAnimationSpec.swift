//
//  RNFastAnimationSpec.swift
//  openland
//
//  Created by Steve Kite on 9/10/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

class RNSAnimationTransactionSpec {
  
  static func parse(spec: String) -> RNSAnimationTransactionSpec {
    let src = JSON(parseJSON: spec)
    let res = RNSAnimationTransactionSpec()
    if let transactionKey = src["transactionKey"].string {
      res.transactionKey = transactionKey
    }
    if let duration = src["duration"].double {
      res.duration = duration
    }
    if let animations = src["animations"].array {
      res.animations = animations.map { (anim) -> RNSAnimationSpec in
        let aspec = RNSAnimationSpec()
      
        // Type and View
        aspec.type = RNSAnimationType(rawValue: anim["type"].stringValue)!
        aspec.viewKey = anim["view"].string!
        aspec.property = anim["prop"].string!
        aspec.to = CGFloat(anim["to"].double!)
        aspec.from = CGFloat(anim["from"].double!)
        
        // Duration
        if let duration = anim["duration"].double {
          aspec.duration = duration
        }
        
        if let velocity = anim["velocity"].double {
          aspec.velocity = CGFloat(velocity)
        }
        
        // Can we ignore this animation if view is missing?
        if let optional = anim["optional"].bool {
          aspec.optional = optional
        }
        
        return aspec
      }
    }
    if let valueSets = src["valueSetters"].array {
      res.valueSets = valueSets.map({ (s) -> RNSValueSetSpec in
        let aspec = RNSValueSetSpec()
        aspec.viewKey = s["view"].string!
        aspec.property = s["prop"].string!
        aspec.value = CGFloat(s["to"].double!)
        
        // Can we ignore this animation if view is missing?
        if let optional = s["optional"].bool {
          aspec.optional = optional
        }
        
        return aspec
      })
    }
    return res
  }
  
  var transactionKey: String?
  var animations: [RNSAnimationSpec] = []
  var valueSets: [RNSValueSetSpec] = []
  var duration: Double = 0.3
}

enum RNSAnimationType: String {
  case spring = "spring"
  case timing = "timing"
}

class RNSValueSetSpec {
  var viewKey: String!
  var property: String!
  var value: CGFloat!
  var optional: Bool = false
}

class RNSAnimationSpec {
  var type: RNSAnimationType!
  var viewKey: String!
  var property: String!
  var to: CGFloat!
  var from: CGFloat!
  var velocity: CGFloat?
  
  var duration: Double?
  var optional: Bool = false
}
