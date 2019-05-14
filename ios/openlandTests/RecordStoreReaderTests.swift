//
//  RecordStoreReaderTest.swift
//  openlandTests
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import XCTest
import SwiftyJSON
@testable import openland

class RecordStoreReaderTests: XCTestCase {
  func test_read_simple_scalars() {
    let type = obj(
      field("field1", "alias1", notNull(scalar("String"))),
      field("field2", "alias2", scalar("Int")),
      field("field3", "alias3", scalar("Float")),
      field("field4", "alias4", scalar("Float")),
      field("field5", "alias5", scalar("ID")),
      field("field6", "alias6", scalar("Date")),
      field("field7", "alias7", scalar("Boolean")),
      field("field8", "alias8", scalar("Boolean"))
    )
    let store = RecordStore()
    store.loaded(record: Record(key: "1", fields: [
      "field1": RecordValue.StringValue(value: "value1"),
      "field2": RecordValue.NumberValue(value: 1.0),
      "field3": RecordValue.NullValue(),
      "field4": RecordValue.NumberValue(value: 1.0),
      "field5": RecordValue.StringValue(value: "1"),
      "field6": RecordValue.StringValue(value: "123123"),
      "field7": RecordValue.BooleanValue(value: true),
      "field8": RecordValue.BooleanValue(value: false)
    ]))
    
    let res = readFromStore(cacheKey: "1", store: store, type: type, variables: JSON())
    guard case .success(let data) = res else {
      XCTFail("Expected .success, got \(res)")
      return
    }
    XCTAssertTrue(data.exists())
    XCTAssertTrue(data.type == Type.dictionary)
    let dict = data.dictionaryValue
    XCTAssertEqual(8, dict.count)
    
    XCTAssertEqual(Type.string, dict["alias1"]!.type)
    XCTAssertEqual("value1", dict["alias1"]!.stringValue)
    
    XCTAssertEqual(Type.number, dict["alias2"]!.type)
    XCTAssertEqual(1.0, dict["alias2"]!.doubleValue)
    
    XCTAssertEqual(Type.null, dict["alias3"]!.type)
    XCTAssertEqual(NSNull(), dict["alias3"]!.null!)
    
    XCTAssertEqual(Type.number, dict["alias4"]!.type)
    XCTAssertEqual(1.0, dict["alias4"]!.doubleValue)
    
    XCTAssertEqual(Type.string, dict["alias5"]!.type)
    XCTAssertEqual("1", dict["alias5"]!.stringValue)
    
    XCTAssertEqual(Type.string, dict["alias6"]!.type)
    XCTAssertEqual("123123", dict["alias6"]!.stringValue)
    
    XCTAssertEqual(Type.bool, dict["alias7"]!.type)
    XCTAssertEqual(true, dict["alias7"]!.boolValue)
    
    XCTAssertEqual(Type.bool, dict["alias8"]!.type)
    XCTAssertEqual(false, dict["alias8"]!.boolValue)
  }
}
