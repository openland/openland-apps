//
//  RNAsyncGradient.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

class RNAsyncGradientParams: NSObject {
  let startUnitPoint: CGPoint;
  let endUnitPoint: CGPoint;
  let colors: [UIColor];
  let locations: [CGFloat]?;
  let borderRadius: CGFloat
  
  init(startingAt startUnitPoint: CGPoint, endingAt endUnitPoint: CGPoint, with colors: [UIColor], for locations: [CGFloat]? = nil, borderRadius: CGFloat) {
    self.startUnitPoint = startUnitPoint
    self.endUnitPoint = endUnitPoint
    self.colors = colors
    self.locations = locations
    self.borderRadius = borderRadius
  }
}

class RNAsyncGradient: ASDisplayNode {
  
  private var params: RNAsyncGradientParams

  init(startingAt startUnitPoint: CGPoint, endingAt endUnitPoint: CGPoint, with colors: [UIColor], for locations: [CGFloat]? = nil, borderRadius: CGFloat) {
    self.params = RNAsyncGradientParams(startingAt: startUnitPoint, endingAt: endUnitPoint, with: colors, for: locations, borderRadius: borderRadius)
    super.init()
    self.isLayerBacked = true
    self.isOpaque = false
  }
  
  override func drawParameters(forAsyncLayer layer: _ASDisplayLayer) -> NSObjectProtocol? {
    return self.params
  }
  
  func update(startingAt startUnitPoint: CGPoint, endingAt endUnitPoint: CGPoint, with colors: [UIColor], for locations: [CGFloat]? = nil,borderRadius: CGFloat) {
    self.params = RNAsyncGradientParams(startingAt: startUnitPoint, endingAt: endUnitPoint, with: colors, for: locations,borderRadius: borderRadius)
    self.setNeedsDisplay()
  }
  
  override class func draw(_ bounds: CGRect, withParameters parameters: Any?, isCancelled isCancelledBlock: () -> Bool, isRasterizing: Bool) {
    guard let parameters = parameters as? RNAsyncGradientParams else {
      // CCLog.assert("Expected type SimpleGradientNode to be returned")
      return
    }
    
    // Calculate the start and end points
    let startUnitX = parameters.startUnitPoint.x
    let startUnitY = parameters.startUnitPoint.y
    let endUnitX = parameters.endUnitPoint.x
    let endUnitY = parameters.endUnitPoint.y
    
    // [[UIBezierPath bezierPathWithRoundedRect:boundingBox cornerRadius:cornerRadius] addClip];
    
    
    let startPoint = CGPoint(x: bounds.width * startUnitX + bounds.minX, y: bounds.height * startUnitY + bounds.minY)
    let endPoint = CGPoint(x: bounds.width * endUnitX + bounds.minX, y: bounds.height * endUnitY + bounds.minY)
    
    let context = UIGraphicsGetCurrentContext()!
    context.saveGState()
    UIBezierPath(roundedRect: bounds, cornerRadius: parameters.borderRadius).addClip()
    
    guard let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(),
                                    colors: parameters.colors.map { $0.cgColor } as CFArray,
                                    locations: parameters.locations) else {
                                      // CCLog.assert("Unable to create CGGradient")
                                      return
    }
    
    context.drawLinearGradient(gradient,
                               start: startPoint,
                               end: endPoint,
                               options: CGGradientDrawingOptions.drawsAfterEndLocation)
    context.restoreGState()
  }
  
}
