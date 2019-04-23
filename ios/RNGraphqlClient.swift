//
//  RNGraphqlClient.swift
//  openland
//
//  Created by Steve Kite on 3/22/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import Apollo
// import Soyuz

class ActiveSubscription {
  let key: String
  let id: String
  let subscription: String
  let factory: ApiFactory
  let client: ApolloClient
  let module: RNGraphQL
  var arguments: NSDictionary
  private var isActive = false
  private var active: WatchCancel? = nil
  
  init(key: String, id: String, subscription: String, arguments: NSDictionary, factory: ApiFactory, client: ApolloClient, module: RNGraphQL) {
    self.key = key
    self.id = id
    self.subscription = subscription
    self.arguments = arguments
    self.factory = factory
    self.client = client
    self.module = module
  }
  
  func start() {
    if !self.isActive {
      self.isActive = true
      self.active = self.factory.runSubscription(client: self.client, name: self.subscription, src: self.arguments) { (data, err) in
        if !self.isActive {
          return
        }
        if err != nil {
          if err is WebSocketError {
            let wse = (err as! WebSocketError)
            switch(wse.kind) {
            case .unprocessedMessage(_):
              return;
            default:
              print(wse.localizedDescription)
            }
          } else {
            print(err!.localizedDescription)
          }
          
          self.stop()
          self.start()
        } else if (data != nil) {
          self.module.reportResult(key: self.key, id: self.id, result: data!.jsonObject as NSDictionary)
        }
      }
    }
  }
  
  func update(arguments: NSDictionary) {
    self.arguments = arguments
  }
  
  func stop() {
    if self.isActive {
      self.isActive = false
      if self.active != nil {
        self.active!()
        self.active = nil
      }
    }
  }
}

var sqlCaches: [String: NormalizedCache] = [:]

class RNGraphqlClient: WebSocketTransportDelegate {
  
  let key: String
  let module: RNGraphQL
  let store: ApolloStore
  let client: ApolloClient
  let ws: WebSocketTransport
  let factory = ApiFactory()
  var watches: [String: WatchCancel] = [:]
  var subscriptions: [String: ActiveSubscription] = [:]
  var connected: Bool = false
  var live = true
  
  init(key: String, endpoint: String, token: String?, storage: String?, module: RNGraphQL) {
    self.module = module
    self.key = key
    let configuration = URLSessionConfiguration.default
    if token != nil {
      configuration.httpAdditionalHeaders = ["x-openland-token": token]
    }
    var request = URLRequest(url: URL(string: "wss:"+endpoint)!)
    request.timeoutInterval = 15
    self.ws = WebSocketTransport(
      request: request,
      connectingPayload:["x-openland-token": token])
    let httpTransport =  HTTPNetworkTransport(url:URL(string: "https:"+endpoint)!, configuration: configuration)
    let transport = SplitNetworkTransport(httpNetworkTransport: httpTransport, webSocketNetworkTransport: self.ws)
    do {
      let cache: NormalizedCache
      if let s = storage {
        let ex = sqlCaches[s]
        if ex != nil {
          cache = ex!
        } else {
//           let path = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
//           let url = URL(fileURLWithPath: s + "-\(RNGraphQLPersistenceSQL.VERSION).sqlite", relativeTo: path)
//           print("Loading storage: \(storage) at \(path.absoluteURL)")
//           let engine = try RNGraphQLPersistenceSQL(fileURL:  url)
          let engine = try RNGraphQLPersistenceLevelDB(name: "\(s)-\(RNGraphQLPersistenceLevelDB.VERSION)")
//           let engine = try RNGraphQLPersistenceSoyuz(name: "\(s)-\(RNGraphQLPersistenceLevelDB.VERSION)")
          // let c = try RNGraphqlSQLSQLCache(engine: engine)
          let c = try RNGraphqlSQLSQLCache(engine: engine)
          sqlCaches[s] = c
          cache = c
        }
      } else {
        cache = InMemoryNormalizedCache()
      }
      self.store = ApolloStore(cache: cache)
      self.store.cacheKeyForObject =  { it in
        if let id = it["id"], let typename = it["__typename"] {
          return (typename as! String) + ":" + (id as! String)
        } else {
          return nil
        }
      }
      self.client = ApolloClient(networkTransport: transport, store: self.store)
      self.ws.delegate = self
    } catch {
      fatalError()
    }
  }
  
  func query(id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    if !self.live {
      return
    }
    
    let cachePolicy = self.resolveFetchPolicy(parameters: parameters)
    let start = DispatchTime.now()
    self.factory.runQuery(client: self.client, name: query, src: arguments, cachePolicy: cachePolicy) { (res, err) in
      if !self.live {
        return
      }
      let end = DispatchTime.now()
      let nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
      let timeInterval = Double(nanoTime) / 1_000_000
      print("Query \(query) completed in \(timeInterval) ms")
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        if res != nil {
          self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
        } else {
          self.module.reportResult(key: self.key, id: id, result: nil)
        }
      }
    }
  }
  
  func read(id: String, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.factory.readQuery(store: self.store, name: query, src: arguments) { (res, err) in
      if !self.live {
        return
      }
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        if res != nil {
          self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
        } else {
          self.module.reportResult(key: self.key, id: id, result: nil)
        }
      }
    }
  }
  
  func write(id: String, data: NSDictionary, query: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.factory.writeQuery(store: self.store, data: data, name: query, src: arguments) { (res, err) in
      if !self.live {
        return
      }
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        self.module.reportResult(key: self.key, id: id, result: nil)
      }
    }
  }
  
  func writeFragment(id: String, data: NSDictionary, fragment: String) {
    if !self.live {
      return
    }
    self.factory.writeFragment(store: self.store, data: data, name: fragment) { (res, err) in
      if !self.live {
        return
      }
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        self.module.reportResult(key: self.key, id: id, result: nil)
      }
    }
  }
  
  func watch(id: String, query: String, arguments: NSDictionary, parameters: NSDictionary) {
    if !self.live {
      return
    }
    let cachePolicy = self.resolveFetchPolicy(parameters: parameters)
    // NSLog("Query: " + query)
    let c = self.factory.watchQuery(client: self.client, name: query, src: arguments, cachePolicy: cachePolicy) { (res, err) in
      if !self.live {
        return
      }
      // NSLog("Query(Result): " + query)
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        if res != nil {
          self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
        } else {
          self.module.reportResult(key: self.key, id: id, result: nil)
        }
      }
    }
    self.watches[id] = c
  }
  
  func watchEnd(id: String) {
    if !self.live {
      return
    }
    self.watches.removeValue(forKey: id)?()
  }
  
  func mutate(id: String, mutation: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.factory.runMutation(client: self.client, name: mutation, src: arguments) { (res, err) in
      if !self.live {
        return
      }
      if err != nil {
        self.handleError(id: id, err: err!)
      } else {
        if res != nil {
          self.module.reportResult(key: self.key, id: id, result: res!.jsonObject as NSDictionary)
        } else {
          self.module.reportResult(key: self.key, id: id, result: nil)
        }
      }
    }
  }
  
  func subscribe(id: String, subscription: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    let s = ActiveSubscription(key: self.key, id: id, subscription: subscription, arguments: arguments, factory: self.factory, client: self.client, module: self.module)
    if self.connected {
      s.start()
    }
    self.subscriptions[id] = s
  }
  
  func subscribeUpdate(id: String, arguments: NSDictionary) {
    if !self.live {
      return
    }
    self.subscriptions[id]!.update(arguments: arguments)
  }
  
  func subscribeEnd(id: String) {
    if !self.live {
      return
    }
    self.subscriptions.removeValue(forKey: id)!.stop()
  }
  
  func dispose() {
    self.live = false
    for s in self.subscriptions.values {
      s.stop()
    }
    for w in self.watches.values {
      w()
    }
    self.ws.closeConnection()
  }
  
  private func handleError(id: String, err: Error) {
    if !self.live {
      return
    }
    if let n = err as? NativeGraphqlError {
      if n.src.count > 0 {
        self.module.reportGraphqlError(key: self.key, id: id, errors: n.src)
      } else {
        self.module.reportError(key: self.key, id: id)
      }
    } else {
      self.module.reportError(key: self.key, id: id)
    }
  }
  
  func webSocketTransportDidConnect(_ webSocketTransport: WebSocketTransport) {
    GraphQLQueue.async {
      if !self.live {
        return
      }
      if !self.connected {
        self.connected = true
        self.module.reportStatus(key: self.key, status: "connected")
        for s in self.subscriptions.values {
          s.start()
        }
      }
    }
  }
  func webSocketTransportDidReconnect(_ webSocketTransport: WebSocketTransport) {
    GraphQLQueue.async {
      if !self.live {
        return
      }
      if !self.connected {
        self.connected = true
        self.module.reportStatus(key: self.key, status: "connected")
        for s in self.subscriptions.values {
          s.start()
        }
      }
    }
  }
  func webSocketTransport(_ webSocketTransport: WebSocketTransport, didDisconnectWithError error:Error?) {
    GraphQLQueue.async {
      if !self.live {
        return
      }
      if self.connected {
        self.connected = false
        self.module.reportStatus(key: self.key, status: "connecting")
        for s in self.subscriptions.values {
          s.stop()
        }
      }
    }
  }
  
  private func resolveFetchPolicy(parameters: NSDictionary) -> CachePolicy {
    var cachePolicy = CachePolicy.returnCacheDataElseFetch
    var cp = parameters.value(forKey: "fetchPolicy")
    if cp != nil && !(cp is NSNull) {
      let cps = cp as! String
      if cps == "cache-first" {
        cachePolicy = CachePolicy.returnCacheDataElseFetch
      } else if cps == "network-only" {
        cachePolicy = CachePolicy.fetchIgnoringCacheData
      } else if cps == "cache-and-network" {
        cachePolicy = CachePolicy.returnCacheDataAndFetch
      } else if cps == "no-cache" {
        // cachePolicy = CachePolicy.returnCacheDataAndFetch
        fatalError("no-cache is not supported on iOS")
      } else {
        fatalError("Unsupported fetch policy: " + cps)
      }
    }
    return cachePolicy
  }
}
