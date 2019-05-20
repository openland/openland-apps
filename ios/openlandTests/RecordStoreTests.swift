//
//  RecordStoreTest.swift
//  openlandTests
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import XCTest
import SwiftyJSON
@testable import openland

class RecordStoreTests: XCTestCase {
  func testRecordMerge() {
    let store = RecordStore()
    let record1 = Record(key: "key1", fields: [
      "field1": RecordValue.StringValue(value: "value1"),
      "field2": RecordValue.BooleanValue(value: true),
      "field3": RecordValue.BooleanValue(value: false),
      "field4": RecordValue.StringValue(value: "value3"),
      "field5": RecordValue.NumberValue(value: 0.0),
      "field6": RecordValue.NullValue()
    ])
    let record2 = Record(key: "key1", fields: [
      "field1": RecordValue.StringValue(value: "value2")
    ])
    let record3 = Record(key: "key1", fields: [
      "field1": RecordValue.NullValue()
    ])
    
    // Initial merge
    store.loaded(record: Record(key: "key1", fields: [:]))
    var changes = store.merge(record: record1)
    XCTAssertEqual(1, changes.count)
    XCTAssertTrue(Set<String>(["field1", "field2", "field3", "field4", "field5", "field6"]) == changes["key1"]!.fields)
    
    // Double merge
    changes = store.merge(record: record1)
    XCTAssertEqual(0, changes.count)
    
    // Update string
    changes = store.merge(record: record2)
    XCTAssertEqual(1, changes.count)
    XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields)
    
    // Update string to null
    changes = store.merge(record: record3)
    XCTAssertEqual(1, changes.count)
    XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields)
    
    // Update null to string
    changes = store.merge(record: record1)
    XCTAssertEqual(1, changes.count)
    XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields)
  }
}
