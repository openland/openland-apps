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

func resolveNode(spec: AsyncViewSpec) -> ASLayoutElement {
  if let flexSpec = spec as? AsyncFlexSpec {
    return createFlexNode(spec: flexSpec, resolvedChildren: resolveNodes(flexSpec.children))
  } else if let textSpec = spec as? AsyncTextSpec {
    return createTextNode(spec: textSpec)
  } else if let imageSpec = spec as? AsyncImageSpec {
    return createImageNode(spec: imageSpec)
  } else if let scrollSpec = spec as? AsyncScrollViewSpec {
    return createScrollNode(spec: scrollSpec)
  } else if let listSpec = spec as? AsyncListViewSpec {
    return createListNode(spec: listSpec)
  }
  
  fatalError("Unknown view spec")
}

//
// View Resolvers
//

func createFlexNode(spec: AsyncFlexSpec, resolvedChildren: [ASLayoutElement]) -> ASLayoutElement {
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
  res.children = resolvedChildren
  let res2 = resolveStyle(spec.style, res)
  if (spec.touchableKey != nil) {
    return ASBackgroundLayoutSpec(child: res2, background: RNTouchableNode(key: spec.touchableKey!, higlightColor: spec.highlightColor))
  } else {
    return res2
  }
}

func createTextNode(spec: AsyncTextSpec) -> ASLayoutElement {
  let res = ASTextNode()
  var attributes: [String: Any] = [:]
  attributes[NSFontAttributeName] = UIFont.systemFont(ofSize: CGFloat(spec.fontSize), weight: spec.fontWeight)
  attributes[NSForegroundColorAttributeName] = spec.color
  let style = NSMutableParagraphStyle();
  if let v = spec.lineHeight {
    style.minimumLineHeight = CGFloat(v)
    style.maximumLineHeight = CGFloat(v)
  }
  attributes[NSParagraphStyleAttributeName] = style
  res.attributedText = NSAttributedString(string: spec.text, attributes: attributes)
  if let v = spec.numberOfLines {
    res.maximumNumberOfLines = UInt(v)
  }
  return resolveStyle(spec.style, res)
}

func createImageNode(spec: AsyncImageSpec) -> ASLayoutElement {
  let res = ASNetworkImageNode()
  res.shouldCacheImage = false; // It doesn't work otherwise
  res.url = URL(string: spec.url)
  return resolveStyle(spec.style, res)
}

func createScrollNode(spec: AsyncScrollViewSpec) -> ASLayoutElement {
  let res = ASScrollNode()
  res.automaticallyManagesContentSize = true
  res.automaticallyManagesSubnodes = true
  res.layoutSpecBlock = { node, constrainedSize in
    return resolveNode(spec: spec.children) as! ASLayoutSpec
  }
  return resolveStyle(spec.style, res)
}

func createListNode(spec: AsyncListViewSpec) -> ASLayoutElement {
  let res = RNASyncList(spec: spec, data: spec.children)
  return resolveStyle(spec.style, res)
}

//
// Helpers
//

func resolveStyle(_ spec: AsyncStyleSpec, _ source: ASLayoutElement) -> ASLayoutElement {
  var res = source
  
  // Apply basic styles
  if let v = spec.width {
    res.style.width = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.height {
    res.style.height = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.borderRadius {
    if let g = source as? ASDisplayNode {
      g.willDisplayNodeContentWithRenderingContext = { context, drawParameters in
        let bounds = context.boundingBoxOfClipPath
        UIBezierPath(roundedRect: bounds, cornerRadius: CGFloat(v) * UIScreen.main.scale).addClip()
      }
    }
  }
  if let v = spec.backgroundPatch {
    let g = ASImageNode()
    let image = try! UIImage(data: Data(contentsOf: URL(string: v.source)!), scale: UIScreen.main.scale)
    g.image = image?.resizableImage(withCapInsets: UIEdgeInsets(top: CGFloat(v.top), left: CGFloat(v.left), bottom: CGFloat(v.bottom), right: CGFloat(v.right)), resizingMode: UIImageResizingMode.stretch)
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = spec.backgroundGradient {
    let g = RNAsyncGradient(startingAt: CGPoint(x: 0.0, y: 0.0), endingAt: CGPoint(x: 1.0, y: 1.0), with: v)
    if let br = spec.borderRadius {
      g.willDisplayNodeContentWithRenderingContext = { context, drawParameters in
        let bounds = context.boundingBoxOfClipPath
        UIBezierPath(roundedRect: bounds, cornerRadius: CGFloat(br) * UIScreen.main.scale).addClip()
      }
    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  } else if let v = spec.backgroundColor {
    let g = RNAsyncBackground(v)
    if let br = spec.borderRadius {
      g.willDisplayNodeContentWithRenderingContext = { context, drawParameters in
        let bounds = context.boundingBoxOfClipPath
        UIBezierPath(roundedRect: bounds, cornerRadius: CGFloat(br) * UIScreen.main.scale).addClip()
      }
    }
    res = ASBackgroundLayoutSpec(child: res, background: g)
  }
  
  // Apply margins
  let marginTop: Float = spec.marginTop ?? 0.0
  let marginBottom: Float = spec.marginBottom ?? 0.0
  let marginLeft: Float = spec.marginLeft ?? 0.0
  let marginRight: Float = spec.marginRight ?? 0.0
  if marginTop != 0 || marginBottom != 0 || marginRight != 0 || marginLeft != 0 {
    res = ASInsetLayoutSpec(insets: UIEdgeInsetsMake(CGFloat(marginTop), CGFloat(marginLeft), CGFloat(marginBottom), CGFloat(marginRight)), child: res)
  }
  
  // Apply flex params
  if let v = spec.flexBasis {
    res.style.flexBasis = ASDimension(unit: .points, value: CGFloat(v))
  }
  if let v = spec.flexGrow {
    res.style.flexGrow = CGFloat(v)
  }
  if let v = spec.flexShrink {
    res.style.flexShrink = CGFloat(v)
  }

  return res
}

func resolveNodes(_ specs: [AsyncViewSpec]) -> [ASLayoutElement] {
  return specs.map(resolveNode)
}
