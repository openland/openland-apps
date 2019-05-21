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

enum FetchMode: String {
  case cacheFirst = "cache-first"
  case networkOnly = "network-only"
  case cacheAndNetwork = "cache-and-network"
}

protocol RunningSubscription {
  func close()
}

class SpaceXClient {
  
  fileprivate var store: SpaceXStore
  fileprivate var transport: SpaceXTransport!
  fileprivate let callbackQueue = DispatchQueue(label: "client")
  var connected: Bool = false
  var onConnected: (() -> Void)?
  var onDisconnected: (() -> Void)?
  
  init(url: String, token: String?, storage: String?) {
    NSLog("[SpaceX-Alloc]: init SpaceXClient")
    self.transport = SpaceXTransport(url: url, params: ["x-openland-token": token])
    self.store = SpaceXStore(name: storage)
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
  
  func query(
    operation: OperationDefinition,
    variables: JSON,
    fetchMode: FetchMode,
    handler: @escaping  (SpaceXOperationResult) -> Void
  ) {
    if operation.kind != .query {
      fatalError("Only query operations are supported for querying")
    }
    
    NSLog("[SpaceX-Client]: Query \(operation.name) with \(fetchMode)")
    
    /*
     * There are two modes supported for query operation:
     * Cache First: Try to read data from cache and if it fails - read from network
     * Network Only: Try to read data from network only
     */
    
    func doRequest() {
      self.transport.operation(operation: operation, variables: variables, queue: self.callbackQueue) { (res) in
        switch(res) {
        case .result(let data):
          self.store.mergeResponse(operation: operation, variables: variables, data: data, queue: self.callbackQueue) {
            handler(SpaceXOperationResult.result(data: data))
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
            NSLog("[SpaceX-Client]: Query \(operation.name) is missing")
            doRequest()
          case .success(let data):
            NSLog("[SpaceX-Client]: Query \(operation.name) success")
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
  
  func mutate(
    operation: OperationDefinition,
    variables: JSON,
    handler: @escaping (SpaceXOperationResult) -> Void
  ) {
    if operation.kind != .mutation {
      fatalError("Only mutation operations are supported for mutating")
    }
    callbackQueue.async {
      self.transport.operation(operation: operation, variables: variables, queue: self.callbackQueue) { res in
        switch(res) {
        case .result(let data):
          self.store.mergeResponse(operation: operation, variables: variables, data: data, queue: self.callbackQueue) {
            handler(SpaceXOperationResult.result(data: data))
          }
        case .error(let error):
          handler(SpaceXOperationResult.error(error: error))
        }
      }
    }
  }
  
  //
  // Watch
  //
  
  func watch(
    operation: OperationDefinition,
    variables: JSON,
    fetchMode: FetchMode,
    handler: @escaping (SpaceXOperationResult) -> Void
  ) -> AbortFunc {
    if operation.kind != .query {
      fatalError("Only query operations are supported for watching")
    }
    let queryWatch = QueryWatch(client: self, operation: operation, variables: variables, fetchMode: fetchMode, handler: handler)
    queryWatch.start()
    return {
      queryWatch.stop()
    }
  }
  
  //
  // Subscription
  //
  
  func subscribe(
    operation: OperationDefinition,
    variables: JSON,
    handler: @escaping (SpaceXOperationResult) -> Void
  ) -> AbortFunc {
    if operation.kind != .subscription {
      fatalError("Only subscription operations are supported for subscribing")
    }
    let subscription = Subscription(client: self, operation: operation, variables: variables, handler: handler)
    subscription.start()
    return {
      subscription.close()
    }
  }
  
  //
  // Store Modification
  //
  
  func readQuery(
    operation: OperationDefinition,
    variables: JSON,
    callback: @escaping (SpaceXReadResult) -> Void
  ) {
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
  
  func writeQuery(
    operation: OperationDefinition,
    variables: JSON,
    data: JSON,
    callback: @escaping () -> Void
  ) {
    self.store.mergeResponse(operation: operation, variables: variables, data: data, queue: self.callbackQueue) {
      callback()
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
  var client: SpaceXClient
  let fetchMode: FetchMode
  private var completed = false
  private var wasLoadedFromNetwork = false
  
  init(client: SpaceXClient,
       operation: OperationDefinition,
       variables: JSON,
       fetchMode: FetchMode,
       handler: @escaping (SpaceXOperationResult) -> Void) {
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
      if self.completed {
        return
      }
      switch(res) {
      case .missing:
        self.doRequest()
      case .success(let data):
        self.handler(SpaceXOperationResult.result(data: data))
        if self.fetchMode == .cacheAndNetwork && !self.wasLoadedFromNetwork {
          self.doRequest(reload: false)
        }
      case .updated:
        self.doReloadFromCache()
      }
    }
  }
  
  private func doRequest(reload: Bool = true) {
    self.wasLoadedFromNetwork = true
    self.client.transport.operation(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
      if self.completed {
        return
      }
      switch(res) {
      case .result(let data):
        self.client.store.mergeResponse(operation: self.operation, variables: self.variables, data: data, queue: self.client.callbackQueue) {
          if self.completed {
            return
          }
          if reload {
            self.doReloadFromCache()
          }
        }
      case .error(let error):
        if reload {
          self.handler(SpaceXOperationResult.error(error: error))
        }
      }
    }
  }
  
  func stop() {
    client.callbackQueue.async {
      if self.completed {
        return
      }
      self.completed = true
      // TODO: Cancel everything
    }
  }
}

fileprivate class Subscription: RunningSubscription {
  var client: SpaceXClient!
  let operation: OperationDefinition
  let variables: JSON
  let handler: (SpaceXOperationResult) -> Void
  private var runningOperation: RunningOperation?
  private var stopped = false
  
  init(client: SpaceXClient,
       operation: OperationDefinition,
       variables: JSON,
       handler: @escaping (SpaceXOperationResult) -> Void
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
      if self.stopped {
        return
      }
      switch(res) {
      case .error(let error):
        self.client.callbackQueue.async {
          self.handler(SpaceXOperationResult.error(error: error))
        }
      case .result(let data):
        self.client.store.mergeResponse(operation: self.operation, variables: self.variables, data: data, queue: self.client.callbackQueue) {
          self.handler(SpaceXOperationResult.result(data: data))
        }
      }
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
