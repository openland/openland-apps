//
//  Utils.swift
//  openland
//
//  Created by Steve Kite on 9/3/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation
import UIKit

func randomKey() -> String {
  return UUID().uuidString
}

func lock(_ obj: AnyObject, blk:() -> ()) {
  objc_sync_enter(obj)
  blk()
  objc_sync_exit(obj)
}

class WeakMap<V: AnyObject> {
  private var cache = NSMapTable<NSString, V>(keyOptions: NSPointerFunctions.Options.strongMemory, valueOptions: NSPointerFunctions.Options.weakMemory)
  
  func get(key: String) -> V? {
    var res: V? = nil
    lock(self.cache) {
      res = self.cache.object(forKey: NSString(string: key))
    }
    return res
  }
  
  func set(key: String, value: V) {
    lock(self.cache) {
      self.cache.setObject(value, forKey: NSString(string: key))
    }
  }
}

extension UIResponder {
  private weak static var _currentFirstResponder: UIResponder? = nil
  
  public static var current: UIResponder? {
    UIResponder._currentFirstResponder = nil
    UIApplication.shared.sendAction(#selector(findFirstResponder(sender:)), to: nil, from: nil, for: nil)
    return UIResponder._currentFirstResponder
  }
  
  @objc internal func findFirstResponder(sender: AnyObject) {
    UIResponder._currentFirstResponder = self
  }
}

public class Signpost {
  static func start( code:UInt32, arg1:UInt = 0, arg2:UInt = 0, arg3:UInt = 0, arg4:UInt = 0 ) -> Int32 {
    if #available(iOS 10.0, *) {
      return kdebug_signpost_start(code,arg1,arg2,arg3,arg4);
    } else {
      return 0;
    }
  }
  
  static func end( code:UInt32, arg1:UInt = 0, arg2:UInt = 0, arg3:UInt = 0, arg4:UInt = 0 ) -> Int32 {
    if #available(iOS 10.0, *) {
      return kdebug_signpost_end(code,arg1,arg2,arg3,arg4)
    } else {
      return 0;
    }
  }
  
  static func point( code:UInt32, arg1:UInt = 0, arg2:UInt = 0, arg3:UInt = 0, arg4:UInt = 0 ) -> Int32 {
    if #available(iOS 10.0, *) {
      return kdebug_signpost(code,arg1,arg2,arg3,arg4)
    } else {
      return 0;
    }
  }
  
  static func id() -> UInt {
    return UInt(arc4random_uniform(256))
  }
}

extension UIImage {
  
  // colorize image with given tint color
  // this is similar to Photoshop's "Color" layer blend mode
  // this is perfect for non-greyscale source images, and images that have both highlights and shadows that should be preserved
  // white will stay white and black will stay black as the lightness of the image is preserved
  func tint(tintColor: UIColor) -> UIImage {
    
    return modifiedImage { context, rect in
      // draw black background - workaround to preserve color of partially transparent pixels
      context.setBlendMode(.normal)
      UIColor.black.setFill()
      context.fill(rect)
      
      // draw original image
      context.setBlendMode(.normal)
      context.draw(self.cgImage!, in: rect)
      
      // tint image (loosing alpha) - the luminosity of the original image is preserved
      context.setBlendMode(.color)
      tintColor.setFill()
      context.fill(rect)
      
      // mask by alpha values of original image
      context.setBlendMode(.destinationIn)
      context.draw(self.cgImage!, in: rect)
    }
  }
  
  // fills the alpha channel of the source image with the given color
  // any color information except to the alpha channel will be ignored
  func fillAlpha(fillColor: UIColor) -> UIImage {
    
    return modifiedImage { context, rect in
      // draw tint color
      context.setBlendMode(.normal)
      fillColor.setFill()
      context.fill(rect)
      //            context.fillCGContextFillRect(context, rect)
      
      // mask by alpha values of original image
      context.setBlendMode(.destinationIn)
      context.draw(self.cgImage!, in: rect)
    }
  }
  
  private func modifiedImage( draw: (CGContext, CGRect) -> ()) -> UIImage {
    
    // using scale correctly preserves retina images
    UIGraphicsBeginImageContextWithOptions(size, false, scale)
    let context: CGContext! = UIGraphicsGetCurrentContext()
    assert(context != nil)
    
    // correctly rotate image
    context.translateBy(x: 0, y: size.height)
    context.scaleBy(x: 1.0, y: -1.0)
    
    let rect = CGRect(x: 0.0, y: 0.0, width: size.width, height: size.height)
    
    draw(context, rect)
    
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return image!
  }
  
}
