//
//  RNAsyncDataView.swift
//  openland
//
//  Created by Steve Kite on 8/27/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate let queue = DispatchQueue(label: "rn-data-view")

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
  func onRemoved(index: Int, state: RNAsyncDataViewState)
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
  
  func replace(index: Int, spec: AsyncViewSpec) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms[index] = RNAsyncDataViewItem(key: self.items[index].key, config: spec)
    return RNAsyncDataViewState(items: itms, completed: self.completed, inited: self.inited)
  }
  
  func move(from: Int, to: Int) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    let r = itms.remove(at: from)
    itms.insert(r, at: to)
    return RNAsyncDataViewState(items: itms, completed: self.completed, inited: self.inited)
  }
  
  func remove(index: Int) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms.remove(at: index)
    return RNAsyncDataViewState(items: itms, completed: self.completed, inited: self.inited)
  }
  
  func add(index: Int, key: String, spec: AsyncViewSpec) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms.insert(RNAsyncDataViewItem(key: key, config: spec), at: index)
    return RNAsyncDataViewState(items: itms, completed: self.completed, inited: self.inited)
  }
  
  func setCompleted(completed: Bool) -> RNAsyncDataViewState {
    if self.completed != completed {
      return RNAsyncDataViewState(items: self.items, completed: completed, inited: self.inited)
    } else {
      return self
    }
  }
  
  func setInited() -> RNAsyncDataViewState {
    if !self.inited {
      return RNAsyncDataViewState(items: self.items, completed: self.completed, inited: self.inited)
    } else {
      return self
    }
  }
  
  func loadedMore(items: [RNAsyncDataViewItem]) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    for i in items {
      itms.append(i)
    }
    return RNAsyncDataViewState(items: itms, completed: self.completed, inited: self.inited)
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
    let st = self.state.add(index: index, key: item.key, spec: item.config)
    self.state = st
    for i in watchers {
      i.value.onAdded(index: index, state: st)
    }
  }
  
  func handleUpdated(item: RNAsyncDataViewItem, index: Int) {
    let st = self.state
      .replace(index: index, spec: item.config)
    self.state = st
    for i in watchers {
      i.value.onUpdated(index: index, state: st)
    }
  }
  
  func handleRemoved(index: Int) {
    let st = self.state.remove(index: index)
    self.state = st
    for i in watchers {
      i.value.onRemoved(index: index, state: st)
    }
  }
  
  func handleMoved(fromIndex: Int, toIndex: Int) {
    let st = self.state.move(from: fromIndex, to: toIndex)
    self.state = st
    for i in watchers {
      i.value.onMoved(from: fromIndex, to: toIndex, state: st)
    }
  }
  
  func handleLoadedMore(items: [RNAsyncDataViewItem], completed: Bool) {
    let start = self.state.items.count
    let st = self.state
      .loadedMore(items: items)
      .setCompleted(completed: completed)
    self.state = st
    for i in watchers {
      i.value.onLoadedMore(from: start, count: items.count, state: st)
    }
  }
  
  func handleCompleted() {
    let st = self.state
      .setCompleted(completed: true)
    self.state = st
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
    let st = self.state
    if st.inited {
      delegate.onInited(state: st)
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
    queue.async {
      self.latestState = state
      
      if self.latestState.items.count <= 20 {
        self.completed = true
        self.state = self.latestState
        for i in self.watchers {
          i.value.onInited(state: state)
        }
      } else {
        self.windowSize = min(state.items.count, 20)
        let s = RNAsyncDataViewState(items: Array(state.items[0..<self.windowSize]), completed: false, inited: true)
        self.latestState = self.source.state
        self.state = s
        for i in self.watchers {
          i.value.onInited(state: s)
        }
      }
    }
  }
  
  func onAdded(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onAdded(index: index, state: state)
        }
        return
      }
    
      if index < self.windowSize {
        var itms = self.state.items.map {$0}
        itms.insert(state.items[index], at: index)
        let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, inited: true)
        self.state = st
        self.windowSize = self.windowSize + 1
        for i in self.watchers {
          i.value.onAdded(index: index, state: st)
        }
      }
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onUpdated(index: index, state: state)
        }
        return
      }
    
      if index < self.windowSize {
        let st = self.state.replace(index: index, spec: state.items[index].config)
        self.state = st
        for i in self.watchers {
          i.value.onUpdated(index: index, state: st)
        }
      }
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onMoved(from: from, to: to, state: state)
        }
        return
      }
      
      if from < self.windowSize && to < self.windowSize {
        let st = self.state.move(from: from, to: to)
        self.state = st
        for i in self.watchers {
          i.value.onMoved(from: from, to: to, state: st)
        }
      } else if from < self.windowSize {
        let st = self.state.remove(index: from)
        self.windowSize = self.windowSize - 1
        self.state = st
        for i in self.watchers {
          i.value.onRemoved(index: from, state: st)
        }
      } else if to < self.windowSize {
        let st = self.state
          .add(index: to, key: state.items[to].key, spec: state.items[to].config)
        self.windowSize = self.windowSize + 1
        self.state = st
        for i in self.watchers {
          i.value.onAdded(index: from, state: st)
        }
      }
    }
  }
  
  func onRemoved(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onRemoved(index: index, state: state)
        }
        return
      }
      
      if index < self.windowSize {
        let st = self.state.add(index: index, key: state.items[index].key, spec: state.items[index].config)
        self.state = st
        for i in self.watchers {
          i.value.onAdded(index: index, state: st)
        }
      }
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onLoadedMore(from: from, count: count, state: state)
        }
        return
      }
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.completed) {
        self.state = state
        for i in self.watchers {
          i.value.onCompleted(state: state)
        }
      }
    }
  }
  
  func loadMore() {
    queue.async {
      if !self.latestState.inited {
        return
      }
      if self.completed {
        self.source.loadMore()
      } else {
        queue.asyncAfter(deadline: .now() + .milliseconds(50)) {
          if self.completed {
            self.source.loadMore()
            return
          }
          if self.windowSize + 20 <= self.latestState.items.count {
            let loaded = min(self.latestState.items.count - self.windowSize, 20)
            var itms = self.state.items.map {$0}
            for i in self.windowSize..<(self.windowSize+loaded) {
              itms.append(self.latestState.items[i])
            }
            let st = RNAsyncDataViewState(items: itms, completed: self.completed, inited: true)
            self.state = st
            let from = self.windowSize
            self.windowSize += loaded
            for i in self.watchers {
              i.value.onLoadedMore(from: from, count: loaded, state: st)
            }
          } else {
            if self.latestState.items.count == self.windowSize {
              self.completed = true
              self.source.loadMore()
            } else {
              let loaded = self.latestState.items.count - self.windowSize
              self.completed = true
              self.windowSize = 0
              let s = self.latestState
              self.state = s
              for i in self.watchers {
                i.value.onLoadedMore(from: s.items.count-loaded, count: loaded, state: s)
              }
            }
          }
        }
      }
    }
  }
  
  func watch(delegate: RNAsyncDataViewDelegate) -> ()-> Void {
    let key = UUID().uuidString
    queue.async {
      if self.state.inited {
        delegate.onInited(state: self.state)
      }
      self.watchers[key] = delegate
    }
    return {
      queue.async {
        self.watchers[key] = nil
      }
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
