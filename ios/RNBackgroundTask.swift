//
//  RNBackgroundTask.swift
//  openland
//
//  Created by Steve Kite on 1/30/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc(RNBackgroundTask)
class RNBackgroundTask: NSObject {
  
  var task: UIBackgroundTaskIdentifier? = nil
  
  @objc(startTask:)
  func startTask(duration: NSNumber) -> Void {
    if self.task == nil {
      let t = UIApplication.shared.beginBackgroundTask(withName: "RNBackgroundTask") {
        if self.task != nil {
          UIApplication.shared.endBackgroundTask(self.task!)
        }
        self.task = nil
      }
      DispatchQueue.main.asyncAfter(deadline: .now() + (duration.doubleValue / 1000.0)) {
        if self.task == t {
          UIApplication.shared.endBackgroundTask(t)
          self.task = nil
        }
      }
      self.task = t
    }
  }
  
  @objc(stopTask)
  func stopTask() -> Void {
    if self.task != nil {
      UIApplication.shared.endBackgroundTask(self.task!)
    }
    self.task = nil
  }
}
