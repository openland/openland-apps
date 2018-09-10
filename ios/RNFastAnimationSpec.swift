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
  case linear = "linear"
}

class RNFastAnimationSpec {
  var type: RNFastAnimationType!
  var viewKey: String!
  var property: String!
  var from: CGFloat!
  var to: CGFloat!
  
  var duration: Double?
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
      aspec.from = CGFloat(anim["from"].double!)
      aspec.to = CGFloat(anim["to"].double!)
      
      // Duration
      if let duration = anim["duration"].double {
        aspec.duration = duration
      }
      
      return aspec
    }
  }
  return res
}
