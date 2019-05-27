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

typealias AbortFunc = () -> Void

func measure<A>(_ name: String, _ f: () -> A) -> A {
  let startTime = CFAbsoluteTimeGetCurrent()
  let result = f()
  let endTime = CFAbsoluteTimeGetCurrent()
  let ms = Int((endTime - startTime) * 1000)
  print(name + " completed in \(ms) ms")
  return result
}

func backoffDelay(currentFailureCount: Int, minDelay: Int, maxDelay: Int, maxFailureCount: Int) -> Int {
  let maxDelayRet = Int(Double(minDelay) + ((Double(maxDelay) - Double(minDelay))/Double(maxFailureCount)) * Double(currentFailureCount))
  return Int.random(in: 0..<maxDelayRet)
}

class LazyCollection<T> {
  private let queue = DispatchQueue(label: "lazy")
  private let factory: (String) -> T
  private var instances: [String:T] = [:]
  
  init(factory: @escaping (String) -> T) {
    self.factory = factory
  }
  
  func get(_ name: String) -> T {
    var res: T? = nil
    queue.sync {
      let ex = self.instances[name]
      if ex == nil {
        let rs = factory(name)
        self.instances[name] = rs
        res = rs
      } else {
        res = ex
      }
    }
    return res!
  }
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

class ManagedDispatchQueue {
  
  private var stopped = false
  private let dispatchQueue: DispatchQueue
  
  init(label: String, concurrent: Bool = false) {
    if concurrent {
      self.dispatchQueue = DispatchQueue(label: label, attributes: .concurrent)
    } else {
      self.dispatchQueue = DispatchQueue(label: label)
    }
  }
  
  func async(execute: @escaping () -> Void) {
    self.dispatchQueue.async {
      if self.stopped {
        return
      }
      execute()
    }
  }
  
  func stop() {
    self.dispatchQueue.sync {
      self.stopped = true
    }
  }
}
