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
  
  let client: ApolloClient
  
  init(endpoint: String, token: String?) {
    let wsTransport = WebSocketTransport(request: URLRequest(url: URL(string: "wss:"+endpoint)!))
    let httpTransport =  HTTPNetworkTransport(url:URL(string: "https:"+endpoint)!)
    let transport = SplitNetworkTransport(httpNetworkTransport: httpTransport, webSocketNetworkTransport: wsTransport)
    self.client = ApolloClient(networkTransport: transport)
  }
}
