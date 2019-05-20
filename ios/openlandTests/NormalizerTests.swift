//
//  NormalizerCase.swift
//  openlandTests
//
//  Created by Steve Kite on 5/9/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import XCTest
import SwiftyJSON
@testable import openland

class NormalizerTests: XCTestCase {

    func test_parse_String_fields() throws {
      let type = obj(
        field("field1", "field1_alias", scalar("String")),
        field("field2", "field2_alias", notNull(scalar("String"))),
        field("field3", "field3_alias", scalar("String"))
      )
      let cases = [
"""
{"field1_alias":"1","field2_alias":"2","field3_alias":null}
""",
"""
{"field1_alias":"1","field2_alias":"2"}
"""
      ]
      
      for c in cases {
        let res = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: c))
        XCTAssertEqual(1, res.count)
        XCTAssert(res["1"] != nil)
        
        let nr = res["1"]!
        XCTAssertEqual(3, nr.fields.count)
        XCTAssert(nr.fields["field1"] != nil)
        XCTAssert(nr.fields["field2"] != nil)
        XCTAssert(nr.fields["field3"] != nil)
        
        XCTAssertEqual(RecordValue.StringValue(value: "1"), nr.fields["field1"])
        XCTAssertEqual(RecordValue.StringValue(value: "2"), nr.fields["field2"])
        XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
      }
    }
  
  func test_parse_String_fields_from_float() throws {
    let type = obj(
          field("field1", "field1_alias", scalar("String")),
          field("field2", "field2_alias", notNull(scalar("String"))),
          field("field3", "field3_alias", scalar("String"))
      )
    let floatCase = """
{"field1_alias":1.0,"field2_alias":2.0}
"""
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(3, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    
    // TODO: Remove?
    XCTAssertEqual(RecordValue.StringValue(value: "1"), nr.fields["field1"])
    XCTAssertEqual(RecordValue.StringValue(value: "2"), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
  }
  
  func test_parse_String_fields_from_integers() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("String")),
      field("field2", "field2_alias", notNull(scalar("String"))),
      field("field3", "field3_alias", scalar("String"))
    )
    let floatCase = """
{"field1_alias":1,"field2_alias":2}
"""
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(3, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    
    XCTAssertEqual(RecordValue.StringValue(value: "1"), nr.fields["field1"])
    XCTAssertEqual(RecordValue.StringValue(value: "2"), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
  }
  
  func test_parse_String_fields_from_booleans() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("String")),
      field("field2", "field2_alias", notNull(scalar("String"))),
      field("field3", "field3_alias", scalar("String"))
    )
    let floatCase = """
{"field1_alias":true,"field2_alias":false}
"""
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(3, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    
    XCTAssertEqual(RecordValue.StringValue(value: "true"), nr.fields["field1"])
    XCTAssertEqual(RecordValue.StringValue(value: "false"), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
  }
  
  func test_parse_Boolean_fields() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("Boolean")),
      field("field2", "field2_alias", notNull(scalar("Boolean"))),
      field("field3", "field3_alias", scalar("Boolean")),
      field("field4", "field4_alias", scalar("Boolean"))
    )
  
    let boolCase = """
{"field1_alias":true,"field2_alias":false,"field3_alias":null}
"""
    
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(4, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    XCTAssert(nr.fields["field4"] != nil)
    
    XCTAssertEqual(RecordValue.BooleanValue(value: true), nr.fields["field1"])
    XCTAssertEqual(RecordValue.BooleanValue(value: false), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field4"])
  }
  
  func test_parse_Int_fields() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("Int")),
      field("field2", "field2_alias", notNull(scalar("Int"))),
      field("field3", "field3_alias", scalar("Int")),
      field("field4", "field4_alias", scalar("Int"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":2,"field3_alias":null}
"""
    
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(4, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    XCTAssert(nr.fields["field4"] != nil)
    
    XCTAssertEqual(RecordValue.NumberValue(value: 1.0), nr.fields["field1"])
    XCTAssertEqual(RecordValue.NumberValue(value: 2.0), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field4"])
  }
  
  func test_parse_ID_fields() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("ID")),
      field("field2", "field2_alias", notNull(scalar("ID"))),
      field("field3", "field3_alias", scalar("ID")),
      field("field4", "field4_alias", scalar("ID"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":"2","field3_alias":null}
"""
    
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(4, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    XCTAssert(nr.fields["field4"] != nil)
    
    XCTAssertEqual(RecordValue.StringValue(value: "1"), nr.fields["field1"])
    XCTAssertEqual(RecordValue.StringValue(value: "2"), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field4"])
  }
  
  func test_parse_Date_fields() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("Date")),
      field("field2", "field2_alias", notNull(scalar("Date"))),
      field("field3", "field3_alias", scalar("Date")),
      field("field4", "field4_alias", scalar("Date"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":"2","field3_alias":null}
"""
    
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
    XCTAssertEqual(1, normalized.count)
    XCTAssert(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(4, nr.fields.count)
    XCTAssert(nr.fields["field1"] != nil)
    XCTAssert(nr.fields["field2"] != nil)
    XCTAssert(nr.fields["field3"] != nil)
    XCTAssert(nr.fields["field4"] != nil)
    
    XCTAssertEqual(RecordValue.StringValue(value: "1"), nr.fields["field1"])
    XCTAssertEqual(RecordValue.StringValue(value: "2"), nr.fields["field2"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field3"])
    XCTAssertEqual(RecordValue.NullValue(), nr.fields["field4"])
  }
  
  func test_crash_on_invalid_scalar_name() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("DateTime")),
      field("field2", "field2_alias", notNull(scalar("DateTime"))),
      field("field3", "field3_alias", scalar("DateTime")),
      field("field4", "field4_alias", scalar("DateTime"))
    )
    let cs = """
{"field1_alias":1,"field2_alias":"2","field3_alias":null}
"""
    XCTAssertThrowsError(
      try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: cs))
    ) { error in
      XCTAssertTrue(error is InvalidDataError)
    }
  }
  
  func test_crash_on_missing_nonnullable_value() throws {
    let type = obj(
      field("field1", "field1_alias", scalar("String")),
      field("field2", "field2_alias", notNull(scalar("String"))),
      field("field3", "field3_alias", scalar("String")),
      field("field4", "field4_alias", scalar("String"))
    )
    let cs = """
{"field1_alias":"1","field2_alias":null,"field3_alias":null}
"""
    XCTAssertThrowsError(
      try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: cs))
    ) { error in
      XCTAssertTrue(error is InvalidDataError)
    }
  }
  
  func test_detect_parse_fragments() throws {
    let type = obj(
      field("id", "id", scalar("ID")),
      field("value", "value", scalar("String")),
      fragment("SomeValue", obj(
        field("value2", "value2", scalar("String"))
      ))
    )
    let cases = [
      """
{"id":"1","value":null,"value2":"2"}
""",
      """
{"id":1,"value":null,"value2":"2"}
""",
      """
{"__typename": "SomeType", "id":1,"value":null,"value2":"2"}
""",  // Invalid __typename MUST NOT crash parsers
      """
{"__typename": "SomeValue", "id":1,"value":null,"value2":"2"}
"""
    ]
    
    for c in cases {
      let normalized = try normalizeData(id: "somer-parent-id", type: type, args: JSON(), data: JSON(parseJSON: c))
      XCTAssertEqual(1, normalized.count)
      XCTAssertTrue(normalized["1"] != nil)
      XCTAssertEqual(3, normalized["1"]!.fields.count)
    }
  }
  
  func test_parse_inline_fragments() throws {
    let type = obj(
      field("id", "id", scalar("ID")),
      field("value", "value", scalar("String")),
      inline("SomeType", obj(
        field("value2", "value2", scalar("String"))
      ))
    )
    let cases = [
      """
{"__typename":"SomeType","id":"1","value":null,"value2":"2"}
""",
      """
{"__typename":"SomeType","id":1,"value":null,"value2":"2"}
"""
      ]
    let negativeCase = [
      """
{"__typename":"SomeType2","id":"1","value":null,"value2":"2"}
""",
      """
{"__typename":"SomeType2","id":1,"value":null,"value2":"2"}
"""
    ]
    
    for cs in cases {
      let normalized = try normalizeData(id: "somer-parent-id", type: type, args: JSON(), data: JSON(parseJSON: cs))
      XCTAssertEqual(1, normalized.count)
      XCTAssertTrue(normalized["1"] != nil)
      XCTAssertEqual(3, normalized["1"]!.fields.count)
    }
    
    for cs in negativeCase {
      let normalized = try normalizeData(id: "somer-parent-id", type: type, args: JSON(), data: JSON(parseJSON: cs))
      XCTAssertEqual(1, normalized.count)
      XCTAssertTrue(normalized["1"] != nil)
      XCTAssertEqual(2, normalized["1"]!.fields.count)
    }
  }
  
  func test_parse_simple_lists() throws {
    let type = obj(
      field("list", "list", list(scalar("String")))
    )
    let c = """
{"list":["1",null,"3"]}
"""

    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: c))
    XCTAssertEqual(1, normalized.count)
    XCTAssertTrue(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(1, nr.fields.count)
    XCTAssertTrue(nr.fields["list"] != nil)
    XCTAssertTrue(nr.fields["list"] is RecordValue.ListValue)
    
    let list = nr.fields["list"] as! RecordValue.ListValue
    XCTAssertEqual(3, list.items.count)
    XCTAssertEqual(RecordValue.StringValue(value: "1"), list.items[0])
    XCTAssertEqual(RecordValue.NullValue(), list.items[1])
    XCTAssertEqual(RecordValue.StringValue(value: "3"), list.items[2])
  }
  
  func test_parse_lists_of_lists() throws {
    let type = obj(
      field("list", "list", list(list(scalar("String"))))
    )
    let cs = """
{"list":[["1",null,"3"]]}
"""
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: cs))
    XCTAssertEqual(1, normalized.count)
    XCTAssertTrue(normalized["1"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(1, nr.fields.count)
    XCTAssertTrue(nr.fields["list"] != nil)
    XCTAssertTrue(nr.fields["list"] is RecordValue.ListValue)
    
    let list = nr.fields["list"] as! RecordValue.ListValue
    XCTAssertEqual(1, list.items.count)
    
    let list2 = list.items[0] as! RecordValue.ListValue
    XCTAssertEqual(3, list2.items.count)
    XCTAssertEqual(RecordValue.StringValue(value: "1"), list2.items[0])
    XCTAssertEqual(RecordValue.NullValue(), list2.items[1])
    XCTAssertEqual(RecordValue.StringValue(value: "3"), list2.items[2])
  }
  
  func test_parse_lists_of_objects() throws {
    let type = obj(
      field("list", "list",
            list(obj(
              field("value", "value", scalar("String"))
            ))
      )
    )
    let cs = """
{"list":[{"value":"1"},null,{"value":"3"}]}
"""
    
    let normalized = try normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: cs))
    XCTAssertEqual(3, normalized.count)
    XCTAssertTrue(normalized["1"] != nil)
    XCTAssertTrue(normalized["1.list.0"] != nil)
    XCTAssertTrue(normalized["1.list.1"] == nil)
    XCTAssertTrue(normalized["1.list.2"] != nil)
    
    let nr = normalized["1"]!
    XCTAssertEqual(1, nr.fields.count)
    XCTAssertTrue(nr.fields["list"] != nil)
    XCTAssertTrue(nr.fields["list"] is RecordValue.ListValue)
    
    let list = nr.fields["list"] as! RecordValue.ListValue
    XCTAssertEqual(3, list.items.count)
    XCTAssertEqual(RecordValue.ReferenceValue(key: "1.list.0"), list.items[0])
    XCTAssertEqual(RecordValue.NullValue(), list.items[1])
    XCTAssertEqual(RecordValue.ReferenceValue(key: "1.list.2"), list.items[2])
  }
}
