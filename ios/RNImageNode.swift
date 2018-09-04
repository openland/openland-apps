//
//  RNImageNode.swift
//  openland
//
//  Created by Steve Kite on 9/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation



class RNImageNode: ASDisplayNode {
  let instanceKey: String = randomKey()
  let key: String
  var touchableKey: String? = nil
  let node: ASNetworkImageNode
  private var url: String? = nil
  
  init(key: String) {
    self.node = ASNetworkImageNode()
    self.key = key
    super.init()
    
    self.node.shouldCacheImage = false; // It doesn't work otherwise
    self.addSubnode(self.node)
    
    self.node.addTarget(self, action: #selector(self.handleTouch), forControlEvents: .touchUpInside)
    
    RNAsyncConfigManager.instances.set(key: self.instanceKey, value: self)
  }
  
  func handleTouch() {
    let res = self.layer.superlayer!.convert(self.layer.frame, to: nil)
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: self.touchableKey!, frame: res, instanceKey: self.instanceKey)
  }

  func setSpec(spec: AsyncImageSpec) {
    if self.url != spec.url {
      self.node.url = URL(string: spec.url)
      self.url = spec.url
    }
    if let v = spec.style.borderRadius {
      self.node.cornerRadius = CGFloat(v)
      if spec.isGif {
        self.node.cornerRoundingType = .defaultSlowCALayer
      } else {
        self.node.cornerRoundingType = .precomposited
      }
    }
    
    self.touchableKey = spec.touchableKey
    if spec.touchableKey != nil {
      self.isUserInteractionEnabled = true
      self.node.isUserInteractionEnabled = true
    } else {
      self.isUserInteractionEnabled = false
      self.node.isUserInteractionEnabled = false
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
