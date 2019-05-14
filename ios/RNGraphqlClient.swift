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
  let module: RNGraphQL
  let client: SpaceXClient
  var watches: [String: ()->Void] = [:]
  var subscriptions: [String: RunningSubscription] = [:]
  var connected: Bool = false
  var live = true
  
  init(key: String, endpoint: String, token: String?, storage: String?, module: RNGraphQL) {
    self.module = module
    self.key = key
    self.client = SpaceXClient(url: "wss:" + endpoint, token: token, storage: storage!)
  }
  
  //
  // Simple operations
  //
  
  func query(id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    if !self.live {
      return
    }
    
    let fetchMode = self.resolveFetchPolicy(parameters: parameters)
    
    self.client.query(operation: Operations.shared.operationByName(query), variables: JSON(arguments), fetchMode: fetchMode) { res in
      switch(res) {
      case .result(let data):
        self.module.reportResult(key: self.key, id: id, result: jsonToNSDictionary(src: data))
      case .error(let data):
        self.module.reportError(key: self.key, id: id, result: jsonToNSDictionary(src: data))
        break
      }
    }
  }
  
  func mutate(id: String, mutation: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    
    self.client.mutate(operation: Operations.shared.operationByName(mutation), variables: JSON(arguments)) { res in
      switch(res) {
      case .result(let data):
        self.module.reportResult(key: self.key, id: id, result: jsonToNSDictionary(src: data))
      case .error(let data):
        self.module.reportError(key: self.key, id: id, result: jsonToNSDictionary(src: data))
        break
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
    let cancel = self.client.watch(operation: Operations.shared.operationByName(query), variables: JSON(arguments), fetchMode: fetchMode) { res in
      switch(res) {
      case .result(let data):
        self.module.reportResult(key: self.key, id: id, result: jsonToNSDictionary(src: data))
      case .error(let data):
        self.module.reportError(key: self.key, id: id, result: jsonToNSDictionary(src: data))
        break
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
    let s = self.client.subscribe(operation: Operations.shared.operationByName(subscription), variables: JSON(arguments)) { res in
      
    }
    
    self.subscriptions[id] = s
  }
  
  func subscribeUpdate(id: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.subscriptions[id]!.updateVariables(variables: JSON(arguments))
  }
  
  func subscribeEnd(id: String) {
    if !self.live {
      return
    }
    self.subscriptions.removeValue(forKey: id)!.close()
  }
  
  //
  // Store Operations
  //
  
  func read(id: String, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.client.readQuery(operation: Operations.shared.operationByName(query), variables: JSON(arguments)) { res in
      switch(res) {
      case .missing:
        self.module.reportResult(key: self.key, id: id, result: nil)
      case .result(let data):
        self.module.reportResult(key: self.key, id: id, result: jsonToNSDictionary(src: data))
      }
    }
  }
  
  func write(id: String, data: NSDictionary, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    
    self.client.writeQuery(operation: Operations.shared.operationByName(query), variables: JSON(arguments), data: JSON(data)) {
      self.module.reportResult(key: self.key, id: id, result: nil)
    }
  }
  
  //
  // Dispose
  //
  
  func dispose() {
    self.live = false
//    for s in self.subscriptions.values {
//      s.stop()
//    }
//    for w in self.watches.values {
//      w()
//    }
//    self.ws.closeConnection()
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
