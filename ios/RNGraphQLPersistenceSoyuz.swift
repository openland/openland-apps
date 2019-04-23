//import Foundation
//import Soyuz
//
//class RNGraphQLPersistenceSoyuz: RNGraphQLPersistenceEngine {
//
//  static let VERSION = 2
//
//  // private let swiftStore: SwiftStore
//  private let soyuzStore: Int
//  private let queue = DispatchQueue(label: "GQLPersistence", attributes: [])
//  private var cache: Dictionary<String,CacheRecrod> = [:]
//
//  init(name: String) throws {
//    self.soyuzStore = SZSoyuzStoreCreate(name)
//    // swiftStore = SwiftStore(storeName: name)
//  }
//
//  func load(keys: [String]) throws -> [RNGraphQLPersistenceRecord] {
//    return try sync {
//      let start = getCurrentMillis()
//      print("[SOYUZ]: load \(keys)")
//      var res: [RNGraphQLPersistenceRecord] = []
//      for k in keys {
////        let r = cache[k]
////        if r != nil {
////          if r!.value != nil {
////            res.append(RNGraphQLPersistenceRecord(key: k, value: r!.value!))
////          }
////        } else {
////          if k == "MUTATION_ROOT" || k == "SUBSCRIPTION_ROOT" || k.hasPrefix("SUBSCRIPTION_ROOT.") || k.hasPrefix("MUTATION_ROOT.") {
////            cache[k] = CacheRecrod(value: nil)
////          } else {
////            let v = SZSoyuzStoreRead(self.soyuzStore, k)
////            if !v.isEmpty {
////              res.append(RNGraphQLPersistenceRecord(key: k, value: v))
////              cache[k] = CacheRecrod(value: v)
////            } else {
////              cache[k] = CacheRecrod(value: nil)
////            }
////          }
////        }
//        let v = SZSoyuzStoreRead(self.soyuzStore, k)
//        if !v.isEmpty {
//          res.append(RNGraphQLPersistenceRecord(key: k, value: v))
//        }
//      }
//      print("[SOYUZ]: in \(getCurrentMillis() - start) ms")
//      return res
//    }
//  }
//
//  func persist(key: String, value: String) throws {
//    try sync {
//      print("[SOYUZ]: persist \(key)")
//      // let start = getCurrentMillis()
//      // cache[key] = CacheRecrod(value: value)
//      if key == "SUBSCRIPTION_ROOT" || key.hasPrefix("SUBSCRIPTION_ROOT.") {
//        return
//      }
//      if key == "MUTATION_ROOT" || key.hasPrefix("MUTATION_ROOT.") {
//        return
//      }
//
//      SZSoyuzStoreWrite(self.soyuzStore, key, value)
//      // soyuzStore[key] = value
//      // print("[LDB]: in \(getCurrentMillis() - start) ms")
//    }
//  }
//
//  func clearEngine() throws {
//    // Not supporteds
//  }
//
//  private func sync<T>(_ block: () throws -> T) rethrows -> T {
//    return try queue.sync(execute: block)
//  }
//}
