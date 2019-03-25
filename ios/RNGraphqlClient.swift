//
//  RNGraphqlClient.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Apollo

class RNGraphqlClient: WebSocketTransportDelegate {
  
  let key: String
  let module: RNGraphQL
  let store: ApolloStore
  let client: ApolloClient
  let factory = ApiFactory()
  var watches: [String: WatchCancel] = [:]
  var subscriptions: [String: WatchCancel] = [:]
  
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
    self.store = ApolloStore(cache: InMemoryNormalizedCache())
    self.client = ApolloClient(networkTransport: transport, store: self.store)
    wsTransport.delegate = self
  }
  
  func query(id: String, query: String, arguments: NSDictionary) {
    self.factory.runQuery(client: self.client, name: query, src: arguments) { (res, err) in
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
      }
    }
  }
  
  func read(id: String, query: String, arguments: NSDictionary) {
    self.factory.readQuery(store: self.store, name: query, src: arguments) { (res, err) in
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
      }
    }
  }
  
  func write(id: String, data: NSDictionary, query: String, arguments: NSDictionary) {
    self.factory.writeQuery(store: self.store, data: data, name: query, src: arguments) { (res, err) in
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: NSDictionary())
      }
    }
  }
  
  func watch(id: String, query: String, arguments: NSDictionary) {
    let c = self.factory.watchQuery(client: self.client, name: query, src: arguments) { (res, err) in
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
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
        self.handleError(id: id, err: err!)
      } else {
        self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
      }
    }
  }
  
  func subscribe(id: String, subscription: String, arguments: NSDictionary) {
    let c = self.factory.runSubscription(client: self.client, name: subscription, src: arguments) { (res, err) in
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        // Handle result
        self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
      }
    }
    self.subscriptions[id] = c
  }
  
  func subscribeEnd(id: String) {
    self.subscriptions.removeValue(forKey: id)?()
  }
  
  private func handleError(id: String, err: Error) {
    if err is WebSocketError {
      let wse = (err as! WebSocketError)
      switch(wse.kind) {
      case let .unprocessedMessage(str):
        break;
      default:
       print(wse.localizedDescription)
      }
    } else {
      print(err.localizedDescription)
    }
  }
  
  func webSocketTransportDidConnect(_ webSocketTransport: WebSocketTransport) {
    print("connects")
  }
  func webSocketTransportDidReconnect(_ webSocketTransport: WebSocketTransport) {
    print("reconnect")
  }
  func webSocketTransport(_ webSocketTransport: WebSocketTransport, didDisconnectWithError error:Error?) {
    print("didDisconnect")
  }
}
