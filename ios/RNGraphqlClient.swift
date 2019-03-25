//
//  RNGraphqlClient.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Apollo

class RNGraphqlClient {
  
  let key: String
  let module: RNGraphQL
  let client: ApolloClient
  let factory = ApiFactory()
  var watches: [String: WatchCancel] = [:]
  
  init(key: String, endpoint: String, token: String?, module: RNGraphQL) {
    self.module = module
    self.key = key
    let configuration = URLSessionConfiguration.default
    if token != nil {
      configuration.httpAdditionalHeaders = ["x-openland-token": token]
    }
    let wsTransport = WebSocketTransport(
      request: URLRequest(url: URL(string: "wss:"+endpoint)!),
      connectingPayload:["x-openland-token": token])
    let httpTransport =  HTTPNetworkTransport(url:URL(string: "https:"+endpoint)!, configuration: configuration)
    let transport = SplitNetworkTransport(httpNetworkTransport: httpTransport, webSocketNetworkTransport: wsTransport)
    self.client = ApolloClient(networkTransport: transport)
  }
  
  func query(id: String, query: String, arguments: NSDictionary) {
    self.factory.runQuery(client: self.client, name: query, src: arguments) { (res, err) in
      if err != nil {
        // Handle error
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res! as NSDictionary)
      }
    }
  }
  
  func watch(id: String, query: String, arguments: NSDictionary) {
    let c = self.factory.watchQuery(client: self.client, name: query, src: arguments) { (res, err) in
      if err != nil {
        // Handle error
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res! as NSDictionary)
      }
    }
    self.watches[id] = c
  }
  
  func watchEnd(id: String) {
    self.watches.removeValue(forKey: id)?()
  }
  
  func mutate(id: String, mutation: String, arguments: NSDictionary) {
    self.factory.runMutation(client: self.client, name: mutation, src: arguments) { (res, err) in
      if err != nil {
        // Handle error
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res! as NSDictionary)
      }
    }
  }
}
