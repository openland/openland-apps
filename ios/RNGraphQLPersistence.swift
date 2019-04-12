import SQLite
import Apollo

public enum SQLiteNormalizedCacheError: Error {
  case invalidRecordEncoding(record: String)
  case invalidRecordShape(object: Any)
  case invalidRecordValue(value: Any)
}

func equals(_ lhs: Any, _ rhs: Any) -> Bool {
  if let lhs = lhs as? Reference, let rhs = rhs as? Reference {
    return lhs == rhs
  }
  
  let lhs = lhs as AnyObject, rhs = rhs as AnyObject
  return lhs.isEqual(rhs)
}

struct RNGraphQLPersistenceRecord {
  let key: String
  let value: String
  init(key: String, value: String) {
    self.key = key
    self.value = value
  }
}

protocol RNGraphQLPersistenceEngine {
  func persist(key: String, value: String) throws
  func load(keys: [String]) throws -> [RNGraphQLPersistenceRecord]
  func clearEngine() throws
}

extension RecordSet {
  @discardableResult public mutating func changedKeys(records: RecordSet) -> Dictionary<CacheKey, Record> {
    var res: Dictionary<CacheKey, Record> = [:]
    
    for (_, record) in records.storage {
      for (k,r) in changedKeys(record: record) {
        res[k] = r
      }
    }
    
    return res
  }
  
  @discardableResult public mutating func changedKeys(record: Record) -> Dictionary<CacheKey, Record> {
    if var oldRecord = storage[record.key] {
      var res: Dictionary<CacheKey, Record> = [:]
      
      for (key, value) in record.fields {
        if let oldValue = oldRecord.fields[key], equals(oldValue, value) {
          continue
        }
        res[[record.key, key].joined(separator: ".")] = record
      }
      return res
    } else {
      var res: Dictionary<CacheKey, Record> = [:]
      for k in record.fields.keys {
        res[[record.key, k].joined(separator: ".")] = record
      }
      return res
      // return Set(record.fields.keys.map { [record.key, $0].joined(separator: ".") })
    }
  }
}

final class RNGraphqlSQLSQLCache: NormalizedCache {
  
  private let engine: RNGraphQLPersistenceEngine
  
  init(engine: RNGraphQLPersistenceEngine) throws {
    self.engine = engine
  }
  
  func merge(records: RecordSet) -> Promise<Set<CacheKey>> {
    return Promise { try mergeRecords(records: records) }
  }
  
  func loadRecords(forKeys keys: [CacheKey]) -> Promise<[Record?]> {
    return Promise {
      let records = try selectRecords(forKeys: keys)
      let recordsOrNil: [Record?] = keys.map { key in
        if let recordIndex = records.index(where: { $0.key == key }) {
          return records[recordIndex]
        }
        return nil
      }
      return recordsOrNil
    }
  }
  
  func clear() -> Promise<Void> {
    return Promise {
      return try clearRecords()
    }
  }

  private func mergeRecords(records: RecordSet) throws -> Set<CacheKey> {
    var recordSet = RecordSet(records: try selectRecords(forKeys: records.keys))
    let changedFieldKeys = recordSet.changedKeys(records: records)
    recordSet.merge(records: records)
    let changedRecordKeys = changedFieldKeys.map { $0.value.key }
    for recordKey in Set(changedRecordKeys) {
      if let recordFields = recordSet[recordKey]?.fields {
        let recordData = try SQLiteSerialization.serialize(fields: recordFields)
        guard let recordString = String(data: recordData, encoding: .utf8) else {
          assertionFailure("Serialization should yield UTF-8 data")
          continue
        }
        try engine.persist(key: recordKey, value: recordString)
      }
    }
    return Set(changedFieldKeys.keys)
  }
  
  private func selectRecords(forKeys keys: [CacheKey]) throws -> [Record] {
    return try engine.load(keys: keys).map { try parse(row: $0) }
  }
  
  private func clearRecords() throws {
    try engine.clearEngine()
  }
  
  private func parse(row: RNGraphQLPersistenceRecord) throws -> Record {
    guard let recordData = row.value.data(using: .utf8) else {
      throw SQLiteNormalizedCacheError.invalidRecordEncoding(record: row.value)
    }
    
    let fields = try SQLiteSerialization.deserialize(data: recordData)
    return Record(key: row.key, fields)
  }
}

private let serializedReferenceKey = "$reference"

private final class SQLiteSerialization {
  static func serialize(fields: Record.Fields) throws -> Data {
    var objectToSerialize = JSONObject()
    for (key, value) in fields {
      objectToSerialize[key] = try serialize(fieldValue: value)
    }
    return try JSONSerialization.data(withJSONObject: objectToSerialize, options: [])
  }
  
  private static func serialize(fieldValue: Record.Value) throws -> JSONValue {
    switch fieldValue {
    case let reference as Reference:
      return [serializedReferenceKey: reference.key]
    case let array as [Record.Value]:
      return try array.map { try serialize(fieldValue: $0) }
    default:
      return fieldValue
    }
  }
  
  static func deserialize(data: Data) throws -> Record.Fields {
    let object = try JSONSerialization.jsonObject(with: data, options: [])
    guard let jsonObject = object as? JSONObject else {
      throw SQLiteNormalizedCacheError.invalidRecordShape(object: object)
    }
    var fields = Record.Fields()
    for (key, value) in jsonObject {
      fields[key] = try deserialize(fieldJSONValue: value)
    }
    return fields
  }
  
  private static func deserialize(fieldJSONValue: JSONValue) throws -> Record.Value {
    switch fieldJSONValue {
    case let dictionary as JSONObject:
      guard let reference = dictionary[serializedReferenceKey] as? String else {
        throw SQLiteNormalizedCacheError.invalidRecordValue(value: fieldJSONValue)
      }
      return Reference(key: reference)
    case let array as [JSONValue]:
      return try array.map { try deserialize(fieldJSONValue: $0) }
    default:
      return fieldJSONValue
    }
  }
}
