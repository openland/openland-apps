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
  res2 = resolveStyle(spec.style, res, context)
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
  return resolveStyle(spec.style, res, context)
}

func createImageNode(spec: AsyncImageSpec, context: RNAsyncViewContext) -> ASLayoutElement {
  let res = context.fetchCached(key: spec.key) { () -> RNImageNode in
    return RNImageNode(key: spec.key)
  }

  res.setSpec(spec: spec)
  return resolveStyle(spec.style, res, context)
}

//
// Helpers
//

func resolveStyle(_ spec: AsyncStyleSpec, _ source: ASLayoutElement, _ context: RNAsyncViewContext) -> ASLayoutElement {
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
    var _baseImage: UIImage? = nil
    if let val = cache[v.source] {
      _baseImage = val
    } else {
      _baseImage = try! UIImage(data: Data(contentsOf: URL(string: v.source)!), scale: UIScreen.main.scale)
      if _baseImage != nil {
        cache[v.source] = _baseImage
      }
    }
    g.image = _baseImage?.resizableImage(withCapInsets: UIEdgeInsets(top: CGFloat(v.top), left: CGFloat(v.left), bottom: CGFloat(v.bottom), right: CGFloat(v.right)), resizingMode: UIImageResizingMode.stretch)
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

func resolveNodes(_ specs: [AsyncViewSpec], _ context: RNAsyncViewContext) -> [ASLayoutElement] {
  return specs.map {
    return resolveNode(spec: $0, context: context)
  }
}

var cache = [String : UIImage]()
