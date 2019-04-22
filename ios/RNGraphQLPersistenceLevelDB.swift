//
//  RNGraphQLPersistenceLevelDB.swift
//  openland
//
//  Created by Steve Kite on 4/12/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftStore

class RNGraphQLPersistenceLevelDB: RNGraphQLPersistenceEngine {
  
  static let VERSION = 2
  
  private let swiftStore: SwiftStore
  private let queue = DispatchQueue(label: "GQLPersistence", attributes: [])
  private var cache: Dictionary<String,CacheRecrod> = [:]

  init(name: String) throws {
    swiftStore = SwiftStore(storeName: name)
  }

  func load(keys: [String]) throws -> [RNGraphQLPersistenceRecord] {
    return try sync {
      let start = getCurrentMillis()
      // print("[LDB]: load \(keys)")
      var res: [RNGraphQLPersistenceRecord] = []
      for k in keys {
        let r = cache[k]
        if r != nil {
          if r!.value != nil {
            res.append(RNGraphQLPersistenceRecord(key: k, value: r!.value!))
          }
        } else {
          if k == "MUTATION_ROOT" || k == "SUBSCRIPTION_ROOT" || k.hasPrefix("SUBSCRIPTION_ROOT.") || k.hasPrefix("MUTATION_ROOT.") {
            cache[k] = CacheRecrod(value: nil)
          } else {
            if let v = swiftStore[k] {
              if !v.isEmpty {
                res.append(RNGraphQLPersistenceRecord(key: k, value: v))
                cache[k] = CacheRecrod(value: v)
              } else {
                cache[k] = CacheRecrod(value: nil)
              }
            }
          }
        }
      }
      // print("[LDB]: in \(getCurrentMillis() - start) ms")
      return res
    }
  }

  func persist(key: String, value: String) throws {
    try sync {
      // print("persist \(key)")
      // let start = getCurrentMillis()
      cache[key] = CacheRecrod(value: value)
      if key == "SUBSCRIPTION_ROOT" || key.hasPrefix("SUBSCRIPTION_ROOT.") {
        return
      }
      if key == "MUTATION_ROOT" || key.hasPrefix("MUTATION_ROOT.") {
        return
      }
      swiftStore[key] = value
      // print("[LDB]: in \(getCurrentMillis() - start) ms")
    }
  }

  func clearEngine() throws {
    // Not supporteds
  }
  
  private func sync<T>(_ block: () throws -> T) rethrows -> T {
    return try queue.sync(execute: block)
  }
}
