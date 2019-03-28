//
//  APIFactoryBase.swift
//  openland
//
//  Created by Steve Kite on 3/24/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Apollo

class NativeGraphqlError: Error {
  let src: [GraphQLError]
  init(src: [GraphQLError]) {
    self.src = src
  }
}

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
        if let d2 = v as? NSDictionary {
          r[k] = convertData(src: d2)
        }
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
  
  func readOptionalInt(_ src: NSDictionary, _ name: String) -> Optional<Int?> {
    let res = src[name]
    if res != nil {
      if res is NSNull {
        return Optional.some(nil)
      } else {
        return Optional.some(res as! Int)
      }
    }
    return Optional.none
  }
  
  func readString(_ src: NSDictionary, _ name: String) -> String? {
    let res = src[name]
    if res != nil && !(res is NSNull) {
      return res as! String
    }
    return nil
  }
  
  func readOptionalString(_ src: NSDictionary, _ name: String) -> Optional<String?> {
    let res = src[name]
    if res != nil {
      if res is NSNull {
        return Optional.some(nil)
      } else {
        return Optional.some(res as! String)
      }
    }
    return Optional.none
  }
  
  func readBool(_ src: NSDictionary, _ name: String) -> Bool? {
    let res = src[name]
    if res != nil && !(res is NSNull) {
      return res as! Bool
    }
    return nil
  }
  
  func readOptionalBool(_ src: NSDictionary, _ name: String) -> Optional<Bool?> {
    let res = src[name]
    if res != nil {
      if res is NSNull {
        return Optional.some(nil)
      } else {
        return Optional.some(res as! Bool)
      }
    }
    return Optional.none
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
  
  func optionalNotNull<T>(_ v: Optional<T?>) -> T {
    if v == nil {
      fatalError()
    }
    switch v! {
      case .some(let value): return value
      case .none: fatalError()
    }
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
