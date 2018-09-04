//
//  RNAsyncTextNode.swift
//  openland
//
//  Created by Steve Kite on 9/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

private func createAttributedText(spec: AsyncTextSpec, attributes: [String: Any]) -> NSAttributedString {
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
      res.append(createAttributedText(spec: s, attributes: innerAttributes))
    }
  }
  return res
}

class RNAsyncTextNode: ASDisplayNode, ASTextNodeDelegate {
  
  let node: ASTextNode
  
  override init() {
    self.node = ASTextNode()
    super.init()
    self.node.delegate = self
    self.node.linkAttributeNames = ["RNClickableText"]
    self.node.passthroughNonlinkTouches = true
    self.node.isUserInteractionEnabled = true
    self.addSubnode(self.node)
    self.isUserInteractionEnabled = true
  }
  
  func setSpec(spec: AsyncTextSpec) {
    
    // Initial Styles
    var attributes: [String: Any] = [:]
    attributes[NSFontAttributeName] = UIFont.systemFont(ofSize: CGFloat(spec.fontSize != nil ? spec.fontSize! : 12), weight: spec.fontWeight != nil ? spec.fontWeight! : UIFontWeightRegular)
    attributes[NSForegroundColorAttributeName] = spec.color != nil ? spec.color : UIColor.black
    let style = NSMutableParagraphStyle();
    style.headIndent = 0.0
    style.tailIndent = 0.0
    style.paragraphSpacing = 0.0
    style.paragraphSpacingBefore = 0.0
    style.lineSpacing = 0.0
    if let v = spec.lineHeight {
      style.minimumLineHeight = CGFloat(v)
      style.maximumLineHeight = CGFloat(v)
    }
    attributes[NSParagraphStyleAttributeName] = style
    if let v = spec.letterSpacing {
      attributes[NSKernAttributeName] = CGFloat(v)
    }
    
    // Set text
    self.node.attributedText = createAttributedText(spec: spec, attributes: attributes)
    

    // Some basic styles
    if let v = spec.numberOfLines {
      self.node.maximumNumberOfLines = UInt(v)
    } else {
      self.node.maximumNumberOfLines = 0
    }
    
    if let v = spec.style.opacity {
      self.node.alpha = CGFloat(v)
    } else {
      self.node.alpha = CGFloat(1)
    }
  }
  
  func textNode(_ textNode: ASTextNode!, shouldHighlightLinkAttribute attribute: String!, value: Any!, at point: CGPoint) -> Bool {
    return true
  }
  
  func textNode(_ textNode: ASTextNode!, tappedLinkAttribute attribute: String!, value: Any!, at point: CGPoint, textRange: NSRange) {
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: value as! String, frame: CGRect.zero, instanceKey: nil)
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
  
  // Pass-through clicks
  override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
    return self.node.point(inside: point, with: event)
  }
}
