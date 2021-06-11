//
//  SpaceXOperations.swift
//  openland
//
//  Created by Steve Korshakov on 6/9/21.
//  Copyright © 2021 Openland. All rights reserved.
//

import Foundation

protocol SpaceXOperations: AnyObject {
  func operationByName(_ name: String) -> OperationDefinition
}

fileprivate class ResolveContext {
  var raw: Schema
  var fragments: [String: FragmentDefinition]
  
  init(raw: Schema, fragments: [String: FragmentDefinition]) {
    self.raw = raw;
    self.fragments = fragments
  }
}

fileprivate func resolveInputType(data: SchemaInput,  ctx: ResolveContext) -> InputValue {
  if (data.type == "string") {
    return stringValue(data.str!)
  } else if (data.type == "int") {
    return intValue(data.int!)
  } else if (data.type == "float") {
    return floatValue(data.float!)
  } else if (data.type == "boolean") {
    return boolValue(data.bool!)
  } else if (data.type == "null") {
    return nullValue()
  } else if (data.type == "reference"){
    return refValue(data.name!)
  } else if (data.type == "list") {
    var items: [InputValue] = []
    data.items!.forEach { data in
      items.append(resolveInputType(data: data, ctx: ctx))
    }
    return listValue(items)
  } else if (data.type == "object") {
    var fields: [String: InputValue] = [:]
    data.fields!.forEach { (key: String, value: SchemaInput) in
      fields[key] = resolveInputType(data: value, ctx: ctx)
    }
    return objectValue(fields)
  }
  
  fatalError("Invalid schema")
}

fileprivate func resolveOutputObject(data: SchemaOutput, ctx: ResolveContext) -> OutputType.Object {
  if (data.type != "object") {
    fatalError("Invalid schema")
  }
  
  var selectors: [Selector] = []
  data.selectors?.forEach({ selector in
    selectors.append(resolveSelector(selector: selector, ctx: ctx))
  })
  return obj(selectors)
}

fileprivate func resolveOutputType(data: SchemaOutput, ctx: ResolveContext) -> OutputType {
  if (data.type == "object") {
    return resolveOutputObject(data: data, ctx: ctx)
  }
  if (data.type == "notNull") {
    return notNull(resolveOutputType(data: data.inner!, ctx: ctx))
  }
  if (data.type == "list") {
    return list(resolveOutputType(data: data.inner!, ctx: ctx))
  }
  if (data.type == "scalar") {
    return scalar(data.name!)
  }
  fatalError("Invalid schema")
}

fileprivate func resolveSelector(selector: SchemaSelector, ctx: ResolveContext) -> Selector {
  if (selector.type == "field") {
    let name = selector.name
    let alias = selector.alias!
    let output = resolveOutputType(data: selector.fieldType!, ctx: ctx)
    var arguments: [String:InputValue] = [:]
    selector.arguments?.forEach({ (key: String, value: SchemaInput) in
      arguments[key] = resolveInputType(data: value, ctx: ctx)
    })
    return field(name, alias, arguments, output)
  } else if (selector.type == "type-condition") {
    let name = selector.name
    let obj = resolveOutputObject(data: selector.fragmentType!, ctx: ctx)
    return inline(name, obj)
  } else if (selector.type == "fragment") {
    let name = selector.name
    return fragment(name, getOrCreateFragment(fragment: ctx.raw.fragments[name]!, ctx: ctx))
  }
  fatalError("Invalid schema")
}

fileprivate func getOrCreateFragment(fragment: SchemaFragment, ctx: ResolveContext) -> OutputType.Object {
  
  //
  // NOTE: GraphQL doesnt have cycles in fragments and therefore this method couldn't be called
  //       for the same fragment within same call stack
  //
  
  // Check if already exist
  let name = fragment.name
  let existing = ctx.fragments[name]
  if (existing != nil ){
    return existing!.selector
  }
  
  // Create new
  print("Fragment: " + name)
  let selector = resolveOutputObject(data: fragment.selector, ctx: ctx)
  ctx.fragments[name] = FragmentDefinition(name, selector)
  return selector
}

fileprivate struct SchemaFragment: Codable {
  var name: String
  var selector: SchemaOutput
}

fileprivate struct SchemaOperation: Codable {
  var name: String
  var body: String
  var kind: String
  var selector: SchemaOutput
}

fileprivate class SchemaOutput: Codable {
  var type: String
  var name: String?
  var inner: SchemaOutput?
  var selectors: [SchemaSelector]?
}

fileprivate class SchemaInput: Codable {
  var type: String
  var str: String?
  var bool: Bool?
  var int: Int?
  var float: Double?
  var name: String?
  var items: [SchemaInput]?
  var fields: [String: SchemaInput]?
}

fileprivate class SchemaSelector: Codable {
  var type: String
  var name: String
  var alias: String?
  var fieldType: SchemaOutput?
  var fragmentType: SchemaOutput?
  var arguments: [String: SchemaInput]?
}

fileprivate class Schema: Codable {
  var fragments: [String:SchemaFragment]
  var operations: [String: SchemaOperation]
}

class SpaceXOperationDescriptor: SpaceXOperations {
  
  var fragments: [String: FragmentDefinition]
  var operations: [String: OperationDefinition] = [:]
  
  init(raw: String) {
    let decoded = try! JSONDecoder().decode(Schema.self, from: raw.data(using: .utf8)!)
    let ctx = ResolveContext(raw: decoded, fragments: [:])
    
    // Resolve fragments
    decoded.fragments.forEach { (key: String, value: SchemaFragment) in
      let _ = getOrCreateFragment(fragment: value, ctx: ctx)
    }
    
    // Resolve operations
    for (key, value) in decoded.operations {
      let kindParsed: OperationKind
      if (value.kind == "query") {
        kindParsed = .query
      } else if (value.kind == "mutation") {
        kindParsed = .mutation
      } else if (value.kind == "subscription") {
        kindParsed = .subscription
      } else {
        fatalError("Invalid schema")
      }
      let selector = resolveOutputObject(data: value.selector, ctx: ctx)
      self.operations[key] = OperationDefinition(value.name, kindParsed, value.body, selector)
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
