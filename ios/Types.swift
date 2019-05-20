//
//  SpaceX.swift
//  openland
//
//  Created by Steve Kite on 5/9/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

enum OperationKind {
  case subscription
  case query
  case mutation
}

class OperationDefinition {
  let name: String
  let kind: OperationKind
  let body: String
  let selector: OutputType.Object
  init(_ name: String, _ kind: OperationKind, _ body: String, _ selector: OutputType.Object) {
    self.name = name
    self.kind = kind
    self.body = body
    self.selector = selector
  }
}

struct InvalidDataError: Error {
  let message: String
  
  init(_ message: String) {
    self.message = message
  }
  
  public var localizedDescription: String {
    return message
  }
}

open class InputValue {
  class StringValue: InputValue {
    let value: String
    init(value: String) {
      self.value = value
      super.init()
    }
  }
  
  class IntValue: InputValue {
    let value: Int
    init(value: Int) {
      self.value = value
      super.init()
    }
  }
  
  class FloatValue: InputValue {
    let value: Double
    init(value: Double) {
      self.value = value
      super.init()
    }
  }
  
  class BooleanValue: InputValue {
    let value: Bool
    init(value: Bool) {
      self.value = value
      super.init()
    }
  }
  
  class NullValue: InputValue {
    override init() {
      super.init()
    }
  }
  
  class ListValue: InputValue {
    let items: [InputValue]
    init(items: [InputValue]) {
      self.items = items
      super.init()
    }
  }
  
  class ObjectValue: InputValue {
    let fields: [String: InputValue]
    init(fields: [String: InputValue]) {
      self.fields = fields
      super.init()
    }
  }
  
  class ReferenceValue: InputValue {
    let value: String
    init(value: String) {
      self.value = value
      super.init()
    }
  }
  
  private init() {
    
  }
}

open class OutputType {

  class NotNull: OutputType {
    let inner: OutputType
    init(inner: OutputType) {
      self.inner = inner
      super.init()
    }
  }
  
  class List: OutputType {
    let inner: OutputType
    init(inner: OutputType) {
      self.inner = inner
      super.init()
    }
  }
  
  class Scalar: OutputType {
    let name: String
    init(name: String) {
      self.name = name
      super.init()
    }
  }
  
  class Object: OutputType {
    let selectors: [Selector]
    init(selectors: [Selector]) {
      self.selectors = selectors
      super.init()
    }
  }
  
  private init() {
    
  }
}

open class Selector {
  
  class Field: Selector {
    let name: String
    let alias: String
    let type: OutputType
    let arguments: [String: InputValue]
    init(name: String, alias: String, arguments: [String: InputValue], type: OutputType) {
      self.name = name
      self.alias = alias
      self.type = type
      self.arguments = arguments
      super.init()
    }
  }
  
  class TypeCondition: Selector {
    let name: String
    let type: OutputType.Object
    init(name: String, type: OutputType.Object) {
      self.name = name
      self.type = type
      super.init()
    }
  }
  
  class Fragment: Selector {
    let name: String
    let type: OutputType.Object
    init(name: String, type: OutputType.Object) {
      self.name = name
      self.type = type
      super.init()
    }
  }
  
  private init() {
    
  }
}

open class RecordValue: Equatable {
  
  public static func == (lhs: RecordValue, rhs: RecordValue) -> Bool {
    if lhs is RecordValue.NullValue && rhs is RecordValue.NullValue {
      return true
    } else if lhs is RecordValue.StringValue && rhs is RecordValue.StringValue {
      let lhs2 = lhs as! RecordValue.StringValue
      let rhs2 = rhs as! RecordValue.StringValue
      return lhs2.value == rhs2.value
    } else if lhs is RecordValue.NumberValue && rhs is RecordValue.NumberValue {
      let lhs2 = lhs as! RecordValue.NumberValue
      let rhs2 = rhs as! RecordValue.NumberValue
      return lhs2.value == rhs2.value
    } else if lhs is RecordValue.BooleanValue && rhs is RecordValue.BooleanValue {
      let lhs2 = lhs as! RecordValue.BooleanValue
      let rhs2 = rhs as! RecordValue.BooleanValue
      return lhs2.value == rhs2.value
    } else if lhs is RecordValue.ListValue && rhs is RecordValue.ListValue {
      let a = lhs as! RecordValue.ListValue
      let b = rhs as! RecordValue.ListValue
      if a.items.count != b.items.count {
        return false
      }
      for i in 0..<a.items.count {
        if a.items[i] != b.items[i] {
          return false
        }
      }
      return true
    } else if lhs is RecordValue.ReferenceValue && rhs is RecordValue.ReferenceValue {
      let lhs2 = lhs as! RecordValue.ReferenceValue
      let rhs2 = rhs as! RecordValue.ReferenceValue
      return lhs2.key == rhs2.key
    }
    
    return false
  }
  
  class StringValue: RecordValue {
    let value: String
    init(value: String) {
      self.value = value
      super.init()
    }
  }
  class NumberValue: RecordValue {
    let value: Double
    init(value: Double) {
      self.value = value
      super.init()
    }
  }
  class BooleanValue: RecordValue {
    let value: Bool
    init(value: Bool) {
      self.value = value
      super.init()
    }
  }
  
  class NullValue: RecordValue {
    override init() {
      super.init()
    }
  }
  
  class ReferenceValue: RecordValue {
    let key: String
    init(key: String) {
      self.key = key
      super.init()
    }
  }
  
  class ListValue: RecordValue {
    let items: [RecordValue]
    init(items: [RecordValue]) {
      self.items = items
      super.init()
    }
  }
  
  private init() {
    
  }
}

class Record {
  let key: String
  let fields: [String:RecordValue]
  init(key: String, fields: [String:RecordValue]) {
    self.key = key
    self.fields = fields
  }
}

typealias RecordSet = [String:Record]

class SharedDictionary<K : Hashable, V> {
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


//
// Basics
//

func list(_ inner: OutputType) -> OutputType.List {
  return OutputType.List(inner: inner)
}

func notNull(_ inner: OutputType) -> OutputType.NotNull {
  return OutputType.NotNull(inner: inner)
}

func scalar(_ name: String) -> OutputType.Scalar {
  return OutputType.Scalar(name: name)
}

//
// Objects
//

func obj(_ selectors: Selector...) -> OutputType.Object {
  return OutputType.Object(selectors: selectors)
}

func arguments(_ src: (String, InputValue)...) -> [String: InputValue] {
  var res: [String: InputValue] = [:]
  for s in src {
    res[s.0] = s.1
  }
  return res
}

func fieldValue(_ name: String, _ value: InputValue) -> (String, InputValue) {
  return (name, value)
}

func refValue(_ key: String) -> InputValue.ReferenceValue {
  return InputValue.ReferenceValue(value: key)
}

func intValue(_ v: Int) -> InputValue.IntValue {
  return InputValue.IntValue(value: v)
}

func floatValue(_ v: Double) -> InputValue.FloatValue {
  return InputValue.FloatValue(value: v)
}

func stringValue(_ v: String) -> InputValue.StringValue {
  return InputValue.StringValue(value: v)
}

func listValue(_ values: InputValue...) -> InputValue.ListValue {
  return InputValue.ListValue(items: values)
}

func objectValue(_ src: (String, InputValue)...) -> InputValue.ObjectValue {
  var res: [String: InputValue] = [:]
  for s in src {
    res[s.0] = s.1
  }
  return InputValue.ObjectValue(fields: res)
}

func field(_ name: String, _ alias: String, _ type: OutputType) -> Selector.Field {
  return Selector.Field(name: name, alias: alias, arguments:[:], type: type)
}

func field(_ name: String, _ alias: String, _ arguments: [String:InputValue], _ type: OutputType) -> Selector.Field {
  return Selector.Field(name: name, alias: alias, arguments:arguments, type: type)
}

func inline(_ name:String, _ obj: OutputType.Object) -> Selector.TypeCondition {
  return Selector.TypeCondition(name: name, type: obj)
}

func fragment(_ name:String, _ src: OutputType.Object) -> Selector.Fragment {
  return Selector.Fragment(name: name, type: src)
}
