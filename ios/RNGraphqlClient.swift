//
//  RNGraphqlClient.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

func jsonToNSDictionary(src: JSON) -> NSDictionary {
  let d = src.dictionary!
  let res = NSMutableDictionary()
  for kv in d {
    res.setValue(jsonToNative(src: kv.value), forKey: kv.key)
  }
  return res
}

func jsonToNative(src: JSON) -> Any {
  if src.type == Type.dictionary {
    return jsonToNSDictionary(src: src)
  } else if src.type == Type.array {
    var res: [Any] = []
    for i in src.arrayValue {
      res.append(jsonToNative(src: i))
    }
    return res
  } else if src.type == Type.bool {
    return src.boolValue
  } else if src.type == Type.number {
    return src.doubleValue
  } else if src.type == Type.string {
    return src.stringValue
  } else if src.type == Type.null {
    return NSNull()
  } else {
    fatalError()
  }
}

class RNGraphqlClient {
  
  let key: String
  unowned let module: RNGraphQL
  let client: SpaceXClient
  var watches: [String: ()->Void] = [:]
  var subscriptions: [String: AbortFunc] = [:]
  var connected: Bool = false
  var live = true
  
  init(key: String, endpoint: String, token: String?, storage: String?, module: RNGraphQL) {
    self.module = module
    self.key = key
    self.client = SpaceXClient(url: "wss:" + endpoint, token: token, storage: storage)
    self.client.onConnected = { [weak self] in
      if let s = self {
        s.module.reportStatus(key: key, status: "connected")
      }
    }
    self.client.onDisconnected = { [weak self] in
      if let s = self {
        s.module.reportStatus(key: key, status: "connecting")
      }
    }
  }
  
  //
  // Simple operations
  //
  
  func query(id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    if !self.live {
      return
    }
    
    let fetchMode = self.resolveFetchPolicy(parameters: parameters)
    
    self.client.query(
      operation: Operations.shared.operationByName(query),
      variables: JSON(arguments),
      fetchMode: fetchMode
    ) { [weak self] res in
      if let s = self {
        switch(res) {
        case .result(let data):
          s.module.reportResult(key: s.key, id: id, result: jsonToNSDictionary(src: data))
        case .error(let data):
          s.module.reportError(key: s.key, id: id, result: jsonToNative(src: data))
          break
        }
      }
    }
  }
  
  func mutate(id: String, mutation: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    
    self.client.mutate(
      operation: Operations.shared.operationByName(mutation),
      variables: JSON(arguments)
    ) { [weak self] res in
      if let s = self {
        switch(res) {
        case .result(let data):
          s.module.reportResult(key: s.key, id: id, result: jsonToNSDictionary(src: data))
        case .error(let data):
          s.module.reportError(key: s.key, id: id, result: jsonToNative(src: data))
          break
        }
      }
    }
  }
  
  //
  // Watch operations
  //
  
  func watch(id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    if !self.live {
      return
    }
    let fetchMode = self.resolveFetchPolicy(parameters: parameters)
    let cancel = self.client.watch(
      operation: Operations.shared.operationByName(query),
      variables: JSON(arguments),
      fetchMode: fetchMode
    ) { [weak self] res in
      if let s = self {
        switch(res) {
        case .result(let data):
          s.module.reportResult(key: s.key, id: id, result: jsonToNSDictionary(src: data))
        case .error(let error):
          s.module.reportError(key: s.key, id: id, result: jsonToNative(src: error))
          break
        }
      }
    }
    self.watches[id] = cancel
  }
  
  func watchEnd(id: String) {
    if !self.live {
      return
    }
    self.watches.removeValue(forKey: id)?()
  }
  
  //
  // Subscriptions
  //

  func subscribe(id: String, subscription: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    let s = self.client.subscribe(
      operation: Operations.shared.operationByName(subscription),
      variables: JSON(arguments)
    ) { [weak self] res in
      if let s = self {
        switch(res) {
        case .result(let data):
          s.module.reportResult(key: s.key, id: id, result: jsonToNSDictionary(src: data))
        case .error(let error):
          s.module.reportError(key: s.key, id: id, result: jsonToNative(src: error))
        }
      }
    }
    
    self.subscriptions[id] = s
  }
  
  func subscribeEnd(id: String) {
    if !self.live {
      return
    }
    self.subscriptions.removeValue(forKey: id)?()
  }
  
  //
  // Store Operations
  //
  
  func read(id: String, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.client.readQuery(
      operation: Operations.shared.operationByName(query),
      variables: JSON(arguments)
    ) { [weak self] res in
      if let s = self {
        switch(res) {
        case .missing:
          s.module.reportResult(key: s.key, id: id, result: nil)
        case .result(let data):
          s.module.reportResult(key: s.key, id: id, result: jsonToNSDictionary(src: data))
        }
      }
    }
  }
  
  func write(id: String, data: NSDictionary, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    
    self.client.writeQuery(
      operation: Operations.shared.operationByName(query),
      variables: JSON(arguments),
      data: JSON(data)
    ) { [weak self] in
      if let s = self {
        s.module.reportResult(key: s.key, id: id, result: nil)
      }
    }
  }
  
  //
  // Dispose
  //
  
  func dispose() {
    self.live = false
    for s in self.subscriptions.values {
      s()
    }
    for w in self.watches.values {
      w()
    }
    self.subscriptions.removeAll()
    self.watches.removeAll()
    self.client.dispose()
  }
  
  private func resolveFetchPolicy(parameters: NSDictionary) -> FetchMode {
    var cachePolicy = FetchMode.cacheFirst
    let cp = parameters.value(forKey: "fetchPolicy")
    if cp != nil && !(cp is NSNull) {
      let cps = cp as! String
      if cps == "cache-first" {
        cachePolicy = FetchMode.cacheFirst
      } else if cps == "network-only" {
        cachePolicy = FetchMode.networkOnly
      } else if cps == "cache-and-network" {
        cachePolicy = FetchMode.cacheAndNetwork
      } else if cps == "no-cache" {
        fatalError("no-cache is not supported on iOS")
      } else {
        fatalError("Unsupported fetch policy: " + cps)
      }
    }
    return cachePolicy
  }
}
