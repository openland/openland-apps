//
//  Utils.swift
//  openland
//
//  Created by Steve Kite on 9/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
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
