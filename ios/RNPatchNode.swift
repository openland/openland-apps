//
//  RNPatchNode.swift
//  openland
//
//  Created by Steve Kite on 9/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

private var patchBaseCache = [String : UIImage]()
private var patchCache = [String : UIImage]()

class RNPatchNode: ASDisplayNode {
  let node: ASImageNode
  private var spec: AsyncPatch? = nil
  
  override init() {
    self.node = ASImageNode()
    super.init()
    self.addSubnode(self.node)
  }
  
  func setSpec(spec: AsyncPatch) {
    
    // Nothing to update
    if self.spec != nil && (spec.source == self.spec!.source && spec.left == self.spec?.left && spec.right == self.spec?.right && spec.top == self.spec?.top && spec.bottom == self.spec?.bottom) {
      return
    }
    
    // Save state
    self.spec = spec
    
    // Base image
    var _baseImage: UIImage? = nil
    if let val = patchBaseCache[spec.source] {
      _baseImage = val
    } else {
      _baseImage = try! UIImage(data: Data(contentsOf: URL(string: spec.source)!), scale: UIScreen.main.scale)
      if _baseImage != nil {
        patchBaseCache[spec.source] = _baseImage
      }
    }
    
    // Result image
    self.node.image = _baseImage?.resizableImage(withCapInsets: UIEdgeInsets(top: CGFloat(spec.top), left: CGFloat(spec.left), bottom: CGFloat(spec.bottom), right: CGFloat(spec.right)), resizingMode: UIImageResizingMode.stretch)
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
