//
//  RNAsyncListView.swift
//  openland
//
//  Created by Steve Kite on 8/29/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation

@objc(RNAsyncListViewManager)
class RNAsyncListViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return RNAsyncListView(eventDispatcher: self.bridge.eventDispatcher())
  }
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}

@objc(RNAsyncListView)
class RNAsyncListView: RCTView {
  
  var eventDispatcher: RCTEventDispatcher
  private var datatViewKey: String?
  private var node: RNASyncListNode!
  
  init(eventDispatcher: RCTEventDispatcher) {
    self.eventDispatcher = eventDispatcher
    super.init(frame: CGRect.zero)
    self.node = RNASyncListNode(parent: self)
    self.addSubview(node.view);
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  deinit {
    self.node.destroy()
    self.node = nil
  }
  
  public func setDataViewKey(_ key: String) {
    if self.datatViewKey != nil && self.datatViewKey != key {
      fatalError("Unable to change data view")
    }
    self.node.setDataView(dataView: RNAsyncDataView.getDataView(key: key))
  }
  
  public func setInverted(_ inverted: Bool) {
    self.node.setInverted(inverted: inverted)
  }
  
  public func setContentPaddingBottom(_ padding: NSNumber) {
    self.node.setContentPaddingBottom(value: Float(padding))
  }
  
  public func setHeaderPadding(_ padding: NSNumber) {
    self.node.setHeaderPadding(padding: Float(padding))
  }
  
  public func setContentPaddingTop(_ padding: NSNumber) {
    self.node.setContentPaddingTop(value: Float(padding))
  }
  
  public func setOnScroll(_ callback: RCTDirectEventBlock?) {
    self.node.setOnScroll(callback: callback)
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame)
    self.node.frame = frame
    self.node.start()
  }
}
