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
  func onInited(items: [RNAsyncDataViewItem])
  func onAdded(index: Int, items: [RNAsyncDataViewItem])
  func onUpdated(index: Int, items: [RNAsyncDataViewItem])
  func onMoved(from: Int, to:Int, items: [RNAsyncDataViewItem])
  
  // func onUpdated(items: [RNAsyncDataViewItem])
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
  
  var items: [RNAsyncDataViewItem] = []
  var watchers: [String : RNAsyncDataViewDelegate] = [:]
  
  let dataSourceKey: String
  
  init(dataSourceKey: String) {
    self.dataSourceKey = dataSourceKey
  }
  
  func handleInitial(items: [RNAsyncDataViewItem]) {
    let itms = items.map {$0}
    self.items = itms
    for i in watchers {
      i.value.onInited(items: itms)
    }
  }
  
  func handleAdded(item: RNAsyncDataViewItem, index: Int) {
    var itms = items.map {$0}
    itms.insert(item, at: index)
    self.items = itms
    for i in watchers {
      i.value.onAdded(index: index, items: itms)
    }
  }
  
  func handleUpdated(item: RNAsyncDataViewItem, index: Int) {
    var itms = self.items.map {$0}
    itms[index] = item
    self.items = itms
    for i in watchers {
      i.value.onUpdated(index: index, items: itms)
    }
  }
  
  func handleRemoved(index: Int) {
    var itms = self.items.map {$0}
    itms.remove(at: index)
    self.items = itms
//    for i in watchers {
//      i.value.onUpdated(items: itms)
//    }
  }
  
  func handleMoved(fromIndex: Int, toIndex: Int) {
    var itms = self.items.map {$0}
    let r = itms.remove(at: fromIndex)
    itms.insert(r, at: toIndex)
    self.items = itms
    for i in watchers {
      i.value.onMoved(from: fromIndex, to: toIndex, items: itms)
    }
  }
  
  func watch(delegate: RNAsyncDataViewDelegate) {
    let key = UUID().uuidString
    watchers[key] = delegate
  }
}

@objc(RNAsyncDataViewManager)
class RNAsyncDataViewManager: NSObject {
  
  @objc(dataViewInit:config:)
  func dataViewInit(dataSourceKey: String, config: String) -> Void {
    let parsed = JSON(parseJSON: config)
    var items: [RNAsyncDataViewItem] = []
    for i in parsed.arrayValue {
      let key = i["key"].stringValue
      let config = parseSpec(i["config"].stringValue)
      items.append(RNAsyncDataViewItem(key: key, config: config))
    }
    RNAsyncDataView.getDataView(key: dataSourceKey).handleInitial(items: items)
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
}
