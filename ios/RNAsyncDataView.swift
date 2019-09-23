//
//  RNAsyncDataView.swift
//  openland
//
//  Created by Steve Kite on 8/27/18.
//  Copyright © 2018 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate let queue = DispatchQueue(label: "rn-data-view")

class RNAsyncDataViewItem {
  var key: String
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
  func onScrollToRequested(index: Int)
}

class RNAsyncDataViewState {
  let items: [RNAsyncDataViewItem]
  let completed: Bool
  let completedForward: Bool
  let inited: Bool
  let anchor: String?
  
  init(items: [RNAsyncDataViewItem], completed: Bool, completedForward: Bool, inited: Bool, anchor: String?) {
    self.items = items
    self.completed = completed
    self.completedForward = completedForward
    self.inited = inited
    self.anchor = anchor
  }
  
  func replace(index: Int, spec: AsyncViewSpec) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms[index] = RNAsyncDataViewItem(key: self.items[index].key, config: spec)
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
  }
  
  func move(from: Int, to: Int) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    let r = itms.remove(at: from)
    itms.insert(r, at: to)
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
  }
  
  func remove(index: Int) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms.remove(at: index)
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
  }
  
  func add(index: Int, key: String, spec: AsyncViewSpec, isAnchor: Bool) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    itms.insert(RNAsyncDataViewItem(key: key, config: spec), at: index)
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: isAnchor ? key : self.anchor)
  }
  
  func setCompleted(completed: Bool) -> RNAsyncDataViewState {
    if self.completed != completed {
      return RNAsyncDataViewState(items: self.items, completed: completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
    } else {
      return self
    }
  }
  
  func setCompletedForward(completed: Bool) -> RNAsyncDataViewState {
    if self.completedForward != completed {
      return RNAsyncDataViewState(items: self.items, completed: completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
    } else {
      return self
    }
  }
  
  func setInited() -> RNAsyncDataViewState {
    if !self.inited {
      return RNAsyncDataViewState(items: self.items, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
    } else {
      return self
    }
  }
  
  func loadedMore(items: [RNAsyncDataViewItem]) -> RNAsyncDataViewState {
    var itms = self.items.map {$0}
    for i in items {
      itms.append(i)
    }
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
  }
  
  func loadedMoreForward(items: [RNAsyncDataViewItem]) -> RNAsyncDataViewState {
    var itms = items.map {$0}
    for i in self.items {
      itms.append(i)
    }
    return RNAsyncDataViewState(items: itms, completed: self.completed, completedForward: self.completedForward, inited: self.inited, anchor: self.anchor)
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
  
  var state = RNAsyncDataViewState(items: [], completed: false, completedForward: false, inited: false, anchor: nil)
  var watchers = WeakMap<RNAsyncDataViewDelegate>()
  var scrollTo: String?
  
  let dataSourceKey: String
  
  init(dataSourceKey: String) {
    self.dataSourceKey = dataSourceKey
  }
  
  func handleInitial(items: [RNAsyncDataViewItem], completed: Bool, completedForward: Bool, anchor: String?) {
    let st = RNAsyncDataViewState(items: items.map {$0}, completed: completed, completedForward: completedForward, inited: true, anchor: anchor)
    self.state = st
    if(anchor != nil){
      self.handleScrollToRequest(key: anchor!)
    }
    for i in watchers.all() {
      i.value.onInited(state: st)
    }
  }
  
  func handleAdded(item: RNAsyncDataViewItem, index: Int, isAnchor: Bool) {
    let st = self.state.add(index: index, key: item.key, spec: item.config, isAnchor: isAnchor)
    self.state = st
    for i in watchers.all() {
      i.value.onAdded(index: index, state: st)
    }
  }
  
  func handleUpdated(item: RNAsyncDataViewItem, index: Int) {
    let st = self.state
      .replace(index: index, spec: item.config)
    self.state = st
    for i in watchers.all() {
      i.value.onUpdated(index: index, state: st)
    }
  }
  
  func handleRemoved(index: Int) {
    let st = self.state.remove(index: index)
    self.state = st
    for i in watchers.all() {
      i.value.onRemoved(index: index, state: st)
    }
  }
  
  func handleMoved(fromIndex: Int, toIndex: Int) {
    let st = self.state.move(from: fromIndex, to: toIndex)
    self.state = st
    for i in watchers.all() {
      i.value.onMoved(from: fromIndex, to: toIndex, state: st)
    }
  }
  
  func handleLoadedMore(items: [RNAsyncDataViewItem], completed: Bool) {
    let start = self.state.items.count
    let st = self.state
      .loadedMore(items: items)
      .setCompleted(completed: completed)
    self.state = st
    for i in watchers.all() {
      i.value.onLoadedMore(from: start, count: items.count, state: st)
    }
    if(self.scrollTo != nil){
      self.handleScrollToRequest(key: self.scrollTo!)
      self.scrollTo = nil
    }
  }

  func handleLoadedMoreForward(items: [RNAsyncDataViewItem], completed: Bool) {
    let st = self.state
      .loadedMoreForward(items: items)
      .setCompletedForward(completed: completed)
    self.state = st
    for i in watchers.all() {
      i.value.onLoadedMore(from: 0, count: items.count, state: st)
    }
    if(self.scrollTo != nil){
      self.handleScrollToRequest(key: self.scrollTo!)
      self.scrollTo = nil
    }
  }
  
  func handleScrollToRequest(key: String) {
    let index = self.state.items.firstIndex { item -> Bool in
      return item.key == key
    }
    if(index == nil || watchers.all().count == 0){
      self.scrollTo = key
    }else{
      if(index! > -1){
        for i in watchers.all() {
          i.value.onScrollToRequested(index: index!)
        }
      }
    }
  }
  
  func handleCompleted() {
    let st = self.state
      .setCompleted(completed: true)
    self.state = st
    for i in watchers.all() {
      i.value.onCompleted(state: st)
    }
  }
  
  func loadMore() {
    AsyncViewEventEmitter.sharedInstance.dispatchOnLoadMore(key: self.dataSourceKey)
  }
  
  func loadMoreForward() {
    AsyncViewEventEmitter.sharedInstance.dispatchOnLoadMoreForward(key: self.dataSourceKey)
  }
  
  func watch(delegate: RNAsyncDataViewDelegate) -> ()-> Void {
    let key = UUID().uuidString
    self.watchers.set(key: key, value: delegate)
    let st = self.state
    if st.inited {
      delegate.onInited(state: st)
    }
    if(self.scrollTo != nil){
      self.handleScrollToRequest(key: self.scrollTo!)
      self.scrollTo = nil
    }
    return {
      self.watchers.remove(key: key)
    }
  }
}

class RNAsyncDataViewWindow: RNAsyncDataViewDelegate {
  
  var watchers = WeakMap<RNAsyncDataViewDelegate>()
  var state = RNAsyncDataViewState(items: [], completed: false, completedForward: false, inited: false, anchor: nil)
  private var latestState = RNAsyncDataViewState(items: [], completed: false, completedForward: false, inited: false, anchor: nil)
  var source: RNAsyncDataView
  var window: [Int] = [0,0]
  var wSize: Int = 20

  var unwatch: (() -> Void)!
  var isPassThrough = false
  var isPassThroughBackward = false
  var isPassThroughForward = false
  var scrollTo: Int?
  
  init(source: RNAsyncDataView) {
    self.source = source
    
    self.unwatch = self.source.watch(delegate: self)
//    if source.state.inited {
//      if source.state.items.count <= self.wSize {
//        self.completed = true
//        self.latestState = source.state
//        self.state = source.state
//      } else {
//        self.windowSize = min(source.state.items.count, self.wSize)
//        let s = RNAsyncDataViewState(items: Array(source.state.items[0...max(self.windowSize-1, 0)]), completed: source.state.completed &&  self.windowSize == source.state.items.count, inited: true)
//        self.latestState = source.state
//        self.state = s
//      }
//    }
  }
  
  func onInited(state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if self.latestState.items.count <= self.wSize {
       
        self.state = self.latestState
        for i in self.watchers.all() {
          i.value.onInited(state: state)
        }
      } else {
        let start = max(0,  state.items.firstIndex(where: {$0.key == state.anchor ?? nil}) ?? 0  - self.wSize / 2)
        let end = start + self.wSize
        self.window = [start, end]
        let completed = state.completed && end == (state.items.count - 1)
        let completedForward = state.completedForward && start == 0
        let s = RNAsyncDataViewState(items: Array(state.items[start..<end]), completed: completed, completedForward: completedForward, inited: true, anchor: state.anchor);
        self.latestState = self.source.state
        self.state = s
        for i in self.watchers.all() {
          i.value.onInited(state: s)
        }
      }
    }
  }
  
  func inWindow(index: Int) -> Bool{
    return (index >= self.window[0]) && (index <= self.window[1])
  }
  
  func onAdded(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      
      if(self.isPassThrough || self.inWindow(index: index)){
        var itms = self.state.items.map {$0}
        itms.insert(state.items[index], at: index)
        let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, completedForward: self.state.completedForward, inited: true, anchor: state.anchor);
        self.state = st
        self.window[1] += 1
        
        for i in self.watchers.all() {
          i.value.onAdded(index: index, state: st)
        }
      }else if(index < self.window[0]){
        self.window[0] += 1
        self.window[1] += 1
      }
    }
  }
  
  func onUpdated(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      
      if(self.isPassThrough || self.inWindow(index: index)){
        let st = self.state.replace(index: index, spec: state.items[index].config)
        self.state = st
        for i in self.watchers.all() {
          i.value.onUpdated(index: index, state: st)
        }
      }
      
    }
  }
  
  func onMoved(from: Int, to: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      
      if((self.inWindow(index: from) && self.inWindow(index: to)) || self.isPassThrough){
        self.state = state
        for i in self.watchers.all() {
          i.value.onMoved(from: from, to: to, state: state)
        }
        return
      }else if(!self.inWindow(index: from) && !self.inWindow(index: to)){
        // Ignore (out of window)
      }else if(self.inWindow(index: from)){
        let st = self.state.remove(index: from)
        self.window[1] -= 1
        self.state = st
        for i in self.watchers.all() {
          i.value.onRemoved(index: from, state: st)
        }
      }else if(self.inWindow(index: to)){
        let st = self.state
          .add(index: to, key: state.items[to].key, spec: state.items[to].config, isAnchor: false)
        self.window[1] += 1
        self.state = st
        for i in self.watchers.all() {
          i.value.onAdded(index: from, state: st)
        }
      }
      
    }
  }
  
  func onRemoved(index: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      
      if(self.isPassThrough || self.inWindow(index: index)){
        var itms = self.state.items.map {$0}
        itms.remove(at: index)
        let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, completedForward: self.state.completedForward, inited: true, anchor: state.anchor);
        self.state = st
        self.window[1] -= 1
        
        for i in self.watchers.all() {
          i.value.onRemoved(index: index, state: st)
        }
      }else if(index < self.window[0]){
        self.window[0] -= 1
        self.window[1] -= 1
      }
    }
  }
  
  func onLoadedMore(from: Int, count: Int, state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.isPassThroughBackward) {
        self.state = state
        for i in self.watchers.all() {
          i.value.onLoadedMore(from: from, count: count, state: state)
        }
        self.window[1] += count
      }
    }
  }
  
  func onCompleted(state: RNAsyncDataViewState) {
    queue.async {
      self.latestState = state
      if (self.isPassThroughForward) {
        self.state = state
        for i in self.watchers.all() {
          i.value.onCompleted(state: state)
        }
      }
    }
  }
  
  func loadMore(){
    self.loadMore(batchSize: self.wSize);
  }
  
  func loadMore(batchSize: Int) {
    queue.async {
      if !self.latestState.inited {
        return
      }else if(self.isPassThroughBackward){
        self.source.loadMore()
        return
      } else {
        queue.asyncAfter(deadline: .now() + .milliseconds(50)) {

          let available = min(self.wSize, self.latestState.items.count - 1 - self.window[1]);
          
          if (available > 0) {
            var itms = self.state.items.map {$0}
            for i in self.window[1] + 1..<(self.window[1] + available) {
              itms.append(self.latestState.items[i])
            }
            self.window[1] += available;
            let availableMore = self.latestState.items.count - 1 - self.window[1] >= 0;
            
            let st = RNAsyncDataViewState(items: itms, completed: !availableMore && self.latestState.completed, completedForward: self.state.completedForward, inited: true, anchor: self.latestState.anchor)
            self.state = st
            
            for i in self.watchers.all() {
              i.value.onLoadedMore(from: self.state.items.count - available, count: available, state: st)
            }
            
          } else {
            self.isPassThroughBackward = true;
            self.isPassThrough = self.isPassThrough || self.isPassThroughBackward;
            if (self.latestState.completed) {
              self.onCompleted(state: self.latestState)
            } else {
              self.source.loadMore()
            }
          }
          
        }
      }
    }
  }
  
  func loadMoreForward(){
    self.loadMoreForward(batchSize: self.wSize);
  }
  
  func loadMoreForward(batchSize: Int) {
    queue.async {
      if !self.latestState.inited {
        return
      }else if(self.isPassThroughForward){
        self.source.loadMoreForward()
        return
      } else {
        queue.asyncAfter(deadline: .now() + .milliseconds(50)) {
          
          let available = min(self.wSize, self.window[0]);
          
          if (available > 0) {
            var itms = self.state.items.map {$0}
            for i in (self.window[0] - 1..<(self.window[0] - available)).reversed() {
              itms.append(self.latestState.items[i])
            }
            self.window[0] -= available;
            let availableMore = self.window[0] > 0;
            
            let st = RNAsyncDataViewState(items: itms, completed: self.state.completed, completedForward:  !availableMore &&  self.latestState.completedForward, inited: true, anchor: self.latestState.anchor)
            self.state = st
            
            for i in self.watchers.all() {
              i.value.onLoadedMore(from: 0, count: available, state: st)
            }
            
          } else {
            self.isPassThroughBackward = true;
            self.isPassThrough = self.isPassThrough || self.isPassThroughBackward;
            if (self.latestState.completed) {
              self.onCompleted(state: self.latestState)
            } else {
              self.source.loadMore()
            }
          }
          
        }
      }
    }
  }
  
  func onScrollToRequested(index: Int) {
    if(index > self.wSize){
      self.loadMore(batchSize: self.latestState.items.count - self.wSize)
    }
    queue.asyncAfter(deadline: .now() + .milliseconds(51)) {
      if(self.watchers.all().count == 0){
        self.scrollTo = index;
      }else{
        
        for i in self.watchers.all() {
          i.value.onScrollToRequested(index: index)
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
      self.watchers.set(key: key, value: delegate)
      if(self.scrollTo != nil){
        self.onScrollToRequested(index: self.scrollTo!);
        self.scrollTo = nil
      }
    }
   
    return {
      queue.async {
        self.watchers.remove(key: key)
      }
    }
  }
}

@objc(RNAsyncDataViewManager)
class RNAsyncDataViewManager: NSObject {
  
  @objc(dataViewInit:config:completed:completedForward:anchor:)
  func dataViewInit(dataSourceKey: String, config: String, completed: Bool, completedForward: Bool, anchor: String?) -> Void {
    let parsed = JSON(parseJSON: config)
    var items: [RNAsyncDataViewItem] = []
    for i in parsed.arrayValue {
      let key = i["key"].stringValue
      let config = resolveSpec(i["config"])
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleInitial(items: items, completed: completed, completedForward: completedForward, anchor: anchor)
  }
  
  @objc(dataViewAddItem:key:config:index:isAnchor:)
  func dataViewAddItem(dataSourceKey: String, key: String, config: String, index: NSNumber, isAnchor: Bool) -> Void {
    let configSpec = parseSpec(config)
    let item = RNAsyncDataViewItem(key: key, config: configSpec)
    RNAsyncDataView.getDataView(key: dataSourceKey).handleAdded(item: item, index: Int(index), isAnchor: isAnchor)
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
      let config = resolveSpec(i["config"])
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleLoadedMore(items: items, completed: completed)
  }
  @objc(dataViewLoadedMoreForward:config:completed:)
  func dataViewLoadedMoreForward(dataSourceKey: String, config: String, completed: Bool) -> Void {
    let parsed = JSON(parseJSON: config)
    var items: [RNAsyncDataViewItem] = []
    for i in parsed.arrayValue {
      let key = i["key"].stringValue
      let config = resolveSpec(i["config"])
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleLoadedMoreForward(items: items, completed: completed)
  }
  @objc(dataViewScrollToKeyReqested:scrollToKey:)
  func dataViewScrollToKeyReqested(dataSourceKey: String, scrollToKey: String) -> Void {
    RNAsyncDataView.getDataView(key: dataSourceKey).handleScrollToRequest(key: scrollToKey)
  }
  
  @objc(dataViewCompleted:)
  func dataViewCompleted(dataSourceKey: String) -> Void {
    RNAsyncDataView.getDataView(key: dataSourceKey).handleCompleted()
  }
}
