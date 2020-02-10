//
//  NetworkingDelegate.swift
//  Openland
//
//

import Foundation
import SwiftyJSON

protocol NetworkingDelegate: class {
  
  // Callbacks
  func onResponse(id: String, data: JSON)
  func onError(id: String, error: JSON)
  func onCompleted(id: String)
  
  // Session state
  func onSessiontRestart()
  func onConnected()
  func onDisconnected()
}
