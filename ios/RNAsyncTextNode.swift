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

class RNAsyncTextNode: ASTextNode, ASTextNodeDelegate {
  
  override init() {
    super.init()
    self.delegate = self
    self.linkAttributeNames = ["RNClickableText"]
    self.passthroughNonlinkTouches = true
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
    
    // Set text
    if (self.attributedText == nil) {
      self.attributedText = createAttributedText(spec: spec, attributes: attributes)
    } else {
      let n = createAttributedText(spec: spec, attributes: attributes)
      if n.string != self.attributedText!.string {
        self.attributedText = n
      }
    }

    // Some basic styles
    if let v = spec.numberOfLines {
      self.maximumNumberOfLines = UInt(v)
    } else {
      self.maximumNumberOfLines = 0
    }
    
    if let v = spec.style.opacity {
      self.alpha = CGFloat(v)
    } else {
      self.alpha = CGFloat(1)
    }
  }
  
  func textNode(_ textNode: ASTextNode!, shouldHighlightLinkAttribute attribute: String!, value: Any!, at point: CGPoint) -> Bool {
    return true
  }
  
  func textNode(_ textNode: ASTextNode!, tappedLinkAttribute attribute: String!, value: Any!, at point: CGPoint, textRange: NSRange) {
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: value as! String, frame: CGRect.zero, instanceKey: nil)
  }
}
