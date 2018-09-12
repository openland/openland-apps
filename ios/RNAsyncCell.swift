//
//  RNAsyncCell.swift
//  openland
//
//  Created by Steve Kite on 9/7/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

let range = ASSizeRange(min: CGSize(width: UIScreen.main.bounds.width, height: 0), max: CGSize(width: UIScreen.main.bounds.width, height: 10000))

class RNAsyncCell: ASCellNode {
  let context: RNAsyncViewContext
  var spec: AsyncViewSpec
  var node: ASLayoutElement!
  
  init(spec: AsyncViewSpec, context: RNAsyncViewContext) {
    self.context = context
    self.spec = spec
    super.init()
    self.node = resolveNode(spec: spec, context: self.context)
    self.automaticallyManagesSubnodes = true
    self.setNeedsLayout()
    self.layoutThatFits(range)
  }
  
  // We are updating cell always from background thread
  func setSpec(spec: AsyncViewSpec) {
    self.spec = spec
    self.node = resolveNode(spec: spec, context: self.context)
    self.layoutThatFits(range)
    self.setNeedsLayout()
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let res = ASStackLayoutSpec()
    res.direction = ASStackLayoutDirection.vertical
    res.alignItems = ASStackLayoutAlignItems.stretch
    res.child = self.node
    res.style.width = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.width)
    return res
  }
}
