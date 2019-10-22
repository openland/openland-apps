//
//  RNSWindowManager.swift
//  openland
//
//  Created by Steve Korshakov on 10/21/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc(RNSWindowManager)
class RNSWindowManager: NSObject {
  
  @objc(setStatusBarDarkContent)
  func setStatusBarDarkContent() {
    DispatchQueue.main.async {
      if #available(iOS 13.0, *) {
        UIApplication.shared.setStatusBarStyle(.darkContent, animated: true)
      } else {
        UIApplication.shared.setStatusBarStyle(.default, animated: true)
      }
    }
  }
  
  @objc(setStatusBarLightContent)
  func setStatusBarLightContent() {
    DispatchQueue.main.async {
      UIApplication.shared.setStatusBarStyle(.lightContent, animated: true)
    }
  }
}
