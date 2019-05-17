//
//  WebSocketTransport.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum TransportResult {
  case result(data: JSON)
  case error(error: JSON)
  case completed
}

protocol RunningOperation {
  func cancel()
  func updateVariables(variables: JSON)
}

fileprivate class PendingOperation: RunningOperation {
  let id: String
  let operation: OperationDefinition
  var variables: JSON
  weak var parent: SpaceXTransport?
  let callback: (TransportResult) -> Void
  
  init(
    parent: SpaceXTransport,
    id: String,
    operation: OperationDefinition,
    variables: JSON,
    callback: @escaping (TransportResult) -> Void
  ) {
    self.parent = parent
    self.id = id
    self.operation = operation
    self.variables = variables
    self.callback = callback
  }
  
  func start() {
    self.parent!.queue.async {
      self.parent!.liveOperations[self.id] = self
      self.parent!.connection.startRequest(id: self.id, body: JSON([
        "query": self.operation.body,
        "name": self.operation.name,
        "variables": self.variables
      ]))
    }
  }
  
  func restart() {
    self.parent!.queue.async {
      self.parent!.connection.startRequest(id: self.id, body: JSON([
        "query": self.operation.body,
        "name": self.operation.name,
        "variables": self.variables
      ]))
    }
  }
  
  func cancel() {
    self.parent!.queue.async {
      self.parent!.liveOperations.removeValue(forKey: self.id)
      self.parent!.connection.stopRequest(id: self.id)
    }
  }
  
  func updateVariables(variables: JSON) {
    self.variables = variables
  }
}

class SpaceXTransport: NetworkingDelegate {
  
  let url: String
  let params: [String: String?]
  var connectionCallback: ((Bool) -> Void)?
  private let nextId = AtomicInteger(value: 1)
  fileprivate var connection: ApolloNetworking
  fileprivate var liveOperations: [String: PendingOperation] = [:]
  fileprivate var connected = false
  fileprivate let queue = DispatchQueue(label: "transport")
  
  init(url: String, params: [String: String?]) {
    self.url = url
    self.params = params
    self.connection = ApolloNetworking(url: self.url, params: self.params)
    self.connection.delegate = self
    self.connection.callbackQueue = queue
    self.connection.connect()
  }
  
  func operation(
    operation: OperationDefinition,
    variables: JSON,
    handler: @escaping (TransportResult) -> Void
  ) -> RunningOperation {
    let id: String = "\(nextId.getAndIncrement())"
    let pending = PendingOperation(parent: self, id: id, operation: operation, variables: variables, callback: handler)
    pending.start()
    return pending
  }
  
  func onResponse(id: String, data: JSON) {
    self.liveOperations[id]?.callback(TransportResult.result(data: data))
  }
  
  func onError(id: String, error: JSON) {
    self.liveOperations[id]?.callback(TransportResult.error(error: error))
    self.liveOperations.removeValue(forKey: id)
  }
  
  func onCompleted(id: String) {
    self.liveOperations[id]?.callback(TransportResult.completed)
    self.liveOperations.removeValue(forKey: id)
  }
  
  func onSessiontRestart() {
    for l in self.liveOperations {
      l.value.restart()
    }
  }
  
  func onConnected() {
    self.connectionCallback?(true)
  }
  
  func onDisconnected() {
    self.connectionCallback?(false)
  }
  
  func close() {
    queue.async {
      self.connection.close()
    }
  }
}
