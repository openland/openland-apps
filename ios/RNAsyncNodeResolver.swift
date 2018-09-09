//
//  RNAsyncViewNodes.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

//
// Root Resolvers
//

func resolveNode(spec: AsyncViewSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  if let flexSpec = spec as? AsyncFlexSpec {
    return createFlexNode(spec: flexSpec, context: context)
  } else if let textSpec = spec as? AsyncTextSpec {
    return createTextNode(spec: textSpec, context: context)
  } else if let imageSpec = spec as? AsyncImageSpec {
    return createImageNode(spec: imageSpec, context: context)
  }
  
  fatalError("Unknown view spec")
}

//
// View Resolvers
//

func createFlexNode(spec: AsyncFlexSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let direct = spec.children.filter({ (s) -> Bool in
    return !(s is AsyncFlexSpec) || !(s as! AsyncFlexSpec).overlay
  })
  let overlay = spec.children.filter({ (s) -> Bool in
    return (s is AsyncFlexSpec) && (s as! AsyncFlexSpec).overlay
  })
  let res = ASStackLayoutSpec()
  if (spec.direction == AsyncFlexDirection.row) {
    res.direction = ASStackLayoutDirection.horizontal
  } else {
    res.direction = ASStackLayoutDirection.vertical
  }
  res.alignItems = {
    switch spec.alignItems {
    case .center:
      return ASStackLayoutAlignItems.center
    case .start:
      return ASStackLayoutAlignItems.start
    case .end:
      return ASStackLayoutAlignItems.end
    case .stretch:
      return ASStackLayoutAlignItems.stretch
    }
  }()
  res.justifyContent = {
    switch spec.justifyContent {
    case .center:
      return ASStackLayoutJustifyContent.center
    case .start:
      return ASStackLayoutJustifyContent.start
    case .end:
      return ASStackLayoutJustifyContent.end
    }
  }()
  res.children = resolveNodes(direct, context)

  var res2: ASLayoutElement = res
  res2 = resolveStyle(spec, res, context)
  if (spec.touchableKey != nil) {
    res2 = ASBackgroundLayoutSpec(child: res2, background: RNTouchableNode(key: spec.touchableKey!, higlightColor: spec.highlightColor))
  }
  
  if overlay.count > 1 {
    fatalError("Only one overlay supported")
  }
  if overlay.count == 1 {
    res2 = ASOverlayLayoutSpec(child: res2, overlay: resolveNode(spec: overlay[0], context: context))
  }
  
  return res2
}

func createTextNode(spec: AsyncTextSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let res = context.fetchCached(key: spec.key) { () -> RNAsyncTextNode in
    return RNAsyncTextNode()
  }
  res.setSpec(spec: spec)
  return resolveStyle(spec, res, context)
}

func createImageNode(spec: AsyncImageSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let res = context.fetchCached(key: spec.key) { () -> RNImageNode in
    return RNImageNode()
  }
  res.setSpec(spec: spec)
  return resolveStyle(spec, res, context)
}

//
// Helpers
//

func resolveStyle(_ spec: AsyncViewSpec, _ source: ASLayoutElement, _ context: RNAsyncViewContext) -> ASLayoutElement {
  var res = source
  
  // Apply basic styles
  if let v = spec.style.width {
    res.style.width = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.style.height {
    res.style.height = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.style.borderRadius {
    if let g = source as? ASDisplayNode {
      g.cornerRadius = CGFloat(v)
      g.cornerRoundingType = .precomposited
    }
  }
  
  if let v = spec.style.backgroundPatch {
    let g = context.fetchCached(key: spec.key+"-bg-patch") { () -> RNPatchNode in
      return RNPatchNode()
    }
    g.setSpec(spec: v)
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = spec.style.backgroundGradient {
    let g = context.fetchCached(key: spec.key+"-bg-gradient") { () -> RNAsyncGradient in
      return RNAsyncGradient(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: v)
    }
    g.update(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: v)
    if let br = spec.style.borderRadius {
      g.cornerRadius = CGFloat(br)
      g.cornerRoundingType = .precomposited
    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = spec.style.backgroundColor {
    let g = context.fetchCached(key: spec.key+"-bg-color") { () -> RNAsyncBackground in
      return RNAsyncBackground(v)
    }
    g.update(color: v)
    if let br = spec.style.borderRadius {
      g.cornerRadius = CGFloat(br)
      g.cornerRoundingType = .precomposited
    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  }
  
  // Apply margins
  let marginTop: Float = spec.style.marginTop ?? 0.0
  let marginBottom: Float = spec.style.marginBottom ?? 0.0
  let marginLeft: Float = spec.style.marginLeft ?? 0.0
  let marginRight: Float = spec.style.marginRight ?? 0.0
  if marginTop != 0 || marginBottom != 0 || marginRight != 0 || marginLeft != 0 {
    res = ASInsetLayoutSpec(insets: UIEdgeInsetsMake(CGFloat(marginTop), CGFloat(marginLeft), CGFloat(marginBottom), CGFloat(marginRight)), child: res)
  }
  
  // Apply flex params
  if let v = spec.style.flexBasis {
    res.style.flexBasis = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.style.flexGrow {
    res.style.flexGrow = CGFloat(v)
  }
  if let v = spec.style.flexShrink {
    res.style.flexShrink = CGFloat(v)
  }

  return res
}

func resolveNodes(_ specs: [AsyncViewSpec], _ context: RNAsyncViewContext) -> [ASLayoutElement] {
  return specs.map {
    return resolveNode(spec: $0, context: context)
  }
}

func resolveTextForTextSpec(spec: AsyncTextSpec) {
  var attributes: [String: Any] = [:]
  attributes[NSFontAttributeName] = UIFont.systemFont(ofSize: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12), weight: spec.fontWeight != nil ? spec.fontWeight! : UIFontWeightRegular)
  attributes[NSForegroundColorAttributeName] = spec.color != nil ? spec.color : UIColor.black
  let style = NSMutableParagraphStyle();
  style.headIndent = 0.0
  style.tailIndent = 0.0
  style.paragraphSpacing = 0.0
  style.paragraphSpacingBefore = 0.0
  style.lineSpacing = 0.0
  style.lineBreakMode = .byWordWrapping
  if let v = spec.alignment {
    if v == .center {
      style.alignment = .center
    } else if v == .left {
      style.alignment = .left
    } else if v == .right {
      style.alignment = .right
    }
  }
  if let v = spec.lineHeight {
    style.minimumLineHeight = CGFloat(v)
    style.maximumLineHeight = CGFloat(v)
  }
  attributes[NSParagraphStyleAttributeName] = style
  if let v = spec.letterSpacing {
    attributes[NSKernAttributeName] = CGFloat(v)
  }
  spec.attributedText = resolveAttributedText(spec: spec, attributes: attributes)
}

private func resolveAttributedText(spec: AsyncTextSpec, attributes: [String: Any]) -> NSAttributedString {
  let res = NSMutableAttributedString(string: "", attributes: attributes)
  
  var innerAttributes = attributes
  if spec.color != nil {
    innerAttributes[NSForegroundColorAttributeName] = spec.color
  }
  
  if spec.textDecorationLine != nil {
    if spec.textDecorationLine == AsyncTextDecorationLine.none {
      innerAttributes[NSUnderlineStyleAttributeName] = NSUnderlineStyle.styleNone.rawValue
    } else {
      innerAttributes[NSUnderlineStyleAttributeName] = NSUnderlineStyle.styleSingle.rawValue
    }
  }
  
  if spec.touchableKey != nil {
    innerAttributes["RNClickableText"] = spec.touchableKey!
  }
  
  // innerAttributes[NSLinkAttributeName]
  
  for v in spec.children {
    if let s = v as? String {
      res.append(NSAttributedString(string: s, attributes: innerAttributes))
    } else if let s = v as? AsyncTextSpec {
      res.append(resolveAttributedText(spec: s, attributes: innerAttributes))
    }
  }
  return res
}

var cache = [String : UIImage]()
