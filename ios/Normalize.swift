//
//  Normalize.swift
//  openlandTests
//
//  Created by Steve Kite on 5/9/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate class NormalizedCollection {
  var records: [String: SharedDictionary<String, RecordValue>] = [:]
  func build() -> [String: Record] {
    var res: [String: Record] = [:]
    for k in records.keys {
      res[k] = Record(key: k, fields: records[k]!.dict)
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
) throws -> RecordValue? {
  
  if (value is OutputType.NotNull) {
    let v2 = value as! OutputType.NotNull
    let res = try normalizeValue(
      parentCacheKey: parentCacheKey,
      collection: collection,
      value: v2.inner,
      args: args,
      data: data
    )
    if res is RecordValue.NullValue {
      throw InvalidDataError("Unexpected null value")
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
          throw InvalidDataError("Unexpected value for " + sc.name + ": " + data.description)
        }
      } else if sc.name == "Boolean" {
        if data.bool != nil {
          return RecordValue.BooleanValue(value: data.boolValue)
        } else {
          throw InvalidDataError("Unexpected value for Boolean: " + data.description)
        }
      } else {
        throw InvalidDataError("Unsupported scalar " + sc.name)
      }
    } else {
      return nil
    }
  } else if value is OutputType.List {
    let ls = value as! OutputType.List
    let vals = data.arrayValue
    if parentCacheKey != nil {
      var res: [RecordValue] = []
      for i in 0..<vals.count {
        res.append(try normalizeValue(
          parentCacheKey: parentCacheKey! + "." + String(i),
          collection: collection,
          value: ls.inner,
          args: args,
          data:  vals[i]
          )!)
      }
      return RecordValue.ListValue(items: res)
    } else {
      for i in 0..<vals.count {
        try normalizeValue(
          parentCacheKey: nil,
          collection: collection,
          value: ls.inner,
          args: args,
          data:  vals[i]
        )
      }
      return nil
    }
  } else if value is OutputType.Object {
    let obj = value as! OutputType.Object
    return try normalizeSelector(
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
) throws -> RecordValue? {
  
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
        let storeKey = selectorKey(name: f2.name, arguments: f2.arguments, variables: args)
        map![storeKey] = try normalizeValue(
          parentCacheKey: id!+"."+f2.name,
          collection: collection,
          value: f2.type,
          args: args,
          data: data[f2.alias]
        )
      } else {
        let _ = try normalizeValue(
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
        let _ = try normalizeSelector(
          parentCacheKey: parentCacheKey,
          collection: collection,
          selectors: f2.type.selectors,
          args: args,
          data: data
        )
      }
    } else if f is Selector.Fragment {
      let f2 = f as! Selector.Fragment
      let _ = try normalizeSelector(
        parentCacheKey: parentCacheKey,
        collection: collection,
        selectors: f2.type.selectors,
        args: args,
        data: data
      )
    } else {
      fatalError("Unreachable code")
    }
  }
  
  if id != nil {
    return RecordValue.ReferenceValue(key: id!)
  } else {
    return nil
  }
}

func normalizeData(id: String, type: OutputType.Object, args: JSON, data: JSON) throws -> [String: Record] {
  let collection = NormalizedCollection()
  let _ = try normalizeSelector(parentCacheKey: id, collection: collection, selectors: type.selectors, args: args, data: data)
  return collection.build()
}

func normalizeRootQuery(rootQueryKey: String?, type: OutputType.Object, args: JSON, data: JSON) throws -> [String: Record] {
  let collection = NormalizedCollection()
  if rootQueryKey != nil {
    for f in type.selectors {
      if !(f is Selector.Field) {
        fatalError("Root query cant't contain fragments")
      }
      let sf = f as! Selector.Field
      let key = selectorKey(name: sf.name, arguments: sf.arguments, variables: args)
      let id = "\(rootQueryKey!).\(key)"
      let refId = "\(rootQueryKey!).$ref.\(key)"
      let ex = collection.records[refId]
      let map: SharedDictionary<String, RecordValue>
      if ex == nil {
        map = SharedDictionary()
        collection.records[refId] = map
      } else {
        map = ex!
      }
      map["data"] = try normalizeValue(parentCacheKey: id, collection: collection, value: sf.type, args: args, data: data[sf.alias])
    }
  } else {
    let _ = try normalizeSelector(parentCacheKey: nil, collection: collection, selectors: type.selectors, args: args, data: data)
  }
  return collection.build()
}
