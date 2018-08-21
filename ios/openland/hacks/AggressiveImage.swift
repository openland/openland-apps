//
//  AggressiveImage.swift
//  openland
//
//  Created by Steve Kite on 8/19/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import Nuke

@objc(AggressiveImage)
class AggressiveImage: RCTView {
  static var cache = [String : UIImage]()
  private var imageView: UIImageView!
  private var _baseImage: UIImage? = nil;
  private var _source: String? = nil;
  private var _insets: UIEdgeInsets = UIEdgeInsets.zero;
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    self.frame = frame;
    imageView = UIImageView(frame: frame);
    self.addSubview(imageView)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setSource(_ s: NSString) {
    _source = s as String;
    if let val = AggressiveImage.cache[s as String] {
      _baseImage = val
    } else {
      _baseImage = try! UIImage(data: Data(contentsOf: URL(string: s as String)!), scale: UIScreen.main.scale)
      if _baseImage != nil {
        AggressiveImage.cache[s as String] = _baseImage
      }
    }
    if _baseImage != nil {
      if UIEdgeInsetsEqualToEdgeInsets(self._insets, UIEdgeInsets.zero) {
        imageView.image = _baseImage
      } else {
        imageView.image = _baseImage!.resizableImage(withCapInsets: self._insets, resizingMode: UIImageResizingMode.stretch)
      }
    } else {
      imageView.image = nil
    }
  }
  
  public func setCapInsets(_ insets: UIEdgeInsets) {
    _insets = insets
    if _baseImage != nil {
      if UIEdgeInsetsEqualToEdgeInsets(self._insets, UIEdgeInsets.zero) {
        imageView.image = _baseImage
      } else {
        imageView.image = _baseImage!.resizableImage(withCapInsets: self._insets, resizingMode: UIImageResizingMode.stretch)
      }
    }
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    self.imageView.frame = frame;
  }
}

@objc(AggressiveImageManager)
class AggressiveImageManager: RCTViewManager {
  override func view() -> UIView! {
    return AggressiveImage()
  }
  static override func requiresMainQueueSetup() -> Bool {
    return true
  }
}
