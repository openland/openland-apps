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

enum FetchMode {
  case cacheFirst
  case networkOnly
  case cacheAndNetwork
}

class SpaceXClient {
  
  fileprivate var store: SpaceXStoreScheduler
  fileprivate var transport: SpaceXTransportScheduler
  fileprivate let normalizerQueue = DispatchQueue(label: "spacex-normalizer")
  fileprivate let callbackQueue = DispatchQueue(label: "client")
  
  init(url: String, token: String?) {
    self.transport = SpaceXTransportScheduler(url: url, params: ["x-openland-token": token])
    self.store = SpaceXStoreScheduler()
  }
  
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
              normalized = try normalizeData(id: "ROOT_QUERY", type: operation.selector, args: variables, data: data)
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
        self.store.readQueryFromCache(operation: operation, variables: variables, queue: self.callbackQueue) { res in
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
    callbackQueue.async {
      self.transport.operation(operation: operation, variables: variables, queue: self.callbackQueue) { (res) in
        switch(res) {
        case .result(let data):
          self.normalizerQueue.async {
            let normalized: RecordSet
            do {
              normalized = try normalizeData(id: "ROOT_MUTATION", type: operation.selector, args: variables, data: data)
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
  }
  
  func watch(operation: OperationDefinition, variables: JSON, fetchMode: FetchMode, handler: @escaping  (SpaceXOperationResult)->Void) -> (()->Void) {
    let queryWatch = QueryWatch(client: self, operation: operation, variables: variables, fetchMode: fetchMode, handler: handler)
    queryWatch.start()
    return {
      queryWatch.stop()
    }
  }
  
  func dispose() {
    self.transport.close()
  }
}


fileprivate class QueryWatch {
  let operation: OperationDefinition
  let variables: JSON
  let handler: (SpaceXOperationResult)->Void
  let client: SpaceXClient
  let fetchMode: FetchMode
  private var completed = false
  
  init(client: SpaceXClient,
       operation: OperationDefinition,
       variables: JSON,
       fetchMode: FetchMode,
       handler: @escaping  (SpaceXOperationResult)->Void) {
    self.client = client
    self.operation = operation
    self.variables = variables
    self.handler = handler
    self.fetchMode = fetchMode
  }
  
  func start() {
    client.callbackQueue.async {
      if self.fetchMode == .cacheFirst || self.fetchMode == .cacheAndNetwork {
        self.client.store.readQueryFromCache(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
          switch(res) {
          case .missing:
            self.doRequest()
          case .success(let data):
            self.handler(SpaceXOperationResult.result(data: data))
            if self.fetchMode == .cacheFirst {
              self.doSubscribe(value: data)
            } else {
              self.doRequest()
            }
          }
        }
      } else {
        self.doRequest()
      }
    }
  }
  
  private func doSubscribe(value: JSON) {
    // TODO: Implement
  }
  
  private func doRequest() {
    self.client.transport.operation(operation: self.operation, variables: self.variables, queue: self.client.callbackQueue) { res in
      if self.completed {
        return
      }
      switch(res) {
      case .result(let data):
        self.handler(SpaceXOperationResult.result(data: data))
        self.doSubscribe(value: data)
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
      // TODO: Cancel everything
    }
  }
}
