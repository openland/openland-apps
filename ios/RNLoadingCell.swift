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
  var loaderColor: UInt64? = nil {
    didSet {
      self.node.loaderColor = self.loaderColor != nil ?  resolveColorR(self.loaderColor!) : UIColor.gray
    }
  }
  
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
   
    let resBackground = ASDisplayNode()
    resBackground.backgroundColor = self.overflowColor != nil ? resolveColorR(self.overflowColor!) : UIColor.clear
    resBackground.style.width = ASDimension(unit: ASDimensionUnit.points, value:  UIScreen.main.bounds.width)
    resBackground.style.height = ASDimension(unit: ASDimensionUnit.points, value: 64)
    
    let overflow = ASDisplayNode()
    overflow.backgroundColor = self.overflowColor != nil ? resolveColorR(self.overflowColor!) : UIColor.clear
    overflow.style.width = ASDimension(unit: ASDimensionUnit.points, value:  UIScreen.main.bounds.width)
    overflow.style.height = ASDimension(unit: ASDimensionUnit.points, value: UIScreen.main.bounds.height)
    overflow.clipsToBounds = false
    
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
}
