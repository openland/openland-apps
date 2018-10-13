//
//  RNLoadingCell.swift
//  openland
//
//  Created by Steve Kite on 10/13/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNLoadingCell: ASCellNode {
  private var node = RNAsyncLoadingIndicator()
  
  override init() {
    super.init()
    self.addSubnode(self.node)
  }
  
  var loading: Bool = false {
    didSet {
      self.node.loading = self.loading
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    let res = ASStackLayoutSpec()
    res.direction = ASStackLayoutDirection.vertical
    res.alignItems = ASStackLayoutAlignItems.center
    res.justifyContent = ASStackLayoutJustifyContent.center
    res.child = self.node
    res.style.width = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.width)
    res.style.height = ASDimension(unit: ASDimensionUnit.points, value: 64.0)
    return res
  }
}
