//
//  AsyncDisplay.swift
//  openland
//
//  Created by Steve Kite on 8/20/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import AsyncDisplayKit
import SwiftyJSON

func resolveDirection(_ src: String?) -> ASStackLayoutDirection {
  if src == "column" {
    return ASStackLayoutDirection.vertical
  } else if src == "row" {
    return ASStackLayoutDirection.horizontal
  }
  return ASStackLayoutDirection.horizontal
}

func resolveJustifyContent(_ src: String?) -> ASStackLayoutJustifyContent {
  if (src == "flex-start") {
    return ASStackLayoutJustifyContent.start
  } else if (src == "flex-end") {
    return ASStackLayoutJustifyContent.end
  } else if (src == "center") {
    return ASStackLayoutJustifyContent.center
  }
  
  return ASStackLayoutJustifyContent.start
}

func resolveAlignItems(_ src: String?) -> ASStackLayoutAlignItems {
  if (src == "flex-start") {
    return ASStackLayoutAlignItems.start
  } else if (src == "flex-end") {
    return ASStackLayoutAlignItems.end
  } else if (src == "center") {
    return ASStackLayoutAlignItems.center
  } else if (src == "stretch") {
    return ASStackLayoutAlignItems.stretch
  }
  
  return ASStackLayoutAlignItems.start
}

func resolveAlignSelf(_ src: String?) -> ASStackLayoutAlignSelf {
  if (src == "flex-start") {
    return ASStackLayoutAlignSelf.start
  } else if (src == "flex-end") {
    return ASStackLayoutAlignSelf.end
  } else if (src == "center") {
    return ASStackLayoutAlignSelf.center
  } else if (src == "stretch") {
    return ASStackLayoutAlignSelf.stretch
  }
  
  return ASStackLayoutAlignSelf.start
}


func resolveColor(rgbValue: UInt64) -> UIColor {
  
  // &  binary AND operator to zero out other color values
  // >>  bitwise right shift operator
  // Divide by 0xFF because UIColor takes CGFloats between 0.0 and 1.0
  
  let red =   CGFloat((rgbValue & 0xFF0000) >> 16) / 0xFF
  let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 0xFF
  let blue =  CGFloat(rgbValue & 0x0000FF) / 0xFF
  let alpha = CGFloat((rgbValue & 0xFF000000) >> 24) / 0xFF
  
  return UIColor(red: red, green: green, blue: blue, alpha: alpha)
}

func resolveFontWeight(weight:String?) -> UIFontWeight {
  if (weight == "600") {
    return UIFontWeightMedium
  }
  return UIFontWeightRegular
}

func resolveStyle(src: JSON, style: ASLayoutElementStyle) {
  if (src["height"].float != nil) {
    style.height = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(src["height"].float!))
  }
  if (src["width"].float != nil) {
    style.width = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(src["width"].float!))
  }
  if (src["flexGrow"].float != nil) {
    style.flexGrow = CGFloat(src["flexGrow"].floatValue)
  }
  if (src["flexShrink"].float != nil) {
    style.flexShrink = CGFloat(src["flexShrink"].floatValue)
  }
  if (src["flexBasis"].float != nil) {
    style.flexBasis = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(src["flexBasis"].float!))
  }
  if (src["alignSelf"].string != nil) {
    style.alignSelf = resolveAlignSelf(src["alignSelf"].stringValue)
  }
}

func resolveViewLayout(src:JSON, children: [ASLayoutElement]) -> ASLayoutSpec {
  let res = ASStackLayoutSpec(
              direction: resolveDirection(src["props"]["direction"].string),
              spacing: src["props"]["spacing"].float != nil ? CGFloat(src["props"]["spacing"].float!) : 0.0,
              justifyContent: resolveJustifyContent(src["props"]["justifyContent"].string),
              alignItems: resolveAlignItems(src["props"]["alignItems"].string),
              children: children)
  resolveStyle(src: src["props"], style: res.style)
  return res;
}

func resolveInsetsLayout(src: JSON, children: [ASLayoutElement]) -> ASLayoutSpec {
  let insets = UIEdgeInsetsMake(CGFloat(src["props"]["top"].floatValue), CGFloat(src["props"]["left"].floatValue), CGFloat(src["props"]["bottom"].floatValue), CGFloat(src["props"]["right"].floatValue))
  let res = ASInsetLayoutSpec(insets: insets, child: children[0])
  resolveStyle(src: src["props"], style: res.style)
  return res;
}

func resolveWebImageLayout(src: JSON) -> ASImageNode {
  let url = src["props"]["source"].stringValue;
  let res = ASNetworkImageNode()
  res.setURL(URL(string: url), resetToDefault: true)
  resolveStyle(src: src["props"], style: res.style)
  if (src["props"]["borderRadius"].float != nil) {
    res.willDisplayNodeContentWithRenderingContext = { context, drawParameters in
      let bounds = context.boundingBoxOfClipPath
      UIBezierPath(roundedRect: bounds, cornerRadius: CGFloat(src["props"]["borderRadius"].floatValue) * UIScreen.main.scale).addClip()
    }
  }
  return res;
}

func resolveGradientLayout(src: JSON, children: [ASLayoutElement]) -> ASLayoutElement {
  let color1 = resolveColor(rgbValue:src["props"]["colorStart"].uInt64Value)
  let color2 = resolveColor(rgbValue:src["props"]["colorEnd"].uInt64Value)
  let res = GradientNode(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: [color1, color2])
  res.isLayerBacked = true
  res.isOpaque = false
  resolveStyle(src: src["props"], style: res.style)
  if (src["props"]["borderRadius"].float != nil) {
    res.willDisplayNodeContentWithRenderingContext = { context, drawParameters in
      let bounds = context.boundingBoxOfClipPath
      UIBezierPath(roundedRect: bounds, cornerRadius: CGFloat(src["props"]["borderRadius"].floatValue) * UIScreen.main.scale).addClip()
    }
  }
  if (children.count == 1) {
    return ASBackgroundLayoutSpec(child: children[0], background: res)
  }
  return res;
}

func resolveTextChildren(src: [JSON], baseAttributes: [String: Any] ) -> NSAttributedString {
  let res = NSMutableAttributedString(string: "", attributes: baseAttributes)
  for item in src {
    if (item["element"] == "value") {
      res.append(NSAttributedString(string: item["value"].stringValue, attributes: baseAttributes))
    }
  }
  return res;
}

func resolveTextLayout(src: JSON) -> ASTextNode {
  let res = ASTextNode()
  var attributes: [String: Any] = [:]
  if (src["props"]["fontSize"].float != nil || src["props"]["fontWeight"].string != nil) {
    var fontSize: CGFloat = 13
    let fontWeight = resolveFontWeight(weight: src["props"]["fontWeight"].string)
    if src["props"]["fontSize"].float != nil {
      fontSize = CGFloat(src["props"]["fontSize"].floatValue)
    }
    attributes[NSFontAttributeName] = UIFont.systemFont(ofSize: fontSize, weight: fontWeight)
  }
  if (src["props"]["color"].uInt64 != nil) {
    attributes[NSForegroundColorAttributeName] = resolveColor(rgbValue:src["props"]["color"].uInt64Value)
  }
  if (src["props"]["lineHeight"].float != nil) {
    var style = NSMutableParagraphStyle();
    style.minimumLineHeight = CGFloat(src["props"]["lineHeight"].floatValue)
    style.maximumLineHeight = CGFloat(src["props"]["lineHeight"].floatValue)
    attributes[NSParagraphStyleAttributeName] = style
  }
  if (src["props"]["numberOfLines"].uInt != nil) {
    res.maximumNumberOfLines = src["props"]["numberOfLines"].uIntValue
  }
  res.attributedText = resolveTextChildren(src: src["children"].arrayValue, baseAttributes: attributes)
  resolveStyle(src: src["props"], style: res.style)
  return res;
}

class GradientNode: ASDisplayNode {
  
  private let startUnitPoint: CGPoint
  private let endUnitPoint: CGPoint
  private let colors: [UIColor]
  private let locations: [CGFloat]?
  
  override class func draw(_ bounds: CGRect, withParameters parameters: Any?, isCancelled isCancelledBlock: () -> Bool, isRasterizing: Bool) {
    
    guard let parameters = parameters as? GradientNode else {
      // CCLog.assert("Expected type SimpleGradientNode to be returned")
      return
    }
    
    // Calculate the start and end points
    let startUnitX = parameters.startUnitPoint.x
    let startUnitY = parameters.startUnitPoint.y
    let endUnitX = parameters.endUnitPoint.x
    let endUnitY = parameters.endUnitPoint.y
    
    let startPoint = CGPoint(x: bounds.width * startUnitX + bounds.minX, y: bounds.height * startUnitY + bounds.minY)
    let endPoint = CGPoint(x: bounds.width * endUnitX + bounds.minX, y: bounds.height * endUnitY + bounds.minY)
    
    let context = UIGraphicsGetCurrentContext()!
    context.saveGState()
    context.clip(to: bounds)
    
    guard let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(),
                                    colors: parameters.colors.map { $0.cgColor } as CFArray,
                                    locations: parameters.locations) else {
                                      // CCLog.assert("Unable to create CGGradient")
                                      return
    }
    
    context.drawLinearGradient(gradient,
                               start: startPoint,
                               end: endPoint,
                               options: CGGradientDrawingOptions.drawsAfterEndLocation)
    context.restoreGState()
  }
  
  init(startingAt startUnitPoint: CGPoint, endingAt endUnitPoint: CGPoint, with colors: [UIColor], for locations: [CGFloat]? = nil) {
    self.startUnitPoint = startUnitPoint
    self.endUnitPoint = endUnitPoint
    self.colors = colors
    self.locations = locations
    
    super.init()
  }
  
  override func drawParameters(forAsyncLayer layer: _ASDisplayLayer) -> NSObjectProtocol? {
    return self
  }
}

class SampleNode: ASDisplayNode {
  
  var config: String? = nil
  var pendingFrame: CGRect? = nil
  
  required override init() {
    super.init()
    self.automaticallyManagesSubnodes = true
  }
  
  public func setConfig(config: String) {
    self.config = config;
    if (self.pendingFrame != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  public func setFrame(frame: CGRect) {
    self.pendingFrame = frame;
    if (self.config != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  func buildChildren(src: JSON) -> ASLayoutElement {
    if (src["element"] == "view") {
      return  resolveViewLayout(src: src, children: src["children"].arrayValue.map(buildChildren))
    } else if (src["element"] == "text") {
      return resolveTextLayout(src: src)
    } else if (src["element"] == "image") {
      return resolveWebImageLayout(src: src);
    } else if (src["element"] == "linear_gradient") {
      return resolveGradientLayout(src: src, children: src["children"].arrayValue.map(buildChildren));
    } else if (src["element"] == "insets") {
      return resolveInsetsLayout(src: src, children: src["children"].arrayValue.map(buildChildren))
    } else {
      // Fallback?
      return ASStackLayoutSpec(
        direction: ASStackLayoutDirection.horizontal,
        spacing: 0.0,
        justifyContent: ASStackLayoutJustifyContent.start,
        alignItems: ASStackLayoutAlignItems.start,
        children: [])
    }
  }
  
  func buildLayoutSpec(src: JSON) -> ASLayoutSpec {
    if (src["element"] == "view") {
      return resolveViewLayout(src: src, children: src["children"].arrayValue.map(buildChildren))
    } else {
      // Fallback?
      return ASStackLayoutSpec(
        direction: ASStackLayoutDirection.horizontal,
        spacing: 0.0,
        justifyContent: ASStackLayoutJustifyContent.start,
        alignItems: ASStackLayoutAlignItems.start,
        children: [])
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let c = JSON(parseJSON: self.config!)
    let res = buildLayoutSpec(src: c);
    return res;
  }
}

@objc(AsyncDisplayNode)
class AsyncDisplayNode: RCTView {
  
  var node: SampleNode
  override init(frame: CGRect) {
    node = SampleNode()
    node.setNeedsDisplay()
    node.setNeedsLayout()
    super.init(frame: frame);
    self.frame = frame;
    self.addSubview(node.view)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setConfig(_ config: NSString) {
    node.setConfig(config: config as String);
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    node.setFrame(frame: frame);
  }
}

@objc(AsyncDisplayNodeManager)
class AsyncDisplayNodeManager: RCTViewManager {
  override func view() -> UIView! {
    return AsyncDisplayNode()
  }
}
