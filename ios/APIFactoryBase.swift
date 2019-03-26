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
  
  func convertData(src: NSDictionary) -> ResultMap {
    let d = src as! Dictionary<String, Any?>
    var r: [String: Any?] = [:]
    for k in d.keys {
      let v = d[k]
      if v == nil {
        //
      } else if v is String {
        r[k] = v as! String
      } else if v is Int {
        r[k] = v as! Int
      } else if v is Bool {
        r[k] = v as! Bool
      } else {
        r[k] = convertData(src: v as! NSDictionary)
      }
    }
    return r
  }
  
  func readInt(_ src: NSDictionary, _ name: String) -> Int? {
    let res = src[name]
    if res != nil {
      return Int(res as! NSNumber)
    }
    return nil
  }
  
//  func readFloat(_ src: NSDictionary, _ name: String) -> Bool? {
//    return nil
//  }
  
  func readString(_ src: NSDictionary, _ name: String) -> String? {
    let res = src[name]
    if res != nil && !(res is NSNull) {
      return res as! String
    }
    return nil
  }
  
  func readBool(_ src: NSDictionary, _ name: String) -> Bool? {
    let res = src[name]
    if res != nil && !(res is NSNull) {
      return res as! Bool
    }
    return nil
  }
  
  func readStringList(_ src: NSDictionary, _ name: String) -> [String?]? {
    let d = src[name]
    if d != nil && !(d is NSNull) {
      return d as! [String?]
    }
    return nil
  }
  
//  func readIntList(_ src: NSDictionary, _ name: String) -> [String?]? {
//    return nil
//  }
  
//  func readFloatList(_ src: NSDictionary, _ name: String) -> [String?]? {
//    return nil
//  }
  
//  func readBoolList(_ src: NSDictionary, _ name: String) -> [String?]? {
//    return nil
//  }
  
  
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
