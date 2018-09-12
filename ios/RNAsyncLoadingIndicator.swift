//
//  RNAsyncLoadingIndicator.swift
//  openland
//
//  Created by Steve Kite on 8/28/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNAsyncLoadingIndicator: ASDisplayNode {
  private weak var weakIndicator: UIActivityIndicatorView!
  private var node: ASDisplayNode!
  override init() {
    super.init()
    self.node = ASDisplayNode(viewBlock: { () -> UIView in
      let res = UIActivityIndicatorView()
      res.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
      res.startAnimating()
      self.weakIndicator = res
      return res
    })
    self.node.style.preferredSize = CGSize(width: 32.0, height: 32.0)
    self.addSubnode(self.node)
  }
  
  override func didEnterVisibleState() {
    super.didEnterVisibleState()
    if self.weakIndicator != nil {
      self.weakIndicator.startAnimating()
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
