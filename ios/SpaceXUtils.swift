//
//  SpaceXUtils.swift
//  openland
//
//  Created by Steve Kite on 5/14/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

func serializeJson(json: JSON) -> String {
  do {
    return try NSString(data: json.rawData(), encoding: String.Encoding.utf8.rawValue) as! String
  } catch let error as NSError {
    fatalError(error.localizedDescription)
  }
}

func backoffDelay(currentFailureCount: Int, minDelay: Int, maxDelay: Int, maxFailureCount: Int) -> Int {
  let maxDelayRet = Int(Double(minDelay) + ((Double(maxDelay) - Double(minDelay))/Double(maxFailureCount)) * Double(currentFailureCount))
  return Int.random(in: 0..<maxDelayRet)
}

class AtomicInteger {
  private let queue = DispatchQueue(label: "atomic")
  private var value: Int
  
  init(value: Int) {
    self.value = value
  }
  
  convenience init() {
    self.init(value: 0)
  }
  
  func set(value: Int) {
    self.value = value
  }
  
  func get() -> Int {
    return self.value
  }
  
  func getAndIncrement() -> Int {
    var r = 0
    queue.sync {
      r = self.value
      self.value += 1
    }
    return r
  }
  
  func incrementAndGet() -> Int {
    var r = 0
    queue.sync {
      self.value += 1
      r = self.value
    }
    return r
  }
}
