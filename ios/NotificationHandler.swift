//
//  NotificationHandler.swift
//  openland
//
//  Created by Gleb on 13/06/2019.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc class NotificationHandler: NSObject{
  @objc func handleNotification(userInfo: NSDictionary){
    let conversationId = userInfo.object(forKey: "conversationId");
    switch conversationId {
    case is String:
      UIApplication.shared.openURL(URL(string: "openland://deep/mail/\(conversationId!)")!)
    default:
      print("ok swift, here is your default executable statement")
    }
  }
}
