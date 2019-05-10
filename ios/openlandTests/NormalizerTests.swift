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

    func test_parse_String_fields() {
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
        let res = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: c))
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
  
  func test_parse_String_fields_from_float() {
    let type = obj(
          field("field1", "field1_alias", scalar("String")),
          field("field2", "field2_alias", notNull(scalar("String"))),
          field("field3", "field3_alias", scalar("String"))
      )
    let floatCase = """
{"field1_alias":1.0,"field2_alias":2.0}
"""
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
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
  
  func test_parse_String_fields_from_integers() {
    let type = obj(
      field("field1", "field1_alias", scalar("String")),
      field("field2", "field2_alias", notNull(scalar("String"))),
      field("field3", "field3_alias", scalar("String"))
    )
    let floatCase = """
{"field1_alias":1,"field2_alias":2}
"""
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
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
  
  func test_parse_String_fields_from_booleans() {
    let type = obj(
      field("field1", "field1_alias", scalar("String")),
      field("field2", "field2_alias", notNull(scalar("String"))),
      field("field3", "field3_alias", scalar("String"))
    )
    let floatCase = """
{"field1_alias":true,"field2_alias":false}
"""
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: floatCase))
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
  
  func test_parse_Boolean_fields() {
    let type = obj(
      field("field1", "field1_alias", scalar("Boolean")),
      field("field2", "field2_alias", notNull(scalar("Boolean"))),
      field("field3", "field3_alias", scalar("Boolean")),
      field("field4", "field4_alias", scalar("Boolean"))
    )
  
    let boolCase = """
{"field1_alias":true,"field2_alias":false,"field3_alias":null}
"""
    
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
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
  
  func test_parse_Int_fields() {
    let type = obj(
      field("field1", "field1_alias", scalar("Int")),
      field("field2", "field2_alias", notNull(scalar("Int"))),
      field("field3", "field3_alias", scalar("Int")),
      field("field4", "field4_alias", scalar("Int"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":2,"field3_alias":null}
"""
    
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
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
  
  func test_parse_ID_fields() {
    let type = obj(
      field("field1", "field1_alias", scalar("ID")),
      field("field2", "field2_alias", notNull(scalar("ID"))),
      field("field3", "field3_alias", scalar("ID")),
      field("field4", "field4_alias", scalar("ID"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":"2","field3_alias":null}
"""
    
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
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
  
  func test_parse_Date_fields() {
    let type = obj(
      field("field1", "field1_alias", scalar("Date")),
      field("field2", "field2_alias", notNull(scalar("Date"))),
      field("field3", "field3_alias", scalar("Date")),
      field("field4", "field4_alias", scalar("Date"))
    )
    
    let boolCase = """
{"field1_alias":1,"field2_alias":"2","field3_alias":null}
"""
    
    let normalized = normalizeData(id: "1", type: type, args: JSON(), data: JSON(parseJSON: boolCase))
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
}
