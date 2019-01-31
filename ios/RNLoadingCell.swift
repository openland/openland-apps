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
  var overflowColor: UInt64?
  
  override init() {
    super.init()
    self.addSubnode(self.node)
    self.clipsToBounds = false
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
   
    res.style.width = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.width)
    res.style.height = ASDimension(unit: .points, value: 64.0)
    res.child = self.node
    if(self.overflowColor != nil){
      let resBackground = ASDisplayNode()
      resBackground.backgroundColor = resolveColorR(self.overflowColor!)
      resBackground.style.width = ASDimension(unit: ASDimensionUnit.points, value:  UIScreen.main.bounds.width)
      resBackground.style.height = ASDimension(unit: ASDimensionUnit.points, value: 64)
      
      let overflow = ASDisplayNode()
      overflow.backgroundColor = resolveColorR(self.overflowColor!)
      overflow.style.width = ASDimension(unit: ASDimensionUnit.points, value:  UIScreen.main.bounds.width)
      overflow.style.height = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.height)
      overflow.clipsToBounds = false
      
//      let insets = UIEdgeInsets(top:  CGFloat(64 - 1000), left: 0, bottom:0, right: 0)
//      let container = ASInsetLayoutSpec(insets: insets, child: overflow)
      
      let container = ASStackLayoutSpec()
      container.direction = ASStackLayoutDirection.vertical
      container.alignItems = ASStackLayoutAlignItems.center
      container.justifyContent = ASStackLayoutJustifyContent.end
      container.style.width = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.width)
      container.style.height = ASDimension(unit: .points, value: 64.0)
      
      container.setChild(overflow, at: 0)
      container.setChild(ASBackgroundLayoutSpec(child: res, background: resBackground), at: 1)
      
      return container
    }
    return res
  }
}
