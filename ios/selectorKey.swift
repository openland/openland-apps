//
//  selectorKey.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate func selectorKey(json: JSON) -> String {
  if json.type == Type.string {
    return "\"" + json.stringValue + "\""
  } else if json.type == Type.number || json.type == Type.bool {
    return json.stringValue
  } else if json.type == Type.null {
    return "null"
  } else if json.type == Type.array {
    return "[" + json.arrayValue.map { selectorKey(json: $0) }.joined(separator: ",") + "]"
  } else if json.type == Type.dictionary {
    let d = json.dictionaryValue
    var keys: [String: String] = [:]
    for k in d {
      keys[k.key] = k.key + ":" + selectorKey(json: k.value)
    }
    let sorted = keys.keys.sorted()
    return "{" + ((sorted.map { keys[$0]! }).joined(separator: ",")) + "}"
  }
  fatalError()
}

fileprivate func selectorKey(value: InputValue, variables: JSON) -> String? {
  if value is InputValue.BooleanValue {
    return String((value as! InputValue.BooleanValue).value)
  } else if value is InputValue.FloatValue {
    return String((value as! InputValue.FloatValue).value)
  } else if value is InputValue.IntValue {
    return String((value as! InputValue.IntValue).value)
  } else if value is InputValue.StringValue {
    return "\"" + (value as! InputValue.StringValue).value + "\""
  } else if value is InputValue.NullValue {
    return "null"
  } else if value is InputValue.ListValue {
    return "[" + (value as! InputValue.ListValue).items.map { selectorKey(value: $0, variables: variables)! }.joined(separator: ",") + "]"
  } else if value is InputValue.ReferenceValue {
    let r = value as! InputValue.ReferenceValue
    if variables[r.value].exists() {
      return selectorKey(json: variables[r.value])
    } else {
      return nil
    }
  } else if value is InputValue.ObjectValue {
    let r = value as! InputValue.ObjectValue
    var keys: [String:String] = [:]
    for f in r.fields {
      let s = selectorKey(value: f.value, variables: variables)
      if s != nil {
        keys[f.key] = f.key + ":" + s!
      }
    }
    let sorted = keys.keys.sorted()
    return "{" + ((sorted.map { keys[$0]! }).joined(separator: ",")) + "}"
  }
  
  fatalError()
}

func selectorKey(name: String, arguments: [String: InputValue], variables: JSON) -> String {
  if arguments.count == 0 {
    return name
  }
  var args: [String: String] = [:]
  for a in arguments {
    let s = selectorKey(value: a.value, variables: variables)
    if s != nil {
      args[a.key] = a.key + ":" + s!
    }
  }
  if args.count == 0 {
    return name
  }
  let sorted = args.keys.sorted()
  return name + "(" + ((sorted.map { args[$0]! }).joined(separator: ",")) + ")"
}
