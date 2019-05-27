//
//  RNGraphql.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

let GraphQLQueue = DispatchQueue(label: "gql", qos: DispatchQoS.background)

@objc(RNGraphQL)
class RNGraphQL: RCTEventEmitter {
  
  private var clients: [String: RNGraphqlClient] = [:]
  
  @objc(createClient:endpoint:token:storage:)
  func createClient(key: String, endpoint: String, token: String?, storage: String?) {
    self.clients[key] = RNGraphqlClient(key: key, endpoint: endpoint, token: token, storage: storage, module: self)
  }
  
  @objc(closeClient:)
  func closeClient(key: String) {
    self.clients.removeValue(forKey: key)!.dispose()
  }
  
  @objc(query:id:query:arguments:parameters:)
  func query(key: String, id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    self.clients[key]!.query(id: id, query: query, arguments: arguments, parameters: parameters)
  }
  
  @objc(watch:id:query:arguments:parameters:)
  func watch(key: String, id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    self.clients[key]!.watch(id: id, query: query, arguments: arguments, parameters: parameters)
  }
  
  @objc(watchEnd:id:)
  func watchEnd(key: String, id: String) {
    self.clients[key]!.watchEnd(id: id)
  }
  
  @objc(mutate:id:mutation:arguments:)
  func mutate(key: String, id: String, mutation: String, arguments: NSDictionary) {
    self.clients[key]!.mutate(id: id, mutation: mutation, arguments: arguments)
  }
  
  @objc(subscribe:id:query:arguments:)
  func subscribe(key: String, id: String, query: String, arguments: NSDictionary) {
    self.clients[key]!.subscribe(id: id, subscription: query, arguments: arguments)
  }
  
  @objc(unsubscribe:id:)
  func unsubscribe(key: String, id: String) {
    self.clients[key]!.subscribeEnd(id: id)
  }
  
  @objc(read:id:query:arguments:)
  func read(key: String, id: String, query: String, arguments: NSDictionary) {
    self.clients[key]!.read(id: id, query: query, arguments: arguments)
  }
  
  @objc(write:id:data:query:arguments:)
  func write(key: String, id: String, data: NSDictionary, query: String, arguments: NSDictionary) {
    self.clients[key]!.write(id: id, data: data, query: query, arguments: arguments)
  }
  
  //
  // Implementation
  //
  
  func reportResult(key: String, id: String, result: NSDictionary?) {
    var dict:[String:Any] = [:]
    dict["key"] = key
    dict["id"] = id
    dict["type"] = "response"
    if result != nil {
      dict["data"] = result
    } else {
      dict["data"] = NSNull()
    }
    self.sendEvent(withName: "graphql_client", body: dict)
  }
  
  func reportError(key: String, id: String, result: Any) {
    var dict:[String:Any] = [:]
    dict["key"] = key
    dict["id"] = id
    dict["type"] = "failure"
    dict["kind"] = "graphql"
    dict["data"] = result
    self.sendEvent(withName: "graphql_client", body: dict)
  }
  
  func reportStatus(key: String, status: String) {
    var dict:[String:Any] = [:]
    dict["key"] = key
    dict["type"] = "status"
    dict["status"] = status
    self.sendEvent(withName: "graphql_client", body: dict)
  }

  
  override var methodQueue: DispatchQueue! {
     get { return GraphQLQueue }
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc(invalidate)
  func invalidate() {
    for s in self.clients.values {
      s.dispose()
    }
    self.clients.removeAll()
  }
  
  override func supportedEvents() -> [String]! {
    return ["apollo_client"]
  }
}
