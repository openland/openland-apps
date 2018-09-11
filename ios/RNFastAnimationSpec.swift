//
//  RNFastAnimationSpec.swift
//  openland
//
//  Created by Steve Kite on 9/10/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import SwiftyJSON

class RNFastAnimationTransactionSpec {
  var animations: [RNFastAnimationSpec] = []
  var duration: Double = 0.3
}

enum RNFastAnimationType: String {
  case spring = "spring"
  case timing = "timing"
}

class RNFastAnimationSpec {
  var type: RNFastAnimationType!
  var viewKey: String!
  var property: String!
  var to: CGFloat!
  var from: CGFloat!
  
  var duration: Double?
  var optional: Bool = false
}

func parseAnimationSpec(spec: String) -> RNFastAnimationTransactionSpec {
  let src = JSON(parseJSON: spec)
  var res = RNFastAnimationTransactionSpec()
  if let duration = src["duration"].double {
    res.duration = duration
  }
  if let animations = src["animations"].array {
    res.animations = animations.map { (anim) -> RNFastAnimationSpec in
      let aspec = RNFastAnimationSpec()
      
      // Type and View
      aspec.type = RNFastAnimationType(rawValue: anim["type"].stringValue)!
      aspec.viewKey = anim["view"].string!
      aspec.property = anim["prop"].string!
      aspec.to = CGFloat(anim["to"].double!)
      aspec.from = CGFloat(anim["from"].double!)
      
      // Duration
      if let duration = anim["duration"].double {
        aspec.duration = duration
      }
      
      if let optional = anim["optional"].bool {
        aspec.optional = optional
      }
      
      return aspec
    }
  }
  return res
}
