//
//  RNGraphQLPersistenceSQL.swift
//  openland
//
//  Created by Steve Kite on 4/12/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SQLite

struct CacheRecrod {
  var value: String? = nil
}

func getCurrentMillis()->Int64{
  return  Int64(NSDate().timeIntervalSince1970 * 1000)
}

class RNGraphQLPersistenceSQL: RNGraphQLPersistenceEngine {
 
  static let VERSION = 5
  
  private let db: Connection
  private let records = Table("records")
  private let key = Expression<String>("key")
  private let record = Expression<String>("record")
  private let queue = DispatchQueue(label: "GQLPersistence", attributes: [])
  private var cache: Dictionary<String,CacheRecrod> = [:]
  
  init(fileURL: URL) throws {
    db = try Connection(.uri(fileURL.absoluteString), readonly: false)
    
    try createTableIfNeeded()
  }
  
  func load(keys: [String]) throws -> [RNGraphQLPersistenceRecord] {
    return try sync {
      let start = getCurrentMillis()
      print("[SQL]: load \(keys)")
      var precached: [RNGraphQLPersistenceRecord] = []
      var missingKeys: [String] = []
      for k in keys {
        let r = cache[k]
        if (r == nil) {
          missingKeys.append(k)
        } else {
          if r!.value != nil {
            precached.append(RNGraphQLPersistenceRecord(key: k, value: r!.value!))
          }
        }
      }
      if missingKeys.count > 0 {
        let query = records.filter(missingKeys.contains(key))
        precached = precached + (try db.prepare(query).map { RNGraphQLPersistenceRecord(key: $0[self.key], value: $0[self.record]) })
      }
      print("[SQL]: in \(getCurrentMillis() - start) ms")
      return precached
    }
  }
  
  func persist(key: String, value: String) throws {
    try sync {
      let start = getCurrentMillis()
      print("[SQL]: persist \(key)")
      cache[key] = CacheRecrod(value: value)
      try db.transaction {
       try db.run(self.records.insert(or: .replace, self.key <- key, self.record <- value))
      }
      print("[SQL]: in \(getCurrentMillis() - start) ms")
    }
  }
  
  func clearEngine() throws {
    try sync {
      cache.removeAll()
      try db.run(records.delete())
    }
  }
  
  private func createTableIfNeeded() throws {
    try db.run(records.create(ifNotExists: true) { table in
      table.column(key, primaryKey: true)
      table.column(record)
    })
    try db.run(records.createIndex(key, unique: true, ifNotExists: true))
  }
  
  private func sync<T>(_ block: () throws -> T) rethrows -> T {
    return try queue.sync(execute: block)
  }
}
