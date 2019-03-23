//
//  APIFactoryBase.swift
//  openland
//
//  Created by Steve Kite on 3/24/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

class ApiFactoryBase {
  func readInt(_ src: NSDictionary, _ name: String) -> Int? {
    return nil
  }
  
  func readString(_ src: NSDictionary, _ name: String) -> String? {
    return nil
  }
  
  func readBool(_ src: NSDictionary, _ name: String) -> Bool? {
    return nil
  }
  
  func notNull<T>(_ v: T?) -> T {
    if v == nil {
      fatalError()
    }
    return v!
  }
}
