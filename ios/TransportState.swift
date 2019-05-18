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
}

fileprivate class PendingOperation: RunningOperation {
  let id: String
  var requestId: String
  let operation: OperationDefinition
  let variables: JSON
  let callback: (TransportResult) -> Void
  weak var parent: TransportState?
  
  init(
    parent: TransportState,
    id: String,
    requestId: String,
    operation: OperationDefinition,
    variables: JSON,
    callback: @escaping (TransportResult) -> Void
  ) {
    self.parent = parent
    self.id = id
    self.requestId = requestId
    self.operation = operation
    self.variables = variables
    self.callback = callback
  }
  
  func cancel() {
    self.parent?.onClose(id: self.id)
  }
}

class TransportState: NetworkingDelegate {
  
  let url: String
  let params: [String: String?]
  var connectionCallback: ((Bool) -> Void)?
  private let nextId = AtomicInteger(value: 1)
  fileprivate var connection: ApolloNetworking
  
  fileprivate var liveOperationsIds: [String: String] = [:]
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
    let pending = PendingOperation(parent: self, id: id, requestId: id, operation: operation, variables: variables, callback: handler)
    self.queue.async {
      
      // Save operation
      self.liveOperations[id] = pending
      self.liveOperationsIds[id] = id
      
      // Start operation
      self.flushQueryStart(operation: pending)
    }
    return pending
  }
  
  func close() {
    queue.sync {
      self.connection.close()
    }
  }
  
  //
  // Operation control
  //
  
  func onClose(id: String) {
    self.queue.async {
      if let op = self.liveOperations[id] {
        
        // Stop Query
        self.flushQueryStop(operation: op)
        
        // Remove from callbacks
        self.liveOperations.removeValue(forKey: id)
        self.liveOperationsIds.removeValue(forKey: op.requestId)
      }
    }
  }
  
  //
  // Operation Callbacks
  //
  
  func onResponse(id: String, data: JSON) {
    if let rid = self.liveOperationsIds[id] {
      if let op = self.liveOperations[rid] {
        op.callback(TransportResult.result(data: data))
      }
    }
  }
  
  func onError(id: String, error: JSON) {
    if let rid = self.liveOperationsIds[id] {
      if let op = self.liveOperations[rid] {
        op.callback(TransportResult.error(error: error))
        self.liveOperations.removeValue(forKey: rid)
        self.liveOperationsIds.removeValue(forKey: id)
      }
    }
  }
  
  func onCompleted(id: String) {
    if let rid = self.liveOperationsIds[id] {
      if let op = self.liveOperations[rid] {
        op.callback(TransportResult.completed)
        self.liveOperations.removeValue(forKey: rid)
        self.liveOperationsIds.removeValue(forKey: id)
      }
    }
  }
  
  func onTryAgain(id: String, delay: Int) {
    if let rid = self.liveOperationsIds[id] {
      if let op = self.liveOperations[rid] {
        
        // Stop existing
        self.flushQueryStop(operation: op)
        
        // Regenerate ID
        let retryId = "\(nextId.getAndIncrement())"
        op.requestId = retryId
        self.liveOperationsIds.removeValue(forKey: id)
        self.liveOperationsIds[retryId] = rid
        
        // Schedule restart
        self.queue.asyncAfter(deadline: .now() + Double(delay)) {
          if self.liveOperationsIds[retryId] != nil {
            self.flushQueryStart(operation: op)
          }
        }
      }
    }
  }
  
  //
  // Session Callbacks
  //
  
  func onSessiontRestart() {
    for l in self.liveOperations {
      if l.value.operation.kind == .subscription {
        
        // Stop subscriptions
        l.value.callback(TransportResult.completed)
        self.liveOperations.removeValue(forKey: l.key)
        self.liveOperationsIds.removeValue(forKey: l.value.requestId)
        
      } else {
        self.flushQueryStart(operation: l.value)
      }
    }
  }
  
  func onConnected() {
    self.connectionCallback?(true)
  }
  
  func onDisconnected() {
    self.connectionCallback?(false)
  }
  
  private func flushQueryStart(operation: PendingOperation) {
    self.connection.startRequest(id: operation.requestId, body: JSON([
      "query": operation.operation.body,
      "name": operation.operation.name,
      "variables": operation.variables
    ]))
  }
  
  private func flushQueryStop(operation: PendingOperation) {
     self.connection.stopRequest(id: operation.requestId)
  }
}
