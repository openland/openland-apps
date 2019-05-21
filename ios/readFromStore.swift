//
//  RecordStoreReader.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

enum StoreReadResult {
  case success(data: JSON)
  case missing
}

fileprivate func readValue(
  value: RecordValue,
  type: OutputType,
  store: RecordStore,
  variables: JSON
) -> StoreReadResult {
  if type is OutputType.Scalar {
    let sc = type as! OutputType.Scalar
    if value is RecordValue.NullValue {
      return StoreReadResult.success(data: JSON(NSNull()))
    } else if sc.name == "String" {
      if value is RecordValue.StringValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.StringValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else if sc.name == "Int" {
      if value is RecordValue.NumberValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.NumberValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else if sc.name == "Float" {
      if value is RecordValue.NumberValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.NumberValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else if sc.name == "ID" {
      if value is RecordValue.StringValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.StringValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else if sc.name == "Date" {
      if value is RecordValue.StringValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.StringValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else if sc.name == "Boolean" {
      if value is RecordValue.BooleanValue {
        return StoreReadResult.success(data: JSON((value as! RecordValue.BooleanValue).value))
      } else {
        return StoreReadResult.missing
      }
    } else {
      fatalError("Unknown scalar type: " + sc.name)
    }
  } else if type is OutputType.NotNull {
    if value is RecordValue.NullValue {
      return StoreReadResult.missing
    } else {
      return readValue(
        value: value,
        type: (type as! OutputType.NotNull).inner,
        store: store,
        variables: variables
      )
    }
  } else if type is OutputType.List {
    if value is RecordValue.NullValue {
      return StoreReadResult.success(data: JSON(NSNull()))
    } else {
      if value is RecordValue.ListValue {
        let lt = type as! OutputType.List
        let l = value as! RecordValue.ListValue
        var res: [JSON] = []
        for i in l.items {
          let r = readValue(value: i, type: lt.inner, store: store, variables: variables)
          switch(r) {
          case .success(let data):
            res.append(data)
          case .missing:
            return StoreReadResult.missing
          }
        }
        return StoreReadResult.success(data: JSON(res))
      } else {
        return StoreReadResult.missing
      }
    }
  } else if type is OutputType.Object {
    if value is RecordValue.NullValue {
      return StoreReadResult.success(data: JSON(NSNull()))
    } else {
      let ot = type as! OutputType.Object
      if value is RecordValue.ReferenceValue {
        return readSelector(cacheKey: (value as! RecordValue.ReferenceValue).key, store: store, selectors: ot.selectors, variables: variables)
      } else {
        return StoreReadResult.missing
      }
    }
  }
  
  fatalError()
}

fileprivate func readSelector(
  record: Record,
  fields: SharedDictionary<String, JSON>,
  store: RecordStore,
  selectors: [Selector],
  variables: JSON
) -> Bool {
  for f in selectors {
    if f is Selector.Field {
      let fl = f as! Selector.Field
      let key = selectorKey(name: fl.name, arguments: fl.arguments, variables: variables)
      if record.fields[key] != nil {
        let rv = readValue(value: record.fields[key]!, type: fl.type, store: store, variables: variables)
        switch(rv) {
        case .success(let data):
          fields[fl.alias] = data
        case .missing:
          return false
        }
      } else {
        return false
      }
    } else if f is Selector.TypeCondition {
      let tc = f as! Selector.TypeCondition
      if record.fields["__typename"] == RecordValue.StringValue(value: tc.name) {
        if !readSelector(record: record, fields: fields, store: store, selectors: tc.type.selectors, variables: variables) {
          return false
        }
      }
    } else if f is Selector.Fragment {
      let ff = f as! Selector.Fragment
      if !readSelector(record: record, fields: fields, store: store, selectors: ff.type.selectors, variables: variables) {
        return false
      }
    } else {
      fatalError("Unsupported selector")
    }
  }
  return true
}

fileprivate func readSelector(
  cacheKey: String,
  store:RecordStore,
  selectors: [Selector],
  variables: JSON
  ) -> StoreReadResult {

  let value = store.read(key: cacheKey)
  if value.fields.count == 0{
    return StoreReadResult.missing
  }
  
  let fields = SharedDictionary<String, JSON>()
  
  if !readSelector(record: value, fields: fields, store: store, selectors: selectors, variables: variables) {
    return StoreReadResult.missing
  }
  
  return StoreReadResult.success(data: JSON(fields.dict))
}

func readFromStore(cacheKey: String, store: RecordStore, type: OutputType.Object, variables: JSON) -> StoreReadResult {
  return readSelector(cacheKey: cacheKey, store: store, selectors: type.selectors, variables: variables)
}

func readQueryFromStore(cacheKey: String, store: RecordStore, type: OutputType.Object, variables: JSON) -> StoreReadResult {
  var fields: [String: JSON] = [:]
  for f in type.selectors {
    if !(f is Selector.Field) {
      fatalError("Root query can't contain fragments")
    }
    let sf = f as! Selector.Field
    let key = selectorKey(name: sf.name, arguments: sf.arguments, variables: variables)
    let refId = "\(cacheKey).$ref.\(key)"
    let value = store.read(key: refId)
    let ex = value.fields["data"]
    if ex == nil {
      // NSLog("[SpaceX-Store]: Missing query \(refId)")
      return StoreReadResult.missing
    }
    let rv = readValue(value: ex!, type: sf.type, store: store, variables: variables)
    switch(rv) {
    case .missing:
      // NSLog("[SpaceX-Store]: Missing value")
      return StoreReadResult.missing
    case .success(let data):
      fields[sf.alias] = data
    }
  }
  return StoreReadResult.success(data: JSON(fields))
}
