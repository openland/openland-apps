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
  var loading = false {
    didSet {
      let wi = self.weakIndicator
      if wi != nil {
        if (loading) {
          wi?.startAnimating()
          wi?.alpha = 1.0
        } else {
          wi?.stopAnimating()
          wi?.alpha = 0.0
        }
      }
    }
  }
  override init() {
    super.init()
    self.node = ASDisplayNode(viewBlock: { () -> UIView in
      let res = UIActivityIndicatorView()
      res.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
      self.weakIndicator = res
      return res
    })
    self.node.style.preferredSize = CGSize(width: 32.0, height: 32.0)
    self.addSubnode(self.node)
  }
  
  override func didEnterVisibleState() {
    super.didEnterVisibleState()
    if self.loading && self.weakIndicator != nil {
      self.weakIndicator.startAnimating()
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
