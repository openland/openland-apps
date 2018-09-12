//
//  RNAsyncTextNode.swift
//  openland
//
//  Created by Steve Kite on 9/4/18.
//  Copyright © 2018 Openland. All rights reserved.
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

//class RNAsyncTextNode: ASDisplayNode {
//  private let layout = TextNode.asyncLayout(nil)
//  private var currentSpec: AsyncTextSpec!
//
//  override init() {
//    super.init()
//    self.automaticallyManagesSubnodes = true
//  }
//
//  func setSpec(spec: AsyncTextSpec) {
//    self.currentSpec = spec
//  }
//
//  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
//    var numberOfLines = 0
//    if let v = self.currentSpec.numberOfLines {
//      numberOfLines = Int(v)
//    }
//
//    let node = self.layout(TextNodeLayoutArguments(attributedString: self.currentSpec.attributedText, maximumNumberOfLines: numberOfLines, truncationType: .end, constrainedSize: CGSize(width: 100, height: 100))).1()
//    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: node)
//  }
//}

class RNAsyncTextNode: ASTextNode, ASTextNodeDelegate {

  override init() {
    super.init()
    self.delegate = self
    self.linkAttributeNames = ["RNClickableText"]
    self.passthroughNonlinkTouches = true
    self.isUserInteractionEnabled = true
    self.placeholderEnabled = false
  }

  func setSpec(spec: AsyncTextSpec) {

    // Set text
    if (self.attributedText == nil) {
      self.attributedText = spec.attributedText
    } else {
      if spec.attributedText.string != self.attributedText!.string {
        self.attributedText = spec.attributedText
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
