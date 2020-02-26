//
//  RNAsyncViewModel.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Openland. All rights reserved.
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

enum AsyncTextDecorationLine: String {
  case none      = "none"
  case underline = "underline"
}

enum AsyncTextAlignment: String {
  case center = "center"
  case left = "left"
  case right = "right"
}

enum AsyncBackgroundGradientOrientation: String {
  case left_right = "left_right"
  case top_bottom = "top_bottom"
  case tl_br = "tl_br"
  case tr_bl = "tr_bl"
}

protocol AsyncViewSpec {
  var style: AsyncStyleSpec {get set}
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
  var children: [Any] = []
  var fontSize: Float? = nil
  var lineHeight: Float?
  var letterSpacing: Float?
  var fontWeight: UIFont.Weight? = nil
  var fontStyle: String?
  var fontType: String?
  var color: UIColor? = nil
  var backgroundColor: UIColor? = nil
  var numberOfLines: Int?
  var textDecorationLine: AsyncTextDecorationLine? = nil
  var touchableKey: String?
  var alignment: AsyncTextAlignment?
  var attributedText: NSAttributedString! = nil
}

class AsyncImageSpec: AsyncViewSpec {
  var style: AsyncStyleSpec = AsyncStyleSpec()
  var key: String = ""
  var url: String = ""
  var touchableKey: String?
  var isGif: Bool = false
  var tintColor: UIColor?
}

class AsyncStyleSpec {
  var height: Float?
  var width: Float?
  var minWidth: Float?
  var minHeight: Float?
  var maxWidth: Float?
  var maxHeight: Float?
  var flexGrow: Float?
  var flexShrink: Float?
  var flexBasis: Float?
  var alignSelf: AsyncFlexAlignSelf?
  var backgroundGradient: [UIColor]?
  var backgroundGradientOrientation: AsyncBackgroundGradientOrientation?
  var backgroundColor: UIColor?
  var backgroundPatch: AsyncPatch?
  var backgroundPatchTintColor: UIColor?
  var borderRadius: Float?
  var borderRadiusTopLeft: Float?
  var borderRadiusTopRight: Float?
  var borderRadiusBottomLeft: Float?
  var borderRadiusBottomRight: Float?
  var marginTop: Float?
  var marginBottom: Float?
  var marginRight: Float?
  var marginLeft: Float?
  var opacity: Float?
  
  var modes: [String: AsyncStyleSpec]?
  
  func applyModes(applyModes: [String]) -> AsyncStyleSpec{
    var res = self.merge(with: self);
    for m in applyModes {
      if let mode = self.modes?[m]{
        res = res.merge(with: mode)
      }
    }
    return res;
  }
  
  func merge(with: AsyncStyleSpec) -> AsyncStyleSpec{
    let res = AsyncStyleSpec()
    
    res.height = self.height
    if let height = with.height{
      res.height = height
    }
    res.width = self.width
    if let width = with.width{
      res.width = width
    }
    res.minWidth = self.minWidth
    if let minWidth = with.minWidth{
      res.minWidth = minWidth
    }
    res.minHeight = self.minHeight
    if let minHeight = with.minHeight{
      res.minHeight = minHeight
    }
    res.maxWidth = self.maxWidth
    if let maxWidth = with.maxWidth{
      res.maxWidth = maxWidth
    }
    res.maxHeight = self.maxHeight
    if let maxHeight = with.maxHeight{
      res.maxHeight = maxHeight
    }
    res.flexGrow = self.flexGrow
    if let flexGrow = with.flexGrow{
      res.flexGrow = flexGrow
    }
    res.flexShrink = self.flexShrink
    if let flexShrink = with.flexShrink{
      res.flexShrink = flexShrink
    }
    res.flexBasis = self.flexBasis
    if let flexBasis = with.flexBasis{
      res.flexBasis = flexBasis
    }
    res.alignSelf = self.alignSelf
    if let alignSelf = with.alignSelf{
      res.alignSelf = alignSelf
    }
    res.backgroundGradient = self.backgroundGradient
    if let backgroundGradient = with.backgroundGradient{
      res.backgroundGradient = backgroundGradient
    }
    res.backgroundGradientOrientation = self.backgroundGradientOrientation
    if let backgroundGradientOrientation = with.backgroundGradientOrientation{
      res.backgroundGradientOrientation = backgroundGradientOrientation
    }
    res.backgroundColor = self.backgroundColor
    if let backgroundColor = with.backgroundColor{
      res.backgroundColor = backgroundColor
    }
    res.backgroundPatch = self.backgroundPatch
    if let backgroundPatch = with.backgroundPatch{
      res.backgroundPatch = backgroundPatch
    }
    res.backgroundPatchTintColor = self.backgroundPatchTintColor
    if let backgroundPatchTintColor = with.backgroundPatchTintColor{
      res.backgroundPatchTintColor = backgroundPatchTintColor
    }
    res.borderRadius = self.borderRadius
    if let borderRadius = with.borderRadius{
      res.borderRadius = borderRadius
    }
    res.borderRadiusTopLeft = self.borderRadiusTopLeft
    if let borderRadiusTopLeft = with.borderRadiusTopLeft{
      res.borderRadiusTopLeft = borderRadiusTopLeft
    }
    res.borderRadiusTopRight = self.borderRadiusTopRight
    if let borderRadiusTopRight = with.borderRadiusTopRight{
      res.borderRadiusTopRight = borderRadiusTopRight
    }
    res.borderRadiusBottomLeft = self.borderRadiusBottomLeft
    if let borderRadiusBottomLeft = with.borderRadiusBottomLeft{
      res.borderRadiusBottomLeft = borderRadiusBottomLeft
    }
    res.borderRadiusBottomRight = self.borderRadiusBottomRight
    if let borderRadiusBottomRight = with.borderRadiusBottomRight{
      res.borderRadiusBottomRight = borderRadiusBottomRight
    }
    res.marginTop = self.marginTop
    if let marginTop = with.marginTop{
      res.marginTop = marginTop
    }
    res.marginBottom = self.marginBottom
    if let marginBottom = with.marginBottom{
      res.marginBottom = marginBottom
    }
    res.marginRight = self.marginRight
    if let marginRight = with.marginRight{
      res.marginRight = marginRight
    }
    res.marginLeft = self.marginLeft
    if let marginLeft = with.marginLeft{
      res.marginLeft = marginLeft
    }
    res.opacity = self.opacity
    if let opacity = with.opacity{
      res.opacity = opacity
    }
    
    return res;
  }

}


class AsyncPatch {
  let source: String;
  let top: Float;
  let right: Float;
  let bottom: Float;
  let left: Float;
  let tint: UIColor?;
  init(source: String, top: Float, right: Float, bottom: Float, left: Float, tint: UIColor?) {
    self.source = source
    self.top = top
    self.right = right
    self.bottom = bottom
    self.left = left
    self.tint = tint
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
  if let v = src["props"]["minWidth"].float {
    res.minWidth = v
  }
  if let v = src["props"]["minHeight"].float {
    res.minHeight = v
  }
  if let v = src["props"]["maxWidth"].float {
    res.maxWidth = v
  }
  if let v = src["props"]["maxHeight"].float {
    res.maxHeight = v
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
  if let v = src["props"]["borderRadiusTopLeft"].float {
    res.borderRadiusTopLeft = v
  }
  if let v = src["props"]["borderRadiusTopRight"].float {
    res.borderRadiusTopRight = v
  }
  if let v = src["props"]["borderRadiusBottomLeft"].float {
    res.borderRadiusBottomLeft = v
  }
  if let v = src["props"]["borderRadiusBottomRight"].float {
    res.borderRadiusBottomRight = v
  }
  if let v = src["props"]["backgroundColor"].uInt64 {
    res.backgroundColor = resolveColorR(v)
  }
  if let v = src["props"]["backgroundGradient"].dictionary {
    res.backgroundGradient = [resolveColorR(v["start"]!.uInt64Value), resolveColorR(v["end"]!.uInt64Value)]
  }
  if let v = src["props"]["backgroundGradientOrientation"].string {
    res.backgroundGradientOrientation = AsyncBackgroundGradientOrientation(rawValue: v)
  }
  if let v = src["props"]["backgroundPatchTintColor"].uInt64 {
    res.backgroundPatchTintColor = resolveColorR(v)
  }
  if let v = src["props"]["backgroundPatch"].dictionary {
    let top = v["top"]!.floatValue
    let bottom = v["bottom"]!.floatValue
    let left = v["left"]!.floatValue
    let right = v["right"]!.floatValue
    let source = v["source"]!.stringValue
    res.backgroundPatch = AsyncPatch(source: source, top: top, right: right, bottom: bottom, left: left, tint: res.backgroundPatchTintColor)
  }
  if let v = src["props"]["renderModes"].dictionary {
    res.modes = [:]
    for key in v.keys{
      res.modes![key] =  resolveStyle(v[key]!)
    }
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

private func resolveTextChildren(_ src: JSON) -> [Any] {
  var res: [Any] = []
  for item in src["children"].arrayValue {
    if (item["type"] == "value") {
      res.append(item["value"].stringValue)
    } else if item["type"] == "text" {
      res.append(resolveSpec(item))
    }
  }
  return res;
}

func resolveSpec(_ src: JSON) -> AsyncViewSpec {
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
    res.children = resolveTextChildren(src)
    res.key = src["key"].stringValue
    if let v = src["props"]["fontSize"].float {
      res.fontSize = v
    }
    if let v = src["props"]["fontStyle"].string {
      res.fontStyle = v
    }
    if let v = src["props"]["fontType"].string {
      res.fontType = v
    }
    if let v = src["props"]["fontWeight"].string {
      res.fontWeight = {
        switch(v){
        case "100":
          return UIFont.Weight.ultraLight
        case "200":
          return UIFont.Weight.thin
        case "300":
          return UIFont.Weight.light
        case "400":
          return UIFont.Weight.regular
        case "500":
          return UIFont.Weight.medium
        case "600":
          return UIFont.Weight.semibold
        case "700":
          return UIFont.Weight.bold
        case "800":
          return UIFont.Weight.heavy
        case "900":
          return UIFont.Weight.black
        default:
          return UIFont.Weight.regular
        }
      }()
    }
    if let v = src["props"]["textAlign"].string {
      res.alignment = AsyncTextAlignment(rawValue: v)
    }
    if let v = src["props"]["color"].uInt64 {
      res.color = resolveColorR(v)
    }
    if let v = src["props"]["backgroundColor"].uInt64 {
      res.backgroundColor = resolveColorR(v)
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
    if let v = src["props"]["textDecorationLine"].string {
      res.textDecorationLine = AsyncTextDecorationLine(rawValue: v)!
    }
    if let v = src["props"]["touchableKey"].string {
      res.touchableKey = v
    }
    
    // Resolve Attributed Text
    resolveTextForTextSpec(spec: res)
    
    return res
  } else if (type == "image") {
    let res = AsyncImageSpec()
    res.style = resolveStyle(src)
    res.key = src["key"].stringValue
    res.url = src["props"]["source"].stringValue
    if let v = src["props"]["tintColor"].uInt64 {
      res.tintColor = resolveColorR(v)
    }
    if let v = src["props"]["touchableKey"].string {
      res.touchableKey = v
    }
    if let v = src["props"]["isGif"].bool {
      res.isGif = v
    }
    return res
  }
  fatalError("Unknown view type:" + type)
}

func parseSpec(_ spec: String) -> AsyncViewSpec {
  let src = JSON(parseJSON: spec)
  return resolveSpec(src)
}

public func resolveColorR(_ rgbValue: UInt64) -> UIColor {
  
  // &  binary AND operator to zero out other color values
  // >>  bitwise right shift operator
  // Divide by 0xFF because UIColor takes CGFloats between 0.0 and 1.0
  
  let red =   CGFloat((rgbValue & 0xFF0000) >> 16) / 0xFF
  let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 0xFF
  let blue =  CGFloat(rgbValue & 0x0000FF) / 0xFF
  let alpha = CGFloat((rgbValue & 0xFF000000) >> 24) / 0xFF
  
  return UIColor(red: red, green: green, blue: blue, alpha: alpha)
}
