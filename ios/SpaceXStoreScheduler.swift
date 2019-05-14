//
//  SpaceXStoreScheduler.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum QueryReadResult {
  case success(data: JSON)
  case missing
}

fileprivate class ReadRequest {
  var missingRecords: Set<String>
  let callback: ()->Void
  
  init(missingRecords: Set<String>, callback: @escaping ()->Void) {
    self.missingRecords = missingRecords
    self.callback = callback
  }
}

class SpaceXStoreScheduler {
  private static let ROOT_QUERY = "ROOT_QUERY"
  private let storeQueue = DispatchQueue(label: "spacex-store")
  private let store = RecordStore()
  
  // Persistence
  private var readRequests: [ReadRequest] = []
  private var isWriting = false
  private var pendingWrite: [String: Record] = [:]
  private var requested: Set<String> = Set()
  private let persistence: SpaceXPersistence
  
  init() {
    persistence = SpaceXPersistence(name: "storage")
  }
  
  func merge(recordSet: RecordSet, queue: DispatchQueue, callback: @escaping () -> Void) {
    self.storeQueue.async {
      // Prepare merging (load required data from disk if needed)
      self.prepareMerge(recordSet: recordSet) {
        
        // Merge data in RAM store
        let changed = self.store.merge(recordSet: recordSet)
        
        // Persist changes to disk
        if changed.count > 0 {
          let toWrite: [String: Record] = changed.mapValues { it in self.store.read(key: it.key) }
          self.persistenceWrite(records: toWrite)
        }
        
        // Invoke calback
        queue.async {
          callback()
        }
      }
    }
  }
  
  func readQueryFromCache(operation: OperationDefinition, variables: JSON, queue: DispatchQueue, callback: @escaping (QueryReadResult) -> Void) {
    if operation.kind != .query {
      fatalError("Reading from cache is available only for queries")
    }
    self.storeQueue.async {
      let res = readFromStore(cacheKey: SpaceXStoreScheduler.ROOT_QUERY, store: self.store, type: operation.selector, variables: variables)
      switch(res) {
      case .missing:
        queue.async {
          callback(QueryReadResult.missing)
        }
      case .success(let data):
        queue.async {
          callback(QueryReadResult.success(data: data))
        }
      }
    }
  }
  
  private func prepareMerge(recordSet: RecordSet, callback: @escaping () -> Void) {
    let missing = recordSet.keys.filter { k in !self.store.isInMemory(key: k) }
    if missing.isEmpty {
      callback()
    } else {
      self.persistenceRead(keys: Set(missing)) {
        self.prepareMerge(recordSet: recordSet, callback: callback)
      }
    }
  }

  private func persistenceWrite(records: RecordSet) {
    for r in records {
      self.pendingWrite[r.key] = r.value
    }
    self.doWriteIfPossible()
  }
  
  private func persistenceRead(keys: Set<String>, callback: @escaping () -> Void) {
    self.readRequests.append(ReadRequest(missingRecords: keys, callback: callback))
    let filtered = keys.subtracting(self.requested)
    if filtered.count != 0 {
      self.doLoad(keys: filtered)
    }
  }
  
  private func doLoad(keys: Set<String>) {
    for k in keys {
      self.requested.insert(k)
    }
    
    self.persistence.loadRecors(keys: keys, queue: self.storeQueue) { res in
      
      // Some health check
      for k in keys {
        if res[k] == nil {
          fatalError("Key " + k + " was not loaded from persistence!")
        }
      }
      
      // Write to store
      self.store.loaded(recordSet: res)
      
      // Notify
      for p in self.readRequests {
        for k in keys {
          p.missingRecords.remove(k)
        }
      }
      let ready = self.readRequests.filter { $0.missingRecords.isEmpty }
      self.readRequests.removeAll { $0.missingRecords.isEmpty }
      for r in ready {
        r.callback()
      }
    }
  }
  
  private func doWriteIfPossible() {
    if !self.pendingWrite.isEmpty && !self.isWriting {
      isWriting = true
      let toWrite = self.pendingWrite
      self.pendingWrite.removeAll()
      self.persistence.saveRecords(records: toWrite, queue: self.storeQueue) {
        self.isWriting = false
        self.doWriteIfPossible()
      }
    }
  }
}
