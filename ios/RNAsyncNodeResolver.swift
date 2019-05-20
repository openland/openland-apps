//
//  RNAsyncViewNodes.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

//
// Root Resolvers
//

func resolveNode(spec: AsyncViewSpec, modesToApply: [String], context: RNAsyncViewContext) -> ASLayoutElement {
  if let flexSpec = spec as? AsyncFlexSpec {
    return createFlexNode(spec: flexSpec, modesToApply: modesToApply, context: context)
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

func createFlexNode(spec: AsyncFlexSpec, modesToApply: [String], context: RNAsyncViewContext) -> ASLayoutElement {
  
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
  res.children = resolveNodes(direct, modesToApply, context)

  var res2: ASLayoutElement = res
  let style = spec.style.applyModes(applyModes: modesToApply )
  res2 = resolveStyle(spec.key, style, res, context)
  
  if overlay.count > 1 {
    fatalError("Only one overlay supported")
  }
  if overlay.count == 1 {
    res2 = ASOverlayLayoutSpec(child: res2, overlay: resolveNode(spec: overlay[0], modesToApply: modesToApply, context: context))
  }
  
  if (spec.touchableKey != nil) {
    res2 = RNTouchableNode(key: spec.touchableKey!, higlightColor: spec.highlightColor, child: res2)
  }
  
  return res2
}

func createTextNode(spec: AsyncTextSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let res = context.fetchCached(key: spec.key) { () -> RNAsyncTextNode in
    return RNAsyncTextNode()
  }
  res.setSpec(spec: spec)
  return resolveStyle(spec.key, spec.style, res, context)
}

func createImageNode(spec: AsyncImageSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let res = context.fetchCached(key: spec.key) { () -> RNImageNode in
    return RNImageNode()
  }
  res.setSpec(spec: spec)
  return resolveStyle(spec.key, spec.style, res, context)
}

//
// Helpers
//

func resolveStyle(_ key: String, _ style: AsyncStyleSpec, _ source: ASLayoutElement, _ context: RNAsyncViewContext) -> ASLayoutElement {
  var res = source
  
  // Apply basic styles
  if let v = style.width {
    res.style.width = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = style.height {
    res.style.height = ASDimension(unit: .points, value: CGFloat(v))
  }
  
  if let v = style.minWidth {
    res.style.minWidth = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = style.minHeight {
    res.style.minHeight = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = style.maxWidth {
    res.style.maxWidth = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = style.maxHeight {
    res.style.maxHeight = ASDimension(unit: .points, value: CGFloat(v))
  }
  
  if let v = style.borderRadius {
    if let g = source as? ASDisplayNode {
      g.cornerRadius = CGFloat(v)
      g.cornerRoundingType = .precomposited
    }
  }
  
  if let v = style.backgroundPatch {
    let g = context.fetchCached(key: key+"-bg-patch" + String(v.source.hashValue) + (v.tint !== nil ? String(v.tint!.cgColor.hashValue) : "")) { () -> RNPatchNode in
      return RNPatchNode()
    }
    g.setSpec(spec: v)
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = style.backgroundGradient {
    var bgr: CGFloat = 0.0
    if let br = style.borderRadius {
      bgr = CGFloat(br)
    }
    let g = context.fetchCached(key: key+"-bg-gradient") { () -> RNAsyncGradient in
      return RNAsyncGradient(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: v, borderRadius: bgr)
    }
    g.update(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: v,borderRadius: bgr)
//    if let br = style.borderRadius {
//      g.cornerRadius = CGFloat(br)
//      g.cornerRoundingType = .precomposited
//    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = style.backgroundColor {
    let g = context.fetchCached(key: key+"-bg-color") { () -> RNAsyncColor in
      return RNAsyncColor(v)
    }
    g.update(color: v)
    if let br = style.borderRadius {
      g.cornerRadius = CGFloat(br)
      g.cornerRoundingType = .defaultSlowCALayer // WTF?
    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  }
  
  // Apply margins
  let marginTop: Float = style.marginTop ?? 0.0
  let marginBottom: Float = style.marginBottom ?? 0.0
  let marginLeft: Float = style.marginLeft ?? 0.0
  let marginRight: Float = style.marginRight ?? 0.0
  if marginTop != 0 || marginBottom != 0 || marginRight != 0 || marginLeft != 0 {
    res = ASInsetLayoutSpec(insets: UIEdgeInsets(top: CGFloat(marginTop), left: CGFloat(marginLeft), bottom: CGFloat(marginBottom), right: CGFloat(marginRight)), child: res)
  }
  
  // Apply flex params
  if let v = style.flexBasis {
    res.style.flexBasis = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = style.flexGrow {
    res.style.flexGrow = CGFloat(v)
  }
  if let v = style.flexShrink {
    res.style.flexShrink = CGFloat(v)
  }

  return res
}

func resolveNodes(_ specs: [AsyncViewSpec], _ modesToApply: [String], _ context: RNAsyncViewContext) -> [ASLayoutElement] {
  return specs.map {
    return resolveNode(spec: $0, modesToApply: modesToApply, context: context)
  }
}

func resolveTextForTextSpec(spec: AsyncTextSpec) {
  var attributes: [NSAttributedString.Key: Any] = [:]
  attributes[NSAttributedString.Key.font] = UIFont.systemFont(ofSize: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12), weight: spec.fontWeight != nil ? spec.fontWeight! : UIFont.Weight.regular)
  attributes[NSAttributedString.Key.foregroundColor] = spec.color != nil ? spec.color : UIColor.black
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
  attributes[NSAttributedString.Key.paragraphStyle] = style
  if let v = spec.letterSpacing {
    attributes[NSAttributedString.Key.kern] = CGFloat(v)
  }
  spec.attributedText = resolveAttributedText(spec: spec, parent: nil, attributes: attributes)
}

private func resolveAttributedText(spec: AsyncTextSpec, parent: AsyncTextSpec?, attributes: [NSAttributedString.Key: Any]) -> NSAttributedString {
  let res = NSMutableAttributedString(string: "", attributes: attributes)
  
  var innerAttributes = attributes
  if spec.color != nil {
    innerAttributes[NSAttributedString.Key.foregroundColor] = spec.color
  }

  if spec.backgroundColor != nil {
    innerAttributes[NSAttributedString.Key.backgroundColor] = spec.backgroundColor
  }
  
  if spec.textDecorationLine != nil {
    if spec.textDecorationLine == AsyncTextDecorationLine.none {
      innerAttributes[NSAttributedString.Key.underlineStyle] = 0
    } else {
      innerAttributes[NSAttributedString.Key.underlineStyle] = NSUnderlineStyle.single.rawValue
    }
  }
  
  if spec.touchableKey != nil {
    innerAttributes[NSAttributedString.Key(rawValue: "RNClickableText")] = spec.touchableKey!
  }
  
  // innerAttributes[NSLinkAttributeName]
  spec.fontSize = spec.fontSize != nil ? spec.fontSize! : (parent != nil && parent!.fontSize != nil) ? parent!.fontSize! : nil
  spec.fontWeight = spec.fontWeight != nil ? spec.fontWeight! : (parent != nil && parent!.fontWeight != nil) ? parent!.fontWeight! : nil
  spec.fontStyle = spec.fontStyle != nil ? spec.fontStyle! : (parent != nil && parent!.fontStyle != nil) ? parent!.fontStyle! : nil
  spec.fontType = spec.fontType != nil ? spec.fontType! : (parent != nil && parent!.fontType != nil) ? parent!.fontType! : nil

  if spec.fontSize != nil || spec.fontWeight != nil {
    if spec.fontStyle == "italic" {
      if (spec.fontType == "monospace") {
        innerAttributes[NSAttributedString.Key.font] = UIFont(name: "CourierNewPS-ItalicMT", size: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12))
      } else {
        innerAttributes[NSAttributedString.Key.font] = UIFont.italicSystemFont(ofSize: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12))
      }
    } else {
      if (spec.fontType == "monospace") {
        innerAttributes[NSAttributedString.Key.font] = UIFont(name: "CourierNewPSMT", size: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12))
      } else {
        innerAttributes[NSAttributedString.Key.font] = UIFont.systemFont(ofSize: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12), weight: spec.fontWeight != nil ? spec.fontWeight! : UIFont.Weight.regular)
      }
    }
  }
  
  for v in spec.children {
    if let s = v as? String {
      res.append(NSAttributedString(string: s, attributes: innerAttributes))
    } else if let s = v as? AsyncTextSpec {
        res.append(resolveAttributedText(spec: s, parent: spec, attributes: innerAttributes))
    }
  }
  return res
}

var cache = [String : UIImage]()
