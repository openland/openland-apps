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
  func close()
}

class LevelDBPersistenceProvider: PersistenceProvier {
  
  static let stores = LazyCollection<SwiftStore>() { name in
    return SwiftStore(storeName: name + "-v5")
  }
  
  private let swiftStore: SwiftStore
  
  init(name: String) {
    self.swiftStore = measure("leveldb:open", LevelDBPersistenceProvider.stores.get(name))
  }
  
  func close() {
    // self.swiftStore.close()
  }
  
  func saveRecords(records: [String: String]) {
    let _ = measure("leveldb:save (" + String(records.count) + ")") {
      for k in records {
        self.swiftStore[k.key] = k.value
      }
    }
  }
  
  func loadRecords(keys: Set<String>) -> [String: String] {
    var res: [String: String] = [:]
    let _ = measure("leveldb:load (" + String(keys.count) + ")") {
      for k in keys {
        if let e = self.swiftStore[k] {
          if !e.isEmpty {
            res[k] = e
          }
        }
      }
    }
    return res
  }
}

class EmptyPersistenceProvier: PersistenceProvier {
  func close() {
    
  }
  
  func saveRecords(records: [String: String]) {
    //
  }
  func loadRecords(keys: Set<String>) -> [String: String] {
    return [:]
  }
}

class SpaceXPersistence {
  private let provider: PersistenceProvier
  private let writerQueue = DispatchQueue(label: "spacex-persistence-write")
  private let readerQueue = DispatchQueue(label: "spacex-persistence-read", attributes: .concurrent)
  
  init(name: String?) {
    if name != nil {
      self.provider = LevelDBPersistenceProvider(name: name!)
    } else {
      self.provider = EmptyPersistenceProvier()
    }
  }
  
  func close() {
    self.provider.close()
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
