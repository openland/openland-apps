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

private class WeakBox {
  weak var value: AnyObject?
  init(value: AnyObject) {
    self.value = value
  }
}

class WeakMap<V> {
  private let cacheSync = DispatchQueue(label: "weakmap")
  private var cache: [String: WeakBox] = [:]
  
  func get(key: String) -> V? {
    var res: V? = nil
    self.cacheSync.sync {
      let ex = self.cache[key]
      if ex != nil {
        let v = ex!.value
        if v != nil {
          res = v! as! V
        } else {
          self.cache.removeValue(forKey: key)
        }
      }
    }
    return res
  }
  
  func set(key: String, value: V) {
    self.cacheSync.sync {
      self.cache[key] = WeakBox(value: value as! AnyObject)
    }
  }
  
  func remove(key: String) {
    self.cacheSync.sync {
      self.cache.removeValue(forKey: key)
    }
  }
  
  func all() -> [(key: String, value: V)] {
    var res: [(key: String, value: V)] = []
    self.cacheSync.sync {
      for kv in self.cache {
        let value = kv.value.value
        if value != nil {
          res.append((kv.key, value! as! V))
        }
      }
    }
    return res
  }
  
  func clear() {
    self.cacheSync.sync {
      self.cache.removeAll()
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
