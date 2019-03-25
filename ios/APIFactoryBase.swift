//
//  APIFactoryBase.swift
//  openland
//
//  Created by Steve Kite on 3/24/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Apollo

typealias ResponseHandler = (_ result: ResultMap?, _ error: Error?) -> Void
typealias WatchCancel = () -> Void

class ApiFactoryBase {
  func readInt(_ src: NSDictionary, _ name: String) -> Int? {
    let res = src[name]
    if res != nil {
      return res as! Int
    }
    return nil
  }
  
  func readFloat(_ src: NSDictionary, _ name: String) -> Bool? {
    return nil
  }
  
  func readString(_ src: NSDictionary, _ name: String) -> String? {
    let res = src[name]
    if res != nil {
      return res as! String
    }
    return nil
  }
  
  func readBool(_ src: NSDictionary, _ name: String) -> Bool? {
    return nil
  }
  
  func readStringList(_ src: NSDictionary, _ name: String) -> [String?]? {
    return nil
  }
  
  func readIntList(_ src: NSDictionary, _ name: String) -> [String?]? {
    return nil
  }
  
  func readFloatList(_ src: NSDictionary, _ name: String) -> [String?]? {
    return nil
  }
  
  func readBoolList(_ src: NSDictionary, _ name: String) -> [String?]? {
    return nil
  }
  
  
  func notNull<T>(_ v: T?) -> T {
    if v == nil {
      fatalError()
    }
    return v!
  }
  
  func notNullListItems<T>(_ v:[T?]?) -> [T]? {
    if v == nil {
      return nil
    }
    var res: [T] = []
    for i in v! {
      res.append(i!)
    }
    return res
  }
}
