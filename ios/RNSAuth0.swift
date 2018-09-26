//
//  RNSAuth0.swift
//  openland
//
//  Created by Steve Kite on 9/25/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation
import Auth0

@objc(RNSAuth0)
class RNSAuth0: NSObject {
  @objc(requestEmailAuth:callback:)
  func requestEmailAuth(email: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    Auth0.authentication()
      .startPasswordless(email: email, type: .iOSLink, connection: "email", parameters: [:])
      .start { (result) in
        switch result {
        case .success:
          callback([true, nil])
        case .failure(let error):
          callback([false, [
              "code": (error as? Auth0Error)?.code,
              "message": error.localizedDescription
          ]])
        }
      }
  }
  
  @objc(completeEmailAuth:code:callback:)
  func completeEmailAuth(email: String, code: String, callback: @escaping RCTResponseSenderBlock) {
    Auth0
      .authentication()
      .login(
        usernameOrEmail: email,
        password: code,
        realm: "Username-Password-Authentication"
      )
      .start { (result) in
        switch result {
        case .success(let credentials):
          callback([[
            "idToken": credentials.idToken ?? nil,
            "accessToken": credentials.accessToken ?? nil,
            "expiresIn": credentials.expiresIn ?? nil,
            "scope": credentials.scope ?? nil,
            "refreshToken": credentials.refreshToken ?? nil,
            "tokenType": credentials.tokenType ?? nil,
          ], nil])
        case .failure(let error):
          callback([nil, [
            "code": (error as? Auth0Error)?.code,
            "message": error.localizedDescription
            ]])
        }
      }
  }
}
