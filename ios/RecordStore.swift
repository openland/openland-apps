//
//  SRecordStore.swift
//  openland
//
//  Created by Steve Kite on 5/10/19.
//  Copyright © 2019 Openland. All rights reserved.
//

import Foundation

class ChangedRecord {
  let key: String
  let fields: Set<String>
  init(key: String, fields: Set<String>) {
    self.key = key
    self.fields = fields
  }
}

class RecordStore {
  private var inMemory: [String: Record] = [:]
  
  //
  // Loading
  //
  
  func isInMemory(key: String) -> Bool {
    return inMemory[key] != nil
  }
  
  func loaded(recordSet: RecordSet) {
    for r in recordSet {
      loaded(record: r.value)
    }
  }
  
  func loaded(record: Record) {
    if self.inMemory[record.key] != nil {
      fatalError("Record " + record.key + " already loaded")
    }
    self.inMemory[record.key] = record
  }
  
  //
  // Read
  //
  
  func read(key: String) -> Record {
    let res = self.inMemory[key]
    if res == nil {
      let rs = Record(key: key, fields: [:])
      self.inMemory[key] = rs
      return rs
      // fatalError("Record " + key + " is not loaded yet")
    } else {
      return res!
    }
  }
  
  //
  // Merging
  //
  
  func merge(recordSet: RecordSet) -> [String: ChangedRecord] {
    let res = SharedDictionary<String, ChangedRecord>()
    for k in recordSet {
      merge(record: k.value, changed: res)
    }
    return res.dict
  }
  
  func merge(record: Record) -> [String: ChangedRecord] {
    let res = SharedDictionary<String, ChangedRecord>()
    merge(record: record, changed: res)
    return res.dict
  }
  
  private func merge(record: Record, changed: SharedDictionary<String, ChangedRecord>) {
    var fields: [String: RecordValue] = [:]
    var changedFields: Set<String> = Set()
    let ex = inMemory[record.key]
    if ex != nil {
      for f in ex!.fields {
        fields[f.key] = f.value
      }
    }
    for f in record.fields {
      let exf = ex?.fields[f.key]
      if exf == nil || exf != f.value {
        changedFields.insert(f.key)
        fields[f.key] = f.value
      }
    }
    if changedFields.count > 0 {
      inMemory[record.key] = Record(key: record.key, fields: fields)
      changed[record.key] = ChangedRecord(key: record.key, fields: changedFields)
    }
  }
}
