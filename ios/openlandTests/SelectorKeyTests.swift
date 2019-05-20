//
//  SelectorKeyTests.swift
//  openlandTests
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import XCTest
import SwiftyJSON
@testable import openland

class SelectorKeyTests: XCTestCase {
  func test_return_name_for_empty_arguments() {
    let selector1 = selectorKey(name: "name", arguments: [:], variables: JSON())
    XCTAssertEqual("name", selector1)
    let selector2 = selectorKey(name: "nameonetwothre12", arguments: [:], variables: JSON())
    XCTAssertEqual("nameonetwothre12", selector2)
  }
  func test_format_constants_correctly() {
    let selector1 = selectorKey(name: "field", arguments: ["var1": InputValue.IntValue(value: 1)], variables: JSON())
    XCTAssertEqual("field(var1:1)", selector1)
    let selector2 = selectorKey(name: "field", arguments: ["var1": InputValue.FloatValue(value: 1.0)], variables: JSON())
    XCTAssertEqual("field(var1:1.0)", selector2)
    let selector3 = selectorKey(name: "field", arguments: ["var1": InputValue.BooleanValue(value: true)], variables: JSON())
    XCTAssertEqual("field(var1:true)", selector3)
    let selector4 = selectorKey(name: "field", arguments: ["var1": InputValue.BooleanValue(value: false)], variables: JSON())
    XCTAssertEqual("field(var1:false)", selector4)
    let selector5 = selectorKey(name: "field", arguments: ["var1": InputValue.StringValue(value: "arg")], variables: JSON())
    XCTAssertEqual("field(var1:\"arg\")", selector5)
    let selector6 = selectorKey(name: "field", arguments: ["var1": InputValue.NullValue()], variables: JSON())
    XCTAssertEqual("field(var1:null)", selector6)
  }
  func test_sort_arguments_in_right_order() {
    let selector1 = selectorKey(name: "field", arguments: [
      "c": InputValue.IntValue(value: 1),
      "a": InputValue.IntValue(value: 1),
      "b": InputValue.IntValue(value: 1)
      ], variables: JSON())
    XCTAssertEqual("field(a:1,b:1,c:1)", selector1)
  }
  
  func test_format_lists_correctly() {
    let selector1 = selectorKey(name: "field",
                                arguments:["var1":
                                  InputValue.ListValue(items: [
                                      InputValue.IntValue(value: 1),
                                      InputValue.IntValue(value: 2),
                                      InputValue.IntValue(value: 3)
                                    ]
                                  )],
                                variables: JSON())
    XCTAssertEqual("field(var1:[1,2,3])", selector1)
    let selector2 = selectorKey(name: "field",
                                arguments:["var1":
                                  InputValue.ListValue(items: [
                                    InputValue.StringValue(value: "1"),
                                    InputValue.StringValue(value: "2"),
                                    InputValue.StringValue(value: "3")
                                    ]
                                  )],
                                variables: JSON())
    XCTAssertEqual("field(var1:[\"1\",\"2\",\"3\"])", selector2)
    let selector3 = selectorKey(name: "field", arguments: ["var1": InputValue.ReferenceValue(value: "var1")], variables: JSON([ "var1": ["1","2","3"]]))
    XCTAssertEqual("field(var1:[\"1\",\"2\",\"3\"])", selector3)
  }
  
  func test_format_objects_correctly() {
    let selector1 = selectorKey(name: "field", arguments: [
      "var1": InputValue.ObjectValue(fields: [
        "a": InputValue.IntValue(value: 1),
        "c": InputValue.IntValue(value: 3),
        "b": InputValue.IntValue(value: 2)
        ])
      ], variables: JSON())
    XCTAssertEqual("field(var1:{a:1,b:2,c:3})", selector1)
    
    let selector2 = selectorKey(name: "field",
                                arguments: ["var1": InputValue.ReferenceValue(value: "arg1")],
                                variables: JSON(["arg1": ["a": 1, "b": 2, "c": 3]]))
    XCTAssertEqual("field(var1:{a:1,b:2,c:3})", selector2)
    
    let selector3 = selectorKey(name: "field",
                                arguments: ["var1": InputValue.ReferenceValue(value: "arg1")],
                                variables: JSON(["arg1": ["a": 1, "b": 2, "c": NSNull()]]))
    XCTAssertEqual("field(var1:{a:1,b:2,c:null})", selector3)
  }
  
  func test_ignore_not_specified_arguments() {
    let selector2 = selectorKey(name: "field", arguments: ["var1": InputValue.ReferenceValue(value: "var1")], variables: JSON())
    XCTAssertEqual("field", selector2)
    let selector3 = selectorKey(name: "field", arguments: ["var1": InputValue.ObjectValue(fields: [
      "var2": InputValue.ReferenceValue(value: "var1")
      ])], variables: JSON())
    XCTAssertEqual("field(var1:{})", selector3)
  }
}
