//
//  WrappedWebSocket.swift
//  openland
//
//  Created by Steve Korshakov on 2/13/20.
//  Copyright © 2020 Openland. All rights reserved.
//

import Foundation
import Starscream

/**
  Wrapper for WebSocket class that provides correct (like JS) callback invoking guaranteees unlike original Starscream one
 */
class WrappedWebSocket {
  let ws: WebSocket
  let queue: DispatchQueue
  
  var onConnect: (() -> Void)?
  var onDisconnect: ((Error?) -> Void)?
  var onText: ((String) -> Void)?
  
  init(ws: WebSocket, queue: DispatchQueue) {
    self.ws = ws
    self.queue = queue
    ws.onConnect = {
      self.queue.async {
        let t = self.onConnect
        if t != nil {
          t!()
        }
      }
    }
    ws.onDisconnect = { err in
      self.queue.async {
        let t = self.onDisconnect
        if t != nil {
          t!(err)
        }
      }
    }
    ws.onText = { str in
      self.queue.async {
        let t = self.onText
        if t != nil {
          t!(str)
        }
      }
    }
    ws.connect()
  }
  
  func write(string: String) {
    self.ws.write(string: string)
  }
  
  func disconnect() {
    self.ws.disconnect()
  }
}
