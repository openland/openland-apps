//
//  RNAsyncView.swift
//  openland
//
//  Created by Steve Kite on 8/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(RNAsyncViewManager)
class RNAsyncViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return RNAsyncView()
  }
  
  static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}

var configsViews: [String: RNAsyncView] = [:]
var configs: [String: AsyncViewSpec] = [:]

@objc(RNAsyncConfigManager)
class RNAsyncConfigManager: NSObject {
  
  @objc(setConfig:config:)
  func setConfig(key: String, config: String) -> Void {
    print(Thread.isMainThread)
    let parsed = parseSpec(config)
    configs[key] = parsed
    if let v = configsViews[key] {
      v.setConfig(config: parsed)
    }
  }
}

class AsyncViewEventEmitter {
  public static var sharedInstance = AsyncViewEventEmitter()
  private var nativeInstance: RNAsyncViewEventEmitter!
  private init() { }
  
  // When React Native instantiates the emitter it is registered here.
  func registerEventEmitter(eventEmitter: RNAsyncViewEventEmitter) {
    self.nativeInstance = eventEmitter
  }
  
  func dispatchOnPress(key: String) {
    nativeInstance.sendEvent(withName: "onPress", body: key)
  }
  
  func dispatchOnLoadMore(key: String) {
    nativeInstance.sendEvent(withName: "onLoadMore", body: key)
  }
}

@objc(RNAsyncViewEventEmitter)
class RNAsyncViewEventEmitter: RCTEventEmitter {
  
  override init() {
    super.init()
    AsyncViewEventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
  }
  
  override func supportedEvents() -> [String]! {
    return ["onPress", "onLoadMore"]
  }
}

func lock(_ obj: AnyObject, blk:() -> ()) {
  objc_sync_enter(obj)
  blk()
  objc_sync_exit(obj)
}

class RNAsyncViewContext {
  private var cache = NSMapTable<NSString, AnyObject>(keyOptions: NSPointerFunctions.Options.strongMemory, valueOptions: NSPointerFunctions.Options.weakMemory)
  
  func fetchCached<T>(key: String, builder: () -> T) -> T {
    var res: T? = nil
    lock(self.cache) {
      res = self.cache.object(forKey: NSString(string: key)) as? T
      if res == nil {
        res = builder()
        self.cache.setObject(res as! AnyObject, forKey: NSString(string: key))
      }
    }
    return res!
  }
}

@objc(RNAsyncView)
class RNAsyncView: RCTView {
  
  private var node = RNAsyncViewNode()
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    self.addSubview(node.view);
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented");
  }
  
  public func setConfig(config: AsyncViewSpec) {
    self.node.setConfig(spec: config)
  }
  
  public func setConfigKey(_ configKey: String) {
    configsViews[configKey] = self
    if let ex = configs[configKey] {
      self.setConfig(config: ex)
    }
    // self.node.setConfig(spec: config)
  }
  
  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame);
    node.setFrame(frame: frame)
  }
}

class RNAsyncViewNode: ASDisplayNode {
  
  let context = RNAsyncViewContext()
  var spec: AsyncViewSpec? = nil
  var pendingFrame: CGRect? = nil
  
  required override init() {
    super.init()
    self.automaticallyManagesSubnodes = true
  }
  
  public func setConfig(spec: AsyncViewSpec) {
    self.spec = spec;
    if (self.pendingFrame != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  public func setFrame(frame: CGRect) {
    self.pendingFrame = frame;
    if (self.spec != nil) {
      self.frame = self.pendingFrame!
      setNeedsDisplay()
      setNeedsLayout()
    }
  }
  
  override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
    return resolveNode(spec: self.spec!, context: self.context) as! ASLayoutSpec
  }
}
