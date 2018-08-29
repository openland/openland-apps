//
//  RNAsyncViewModel.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import SwiftyJSON

enum AsyncFlexDirection: String {
  case row     = "row"
  case column  = "column"
}

enum AsyncFlexAlignItems: String {
  case start   = "flex-start"
  case end     = "flex-end"
  case center  = "center"
  case stretch = "stretch"
}

enum AsyncFlexAlignSelf: String {
  case start   = "flex-start"
  case end     = "flex-end"
  case center  = "center"
  case stretch = "stretch"
}

enum AsyncFlexJustifyContent: String {
  case start   = "flex-start"
  case end     = "flex-end"
  case center  = "center"
}

protocol AsyncViewSpec {
  var style: AsyncStyleSpec {get}
  var key: String {get}
}

class AsyncFlexSpec: AsyncViewSpec {
  var overlay: Bool = false
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var children: [AsyncViewSpec] = []
  var direction: AsyncFlexDirection = AsyncFlexDirection.row
  var spacing: Float = 0.0
  var alignItems: AsyncFlexAlignItems = AsyncFlexAlignItems.start
  var justifyContent: AsyncFlexJustifyContent = AsyncFlexJustifyContent.start
  var touchableKey: String?
  var highlightColor: UIColor = UIColor.clear
}

class AsyncTextSpec: AsyncViewSpec {
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var text: String = ""
  var fontSize: Float = 12
  var lineHeight: Float?
  var letterSpacing: Float?
  var fontWeight: UIFontWeight = UIFontWeightRegular
  var color: UIColor = UIColor.black
  var numberOfLines: Int?
}

class AsyncScrollViewSpec: AsyncViewSpec {
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var children: AsyncViewSpec!
}

class AsyncListViewSpec: AsyncViewSpec {
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var contentPaddingTop: Float = 0.0
  var contentPaddingBottom: Float = 0.0
  var inverted: Bool = false
  var dataViewKey: String = ""
  var loading: Bool? = nil
  var fluid: Bool = false
}

class AsyncImageSpec: AsyncViewSpec {
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var url: String = ""
}

class AsyncStyleSpec {
  var height: Float?
  var width: Float?
  var flexGrow: Float?
  var flexShrink: Float?
  var flexBasis: Float?
  var alignSelf: AsyncFlexAlignSelf?
  
  var backgroundGradient: [UIColor]?
  var backgroundColor: UIColor?
  var backgroundPatch: AsyncPatch?
  var borderRadius: Float?
  
  var marginTop: Float?
  var marginBottom: Float?
  var marginRight: Float?
  var marginLeft: Float?
  
  var opacity: Float?
}

class AsyncPatch {
  let source: String;
  let top: Float;
  let right: Float;
  let bottom: Float;
  let left: Float
  init(source: String, top: Float, right: Float, bottom: Float, left: Float) {
    self.source = source
    self.top = top
    self.right = right
    self.bottom = bottom
    self.left = left
  }
}

private func resolveStyle(_ src: JSON) -> AsyncStyleSpec {
  let res = AsyncStyleSpec()
  if let v = src["props"]["width"].float {
    res.width = v
  }
  if let v = src["props"]["height"].float {
    res.height = v
  }
  if let v = src["props"]["flexGrow"].float {
    res.flexGrow = v
  }
  if let v = src["props"]["flexShrink"].float {
    res.flexShrink = v
  }
  if let v = src["props"]["flexBasis"].float {
    res.flexBasis = v
  }
  if let v = src["props"]["alignSelf"].string {
    res.alignSelf = AsyncFlexAlignSelf(rawValue: v)
  }
  if let v = src["props"]["marginTop"].float {
    res.marginTop = v
  }
  if let v = src["props"]["marginBottom"].float {
    res.marginBottom = v
  }
  if let v = src["props"]["marginRight"].float {
    res.marginRight = v
  }
  if let v = src["props"]["marginLeft"].float {
    res.marginLeft = v
  }
  if let v = src["props"]["borderRadius"].float {
    res.borderRadius = v
  }
  if let v = src["props"]["backgroundColor"].uInt64 {
    res.backgroundColor = resolveColorR(v)
  }
  if let v = src["props"]["backgroundGradient"].dictionary {
    res.backgroundGradient = [resolveColorR(v["start"]!.uInt64Value), resolveColorR(v["end"]!.uInt64Value)]
  }
  if let v = src["props"]["backgroundPatch"].dictionary {
    let top = v["top"]!.floatValue
    let bottom = v["bottom"]!.floatValue
    let left = v["left"]!.floatValue
    let right = v["right"]!.floatValue
    let source = v["source"]!.stringValue
    res.backgroundPatch = AsyncPatch(source: source, top: top, right: right, bottom: bottom, left: left)
  }
  if let v = src["props"]["opacity"].float {
    res.opacity = v
  }
  return res
}

private func resolveSingleChildren(_ src:JSON) -> AsyncViewSpec {
  if (src["children"].array != nil) {
    let ch = src["children"].arrayValue
    if (ch.count != 1) {
      fatalError("Expected exactly one children: " + String(ch.count))
    }
    return resolveSpec(ch[0])
  } else {
    fatalError("No children provided")
  }
}

private func resolveChildren(_ src: JSON) -> [AsyncViewSpec] {
  return src["children"].arrayValue.map(resolveSpec)
}

private func resolveTextChildren(_ src: JSON) -> String {
  var res = ""
  for item in src["children"].arrayValue {
    if (item["type"] == "value") {
      res = res + item["value"].stringValue
    } else {
      fatalError("Non-text value in text node")
    }
  }
  return res;
}

private func resolveSpec(_ src: JSON) -> AsyncViewSpec {
  if (src.array != nil) {
    fatalError("Spec can't be an array")
  }
  if (src["type"].string == nil) {
    fatalError("Type can't be empty")
  }
  let type = src["type"].stringValue
  if (type == "flex") {
    let res = AsyncFlexSpec()
    res.key = src["key"].stringValue
    res.style = resolveStyle(src)
    if let v = src["props"]["flexDirection"].string {
      res.direction = AsyncFlexDirection(rawValue: v)!
    }
    if let v = src["props"]["alignItems"].string {
      res.alignItems = AsyncFlexAlignItems(rawValue: v)!
    }
    if let v = src["props"]["justifyContent"].string {
      res.justifyContent = AsyncFlexJustifyContent(rawValue: v)!
    }
    if let v = src["props"]["spacing"].float {
      res.spacing = v;
    }
    if let v = src["props"]["touchableKey"].string {
      res.touchableKey = v
    }
    if let v = src["props"]["highlightColor"].uInt64 {
      res.highlightColor = resolveColorR(v)
    }
    if let v = src["props"]["overlay"].bool {
      res.overlay = v
    }
    res.children = resolveChildren(src)
    return res
  } else if (type == "text") {
    let res = AsyncTextSpec()
    res.style = resolveStyle(src)
    res.text = resolveTextChildren(src)
    res.key = src["key"].stringValue
    if let v = src["props"]["fontSize"].float {
      res.fontSize = v
    }
    if let v = src["props"]["fontWeight"].string {
      res.fontWeight = {
        switch(v){
        case "100":
          return UIFontWeightUltraLight
        case "200":
          return UIFontWeightThin
        case "300":
          return UIFontWeightLight
        case "400":
          return UIFontWeightRegular
        case "500":
          return UIFontWeightMedium
        case "600":
          return UIFontWeightSemibold
        case "700":
          return UIFontWeightBold
        case "800":
          return UIFontWeightHeavy
        case "900":
          return UIFontWeightBlack
        default:
          return UIFontWeightRegular
        }
      }()
    }
    if let v = src["props"]["color"].uInt64 {
      res.color = resolveColorR(v)
    }
    if let v = src["props"]["lineHeight"].float {
      res.lineHeight = v
    }
    if let v = src["props"]["letterSpacing"].float {
      res.letterSpacing = v
    }
    if let v = src["props"]["numberOfLines"].int {
      res.numberOfLines = v
    }
    return res
  } else if (type == "image") {
    let res = AsyncImageSpec()
    res.style = resolveStyle(src)
    res.key = src["key"].stringValue
    res.url = src["props"]["source"].stringValue
    return res
  } else if type == "scroll" {
    let res = AsyncScrollViewSpec()
    res.style = resolveStyle(src)
    res.key = src["key"].stringValue
    res.children = resolveSingleChildren(src)
    return res
  } else if type == "list" {
    let res = AsyncListViewSpec()
    res.style = resolveStyle(src)
    res.key = src["key"].stringValue
    res.dataViewKey = src["props"]["dataViewKey"].stringValue
    if let v = src["props"]["contentPaddingTop"].float {
      res.contentPaddingTop = v
    }
    if let v = src["props"]["contentPaddingBottom"].float {
      res.contentPaddingBottom = v
    }
    if let v = src["props"]["inverted"].bool {
      res.inverted = v
    }
    if let v = src["props"]["loading"].bool {
      res.loading = v
    }
    if let v = src["props"]["fluid"].bool {
      res.fluid = v
    }
    return res
  }
  fatalError("Unknown view type:" + type)
}

func parseSpec(_ spec: String) -> AsyncViewSpec {
  let src = JSON(parseJSON: spec)
  return resolveSpec(src)
}

private func resolveColorR(_ rgbValue: UInt64) -> UIColor {
  
  // &  binary AND operator to zero out other color values
  // >>  bitwise right shift operator
  // Divide by 0xFF because UIColor takes CGFloats between 0.0 and 1.0
  
  let red =   CGFloat((rgbValue & 0xFF0000) >> 16) / 0xFF
  let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 0xFF
  let blue =  CGFloat(rgbValue & 0x0000FF) / 0xFF
  let alpha = CGFloat((rgbValue & 0xFF000000) >> 24) / 0xFF
  
  return UIColor(red: red, green: green, blue: blue, alpha: alpha)
}
