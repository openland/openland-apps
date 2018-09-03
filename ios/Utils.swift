//
//  Utils.swift
//  openland
//
//  Created by Steve Kite on 9/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

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
