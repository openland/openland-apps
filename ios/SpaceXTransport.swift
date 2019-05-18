//
//  SpaceXTransportScheduler.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum SpaceXTransportOperationResult {
  case result(data: JSON)
  case error(error: JSON)
}

class SpaceXTransport {
  private let queue = DispatchQueue(label: "spacex-transport")
  private let transport: TransportState
  var connected: Bool = false
  var onConnected: (() -> Void)?
  var onDisconnected: (() -> Void)?
  
  init(url: String, params: [String: String?]) {
    NSLog("[SpaceX-Alloc]: init SpaceXTransportScheduler")
    self.transport = TransportState(url: url, params: params)
    self.transport.connectionCallback = { connected in
      self.queue.async {
        if self.connected != connected {
          self.connected = connected
          if connected {
            self.onConnected?()
          } else {
            self.onDisconnected?()
          }
        }
      }
    }
  }
  
  deinit {
    NSLog("[SpaceX-Alloc]: deinit SpaceXTransportScheduler")
  }
  
  func operation(
    operation: OperationDefinition,
    variables: JSON,
    queue: DispatchQueue,
    handler: @escaping  (SpaceXTransportOperationResult) -> Void
  ) {
    var isCompleted = false
    let _ = self.transport.operation(operation: operation, variables: variables) { (res) in
      self.queue.async {
        switch(res) {
        case .result(let data):
          if !isCompleted {
            isCompleted = true
            queue.async {
              handler(SpaceXTransportOperationResult.result(data: data))
            }
          }
        case .error(let data):
          if !isCompleted {
            isCompleted = true
            queue.async {
              handler(SpaceXTransportOperationResult.error(error: data))
            }
          }
        case .completed:
          // Ignore
          break
        }
      }
    }
  }
  
  func subscription(
    operation: OperationDefinition,
    variables: JSON,
    queue: DispatchQueue,
    handler: @escaping (SpaceXTransportOperationResult) -> Void
  ) -> RunningOperation {
    var isCompleted = false
    return self.transport.operation(operation: operation, variables: variables) { res in
      self.queue.async {
        switch(res) {
        case .result(let data):
          queue.async {
            if !isCompleted {
              handler(SpaceXTransportOperationResult.result(data: data))
            }
          }
        case .error(let error):
          queue.async {
            if !isCompleted {
              isCompleted = true
              handler(SpaceXTransportOperationResult.error(error: error))
            }
          }
        case .completed:
          queue.async {
            if !isCompleted {
              isCompleted = true
              handler(SpaceXTransportOperationResult.error(error: JSON([])))
            }
          }
        }
      }
    }
  }
  
  func close() {
    self.transport.connectionCallback = nil
    self.transport.close()
  }
}
