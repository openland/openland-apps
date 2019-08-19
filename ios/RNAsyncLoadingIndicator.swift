//
//  RNAsyncLoadingIndicator.swift
//  openland
//
//  Created by Steve Kite on 8/28/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNAsyncLoadingIndicator: ASDisplayNode {
  private weak var indicator: UIImage!
  private var node: ASDisplayNode!
  private var animation: CABasicAnimation!

  var loaderColor: UIColor = UIColor.gray {
    didSet {
      if self.indicator != nil {
        self.indicator = self.indicator?.tint(tintColor: self.loaderColor)
      }
    }
  }

  var loading = false {
    didSet {
      if self.node != nil {
        if (loading) {
          self.node.layer.add(self.animation, forKey: "loader.rotating")
          self.node.alpha = 1.0
        } else {
          self.node.layer.removeAnimation(forKey: "loader.rotating")
          self.node.alpha = 0.0
        }
      }
    }
  }

  override init() {
    super.init()

    self.node = ASDisplayNode(viewBlock: { () -> UIImageView in
      var image = UIImage(named: "LoaderMedium")
      image = image?.tint(tintColor: self.loaderColor)
      
      let view = UIImageView(image: image!)
      
      view.frame = CGRect(x: 0, y: 0, width: UIImage(named: "LoaderMedium")!.size.width, height: UIImage(named: "LoaderMedium")!.size.height)
      view.center = CGPoint(x: view.frame.size.width / 2.0, y: view.frame.size.height / 2.0)

      self.animation = CABasicAnimation(keyPath: "transform.rotation")
      self.animation.fromValue = 0.0
      self.animation.toValue = CGFloat(.pi * 2.0)
      self.animation.duration = 1
      self.animation.repeatCount = .greatestFiniteMagnitude
      
      view.layer.add(self.animation, forKey: "loader.rotating")
      
      self.indicator = image
      return view
    })

    self.node.style.preferredSize = CGSize(width: 24.0, height: 24.0)
    self.addSubnode(self.node)
  }

  override func didEnterVisibleState() {
    super.didEnterVisibleState()
    if self.loading && self.indicator != nil {
      self.node.layer.add(self.animation, forKey: "loader.rotating")
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
