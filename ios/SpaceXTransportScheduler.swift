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

class SpaceXTransportScheduler {
  let url: String
  let params: [String: String?]
  private let queue = DispatchQueue(label: "spacex-transport")
  private let transport: WebSocketTransport
  
  init(url: String, params: [String: String?]) {
    self.url = url
    self.params = params
    self.transport = WebSocketTransport(url: url, params: params)
    self.transport.connect()
  }
  
  func operation(
    operation: OperationDefinition,
    variables: JSON,
    queue: DispatchQueue,
    handler: @escaping  (SpaceXTransportOperationResult)->Void
  ) {
    var isCompleted = false
    let _ = self.transport.operation(operation: operation, variables: variables) { (res) in
      queue.async {
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
  
  func close() {
    self.transport.close()
  }
}
