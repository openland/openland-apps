//
//  NotificationHandler.swift
//  openland
//
//  Created by Gleb on 13/06/2019.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

@objc class NotificationHandler: NSObject{
  public static var sharedInstance = NotificationHandler()
  public var url: String?
  
  private var nativeInstance: RNNotificationHandler!
  
  // When React Native instantiates the emitter it is registered here.
  func registerEventEmitter(eventEmitter: RNNotificationHandler) {
    self.nativeInstance = eventEmitter
  }
  func unregisterEventEmitter(eventEmitter: RNNotificationHandler) {
    if self.nativeInstance == eventEmitter {
      self.nativeInstance = nil
    }
  }
  
  @objc func getSharedInstance() -> NotificationHandler{
    return NotificationHandler.sharedInstance
  }
  
  @objc func handleNotification(userInfo: NSDictionary){
    if let messageId = userInfo.object(forKey: "messageId") as? String {
      if let commentId = userInfo.object(forKey: "commentId") as? String {
        let url = "openland://deep/message/\(messageId)/comment/\(commentId)"
        if nativeInstance != nil && nativeInstance.bridge != nil {
          nativeInstance.sendEvent(withName: "onUrl", body: url)
        } else {
          self.url = url
        }
      }
    }
    if let conversationId = userInfo.object(forKey: "conversationId") as? String {
      let url = "openland://deep/mail/\(conversationId)"
      if nativeInstance != nil && nativeInstance.bridge != nil {
        nativeInstance.sendEvent(withName: "onUrl", body: url)
      } else {
        self.url = url
      }
    }
  }
}

@objc(RNNotificationHandler)
class RNNotificationHandler: RCTEventEmitter {
  
  override init() {
    super.init()
  }
  
  override func startObserving() {
    print("startObserving")
    NotificationHandler.sharedInstance.registerEventEmitter(eventEmitter: self)
  }
  
  override func stopObserving() {
    print("stopObserving")
    NotificationHandler.sharedInstance.unregisterEventEmitter(eventEmitter: self)
  }
  
  override func supportedEvents() -> [String]! {
    return ["onUrl"]
  }
  
  @objc func requestInitialUrl(){
    if(NotificationHandler.sharedInstance.url != nil){
       sendEvent(withName: "onUrl", body: NotificationHandler.sharedInstance.url)
    }
  }
}

