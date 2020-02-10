//
//  ThrustedSocket.swift
//  openland
//
//  Created by Steve Korshakov on 2/10/20.
//  Copyright © 2020 Openland. All rights reserved.
//

import Foundation
import Starscream

class ThrustedSocket {
  
  var onConnect: (() -> Void)?
  var onDisconnect: (() -> Void)?
  var onText: ((_ message: String) -> Void)?
  
  private let timeout: Int
  private let queue: DispatchQueue
  private var closed = false
  private var socket: WebSocket?
  private var thruster: Thruster?
  private var watchDog: WatchDogTimer?
  
  init(url: String, timeout: Int, queue: DispatchQueue) {
    self.queue = queue
    self.timeout = timeout
    let configs = [
      ThrusterConfig(url: url, timeout: 1000),
      ThrusterConfig(url: url, timeout: 5000),
      ThrusterConfig(url: url, timeout: 30000)
    ]
    self.thruster = Thruster(configs: configs, onSuccess: { [weak self] (ws) -> Void in
      let sself = self
      if sself != nil {
        sself!.onConnected(ws: ws)
      }
    }, queue: queue)
  }
  
  private func onConnected(ws: WebSocket) {
    self.watchDog = WatchDogTimer(timeout: self.timeout, queue: self.queue, onRestart: {
       self.onConnectionDied()
    });
    
    self.thruster = nil
    
    self.socket = ws
    
    ws.onDisconnect = { err in
      self.onConnectionDied()
    }
    ws.onText = { msg in
      if self.closed {
        return
      }
      
      let clb = self.onText
      if clb != nil {
        clb!(msg)
      }
      
      if self.watchDog != nil {
        self.watchDog!.kick()
      }
    }
    
    let clb = self.onConnect
    if clb != nil {
      clb!()
    }
  }
  
  private func onConnectionDied() {
    if self.closed {
      return
    }
    
    self.closed = true
    
    // Stop thruster
    self.thruster?.close()
    
    // Stop socket
    self.socket?.onDisconnect = nil
    self.socket?.onConnect = nil
    self.socket?.onText = nil
    self.socket?.disconnect()
    self.socket = nil
    
    // Kill watchdog
    self.watchDog?.kill()
    self.watchDog = nil
    
    let clb = self.onDisconnect
    if clb != nil {
      clb!()
    }
  }
  
  func send(msg: String) {
    if self.closed {
      return; // Ignore stale requests
    }
    if self.socket == nil {
      fatalError("Socket not connected yet")
    }
    self.socket!.write(string: msg)
  }
  
  func close() {
    if self.closed {
      return; // Ignore already closed
    }
    self.closed = true
    
    // Stop thruster
    self.thruster?.close()
    
    // Stop socket
    self.socket?.onDisconnect = nil
    self.socket?.onConnect = nil
    self.socket?.onText = nil
    self.socket?.disconnect()
    self.socket = nil
    
    // Kill watchdog
    self.watchDog?.kill()
    self.watchDog = nil
  }
}
