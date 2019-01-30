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
  
  @objc(startTask)
  func startTask() -> Void {
    if self.task == nil {
      UIApplication.shared.beginBackgroundTask(withName: "RNBackgroundTask") {
        if self.task != nil {
          UIApplication.shared.endBackgroundTask(self.task!)
        }
        self.task = nil
      }
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
