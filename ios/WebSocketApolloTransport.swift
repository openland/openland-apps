//
//  ApolloTransport.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
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
