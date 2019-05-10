//
//  SpaceX.swift
//  openland
//
//  Created by Steve Kite on 5/9/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

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
    init(name: String, alias: String, type: OutputType) {
      self.name = name
      self.alias = alias
      self.type = type
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

class SRecord {
  let key: String
  let fields: [String:RecordValue]
  init(key: String, fields: [String:RecordValue]) {
    self.key = key
    self.fields = fields
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

func field(_ name: String, _ alias: String, _ type: OutputType) -> Selector.Field {
  return Selector.Field(name: name, alias: alias, type: type)
}

func inline(_ name:String, _ obj: OutputType.Object) -> Selector.TypeCondition {
  return Selector.TypeCondition(name: name, type: obj)
}

func fragment(_ name:String, _ src: OutputType.Object) -> Selector.Fragment {
  return Selector.Fragment(name: name, type: src)
}
