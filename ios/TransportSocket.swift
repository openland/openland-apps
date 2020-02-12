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
// import Reachability

enum TransportSocketState {
  case waiting
  case connecting
  case starting
  case started
  case completed
}

class TransportSocket {
  
  private static var nextId: AtomicInteger = AtomicInteger(value: 1)
  private static let PING_INTERVAL = 30
  private static let PING_TIMEOUT = 10
  
  private let queue = DispatchQueue(label: "spacex-networking-apollo")
  
  let id: Int
  let url: String
  let params: [String: String?]
  weak var delegate: NetworkingDelegate? = nil
  var callbackQueue: DispatchQueue
  // private let reachability: Reachability
  private var socket: ThrustedSocket? = nil
  private var pending: [String: JSON] = [:]
  private var state: TransportSocketState = .waiting
  private var failuresCount = 0
  private var reachable = true
  private var started = false
  
  private var lastPingId = 0
  
  init(url: String, params: [String: String?]) {
    self.callbackQueue = self.queue
    self.id = TransportSocket.nextId.getAndIncrement()
    self.url = url
    self.params = params
//    self.reachability = Reachability()!
//    self.reachability.whenReachable = { r in
//      self.queue.async {
//        NSLog("[SpaceX-WS]: Reachable \(r.connection)")
//       self.onReachable()
//      }
//    }
//    self.reachability.whenUnreachable = { _ in
//      self.queue.async {
//        NSLog("[SpaceX-WS]: Unreachable")
//        self.onUnreachable()
//      }
//    }
//    try! self.reachability.startNotifier()
  }
  
  func connect() {
    NSLog("[SpaceX-WS]: Starting")
    queue.async {
      self.started = true
      if self.reachable {
        self.doConnect()
      }
    }
  }
  
  func startRequest(id: String, body: JSON) {
    NSLog("[SpaceX-WS]: Start Request " + id + " [" + body["name"].stringValue + "]")
    queue.async {
      if self.state == .waiting || self.state == .connecting {
        // Add to pending buffer if we are not connected already
        self.pending[id] = body
        NSLog("[SpaceX-WS]: Pending " + id)
      } else if self.state == .starting {
        NSLog("[SpaceX-WS]: Starting " + id)
        // If we connected, but not started add to pending buffer (in case of failed start)
        // and send message to socket
        
        self.pending[id] = body
        self.writeToSocket(msg: JSON(["type": "start", "id": id, "payload": body]))
      } else if self.state == .started {
        NSLog("[SpaceX-WS]: Started " + id)
        self.writeToSocket(msg: JSON(["type": "start", "id": id, "payload": body]))
      } else if self.state == .completed {
        NSLog("[SpaceX-WS]: Completed " + id)
        // Silently ignore if connection is completed
      } else {
        fatalError()
      }
    }
  }
  
  func stopRequest(id: String) {
    NSLog("[SpaceX-WS]: Stop Request " + id)
    queue.async {
      if self.state == .waiting || self.state == .connecting {
        // Remove from pending buffer if we are not connected already
        self.pending.removeValue(forKey: id)
      } else if self.state == .starting {
        // If we connected, but not started remove from pending buffer (in case of failed start)
        // and send cancelation message to socket
        self.pending.removeValue(forKey: id)
        self.writeToSocket(msg: JSON(["type": "stop", "id": id]))
      } else if self.state == .started {
        self.writeToSocket(msg: JSON(["type": "stop", "id": id]))
      } else if self.state == .completed {
        // Silently ignore if connection is completed
      } else {
        fatalError()
      }
    }
  }
  
  private func doConnect() {
    NSLog("[SpaceX-WS]: Connecting")
    if self.state != .waiting {
      fatalError("Unexpected state")
    }
    self.state = .connecting
    let ws = ThrustedSocket(url: self.url, timeout: 5000, queue: self.queue)
    ws.onConnect = {
      if self.socket === ws {
        self.onConnected()
      }
    }
    ws.onDisconnect = {
      if self.socket === ws {
        self.onDisconnected()
      }
    }
    ws.onText = { text in
      if self.socket === ws {
        self.onReceived(message: text)
      }
    }
    self.socket = ws
  }
  
  private func onConnected() {
    NSLog("[SpaceX-WS]: onConnected")
    if self.state != .connecting {
      fatalError("Unexpected state")
    }
    self.state = .starting
    self.writeToSocket(msg: JSON([
      "protocol_v": 2,"type": "connection_init", "payload": self.params
    ]))
    for p in self.pending {
      self.writeToSocket(msg: JSON(["type": "start", "id": p.key, "payload": p.value]))
    }
    schedulePing()
  }
  
  private func schedulePing() {
    NSLog("[SpaceX-WS]: schedule ping")
    self.lastPingId += 1
    let pingId = self.lastPingId
    self.queue.asyncAfter(deadline: .now() + .seconds(TransportSocket.PING_INTERVAL)) {
      if (self.state == .started) {
        NSLog("[SpaceX-WS]: sending ping")
        self.writeToSocket(msg: JSON(["type": "ping"]))
        self.queue.asyncAfter(deadline: .now() + .seconds(TransportSocket.PING_TIMEOUT)) {
          if(self.state == .started && self.lastPingId == pingId) {
            NSLog("[SpaceX-WS]: ping timeout")
            self.onDisconnected()
          }
        }
      }
    }
  }
  
  private func onReceived(message: String) {
    // print("[SpaceX-Apollo]: << " + message)
    
    let parsed = JSON(parseJSON: message)
    let type = parsed["type"].stringValue
    NSLog("[SpaceX-WS]: <<" + type)
    if type == "ka" {
      // TODO: Handle
    } else if type == "connection_ack" {
      if self.state == .starting {
        NSLog("[SpaceX-WS]: Started")
        
        // Change state
        self.state = .started
        
        // Remove all pending messages
        self.pending.removeAll()
        
        // Reset failure count
        self.failuresCount = 0
        
        // Notify about state
        self.callbackQueue.async {
          self.delegate?.onConnected()
        }
      }
    } else if type == "data" {
      let id = parsed["id"].stringValue
      let payload = parsed["payload"]
      let errors = payload["errors"]
      let data = payload["data"]
      if errors.exists() {
        self.callbackQueue.async {
            NSLog("[SpaceX-WS]: Error (" + id + ")")
            self.delegate?.onError(id: id, error: errors)
        }
      } else {
        NSLog("[SpaceX-WS]: Data (" + id + ")")
        self.callbackQueue.async {
          self.delegate?.onResponse(id: id, data: data)
        }
      }
    } else if type == "error" {
      let id = parsed["id"].stringValue
      NSLog("[SpaceX-WS]: Critical Error (" + id + "): Retrying")
    } else if type == "ping" {
      self.queue.async {
        if (self.state == .started) {
          self.writeToSocket(msg: JSON(["type": "pong"]))
        }
      }
    }else if type == "pong" {
      self.schedulePing()
    } else if type == "complete" {
      let id = parsed["id"].stringValue
      NSLog("[SpaceX-WS]: Complete (" + id + ")")
      self.callbackQueue.async {
        self.delegate?.onCompleted(id: id)
      }
    }
  }
  
  private func onReachable() {
    self.reachable = true
    if self.started && (self.state == .waiting || self.state == .connecting) {
      self.stopClient()
      self.state = .waiting
      self.failuresCount = 0
      self.doConnect()
    }
  }
  
  private func onUnreachable() {
    self.reachable = false
  }
  
  private func onDisconnected() {
    NSLog("[SpaceX-WS]: onDisconnected")
    if self.state == .started {
      self.callbackQueue.async {
        self.delegate?.onDisconnected()
        self.delegate?.onSessiontRestart()
      }
    }
    self.stopClient()
    self.state = .waiting
    self.failuresCount += 1
    
    self.queue.asyncAfter(deadline: .now() + .seconds(2)) {
      if self.state == .waiting && self.reachable {
        self.doConnect()
      }
    }
  }
  
  func close() {
    queue.async {
      NSLog("[SpaceX-WS]: Stopping")
      if self.state != .completed {
        self.state = .completed
        
        // Remove all pending requests
        self.pending.removeAll()
        
        // Stopping ws connection
        self.stopClient()
        
        // Stopping reachability
        self.reachability.stopNotifier()
      }
    }
  }
  
  private func stopClient() {
    // Removing client if present
    let ws = self.socket
    self.socket = nil
    
    // Stopping client
    ws?.onText = nil
    ws?.onConnect = nil
    ws?.onDisconnect = nil
    ws?.close()
  }
  
  private func writeToSocket(msg: JSON) {
    let txt = serializeJson(json: msg)
    NSLog("[SpaceX-WS]: >>" + msg["type"].stringValue)
    // print("[SpaceX-Apollo]: >> \(txt)")
    self.socket!.send(msg: txt)
  }
}
