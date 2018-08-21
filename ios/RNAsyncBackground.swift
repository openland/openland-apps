//
//  RNAsyncGradient.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNAsyncBackground: ASDisplayNode {
  
  private let color: UIColor
  
  override class func draw(_ bounds: CGRect, withParameters parameters: Any?, isCancelled isCancelledBlock: () -> Bool, isRasterizing: Bool) {
    
    guard let parameters = parameters as? RNAsyncBackground else {
      // CCLog.assert("Expected type SimpleGradientNode to be returned")
      return
    }
    
    let context = UIGraphicsGetCurrentContext()!
    context.saveGState()
    context.clip(to: bounds)
    parameters.color.setFill()
    UIRectFill(bounds)
    context.restoreGState()
  }
  
  init(_ color: UIColor) {
    self.color = color
    super.init()
    self.isLayerBacked = true
    self.isOpaque = false
  }
  
  override func drawParameters(forAsyncLayer layer: _ASDisplayLayer) -> NSObjectProtocol? {
    return self
  }
}
