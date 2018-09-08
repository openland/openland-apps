//
//  RNAsyncDataView.swift
//  openland
//
//  Created by Steve Kite on 8/27/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import SwiftyJSON

class RNAsyncDataViewItem {
  let key: String
  let config: AsyncViewSpec
  init(key: String, config: AsyncViewSpec) {
    self.key = key
    self.config = config
  }
}

protocol RNAsyncDataViewDelegate {
  func onInited(state: RNAsyncDataViewState)
  func onAdded(index: Int, state: RNAsyncDataViewState)
  func onUpdated(index: Int, state: RNAsyncDataViewState)
  func onMoved(from: Int, to:Int, state: RNAsyncDataViewState)
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState)
  func onCompleted(state: RNAsyncDataViewState)
}

class RNAsyncDataViewState {
  let items: [RNAsyncDataViewItem]
  let completed: Bool
  let inited: Bool
  
  init(items: [RNAsyncDataViewItem], completed: Bool, inited: Bool) {
    self.items = items
    self.completed = completed
    self.inited = inited
  }
}

class RNAsyncDataView {
  private static var instances: [String: RNAsyncDataView] = [:]
  static func getDataView(key: String) -> RNAsyncDataView {
    if let ex = RNAsyncDataView.instances[key] {
      return ex
    } else {
      RNAsyncDataView.instances[key] = RNAsyncDataView(dataSourceKey: key)
    }
    return RNAsyncDataView.instances[key]!
  }
  
  var state = RNAsyncDataViewState(items: [], completed: false, inited: false)
  var watchers: [String : RNAsyncDataViewDelegate] = [:]
  
  let dataSourceKey: String
  
  init(dataSourceKey: String) {
    self.dataSourceKey = dataSourceKey
  }
  
  func handleInitial(items: [RNAsyncDataViewItem], completed: Bool) {
    let st = RNAsyncDataViewState(items: items.map {$0}, completed: completed, inited: true)
    self.state = st
    for i in watchers {
      i.value.onInited(state: st)
    }
  }
  
  func handleAdded(item: RNAsyncDataViewItem, index: Int) {
    var itms = self.state.items.map {$0}
    itms.insert(item, at: index)
    let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
    self.state = st
    for i in watchers {
      i.value.onAdded(index: index, state: st)
    }
  }
  
  func handleUpdated(item: RNAsyncDataViewItem, index: Int) {
    var itms = self.state.items.map {$0}
    itms[index] = item
    let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
    self.state = st
    for i in watchers {
      i.value.onUpdated(index: index, state: st)
    }
  }
  
  func handleRemoved(index: Int) {
    var itms = self.state.items.map {$0}
    itms.remove(at: index)
    let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
    self.state = st
//    for i in watchers {
//      i.value.onUpdated(items: itms)
//    }
  }
  
  func handleMoved(fromIndex: Int, toIndex: Int) {
    var itms = self.state.items.map {$0}
    let r = itms.remove(at: fromIndex)
    itms.insert(r, at: toIndex)
    let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
    for i in watchers {
      i.value.onMoved(from: fromIndex, to: toIndex, state: st)
    }
  }
  
  func handleLoadedMore(items: [RNAsyncDataViewItem], completed: Bool) {
    var itms = self.state.items.map {$0}
    let start = itms.count
    for i in items {
      itms.append(i)
    }
    let st = RNAsyncDataViewState(items: itms, completed: completed, inited: true)
    self.state = st
    for i in watchers {
      i.value.onLoadedMore(from: start, count: items.count, state: st)
    }
  }
  
  func handleCompleted() {
    let st = RNAsyncDataViewState(items: self.state.items, completed: true, inited: true)
    for i in watchers {
      i.value.onCompleted(state: st)
    }
  }
  
  func loadMore() {
    AsyncViewEventEmitter.sharedInstance.dispatchOnLoadMore(key: self.dataSourceKey)
  }
  
  func watch(delegate: RNAsyncDataViewDelegate) -> ()-> Void {
    let key = UUID().uuidString
    watchers[key] = delegate
    if self.state.inited {
      delegate.onInited(state: self.state)
    }
    return {
      self.watchers[key] = nil
    }
  }
}

class RNAsyncDataViewWindow: RNAsyncDataViewDelegate {
  var watchers: [String : RNAsyncDataViewDelegate] = [:]
  var state = RNAsyncDataViewState(items: [], completed: false, inited: false)
  private var latestState = RNAsyncDataViewState(items: [], completed: false, inited: false)
  var source: RNAsyncDataView
  var windowSize: Int = 0
  var unwatch: (() -> Void)!
  var completed = false
  
  init(source: RNAsyncDataView) {
    self.source = source
    
    self.unwatch = self.source.watch(delegate: self)
    if source.state.inited {
      if source.state.items.count <= 20 {
        self.completed = true
        self.latestState = source.state
        self.state = source.state
      } else {
        self.windowSize = min(source.state.items.count, 20)
        let s = RNAsyncDataViewState(items: Array(source.state.items[0...max(self.windowSize-1, 0)]), completed: source.state.completed &&  self.windowSize == source.state.items.count, inited: true)
        self.latestState = source.state
        self.state = s
      }
    }
  }
  
  func onInited(state: RNAsyncDataViewState) {
    self.latestState = state
    
    if self.latestState.items.count <= 20 {
      self.completed = true
      self.state = latestState
      for i in watchers {
        i.value.onInited(state: latestState)
      }
    } else {
      self.windowSize = min(latestState.items.count, 20)
      let s = RNAsyncDataViewState(items: Array(source.state.items[0...max(self.windowSize-1, 0)]), completed: source.state.completed &&  self.windowSize == source.state.items.count, inited: true)
      self.latestState = source.state
      self.state = s
      for i in watchers {
        i.value.onInited(state: s)
      }
    }
  }
  
  func onAdded(index: Int, state: RNAsyncDataViewState) {
    if (self.completed) {
      self.latestState = state
      self.state = state
      for i in watchers {
        i.value.onAdded(index: index, state: state)
      }
      return
    }
    
    self.latestState = state
    
    if index < self.windowSize {
      var itms = self.state.items.map {$0}
      itms.insert(state.items[index], at: index)
      let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
      self.state = st
      for i in watchers {
        i.value.onAdded(index: index, state: st)
      }
    }
  }
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    if (self.completed) {
      self.latestState = state
      self.state = state
      for i in watchers {
        i.value.onUpdated(index: index, state: state)
      }
      return
    }
    
    // TODO: Implement
  }
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    if (self.completed) {
      self.latestState = state
      self.state = state
      for i in watchers {
        i.value.onMoved(from: from, to: to, state: state)
      }
      return
    }
    
    // TODO: Implement
  }
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    if (self.completed) {
      self.latestState = state
      self.state = state
      for i in watchers {
        i.value.onLoadedMore(from: from, count: count, state: state)
      }
      return
    }
    
    // TODO: Implement
  }
  func onCompleted(state: RNAsyncDataViewState) {
    if (self.completed) {
      self.latestState = state
      self.state = state
      for i in watchers {
        i.value.onCompleted(state: state)
      }
      return
    }
    
    // TODO: Implement
  }
  
  func loadMore() {
    if !self.latestState.inited {
      return
    }
    if self.completed {
      self.source.loadMore()
    } else {
      let loaded = min(self.latestState.items.count - self.windowSize, 20)
      if loaded > 0 {
        if loaded + self.windowSize >= self.latestState.items.count {
          self.completed = true
          self.windowSize = 0
          let s = self.latestState
          self.state = s
          for i in watchers {
            i.value.onLoadedMore(from: self.latestState.items.count-loaded, count: loaded, state: s)
          }
        } else {
          var itms = self.state.items.map {$0}
          for i in self.windowSize...(self.windowSize+loaded-1) {
            itms.append(self.latestState.items[i])
          }
          let st = RNAsyncDataViewState(items: itms, completed: completed, inited: true)
          self.state = st
          for i in watchers {
            i.value.onLoadedMore(from: self.windowSize, count: loaded, state: st)
          }
          self.windowSize += loaded
        }
      } else {
        self.completed = true
        self.source.loadMore()
      }
    }
  }
  
  func watch(delegate: RNAsyncDataViewDelegate) -> ()-> Void {
    let key = UUID().uuidString
    watchers[key] = delegate
    return {
      self.watchers[key] = nil
    }
  }
}

@objc(RNAsyncDataViewManager)
class RNAsyncDataViewManager: NSObject {
  
  @objc(dataViewInit:config:completed:)
  func dataViewInit(dataSourceKey: String, config: String, completed: Bool) -> Void {
    let parsed = JSON(parseJSON: config)
    var items: [RNAsyncDataViewItem] = []
    for i in parsed.arrayValue {
      let key = i["key"].stringValue
      let config = parseSpec(i["config"].stringValue)
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleInitial(items: items, completed: completed)
  }
  
  @objc(dataViewAddItem:key:config:index:)
  func dataViewAddItem(dataSourceKey: String, key: String, config: String, index: NSNumber) -> Void {
    let configSpec = parseSpec(config)
    let item = RNAsyncDataViewItem(key: key, config: configSpec)
    RNAsyncDataView.getDataView(key: dataSourceKey).handleAdded(item: item, index: Int(index))
  }
  
  @objc(dataViewUpdateItem:key:config:index:)
  func dataViewUpdateItem(dataSourceKey: String, key: String, config: String, index: NSNumber) -> Void {
    let configSpec = parseSpec(config)
    let item = RNAsyncDataViewItem(key: key, config: configSpec)
    RNAsyncDataView.getDataView(key: dataSourceKey).handleUpdated(item: item, index: Int(index))
  }
  
  @objc(dataViewRemoveItem:key:index:)
  func dataViewRemoveItem(dataSourceKey: String, key: String, index: NSNumber) -> Void {
    RNAsyncDataView.getDataView(key: dataSourceKey).handleRemoved(index: Int(index))
  }
  
  @objc(dataViewMoveItem:key:fromIndex:toIndex:)
  func dataViewMoveItem(dataSourceKey: String, key: String, fromIndex: NSNumber, toIndex: NSNumber) -> Void {
    RNAsyncDataView.getDataView(key: dataSourceKey).handleMoved(fromIndex: Int(fromIndex), toIndex: Int(toIndex))
  }
  
  @objc(dataViewLoadedMore:config:completed:)
  func dataViewLoadedMore(dataSourceKey: String, config: String, completed: Bool) -> Void {
    let parsed = JSON(parseJSON: config)
    var items: [RNAsyncDataViewItem] = []
    for i in parsed.arrayValue {
      let key = i["key"].stringValue
      let config = parseSpec(i["config"].stringValue)
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleLoadedMore(items: items, completed: completed)
  }
  
  @objc(dataViewCompleted:)
  func dataViewCompleted(dataSourceKey: String) -> Void {
    RNAsyncDataView.getDataView(key: dataSourceKey).handleCompleted()
  }
}
