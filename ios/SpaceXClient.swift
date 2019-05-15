//
//  SpaceXClient.swift
//  openland
//
//  Created by Steve Kite on 5/10/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum SpaceXOperationResult {
  case result(data: JSON)
  case error(error: JSON)
}

enum SpaceXReadResult {
  case result(data: JSON)
  case missing
}

enum FetchMode {
  case cacheFirst
  case networkOnly
  case cacheAndNetwork
}

protocol RunningSubscription {
  func updateVariables(variables: JSON)
  func close()
}

class SpaceXClient {
  
  fileprivate var store: SpaceXStoreScheduler
  fileprivate var transport: SpaceXTransportScheduler!
  fileprivate let normalizerQueue = DispatchQueue(label: "spacex-normalizer")
  fileprivate let callbackQueue = DispatchQueue(label: "client")
  var connected: Bool = false
  var onConnected: (() -> Void)?
  var onDisconnected: (() -> Void)?
  
  init(url: String, token: String?, storage: String) {
    NSLog("[SpaceX-Alloc]: init SpaceXClient")
    self.transport = SpaceXTransportScheduler(url: url, params: ["x-openland-token": token])
    self.store = SpaceXStoreScheduler(name: storage)
    self.connected = self.transport.connected
    self.transport.onConnected = { [weak self] in
      if let s = self {
        if !s.connected {
          s.connected = true
          s.onConnected?()
        }
      }
    }
    self.transport.onDisconnected = { [weak self] in
      if let s = self {
        if s.connected {
          s.connected = false
          s.onDisconnected?()
        }
      }
    }
  }
  
  deinit {
    NSLog("[SpaceX-Alloc]: deinit SpaceXClient")
  }
  
  //
  // Simple Operations
  //
  
  func query(operation: OperationDefinition, variables: JSON, fetchMode: FetchMode, handler: @escaping  (SpaceXOperationResult) -> Void) {
    if operation.kind != .query {
      fatalError("Only query operations are supported for querying")
    }
    
    func doRequest() {
      self.transport.operation(operation: operation, variables: variables, queue: self.callbackQueue) { (res) in
        switch(res) {
        case .result(let data):
          self.normalizerQueue.async {
            let normalized: RecordSet
            do {
              normalized = try normalizeRootQuery(rootQueryKey: "ROOT_QUERY", type: operation.selector, args: variables, data: data)
            } catch {
              fatalError("Normalization failed")
            }
            self.store.merge(recordSet: normalized, queue: self.callbackQueue) {
              handler(SpaceXOperationResult.result(data: data))
            }
          }
        case .error(let error):
          handler(SpaceXOperationResult.error(error: error))
        }
      }
    }
    
    callbackQueue.async {
      
      switch(fetchMode) {
      case .cacheFirst:
        self.store.readQuery(operation: operation, variables: variables, queue: self.callbackQueue) { res in
          switch(res) {
          case .missing:
            doRequest()
          case .success(let data):
            handler(SpaceXOperationResult.result(data: data))
          }
        }
        break
      case .networkOnly:
        doRequest()
        break
      default:
        fatalError("Unsupported mode for query")
      }
    }
  }
  
  func mutate(operation: OperationDefinition, variables: JSON, handler: @escaping  (SpaceXOperationResult)->Void) {
    if operation.kind != .mutation {
      fatalError("Only mutation operations are supported for mutating")
    }
    callbackQueue.async { [weak self] in
      if let s = self {
        s.transport.operation(operation: operation, variables: variables, queue: s.callbackQueue) { [weak self] (res) in
          switch(res) {
          case .result(let data):
            if let s = self {
              s.normalizerQueue.async { [weak self] in
                let normalized: RecordSet
                do {
                  normalized = try normalizeRootQuery(rootQueryKey: nil, type: operation.selector, args: variables, data: data)
                } catch {
                  fatalError("Normalization failed")
                }
                if let s = self {
                  s.store.merge(recordSet: normalized, queue: s.callbackQueue) {
                    handler(SpaceXOperationResult.result(data: data))
                  }
                }
              }
            }
          case .error(let error):
            handler(SpaceXOperationResult.error(error: error))
          }
        }
      }
    }
  }
  
  //
  // Watch
  //
  
  func watch(operation: OperationDefinition, variables: JSON, fetchMode: FetchMode, handler: @escaping  (SpaceXOperationResult)->Void) -> (()->Void) {
    let queryWatch = QueryWatch(client: self, operation: operation, variables: variables, fetchMode: fetchMode, handler: handler)
    queryWatch.start()
    return {
      queryWatch.stop()
    }
  }
  
  //
  // Subscription
  //
  
  func subscribe(operation: OperationDefinition, variables: JSON, handler: @escaping  (SpaceXOperationResult)->Void) -> RunningSubscription {
    if operation.kind != .subscription {
      fatalError("Only subscription operations are supported for subscribing")
    }
    let subscription = Subscription(client: self, operation: operation, variables: variables, handler: handler)
    subscription.start()
    return subscription
  }
  
  //
  // Store Modification
  //
  
  func readQuery(operation: OperationDefinition, variables: JSON, callback: @escaping (SpaceXReadResult) -> Void) {
    self.callbackQueue.async { [weak self] in
      if let s = self {
        s.store.readQuery(operation: operation, variables: variables, queue: s.callbackQueue) { res in
          switch(res) {
          case .missing:
            callback(SpaceXReadResult.missing)
          case .success(let data):
            callback(SpaceXReadResult.result(data: data))
          }
        }
      }
    }
  }
  
  func writeQuery(operation: OperationDefinition, variables: JSON, data: JSON, callback: @escaping () -> Void) {
    self.normalizerQueue.async { [weak self] in
      let normalized: RecordSet
      do {
        normalized = try normalizeRootQuery(rootQueryKey: nil, type: operation.selector, args: variables, data: data)
      } catch {
        fatalError("Normalization failed")
      }
      if let s = self {
        s.store.merge(recordSet: normalized, queue: s.callbackQueue) {
          callback()
        }
      }
    }
  }
  
  func dispose() {
    NSLog("[SpaceX-Alloc]: dispose SpaceXClient")
    self.store.close()
    self.transport.close()
    self.transport.onDisconnected = nil
    self.transport.onConnected = nil
    self.transport = nil
  }
}


fileprivate class QueryWatch {
  let operation: OperationDefinition
  let variables: JSON
  let handler: (SpaceXOperationResult) -> Void
  var client: SpaceXClient!
  let fetchMode: FetchMode
  private var completed = false
  
  init(client: SpaceXClient,
       operation: OperationDefinition,
       variables: JSON,
       fetchMode: FetchMode,
       handler: @escaping  (SpaceXOperationResult) -> Void) {
    self.client = client
    self.operation = operation
    self.variables = variables
    self.handler = handler
    self.fetchMode = fetchMode
  }
  
  func start() {
    self.client.callbackQueue.async {
      if self.fetchMode == .cacheFirst || self.fetchMode == .cacheAndNetwork {
        self.doReloadFromCache()
      } else {
        self.doRequest()
      }
    }
  }
  
  private func doReloadFromCache() {
    self.client.store.readQueryAndWatch(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
      switch(res) {
      case .missing:
        self.doRequest()
      case .success(let data):
        self.handler(SpaceXOperationResult.result(data: data))
      case .updated:
        self.doReloadFromCache()
      }
    }
  }
  
  private func doRequest() {
    self.client.transport.operation(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
      if self.completed {
        return
      }
      switch(res) {
      case .result(let data):
        
        let normalized: RecordSet
        do {
          normalized = try normalizeRootQuery(rootQueryKey: "ROOT_QUERY", type: self.operation.selector, args: self.variables, data: data)
        } catch {
          fatalError("Normalization failed")
        }
        self.client.store.merge(recordSet: normalized, queue: self.client.callbackQueue) {
          self.doReloadFromCache()
        }
      case .error(let error):
        self.handler(SpaceXOperationResult.error(error: error))
      }
    }
  }
  
  func stop() {
    client.callbackQueue.async {
      if self.completed {
        return
      }
      self.completed = true
      self.client = nil
      // TODO: Cancel everything
    }
  }
}

fileprivate class Subscription: RunningSubscription {
  var client: SpaceXClient!
  let operation: OperationDefinition
  var variables: JSON
  let handler: (SpaceXOperationResult)->Void
  private var runningOperation: RunningOperation?
  private var stopped = false
  
  init(client: SpaceXClient,
       operation: OperationDefinition,
       variables: JSON,
       handler: @escaping  (SpaceXOperationResult)->Void
  ) {
    self.client = client
    self.operation = operation
    self.variables = variables
    self.handler = handler
  }
  
  func start() {
    self.client.callbackQueue.async {
      self.doStart()
    }
  }
  
  private func doStart() {
    self.runningOperation = self.client.transport.subscription(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
      switch(res) {
      case .completed:
        self.doRestart()
      case .error(let error):
        self.doRestart()
      case .result(let data):
        let normalized: RecordSet
        do {
          normalized = try normalizeRootQuery(rootQueryKey: nil, type: self.operation.selector, args: self.variables, data: data)
        } catch {
          fatalError("Normalization failed")
        }
        self.client.store.merge(recordSet: normalized, queue: self.client.callbackQueue) {
            self.handler(SpaceXOperationResult.result(data: data))
        }
        break
      }
    }
  }
  
  private func doRestart() {
    if !self.stopped {
      self.runningOperation?.cancel()
      self.runningOperation = nil
      self.start()
    }
  }
  
  func updateVariables(variables: JSON) {
    self.client.callbackQueue.async {
       self.runningOperation?.updateVariables(variables: variables)
    }
  }
  
  func close() {
    self.client.callbackQueue.async {
      if !self.stopped {
        self.stopped = true
        self.runningOperation?.cancel()
        self.runningOperation = nil
        self.client = nil
      }
    }
  }
}
