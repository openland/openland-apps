//
//  RNSDevice.swift
//  openland
//
//  Created by Steve Kite on 2/25/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc(RNSDevice)
class RNSDevice: NSObject {
  
  @objc(proximityEnable)
  func proximityEnable() {
    UIDevice.current.isProximityMonitoringEnabled = true
  }
  
  @objc(proximityDisable)
  func proximityDisable() {
    UIDevice.current.isProximityMonitoringEnabled = false
  }
}
