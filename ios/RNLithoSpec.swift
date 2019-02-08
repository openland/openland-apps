//
//  RNLithoSpec.swift
//  openland
//
//  Created by Steve Kite on 2/6/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum RNLithoFlexDirection {
  case row
  case column
  case bind(String)
}

enum RNLithoFlexAlignItems {
  case start
  case end
  case center
  case stretch
  case bind(String)
}

enum RNLithoFlexAlignSelf {
  case start
  case end
  case center
  case stretch
  case bind(String)
}

enum RNLithoFlexJustifyContent {
  case start
  case end
  case center
  case bind(String)
}

enum RNLithoDoubleValue {
  case value(Double)
  case bind(String)
  case empty
}

class RNLithoIf {
}

class RNLithoText {
}

class RNLithoView {
  
}

private func resolveViewSpec(_ spec: JSON) {
  
}

private func resolveLithoSpec(_ spec: JSON) {
  if (spec.array != nil) {
    fatalError("Spec can't be an array")
  }
  if (spec["type"].string == nil) {
    fatalError("Type can't be empty")
  }
  
  let type = spec["type"].stringValue
  if type == "tview" {
    resolveViewSpec(spec)
  } else if type == "ttext" {
    
  } else if type == "tif" {
    
  } else if type == "ttextbind" {
    
  }
  
  fatalError("Unknown view type:" + type)
}

func parseLithoSpec(spec: String) {
  let src = JSON(parseJSON: spec)
  resolveLithoSpec(src)
}
