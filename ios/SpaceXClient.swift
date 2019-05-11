//
//  SpaceXClient.swift
//  openland
//
//  Created by Steve Kite on 5/10/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON
import Starscream

enum WebSocketState {
  case waiting
  case connecting
  case starting
  case started
  case completed
}

protocol WebSocketApolloTransportDelegate: class {
  func onMessage(src: WebSocketApolloTransport, message: JSON)
  func onConnected(src: WebSocketApolloTransport)
  func onDisconnected(src: WebSocketApolloTransport)
}

class WebSocketApolloTransport: WebSocketDelegate {
  
  private static let nextIdQueue = DispatchQueue(label: "ws-next-id")
  private static var nextId: Int = 1

  private let id: Int
  private let url: String
  private let params: [String: String?]
  private var client: WebSocket? = nil
  private var queue = DispatchQueue(label: "ws")
  private var pending: [JSON] = []
  private var state: WebSocketState = .waiting
  weak var delegate: WebSocketApolloTransportDelegate? = nil
  
  init(url: String, params: [String: String?]) {
    var id: Int = 0
    WebSocketApolloTransport.nextIdQueue.sync {
      id = WebSocketApolloTransport.nextId
      WebSocketApolloTransport.nextId += 1
    }
    self.id = id
    self.url = url
    self.params = params
  }
  
  func connect() {
    print("[SpaceX-WS-\(self.id)]: Starting")
    queue.async { [weak self] in
      if let s = self {
        s.doConnect()
      }
    }
  }
  
  func post(message: JSON) {
    queue.async { [weak self] in
      if let s = self {
        if s.state == .completed {
          // Silently ignore if connection is completed
          return
        } else if s.state == .waiting {
          // Add to pending buffer if we are not connected already
          s.pending.append(message)
        } else if s.state == .connecting {
          // Add to pending buffer if we are not connected already
          s.pending.append(message)
        } else if s.state == .starting {
          // If we connected, but not started add to pending buffer (in case of failed start)
          // and send message to socket
          s.pending.append(message)
          s.client!.write(string: message.description)
        } else if s.state == .started {
          s.client!.write(string: message.description)
        }
      }
    }
  }
  
  private func doConnect() {
    print("[SpaceX-WS-\(self.id)]: doConnect")
    if self.state != .waiting {
      fatalError("Unexpected state")
    }
    self.state = .connecting
    client = WebSocket(url: URL(string: self.url)!, protocols: ["graphql-ws"])
    client!.delegate = self
    client!.connect()
  }

  private func onReceived(message: String) {
    print("[SpaceX-WS-\(self.id)]: << " + message)
    let parsed = JSON(parseJSON: message)
    let type = parsed["type"].stringValue
    if type == "ka" {
      // TODO: Handle
    } else if type == "connection_ack" {
      if self.state == .starting {
        self.state = .started
        self.pending.removeAll()
      }
    } else {
      self.delegate?.onMessage(src: self, message: parsed)
    }
  }
  
  private func onConnected() {
    print("[SpaceX-WS-\(self.id)]: onConnected")
    if self.state != .connecting {
      fatalError("Unexpected state")
    }
    self.state = .starting
    
    self.doPostMesage(msg: JSON(["type": "connection_init","payload": params]))
    for p in pending {
      self.doPostMesage(msg: p)
    }
  }
  
  private func onDisconnected() {
    print("[SpaceX-WS-\(self.id)]: onDisconnected")
    if self.client != nil {
      self.client?.disconnect()
      self.client = nil
    }
    if self.state == .started {
      self.state = .completed
      self.delegate?.onDisconnected(src: self)
    } else {
      self.state = .waiting
      // TODO: Backoff
      self.connect()
    }
  }
  
  private func doPostMesage(msg: JSON) {
    do {
      let str = try NSString(data: msg.rawData(), encoding: String.Encoding.utf8.rawValue) as! String
      print("[SpaceX-WS-\(self.id)]: >> \(str)")
      client!.write(string: str)
    } catch let error as NSError {
      print(error.localizedDescription)
    }
  }
  
  func close() {
    print("[SpaceX-WS-\(self.id)]: Stopping")
    queue.async { [weak self] in
      if let s = self {
        s.client?.disconnect()
      }
    }
  }
  
  //
  // Web Socket
  //
  
  func websocketDidConnect(socket: WebSocketClient) {
    queue.async { [weak self] in
      if let s = self {
        s.onConnected()
      }
    }
  }
  
  func websocketDidDisconnect(socket: WebSocketClient, error: Error?) {
    queue.async { [weak self] in
      if let s = self {
        s.onDisconnected()
      }
    }
  }
  
  func websocketDidReceiveMessage(socket: WebSocketClient, text: String) {
    queue.async { [weak self] in
      if let s = self {
        s.onReceived(message: text)
      }
    }
  }
  
  func websocketDidReceiveData(socket: WebSocketClient, data: Data) {
    // Ignore
  }
}

enum TransportResult {
  case result(data: JSON)
  case error(error: JSON)
  case completed
}

protocol RunningOperation {
  func cancel()
  func lazyUpdate(operation: JSON)
}


fileprivate class PendingOperation: RunningOperation {
  let id: String
  var query: JSON
  weak var parent: SpaceXTransport?
  let callback: (TransportResult) -> Void
  
  init(parent: SpaceXTransport, id: String, query: JSON, callback: @escaping (TransportResult) -> Void) {
    self.parent = parent
    self.id = id
    self.query = query
    self.callback = callback
  }
  
  func cancel() {
    if let p = self.parent {
      self.parent?.liveOperations.removeValue(forKey: self.id)
      self.parent?.connection?.post(message: JSON([
        "type": "stop",
        "id": self.id
        ]))
    }
  }
  
  func lazyUpdate(operation: JSON) {
    // TODO: Implement
  }
}

class SpaceXTransport: WebSocketApolloTransportDelegate {
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
    SpaceXTransport.nextIdQueue.sync {
      id = "\(SpaceXTransport.nextId)"
      SpaceXTransport.nextId += 1
    }
    let q = JSON([
          "type": "start",
          "id": id,
          "payload": [
            "query": operation.body,
            "name": operation.name,
            "variables": variables
          ]])
    let pending = PendingOperation(parent: self, id: id, query: q, callback: handler)
    queue.sync {
      self.liveOperations[id] = pending
      self.connection?.post(message: pending.query)
    }
    return pending
  }
  
  private func doConnect() {
    self.connection = WebSocketApolloTransport(url: url, params: params)
    self.connection!.delegate = self
    self.connection!.connect()
    for l in liveOperations {
      self.connection!.post(message: l.value.query)
    }
  }
  
  private func onMessage(message: JSON) {
    let type = message["type"].stringValue
    if (type == "data") {
      let id = message["id"].stringValue
      let error = message["error"]
      let data = message["data"]
      if error.exists() {
        self.liveOperations[id]?.callback(TransportResult.error(error: error))
      } else {
        self.liveOperations[id]?.callback(TransportResult.result(data: data))
      }
    } else if type == "error" {
      //
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

enum SpaceXQueryResult {
  case result(data: JSON)
  case error(error: JSON)
}

class SpaceXClient {
  
  private var transport: SpaceXTransport
  
  init(url: String, token: String?) {
    transport = SpaceXTransport(url: url, params: ["x-openland-token": token])
    transport.connect()
  }
  
  func query(operation: OperationDefinition, variables: JSON, handler: @escaping  (SpaceXQueryResult)->Void) {
    transport.operation(operation: operation, variables: variables) { (res) in
      switch(res) {
      case .result(let data):
          handler(SpaceXQueryResult.result(data: data))
      case .error(let error):
          handler(SpaceXQueryResult.error(error: error))
      case .completed:
        break
          // Do nothing
      }
    }
//    transport.post(message: JSON([
//      "type": "start",
//      "payload": [
//        "query": operation.body,
//        "name": operation.name,
//        "variables":arguments
//      ]]))
  }
  
  func dispose() {
    transport.close()
  }
}
