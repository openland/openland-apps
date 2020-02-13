//
//  Thruster.swift
//  openland
//
//  Created by Steve Korshakov on 2/10/20.
//  Copyright © 2020 Openland. All rights reserved.
//

import Foundation
import Starscream

class ThrusterConfig {
  let url: String
  let timeout: Int
  
  init(url: String, timeout: Int) {
    self.url = url
    self.timeout = timeout;
  }
}

class Thruster {
  let queue: DispatchQueue
  let configs: [ThrusterConfig]
  let onSuccess: (_ src: WrappedWebSocket) -> Void;
  
  private var bucketSockets: [WebSocket?] = []
  private var bucketTimeouts: [Int?] = []
  private var closed = false
  private var nextTimer = 0
  
  init(configs: [ThrusterConfig], onSuccess:  @escaping (_ src: WrappedWebSocket) -> Void, queue: DispatchQueue) {
    self.queue = queue
    self.configs = configs
    self.onSuccess = onSuccess
    
    NSLog("[Thruster]: New")
    
    for _ in 0..<configs.count {
      self.bucketSockets.append(nil)
      self.bucketTimeouts.append(nil)
    }
    
    for i in 0..<configs.count {
      self.restartBucket(id: i)
    }
  }
  
  private func restartBucket(id: Int) {
    let timeout = self.configs[id].timeout
    let url = self.configs[id].url
    
    NSLog("[Thruster] \(url)%\(timeout): Restart")

    if self.bucketSockets[id] != nil {
      let ex = self.bucketSockets[id]
      self.bucketSockets[id] = nil
      ex?.onData=nil
      ex?.onText=nil
      ex?.onConnect=nil
      ex?.onDisconnect=nil
      ex?.disconnect()
      self.bucketTimeouts[id] = nil
    }
    
    let ws = WrappedWebSocket(ws: WebSocket(url: URL(string: url)!, protocols: ["graphql-ws"]), queue: self.queue)
    ws.onConnect = {
      if self.closed {
        return
      }
      
      NSLog("[Thruster] \(url)|\(timeout): Connected")
      
      // Remove socket from buckets to avoid it's shutdown
      self.bucketSockets[id] = nil
      
      // Close all other sockets
      self.close()
      
      // Remove callbacks and invoke onSuccess callback
      ws.onConnect = nil
      ws.onDisconnect = nil
      self.onSuccess(ws)
    }
    
    ws.onDisconnect = { err in
      if self.closed {
        return
      }
      
      NSLog("[Thruster] \(url)|\(timeout): Disconnect")
      
      // Restart timer
      self.bucketTimeouts[id] = nil
      self.nextTimer += 1
      let t = self.nextTimer
      self.bucketTimeouts[id] = t
      self.queue.asyncAfter(deadline: .now() + .seconds(3)) { [weak self] in
        let sself = self
        if sself != nil {
          let b = sself!.bucketTimeouts[id]
          if sself!.closed && b == t {
            sself!.restartBucket(id: id)
          }
        }
      }
    }
    
    // Restart timer
    self.bucketTimeouts[id] = nil
    self.nextTimer += 1
    let t = self.nextTimer
    self.bucketTimeouts[id] = t
    self.queue.asyncAfter(deadline: .now() + .milliseconds(timeout)) { [weak self] in
      let sself = self
      if sself != nil {
        let b = sself!.bucketTimeouts[id]
        if sself!.closed && b == t {
          sself!.restartBucket(id: id)
        }
      }
    }
  }
  
  func close() {
    if self.closed {
      return
    }
    self.closed = true
    
    NSLog("[Thruster]: Close")
    
    for i in 0..<self.configs.count {
      let ex = self.bucketSockets[i]
      self.bucketSockets[i] = nil
      ex?.onText=nil
      ex?.onConnect=nil
      ex?.onDisconnect=nil
      ex?.disconnect()
      self.bucketTimeouts[i] = nil
    }
  }
}
