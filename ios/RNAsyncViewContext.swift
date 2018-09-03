//
//  RNAsyncViewContext.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

class RNAsyncViewContext {
  private var cache = NSMapTable<NSString, AnyObject>(keyOptions: NSPointerFunctions.Options.strongMemory, valueOptions: NSPointerFunctions.Options.weakMemory)
  
  func fetchCached<T>(key: String, builder: () -> T) -> T {
    var res: T? = nil
    lock(self.cache) {
      res = self.cache.object(forKey: NSString(string: key)) as? T
      if res == nil {
        res = builder()
        self.cache.setObject(res as! AnyObject, forKey: NSString(string: key))
      }
    }
    return res!
  }
}
