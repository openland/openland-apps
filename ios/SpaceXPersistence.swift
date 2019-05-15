//
//  SpaceXPersistence.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftStore

protocol PersistenceProvier: class {
  func saveRecords(records: [String: String])
  func loadRecords(keys: Set<String>) -> [String: String]
}

class LevelDBPersistenceProvider: PersistenceProvier {
  
  private let swiftStore: SwiftStore
  
  init(name: String) {
    self.swiftStore = SwiftStore(storeName: name + "-v3")
  }
  
  deinit {
    self.swiftStore.close()
  }
  
  func saveRecords(records: [String: String]) {
    for k in records {
      self.swiftStore[k.key] = k.value
    }
  }
  
  func loadRecords(keys: Set<String>) -> [String: String] {
    var res: [String: String] = [:]
    for k in keys {
      if let e = self.swiftStore[k] {
        if !e.isEmpty {
          res[k] = e
        }
      }
    }
    return res
  }
}

class SpaceXPersistence {
  private let provider: PersistenceProvier
  private let writerQueue = DispatchQueue(label: "spacex-persistence-write")
  private let readerQueue = DispatchQueue(label: "spacex-persistence-read", attributes: .concurrent)
  
  init(name: String) {
    self.provider = LevelDBPersistenceProvider(name: name)
  }
  
  func saveRecords(records: RecordSet, queue: DispatchQueue, callback: @escaping () -> Void) {
    writerQueue.async {
      var serialized: [String: String] = [:]
      for k in records {
        serialized[k.key] = serializeRecord(record: k.value)
      }
      self.provider.saveRecords(records: serialized)
      queue.async {
        callback()
      }
    }
  }
  
  func loadRecors(keys: Set<String>, queue: DispatchQueue, callback: @escaping (RecordSet) -> Void) {
    readerQueue.async {
      let loaded = self.provider.loadRecords(keys: keys)
      var res: RecordSet = [:]
      for l in loaded {
        res[l.key] = parseRecord(key: l.key, src: l.value)
      }
      
      // Fill empty for missing records
      for k in keys {
        if res[k] == nil {
          res[k] = Record(key: k, fields: [:])
        }
      }
      
      queue.async {
        callback(res)
      }
    }
  }
}
