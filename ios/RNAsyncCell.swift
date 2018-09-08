//
//  RNAsyncCell.swift
//  openland
//
//  Created by Steve Kite on 9/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNAsyncCell: ASCellNode {
  private let w = UIScreen.main.bounds.width
  let context: RNAsyncViewContext
  var spec: AsyncViewSpec
  
  init(spec: AsyncViewSpec, context: RNAsyncViewContext) {
    self.context = context
    self.spec = spec
    super.init()
    self.automaticallyManagesSubnodes = true
    self.style.width = ASDimension(unit: ASDimensionUnit.points, value: CGFloat(self.w))
  }
  
  // We are updating cell always from background thread
  func setSpec(spec: AsyncViewSpec) {
    self.spec = spec
    self.layoutThatFits(ASSizeRange(min: CGSize(width: self.w, height: 0), max: CGSize(width: self.w, height: 10000)))
    self.setNeedsLayout()
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let res = ASStackLayoutSpec()
    res.direction = ASStackLayoutDirection.vertical
    res.alignItems = ASStackLayoutAlignItems.stretch
    res.child = resolveNode(spec: self.spec, context: self.context)
    res.style.width = ASDimension(unit: ASDimensionUnit.points, value: w)
    return res
  }
}
