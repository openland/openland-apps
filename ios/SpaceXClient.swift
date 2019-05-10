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

class WebSocketStableClient: WebSocketDelegate {

  private let url: String
  private let params: [String: String?]
  private var client: WebSocket? = nil
  private var queue = DispatchQueue(label: "ws")
  
  init(url: String, params: [String: String?]) {
    self.url = url
    self.params = params
    queue.async { [weak self] in
      if let s = self {
        s.connect()
      }
    }
  }
  
  private func connect() {
    client = WebSocket(url: URL(string: self.url)!, protocols: ["graphql-ws"])
    client!.delegate = self
    client!.connect()
  }

  
  private func onReceived(messsage: String) {
    print("onReceived")
    print(messsage)
    let parsed = JSON(parseJSON: messsage)
  }
  
  private func onConnected() {
    print("onConnected")
    client!.write(string: JSON([
      "type": "connection_init",
      "payload": params
    ]).description)
  }
  
  private func onDisconnected() {
    print("onDisconnected")
  }
  
  func close() {
    client?.disconnect()
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
        s.onReceived(messsage: text)
      }
    }
  }
  
  func websocketDidReceiveData(socket: WebSocketClient, data: Data) {
    // Ignore
  }
}

class SpaceXTransport {
  let url: String
  let params: [String: String?]
  var connection: WebSocketStableClient? = nil
  init(url: String, params: [String: String?]) {
    self.url = url
    self.params = params
    connection = WebSocketStableClient(url: url, params: params)
  }
  
  func close() {
    connection?.close()
    connection = nil
  }
}

class SpaceXClient {
  
  private var transport: SpaceXTransport
  
  init(url: String, token: String?) {
    transport = SpaceXTransport(url: url, params: ["x-openland-token": token])
  }
  
  func query(operation: OperationDefinition, arguments: JSON) {
    
  }
  
  func dispose() {
    transport.close()
  }
}
