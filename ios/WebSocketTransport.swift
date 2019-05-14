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
  weak var parent: WebSocketTransport?
  let callback: (TransportResult) -> Void
  
  init(parent: WebSocketTransport, id: String, operation: OperationDefinition, variables: JSON, callback: @escaping (TransportResult) -> Void) {
    self.parent = parent
    self.id = id
    self.operation = operation
    self.variables = variables
    self.callback = callback
  }
  
  func cancel() {
    if let p = self.parent {
      p.liveOperations.removeValue(forKey: self.id)
      p.connection?.post(message: JSON([
        "type": "stop",
        "id": self.id
        ]))
    }
  }
  
  func updateVariables(variables: JSON) {
    self.variables = variables
  }
}

class WebSocketTransport: WebSocketApolloTransportDelegate {
  private static let nextIdQueue = DispatchQueue(label: "ws-next-id")
  private static var nextId: Int = 1
  
  let url: String
  let params: [String: String?]
  fileprivate var connection: WebSocketApolloTransport? = nil
  fileprivate var liveOperations: [String: PendingOperation] = [:]
  fileprivate var connected = false
  fileprivate let queue = DispatchQueue(label: "transport")
  
  init(url: String, params: [String: String?]) {
    self.url = url
    self.params = params
  }
  
  func connect() {
    queue.async { [weak self] in
      if let s = self {
        s.doConnect()
      }
    }
  }
  
  func operation(operation: OperationDefinition, variables: JSON, handler: @escaping (TransportResult) -> Void) -> RunningOperation {
    var id: String = "0"
    WebSocketTransport.nextIdQueue.sync {
      id = "\(WebSocketTransport.nextId)"
      WebSocketTransport.nextId += 1
    }
    let q = JSON([
      "type": "start",
      "id": id,
      "payload": [
        "query": operation.body,
        "name": operation.name,
        "variables": variables
      ]])
    let pending = PendingOperation(parent: self, id: id, operation: operation, variables: variables, callback: handler)
    queue.sync {
      self.liveOperations[id] = pending
      self.connection?.post(message: q)
    }
    return pending
  }
  
  private func doConnect() {
    self.connection = WebSocketApolloTransport(url: url, params: params)
    self.connection!.delegate = self
    self.connection!.connect()
    for l in liveOperations {
      let q =  JSON([
        "type": "start",
        "id": l.value.id,
        "payload": [
          "query": l.value.operation.body,
          "name": l.value.operation.name,
          "variables": l.value.variables
        ]])
      self.connection!.post(message: q)
    }
  }
  
  private func onMessage(message: JSON) {
    let type = message["type"].stringValue
    if (type == "data") {
      let id = message["id"].stringValue
      let payload = message["payload"]
      let error = payload["error"]
      let data = payload["data"]
      if error.exists() {
        self.liveOperations[id]?.callback(TransportResult.error(error: error))
      } else {
        self.liveOperations[id]?.callback(TransportResult.result(data: data))
      }
    } else if type == "error" {
      let id = message["id"].stringValue
      let payload = message["payload"]
      self.liveOperations[id]?.callback(TransportResult.error(error: payload))
    } else if type == "complete" {
      let id = message["id"].stringValue
      self.liveOperations[id]?.callback(TransportResult.completed)
      self.liveOperations.removeValue(forKey: id)
    }
  }
  
  private func onConnected() {
    // TODO: Notify App
  }
  
  private func onDisconnected() {
    // TODO: Notify Apps
    
    // Reconnect
    if self.connection != nil {
      self.connection?.close()
      self.connection = nil
    }
    doConnect()
  }
  
  //
  // Transport delegate
  //
  
  func onMessage(src: WebSocketApolloTransport, message: JSON) {
    queue.async { [weak self] in
      if let s = self {
        if s.connection === src {
          s.onMessage(message: message)
        }
      }
    }
  }
  
  func onConnected(src: WebSocketApolloTransport) {
    queue.async { [weak self] in
      if let s = self {
        if s.connection === src {
          s.onConnected()
        }
      }
    }
  }
  
  func onDisconnected(src: WebSocketApolloTransport) {
    queue.async { [weak self] in
      if let s = self {
        if s.connection === src {
          s.onDisconnected()
        }
      }
    }
  }
  
  func close() {
    queue.async { [weak self] in
      if let s = self {
        s.connection?.close()
        s.connection = nil
      }
    }
  }
}
