//
//  collectMissingKeys.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate func collectMissingKeys(cacheKey: String, selectors: [Selector], store: RecordStore, variables: JSON) -> Set<String> {
  if !store.isInMemory(key: cacheKey) {
    return Set([cacheKey])
  }
  let value = store.read(key: cacheKey)
  var res = Set<String>()
  for f in selectors {
    if f is Selector.Field {
      let fl = f as! Selector.Field
      let key = selectorKey(name: fl.name, arguments: fl.arguments, variables: variables)
      if value.fields[key] != nil {
        res = res.union(collectMissingKeys(value: value.fields[key]!, type: fl.type, store: store, variables: variables))
      }
    } else if f is Selector.TypeCondition {
      let tc = f as! Selector.TypeCondition
      if value.fields["__typename"] == RecordValue.StringValue(value: tc.name) {
        res = res.union(collectMissingKeys(cacheKey: cacheKey, selectors: tc.type.selectors, store: store, variables: variables))
      }
    } else if f is Selector.Fragment {
      let fr = f as! Selector.Fragment
      res = res.union(collectMissingKeys(cacheKey: cacheKey, selectors: fr.type.selectors, store: store, variables: variables))
    } else {
      fatalError()
    }
  }
  return res
}

fileprivate func collectMissingKeys(value: RecordValue, type:OutputType, store:RecordStore, variables: JSON) -> Set<String> {
  if type is OutputType.Scalar {
    return Set()
  } else if type is OutputType.NotNull {
    if value is RecordValue.NullValue {
      return Set()
    } else {
      return collectMissingKeys(value: value, type: (type as! OutputType.NotNull).inner, store: store, variables: variables)
    }
  } else if type is OutputType.List {
    if value is RecordValue.ListValue {
      let ls = value as! RecordValue.ListValue
      let lt = (type as! OutputType.List)
      var res = Set<String>()
      for i in ls.items {
        res = res.union(collectMissingKeys(value: i, type: lt.inner, store: store, variables: variables))
      }
      return res
    } else {
      return Set()
    }
  } else if type is OutputType.Object {
    if value is RecordValue.ReferenceValue {
      let ref = (value as! RecordValue.ReferenceValue)
      let tp = (type as! OutputType.Object)
      return collectMissingKeys(cacheKey: ref.key, selectors: tp.selectors, store: store, variables: variables)
    } else {
      return Set()
    }
  }
  
  return Set()
}

func collectMissingKeys(cacheKey: String, store: RecordStore, type: OutputType.Object, variables: JSON) -> Set<String> {
  return collectMissingKeys(cacheKey: cacheKey, selectors: type.selectors, store: store, variables: variables)
}

func collectMissingKeysRoot(cacheKey: String, store: RecordStore, type: OutputType.Object, variables: JSON) -> Set<String> {
  var res = Set<String>()
  for f in type.selectors {
    if !(f is Selector.Field) {
      fatalError("Root query can't contain fragments")
    }
    
    let sf = f as! Selector.Field
    let key = selectorKey(name: sf.name, arguments: sf.arguments, variables: variables)
    let refId = "\(cacheKey).$ref.\(key)"
    if !store.isInMemory(key: refId) {
      res.insert(refId)
    } else {
      let value = store.read(key: refId)
      let ex = value.fields["data"]
      if ex != nil {
        for s in collectMissingKeys(value: ex!, type: sf.type, store: store, variables: variables) {
          res.insert(s)
        }
      }
    }
  }
  return res
}
