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
import Reachability

enum ApolloNetworkingState {
  case waiting
  case connecting
  case starting
  case started
  case completed
}

class ApolloNetworking {
  
  private static var nextId: AtomicInteger = AtomicInteger(value: 1)
  
  private let queue = DispatchQueue(label: "spacex-networking-apollo")
  
  let id: Int
  let url: String
  let params: [String: String?]
  weak var delegate: NetworkingDelegate? = nil
  var callbackQueue: DispatchQueue

  private let reachability: Reachability
  private var client: WebSocket? = nil
  private var pending: [String: JSON] = [:]
  private var state: ApolloNetworkingState = .waiting
  private var failuresCount = 0
  private var reachable = false
  private var started = false
  
  init(url: String, params: [String: String?]) {
    self.callbackQueue = self.queue
    self.id = ApolloNetworking.nextId.getAndIncrement()
    self.url = url
    self.params = params
    self.reachability = Reachability()!
    self.reachability.whenReachable = { r in
      self.queue.async {
        NSLog("[SpaceX-Apollo]: Reachable \(r.connection)")
       self.onReachable()
      }
    }
    self.reachability.whenUnreachable = { _ in
      self.queue.async {
        NSLog("[SpaceX-Apollo]: Unreachable")
        self.onUnreachable()
      }
    }
    try! self.reachability.startNotifier()
  }
  
  func connect() {
    NSLog("[SpaceX-Apollo]: Starting")
    queue.async {
      self.started = true
      if self.reachable {
        self.doConnect()
      }
    }
  }
  
  func startRequest(id: String, body: JSON) {
    NSLog("[SpaceX-Apollo]: Start Request " + id + " [" + body["name"].stringValue + "]")
    queue.async {
      if self.state == .waiting || self.state == .connecting {
        // Add to pending buffer if we are not connected already
        self.pending[id] = body
        NSLog("[SpaceX-Apollo]: Pending " + id)
      } else if self.state == .starting {
        NSLog("[SpaceX-Apollo]: Starting " + id)
        // If we connected, but not started add to pending buffer (in case of failed start)
        // and send message to socket
        
        self.pending[id] = body
        self.writeToSocket(msg: JSON(["type": "start", "id": id, "payload": body]))
      } else if self.state == .started {
        NSLog("[SpaceX-Apollo]: Started " + id)
        self.writeToSocket(msg: JSON(["type": "start", "id": id, "payload": body]))
      } else if self.state == .completed {
        NSLog("[SpaceX-Apollo]: Completed " + id)
        // Silently ignore if connection is completed
      } else {
        fatalError()
      }
    }
  }
  
  func stopRequest(id: String) {
    NSLog("[SpaceX-Apollo]: Stop Request " + id)
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
    NSLog("[SpaceX-Apollo]: Connecting")
    if self.state != .waiting {
      fatalError("Unexpected state")
    }
    self.state = .connecting
    let ws = WebSocket(url: URL(string: self.url)!, protocols: ["graphql-ws"])
    ws.callbackQueue = self.queue
    ws.onConnect = {
      if self.client == ws {
        self.onConnected()
      }
    }
    ws.onDisconnect = { err in
      if self.client == ws {
        self.onDisconnected()
      }
    }
    ws.onText = { text in
      if self.client == ws {
        self.onReceived(message: text)
      }
    }
    self.client = ws
    
    ws.connect()
  }
  
  private func onConnected() {
    NSLog("[SpaceX-Apollo]: onConnected")
    if self.state != .connecting {
      fatalError("Unexpected state")
    }
    self.state = .starting
    self.writeToSocket(msg: JSON([
      "type": "connection_init", "payload": self.params
    ]))
    for p in self.pending {
      self.writeToSocket(msg: JSON(["type": "start", "id": p.key, "payload": p.value]))
    }
  }
  
  private func onReceived(message: String) {
    // print("[SpaceX-Apollo]: << " + message)
    
    let parsed = JSON(parseJSON: message)
    let type = parsed["type"].stringValue
    if type == "ka" {
      // TODO: Handle
      NSLog("[SpaceX-Apollo]: Ping")
    } else if type == "connection_ack" {
      if self.state == .starting {
        NSLog("[SpaceX-Apollo]: Started")
        
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
        var shouldRetry = false
        if let arr = errors.array {
          for a in arr {
            if a["shouldRetry"].bool == true {
              shouldRetry = true
            }
          }
        }
        self.callbackQueue.async {
          if shouldRetry {
            NSLog("[SpaceX-Apollo]: Should Retry (" + id + ")")
            self.delegate?.onTryAgain(id: id, delay: 5)
          } else {
            NSLog("[SpaceX-Apollo]: Error (" + id + ")")
            self.delegate?.onError(id: id, error: errors)
          }
        }
      } else {
        NSLog("[SpaceX-Apollo]: Data (" + id + ")")
        self.callbackQueue.async {
          self.delegate?.onResponse(id: id, data: data)
        }
      }
    } else if type == "error" {
      let id = parsed["id"].stringValue
      NSLog("[SpaceX-Apollo]: Critical Error (" + id + "): Retrying")
      self.callbackQueue.async {
        self.delegate?.onTryAgain(id: id, delay: 5)
      }
    } else if type == "complete" {
      let id = parsed["id"].stringValue
      NSLog("[SpaceX-Apollo]: Complete (" + id + ")")
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
    NSLog("[SpaceX-Apollo]: onDisconnected")
    if self.state == .started {
      self.callbackQueue.async {
        self.delegate?.onDisconnected()
        self.delegate?.onSessiontRestart()
      }
    }
    self.stopClient()
    self.state = .waiting
    self.failuresCount += 1
    let delay = backoffDelay(currentFailureCount: self.failuresCount, minDelay: 1000, maxDelay: 10000, maxFailureCount: 10)
    NSLog("[SpaceX-Apollo]: Retry in \(delay) ms")
    self.queue.asyncAfter(deadline: .now() + Double(delay)/1000.0) {
      if self.state == .waiting && self.reachable {
        self.doConnect()
      }
    }
  }
  
  func close() {
    queue.async {
      NSLog("[SpaceX-Apollo]: Stopping")
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
    let ws = self.client
    self.client = nil
    
    // Stopping client
    ws?.onText = nil
    ws?.onConnect = nil
    ws?.onDisconnect = nil
    ws?.disconnect()
  }
  
  private func writeToSocket(msg: JSON) {
    let txt = serializeJson(json: msg)
    // print("[SpaceX-Apollo]: >> \(txt)")
    self.client!.write(string: txt)
  }
}
