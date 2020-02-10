//
//  WatchDogTimer.swift
//  openland
//
//  Created by Steve Korshakov on 2/10/20.
//  Copyright © 2020 Openland. All rights reserved.
//

import Foundation

class WatchDogTimer {
  private let timeout: Int
  private let onRestart: () -> Void
  private let queue:DispatchQueue
  
  private var nextTimer = 0
  private var timerId = -1
  private var isDead = false
  
  init(timeout: Int, queue: DispatchQueue, onRestart: @escaping () -> Void) {
    self.timeout = timeout
    self.onRestart = onRestart
    self.queue = queue
  }
  
  func kick() {
    if self.isDead {
      return
    }
    
    self.timerId = self.nextTimer
    self.nextTimer += 1
    let t = self.timerId
    self.queue.asyncAfter(deadline: .now() + .milliseconds(self.timeout)) {
      if self.timerId == t {
        if (!self.isDead) {
          self.isDead = true
          self.onRestart()
        }
      }
    }
  }
  
  func reset() {
    self.isDead = true
    self.kick()
  }
  
  func kill() {
    self.isDead = true
     self.timerId = self.nextTimer
      self.nextTimer += 1
  }
}
