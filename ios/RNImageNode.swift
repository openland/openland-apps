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
  private var currentTintColor: UIColor? = nil
  
  override init() {
    self.node = ASImageNode()
    super.init()
    
    // self.node.shouldCacheImage = false; // It doesn't work otherwise
    self.addSubnode(self.node)
    
    self.node.addTarget(self, action: #selector(self.handleTouch), forControlEvents: .touchUpInside)
    
    RNAsyncConfigManager.instances.set(key: self.instanceKey, value: self)
  }
  
  @objc func handleTouch() {
    let res = self.layer.superlayer!.convert(self.layer.frame, to: nil)
    AsyncViewEventEmitter.sharedInstance.dispatchOnPress(key: self.touchableKey!, frame: res, instanceKey: self.instanceKey)
  }

  func setSpec(spec: AsyncImageSpec) {
    if self.url != spec.url || self.currentTintColor?.description != spec.tintColor?.description {
      // Cancel previous task
      self.task?.cancel()
      self.url = spec.url
      self.currentTintColor = spec.tintColor
      print("@@@ URL \(spec.url) \(spec.style.width) \(spec.style.height)")
      if spec.url != "" && spec.url != nil {
        let targetSize = CGSize(width: CGFloat(spec.style.width!) * UIScreen.main.scale, height: CGFloat(spec.style.height!) * UIScreen.main.scale)
        
        if spec.url.starts(with: "data:image/jpeg;base64,") {
          let dataDecoded : Data = Data(base64Encoded: spec.url.replacingOccurrences(of: "data:image/jpeg;base64,", with: ""), options: .ignoreUnknownCharacters)!
          let decodedimage = UIImage(data: dataDecoded)
          self.node.image = decodedimage
        } else {
          let targetUrl = URL(string: spec.url)!
        let targetContentMode = ImageDecompressor.ContentMode.aspectFill
        let targetRequest = ImageRequest(url: targetUrl, targetSize: targetSize, contentMode: targetContentMode)
        self.task = ImagePipeline.shared.loadImage(with: targetRequest, progress: nil) { (response, error) in
          if response != nil {
            if spec.tintColor != nil {
//              let modificationBlock = { (originalImage: UIImage, traitCollection: ASPrimitiveTraitCollection) -> UIImage? in
//                  return ASImageNodeTintColorModificationBlock(spec.tintColor!)(originalImage, traitCollection)
//              }
              self.node.imageModificationBlock = ASImageNodeTintColorModificationBlock(spec.tintColor!)
              }
              self.node.image = response?.image
              
            } else {
              print(error.debugDescription)
            }
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
    
    if let v = spec.style.opacity {
      self.node.alpha = CGFloat(v)
    }
    
    // self.node.tintColor = spec.tintColor
  }
  
  override func willEnterHierarchy() {
    if(self.node.displaySuspended){
      recursivelySetDisplaySuspended(false)
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return ASInsetLayoutSpec(insets: UIEdgeInsets.zero, child: self.node)
  }
}
