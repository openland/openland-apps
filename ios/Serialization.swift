//
//  Serialization.swift
//  openland
//
//  Created by Steve Kite on 5/13/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation
import SwiftyJSON

fileprivate func jsonToCompactString(src: JSON) -> String {
  do {
    return try NSString(data: src.rawData(), encoding: String.Encoding.utf8.rawValue) as! String
  } catch let error as NSError {
    print(error.localizedDescription)
    fatalError()
  }
}

fileprivate func serializeValue(value: RecordValue) -> JSON {
  if value is RecordValue.StringValue {
     return JSON((value as! RecordValue.StringValue).value)
  } else if value is RecordValue.NumberValue {
    return JSON((value as! RecordValue.NumberValue).value)
  } else if value is RecordValue.BooleanValue {
    return JSON((value as! RecordValue.BooleanValue).value)
  } else if value is RecordValue.NullValue {
    return JSON(NSNull())
  } else if value is RecordValue.ListValue {
    var res: [JSON] = []
    for i in (value as! RecordValue.ListValue).items {
      res.append(serializeValue(value: i))
    }
    return JSON(res)
  } else if value is RecordValue.ReferenceValue {
    return JSON(["key":(value as! RecordValue.ReferenceValue).key])
  }
  
  fatalError()
}

func serializeRecord(record: Record) -> String {
  var fields: [String: JSON] = [:]
  for f in record.fields {
    fields[f.key] = serializeValue(value: f.value)
  }
  return jsonToCompactString(src: JSON(fields))
}


fileprivate func parseValue(src: JSON) -> RecordValue {
  if src.null != nil {
    return RecordValue.NullValue()
  } else if src.type == Type.number {
    return RecordValue.NumberValue(value: src.doubleValue)
  } else if src.type == Type.bool {
    return RecordValue.BooleanValue(value: src.boolValue)
  } else if src.type == Type.string {
    return RecordValue.StringValue(value: src.stringValue)
  } else if src.type == Type.dictionary {
    return RecordValue.ReferenceValue(key: src["key"].string!)
  } else if src.type == Type.array {
    let arr = src.array!
    var res: [RecordValue] = []
    for i in arr {
      res.append(parseValue(src: i))
    }
    return RecordValue.ListValue(items: res)
  }
  
  fatalError()
}

func parseRecord(key: String, src: String) -> Record {
  let d = JSON(parseJSON: src)
  if d.type != Type.dictionary {
    fatalError("Broken database")
  }
  let dict = d.dictionary!
  var fields: [String: RecordValue] = [:]
  for k in dict {
    fields[k.key] = parseValue(src: k.value)
  }
  return Record(key: key, fields: fields)
}
