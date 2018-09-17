//
//  RNAsyncGradient.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNAsyncColor: ASDisplayNode {
  
  init(_ color: UIColor) {
    super.init()
    self.isLayerBacked = true
    self.isOpaque = false
    self.backgroundColor = color
  }
  
  func update(color: UIColor) {
    self.backgroundColor = color
  }
}
