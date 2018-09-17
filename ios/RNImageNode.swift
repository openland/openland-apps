//
//  RNImageNode.swift
//  openland
//
//  Created by Steve Kite on 9/3/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation
import Nuke

class RNImageNode: ASDisplayNode {
  let instanceKey: String = randomKey()
  var touchableKey: String? = nil
  let node: ASImageNode
  var task: ImageTask? = nil
  private var url: String? = nil
  
  override init() {
    self.node = ASImageNode()
    super.init()
    
    // self.node.shouldCacheImage = false; // It doesn't work otherwise
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
      // Cancel previous task
      if self.task != nil {
        self.task?.cancel()
      }
      self.url = spec.url
      if spec.url != "" {
        let targetSize = CGSize(width: CGFloat(spec.style.width!) * UIScreen.main.scale, height: CGFloat(spec.style.height!) * UIScreen.main.scale)
        let targetUrl = URL(string: spec.url)!
        let targetContentMode = ImageDecompressor.ContentMode.aspectFill
        let targetRequest = ImageRequest(url: targetUrl, targetSize: targetSize, contentMode: targetContentMode)
        self.task = ImagePipeline.shared.loadImage(with: targetRequest, progress: nil) { (response, error) in
          if response != nil {
            let img = UIImage(cgImage: response!.image.cgImage!)
            self.node.image = img
          } else {
            print(error.debugDescription)
          }
        }
      }
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
