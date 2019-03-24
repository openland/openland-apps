//
//  RNGraphql.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc(RNGraphQL)
class RNGraphQL: RCTEventEmitter {
  
  override func supportedEvents() -> [String]! {
    return ["apollo_client"]
  }
  
  private var clients: [String: RNGraphqlClient] = [:]
  
  @objc(createClient:endpoint:token:)
  func createClient(key: String, endpoint: String, token: String?) {
    self.clients[key] = RNGraphqlClient(key: key, endpoint: endpoint, token: token, module: self)
  }
  
  @objc(closeClient:)
  func closeClient(key: String) {
    // TODO: Delete
    self.clients.removeValue(forKey: key)
  }
  
  @objc(query:id:query:arguments:parameters:)
  func query(key: String, id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    self.clients[key]!.query(id: id, query: query, arguments: arguments)
  }
  
  @objc(watch:id:query:arguments:parameters:)
  func watch(key: String, id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    // TODO: Implement
  }
  
  @objc(watchEnd:id:)
  func watchEnd(key: String, id: String) {
    // TODO: Implement
  }
  
  @objc(mutate:id:mutation:arguments:)
  func mutate(key: String, id: String, mutation: String, arguments: NSDictionary) {
    // TODO: Implement
  }
  
  @objc(subscribe:id:query:arguments:)
  func subscribe(key: String, id: String, query: String, arguments: NSDictionary) {
    // TODO: Implement
  }
  
  @objc(subscribeUpdate:id:arguments:)
  func subscribeUpdate(key: String, id: String, arguments: NSDictionary) {
    // TODO: Implement
  }
  
  @objc(unsubscribe:id:)
  func unsubscribe(key: String, id: String) {
    // TODO: Implement
  }
  
  func reportResult(key: String, id: String, result: NSDictionary) {
    var dict:[String:Any] = [:]
    dict["key"] = key
    dict["id"] = id
    dict["type"] = "response"
    dict["data"] = result
    self.sendEvent(withName: "apollo_client", body: dict)
  }
}
