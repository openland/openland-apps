//
//  RNAsyncViewNode.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNAsyncViewNode: ASDisplayNode {
  
  let context = RNAsyncViewContext()
  var spec: AsyncViewSpec? = nil
  var pendingFrame: CGRect? = nil
  
  required override init() {
    super.init()
    self.automaticallyManagesSubnodes = true
  }
  
  public func setConfig(spec: AsyncViewSpec) {
    self.spec = spec;
    if (self.pendingFrame != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  public func setFrame(frame: CGRect) {
    self.pendingFrame = CGRect(origin: CGPoint.zero, size: frame.size)
    if (self.spec != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let res = resolveNode(spec: self.spec!, context: self.context)
    if res is ASLayoutSpec {
      return res as! ASLayoutSpec
    } else {
      return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: res)
    }
  }
}
