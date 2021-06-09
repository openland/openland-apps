//
//  SpaceXOperations.swift
//  openland
//
//  Created by Steve Korshakov on 6/9/21.
//  Copyright © 2021 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

protocol SpaceXOperations: AnyObject {
  func operationByName(_ name: String) -> OperationDefinition
}

fileprivate class ResolveContext {
  var raw: JSON
  var fragments: [String: FragmentDefinition]
  
  init(raw: JSON, fragments: [String: FragmentDefinition]) {
    self.raw = raw;
    self.fragments = fragments
  }
}

fileprivate func resolveInputType(data: JSON,  ctx: ResolveContext) -> InputValue {
  let type = data["type"].stringValue
  if (type == "string") {
    return stringValue(data["value"].stringValue)
  } else if (type == "int") {
    return intValue(data["value"].intValue)
  } else if (type == "float") {
    return floatValue(data["value"].doubleValue)
  } else if (type == "boolean") {
    return boolValue(data["value"].boolValue)
  } else if (type == "null") {
    return nullValue()
  } else if (type == "reference"){
    return refValue(data["name"].stringValue)
  } else if (type == "list") {
    var items: [InputValue] = []
    data["items"].arrayValue.forEach { data in
      items.append(resolveInputType(data: data, ctx: ctx))
    }
    return listValue(items)
  } else if (type == "object") {
    var fields: [String: InputValue] = [:]
    for (name,field):(String, JSON) in data["fields"] {
      fields[name] = resolveInputType(data: field, ctx: ctx)
    }
    return objectValue(fields)
  }
  
  fatalError("Invalid schema")
}

fileprivate func resolveOutputObject(data: JSON, ctx: ResolveContext) -> OutputType.Object {
  if (data["type"].stringValue != "object") {
    fatalError("Invalid schema")
  }
  
  var selectors: [Selector] = []
  data["selectors"].arrayValue.forEach { selector in
    selectors.append(resolveSelector(selector: selector, ctx: ctx))
  }
  return obj(selectors)
}

fileprivate func resolveOutputType(data: JSON, ctx: ResolveContext) -> OutputType {
  let type = data["type"].stringValue
  if (type == "object") {
    return resolveOutputObject(data: data, ctx: ctx)
  }
  if (type == "notNull") {
    return notNull(resolveOutputType(data: data["inner"], ctx: ctx))
  }
  if (type == "list") {
    return list(resolveOutputType(data: data["inner"], ctx: ctx))
  }
  if (type == "scalar") {
    return scalar(data["name"].stringValue)
  }
  fatalError("Invalid schema")
}

fileprivate func resolveSelector(selector: JSON, ctx: ResolveContext) -> Selector {
  let type = selector["type"].stringValue
  if (type == "field") {
    let name = selector["name"].stringValue
    let alias = selector["alias"].stringValue
    let output = resolveOutputType(data: selector["fieldType"], ctx: ctx)
    var arguments: [String:InputValue] = [:]
    for (n,v):(String, JSON) in selector["arguments"] {
      arguments[n] = resolveInputType(data: v, ctx: ctx)
    }
    return field(name, alias, arguments, output)
  } else if (type == "type-condition") {
    let name = selector["name"].stringValue
    let obj = resolveOutputObject(data: selector["fragmentType"], ctx: ctx)
    return inline(name, obj)
  } else if (type == "fragment") {
    let name = selector["name"].stringValue
    return fragment(name, getOrCreateFragment(fragment: ctx.raw["fragments"][name], ctx: ctx))
  }
  fatalError("Invalid schema")
}

fileprivate func getOrCreateFragment(fragment: JSON, ctx: ResolveContext) -> OutputType.Object {
  
  //
  // NOTE: GraphQL doesnt have cycles in fragments and therefore this method couldn't be called
  //       for the same fragment within same call stack
  //
  
  // Check if already exist
  let name = fragment["name"].stringValue
  let existing = ctx.fragments[name]
  if (existing != nil ){
    return existing!.selector
  }
  
  // Create new
  print("Fragment: " + name)
  let selector = resolveOutputObject(data: fragment["selector"], ctx: ctx)
  ctx.fragments[name] = FragmentDefinition(name, selector)
  return selector
}

class SpaceXOperationDescriptor: SpaceXOperations {
  
  var fragments: [String: FragmentDefinition]
  var operations: [String: OperationDefinition] = [:]
  
  init(raw: JSON) {
    
    let ctx = ResolveContext(raw: raw, fragments: [:])
    
    // Resolve fragments
    for (_,fragment):(String, JSON) in raw["fragments"] {
      let _ = getOrCreateFragment(fragment: fragment, ctx: ctx)
    }
    
    // Resolve operations
    for (_,operation):(String, JSON) in raw["operations"] {
      let name = operation["name"].stringValue;
      let kind = operation["kind"].stringValue;
      let kindParsed: OperationKind
      if (kind == "query") {
        kindParsed = .query
      } else if (kind == "mutation") {
        kindParsed = .mutation
      } else if (kind == "subscription") {
        kindParsed = .subscription
      } else {
        fatalError("Invalid schema")
      }
      let body = operation["body"].stringValue;
      let selector = resolveOutputObject(data: operation["selector"], ctx: ctx)
      self.operations[name] = OperationDefinition(name, kindParsed, body, selector)
    }

    // Save fragments
    self.fragments = ctx.fragments
  }
  
  func operationByName(_ name: String) -> OperationDefinition {
    let op = self.operations[name]
    if (op == nil) {
      fatalError("Unknown operation " + name)
    }
    return op!
  }
}
