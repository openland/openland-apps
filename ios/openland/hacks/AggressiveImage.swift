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
  private var image:UIImageView?
  private var _source: String? = nil;
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    self.frame = frame;
    image = UIImageView(frame: frame);
    self.addSubview(image!)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setSource(_ s: NSString) {
    _source = s as String;
    
    Nuke.loadImage(with: URL(string: (s as String))!, into: self.image!)
    
    // self.image?.image = UIImage(contentsOfFile: self._source!)
    // print("Loaded");
    // print(self.image!.image!.size.width);
  }
  
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    self.image?.frame = frame;
  }
}

@objc(AggressiveImageManager)
class AggressiveImageManager: RCTViewManager {
  override func view() -> UIView! {
    return AggressiveImage()
  }
}
