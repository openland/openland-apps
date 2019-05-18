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

enum QueryReadAndWatchResult {
  case success(data: JSON)
  case missing
  case updated
}

fileprivate class ReadRequest {
  var missingRecords: Set<String>
  let callback: ()->Void
  
  init(missingRecords: Set<String>, callback: @escaping ()->Void) {
    self.missingRecords = missingRecords
    self.callback = callback
  }
}

fileprivate class Subscription {
  let ids: Set<String>
  let callback: () -> Void
  init(ids: Set<String>, callback: @escaping ()->Void) {
    self.ids = ids
    self.callback = callback
  }
}

class SpaceXStore {
  private static let ROOT_QUERY = "ROOT_QUERY"
  private let normalizationQueue = DispatchQueue(label: "spacex-store", attributes: .concurrent)
  private let storeQueue = DispatchQueue(label: "spacex-store")
  
  // Store
  private let store = RecordStore()
  
  // Persistence
  private var readRequests: [ReadRequest] = []
  private var isWriting = false
  private var pendingWrite: [String: Record] = [:]
  private var requested: Set<String> = Set()
  private let persistence: SpaceXPersistence
  
  // Bus
  private var nextSubscriptionId = 1
  private let nextSubscriptionIdQueue = DispatchQueue(label: "spacex-store-id")
  private var subscriptions: [Int: Subscription] = [:]
  
  init(name: String?) {
    persistence = SpaceXPersistence(name: name)
  }
  
  func mergeResponse(operation: OperationDefinition, variables: JSON, data: JSON, queue: DispatchQueue, callback: @escaping () -> Void) {
    self.normalizationQueue.async {
      let rootCacheKey: String?
      if operation.kind == .query {
        rootCacheKey = SpaceXStore.ROOT_QUERY
      } else {
        rootCacheKey = nil
      }
      let normalized: RecordSet
      do {
        normalized = try normalizeRootQuery(rootQueryKey: rootCacheKey, type: operation.selector, args: variables, data: data)
      } catch {
        fatalError("Normalization failed")
      }
      self.merge(recordSet: normalized, queue: queue, callback: callback)
    }
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
        
        // Notify watchers
        if changed.count > 0 {
          var keys = Set<String>()
          for r in changed {
            for f in r.value.fields {
              keys.insert(r.key+"."+f)
            }
          }
          var triggered: [Subscription] = []
          for s in self.subscriptions {
            for k in keys {
              if s.value.ids.contains(k) {
                triggered.append(s.value)
                break
              }
            }
          }
          for t in triggered {
            t.callback()
          }
        }
        
        // Invoke calback
        queue.async {
          callback()
        }
      }
    }
  }
  
  func readQuery(operation: OperationDefinition, variables: JSON, queue: DispatchQueue, callback: @escaping (QueryReadResult) -> Void) {
    if operation.kind != .query {
      fatalError("Reading from cache is available only for queries")
    }
    self.storeQueue.async {
      // Load required records before trying to denormalize data from in memory storage
      self.prepareRead(operation: operation, variables: variables) {
        
        // Reading from store
        let res = readQueryFromStore(cacheKey: SpaceXStore.ROOT_QUERY, store: self.store, type: operation.selector, variables: variables)
        switch(res) {
        case .success(let data):
          queue.async {
            callback(QueryReadResult.success(data: data))
          }
        case .missing:
          queue.async {
            callback(QueryReadResult.missing)
          }
        }
      }
    }
  }
  
  func readQueryAndWatch(
    operation: OperationDefinition,
    variables: JSON,
    queue: DispatchQueue,
    callback: @escaping (QueryReadAndWatchResult) -> Void
  ) {
    self.storeQueue.async {
      // Load required records before trying to denormalize data from in memory storage
      self.prepareRead(operation: operation, variables: variables) {
        
        // Reading from store
        let res = readQueryFromStore(cacheKey: SpaceXStore.ROOT_QUERY, store: self.store, type: operation.selector, variables: variables)
        
        switch(res) {
        case .success(let data):
          // Notify about data
          queue.async {
            callback(QueryReadAndWatchResult.success(data: data))
          }
          
          // Calculate keys
          let normalized = try! normalizeRootQuery(rootQueryKey: SpaceXStore.ROOT_QUERY, type: operation.selector, args: variables, data: data)
          var keys = Set<String>()
          for r in normalized {
            for f in r.value.fields {
              keys.insert(r.key+"."+f.key)
            }
          }
          
          // Subscribe and notify once
          let id = self.nextSubscriptionId
          self.nextSubscriptionId += 1
          self.subscriptions[id] = Subscription(ids: keys) {
            self.subscriptions.removeValue(forKey: id)
            queue.async {
              callback(QueryReadAndWatchResult.updated)
            }
          }
        case .missing:
          queue.async {
            callback(QueryReadAndWatchResult.missing)
          }
        }
      }
    }
  }
  
  func close() {
   self.persistence.close()
  }

  private func prepareRead(operation: OperationDefinition, variables: JSON, callback: @escaping () -> Void) {
    let missing = collectMissingKeysRoot(cacheKey: SpaceXStore.ROOT_QUERY, store: self.store, type: operation.selector, variables: variables)
    if missing.isEmpty {
      callback()
    } else {
      self.persistenceRead(keys: missing) {
        self.prepareRead(operation: operation, variables: variables, callback: callback)
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
