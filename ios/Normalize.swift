//
//  Normalize.swift
//  openlandTests
//
//  Created by Steve Kite on 5/9/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate class SharedDictionary<K : Hashable, V> {
  var dict : Dictionary<K, V> = Dictionary()
  subscript(key : K) -> V? {
    get {
      return dict[key]
    }
    set(newValue) {
      dict[key] = newValue
    }
  }
}

fileprivate class NormalizedCollection {
  var records: [String: SharedDictionary<String, RecordValue>] = [:]
  func build() -> [String: SRecord] {
    var res: [String: SRecord] = [:]
    for k in records.keys {
      res[k] = SRecord(key: k, fields: records[k]!.dict)
    }
    return res
  }
}

fileprivate func normalizeValue(
  parentCacheKey: String?,
  collection: NormalizedCollection,
  value: OutputType,
  args: JSON,
  data: JSON
) -> RecordValue? {
  
  if (value is OutputType.NotNull) {
    let v2 = value as! OutputType.NotNull
    let res = normalizeValue(
      parentCacheKey: parentCacheKey,
      collection: collection,
      value: v2.inner,
      args: args,
      data: data
    )
    if res is RecordValue.NullValue {
      fatalError() // TODO: Replace
    } else {
      return res
    }
  }
  if (!data.exists() || data.null != nil) {
    return RecordValue.NullValue()
  }
  if value is OutputType.Scalar {
    let sc = value as! OutputType.Scalar
    if parentCacheKey != nil {
      if sc.name == "String" || sc.name == "Date" || sc.name == "ID" {
        return RecordValue.StringValue(value: data.stringValue)
      } else if sc.name == "Int" || sc.name == "Float" {
        if data.double != nil {
          return RecordValue.NumberValue(value: data.doubleValue)
        } else if data.int != nil {
          return RecordValue.NumberValue(value: Double(data.intValue))
        } else {
          fatalError() // TODO: Replace
        }
      } else if sc.name == "Boolean" {
        if data.bool != nil {
          return RecordValue.BooleanValue(value: data.boolValue)
        } else {
          fatalError() // TODO: Replace
        }
      }
    } else {
      return nil
    }
  } else if value is OutputType.List {
    let ls = value as! OutputType.List
    let vals = data.arrayValue
    var res: [RecordValue] = []
    for i in 0..<vals.count {
      res.append(normalizeValue(
        parentCacheKey: parentCacheKey! + "." + String(i),
        collection: collection,
        value: ls.inner,
        args: args,
        data:  vals[i]
      )!)
    }
    return RecordValue.ListValue(items: res)
  } else if value is OutputType.Object {
    let obj = value as! OutputType.Object
    return normalizeSelector(
      parentCacheKey: parentCacheKey,
      collection: collection,
      selectors: obj.selectors,
      args: args,
      data: data
    )
  }
  
  fatalError("Unreachable code")
}

fileprivate func normalizeSelector(
  parentCacheKey: String?,
  collection: NormalizedCollection,
  selectors: [Selector],
  args: JSON,
  data: JSON
) -> RecordValue? {
  
  var id: String? = nil
  if data["id"].exists() {
    if data["id"].null != nil /* is null */ {
      id = parentCacheKey
    } else {
      id = data["id"].stringValue
    }
  } else {
    id = parentCacheKey
  }
  var map: SharedDictionary<String, RecordValue>? = nil
  if id != nil {
    if collection.records[id!] != nil {
      map = collection.records[id!]!
    } else {
      map = SharedDictionary()
      collection.records[id!] = map!
    }
  }
  
  for f in selectors {
    if f is Selector.Field {
      let f2 = f as! Selector.Field
      if map != nil {
        let storeKey = f2.name
        map![storeKey] = normalizeValue(
          parentCacheKey: id!+"."+f2.name,
          collection: collection,
          value: f2.type,
          args: args,
          data: data[f2.alias]
        )
      } else {
        let _ = normalizeValue(
          parentCacheKey: nil,
          collection: collection,
          value: f2.type,
          args: args,
          data: data[f2.alias]
        )
      }
    } else if f is Selector.TypeCondition {
      let f2 = f as! Selector.TypeCondition
      if data["__typename"].string == f2.name {
        let _ = normalizeSelector(
          parentCacheKey: parentCacheKey,
          collection: collection,
          selectors: f2.type.selectors,
          args: args,
          data: data
        )
      }
    } else if f is Selector.Fragment {
      let f2 = f as! Selector.Fragment
      let _ = normalizeSelector(
        parentCacheKey: parentCacheKey,
        collection: collection,
        selectors: f2.type.selectors,
        args: args,
        data: data
      )
    }
  }
  
  if id != nil {
    return RecordValue.ReferenceValue(key: id!)
  } else {
    return nil
  }
}

func normalizeData(id: String, type: OutputType.Object, args: JSON, data: JSON) -> [String: SRecord] {
  let collection = NormalizedCollection()
  let _ = normalizeSelector(parentCacheKey: id, collection: collection, selectors: type.selectors, args: args, data: data)
  return collection.build()
}
