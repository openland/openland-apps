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
  
  @objc public func setDataViewKey(_ key: String) {
    if self.datatViewKey != nil && self.datatViewKey != key {
      fatalError("Unable to change data view")
    }
    self.node.setDataView(dataView: RNAsyncDataView.getDataView(key: key))
  }
  
  @objc public func setInverted(_ inverted: Bool) {
    self.node.setInverted(inverted: inverted)
  }
  
  @objc public func setContentPaddingBottom(_ padding: NSNumber) {
    self.node.setContentPaddingBottom(value: Float(padding))
  }
  
  @objc public func setHeaderPadding(_ padding: NSNumber) {
    self.node.setHeaderPadding(padding: Float(padding))
  }
  
  @objc public func setOverflowColor(_ color: NSNumber) {
    self.node.setOverflowColor(color: UInt64(color))
  }
  
  @objc public func setLoaderColor(_ color: NSNumber) {
    self.node.setLoaderColor(color: UInt64(color))
  }
  
  @objc public func setContentPaddingTop(_ padding: NSNumber) {
    self.node.setContentPaddingTop(value: Float(padding))
  }
  
  @objc public func setOnScroll(_ callback: RCTDirectEventBlock?) {
    self.node.setOnScroll(callback: callback)
  }
  
  @objc public func setOverscrollCompensation(_ enabled: Bool) {
    self.node.setOverscrollCompensation(enabled)
  }
  
  @objc override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame)
    self.node.frame = frame
    self.node.start()
  }
}
