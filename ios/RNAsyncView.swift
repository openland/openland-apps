//
//  RNAsyncView.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(RNAsyncViewManager)
class RNAsyncViewManager: RCTViewManager {
  override func view() -> UIView! {
    return RNAsyncView()
  }
  static override func requiresMainQueueSetup() -> Bool {
    return true
  }
}

@objc(RNAsyncView)
class RNAsyncView: RCTView {
  
  private var node = RNAsyncViewNode()
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    self.addSubview(node.view);
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setConfig(_ config: String) {
    let spec = parseSpec(config)
    self.node.setConfig(spec: spec)
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    node.setFrame(frame: frame)
  }
}

class RNAsyncViewNode: ASDisplayNode {
  
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
    self.pendingFrame = frame;
    if (self.spec != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return resolveNode(spec: self.spec!) as! ASLayoutSpec
  }
}
