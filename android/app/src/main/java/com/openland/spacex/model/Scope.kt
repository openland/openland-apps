package com.openland.spacex.model

import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet
import com.openland.spacex.store.RecordValue
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

class NormalizedCollection {
    val records = mutableMapOf<String, MutableMap<String, RecordValue>>()
    fun build(): RecordSet {
        return RecordSet(records.mapValues { Record(it.key, it.value) })
    }
}

class Scope(parentCacheKey: String?, val collection: NormalizedCollection, val obj: JsonObject) {

    val id: String?
    val map: MutableMap<String, RecordValue>?

    init {
        if (obj.containsKey("id")) {
            this.id = obj["id"]!!.primitive.content
        } else {
            this.id = parentCacheKey
        }
        if (id != null) {
            val ex = collection.records[id]
            if (ex == null) {
                map = mutableMapOf()
                collection.records[id] = map
            } else {
                map = ex
            }
        } else {
            map = null
        }
    }

    fun formatArguments(vararg args: Pair<String, String?>): String {
        val rargs = args.filter { it.second != null }
        if (rargs.isEmpty()) {
            return ""
        }
        val rargs2 = rargs.sortedBy { it.first }
        return "(" + rargs2.joinToString(",") + ")"
    }

    fun formatObjectKey(vararg args: Pair<String, String?>): String? {
        val rargs = args.filter { it.second != null }
        if (rargs.isEmpty()) {
            return ""
        }
        val rargs2 = rargs.sortedBy { it.first }
        return "(" + rargs2.joinToString(",") + ")"
    }

    fun argumentKey(key: String): String? {
        return null
    }

    //
    // Write
    //

    inline fun set(key: String, value: RecordValue) {
        map?.let { it[key] = value }
    }

    inline fun setNull(key: String) {
        map?.let { it[key] = RecordValue.Null }
    }

    //
    // Children
    //

    inline fun child(requestKey: String, storeKey: String): Scope {
        val res = Scope(if (id != null) "$id.$storeKey" else null, collection, obj.getObject(requestKey))
        map?.let { map[storeKey] = RecordValue.Reference(res.id!!) }
        return res
    }

    inline fun childList(requestKey: String, storeKey: String): ListScope {
        val res = ListScope(if (id != null) "$id.$storeKey" else null, collection, obj.getArray(requestKey))

        return res
    }

    //
    // Type checking
    //

    inline fun isType(name: String): Boolean {
        if (obj["__typename"]?.primitive?.content == name) {
            return true
        }
        return false
    }

    inline fun assertType(name: String) {
        if (!hasKey("__typename")) {
            throw Error("Unable to find __typename")
        }
        if (obj["__typename"]!!.primitive.content != name) {
            throw Error("Invalid type")
        }
    }

    //
    // Assert Objects
    //

    inline fun assertObject(key: String): Boolean {
        if (obj[key] !is JsonObject) {
            throw Error("Not an object")
        }
        return true
    }

    inline fun assertList(key: String): Boolean {
        if (obj[key] !is JsonArray) {
            throw Error("Not a list")
        }
        return true
    }

    //
    // Check if key exists in response and not null
    //

    fun hasKey(key: String): Boolean {
        return obj.containsKey(key) && !obj[key]!!.isNull
    }

    //
    // Read Int
    //

    fun readInt(key: String): RecordValue {
        return RecordValue.Number(obj[key]!!.primitive.int.toFloat())
    }

    fun readIntOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.Number(obj[key]!!.primitive.int.toFloat())
        } else {
            RecordValue.Null
        }
    }

    //
    // Read String
    //

    fun readString(key: String): RecordValue {
        return RecordValue.String(obj[key]!!.primitive.content)
    }

    fun readStringOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.String(obj[key]!!.primitive.content)
        } else {
            RecordValue.Null
        }
    }

    //
    // Read Boolean
    //

    fun readBoolean(key: String): RecordValue {
        return RecordValue.Boolean(obj[key]!!.primitive.boolean)
    }

    fun readBooleanOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.Boolean(obj[key]!!.primitive.boolean)
        } else {
            RecordValue.Null
        }
    }
}

class ListScope(val key: String?, val collection: NormalizedCollection, val arr: JsonArray) {
    val size: Int = arr.size
    val res: MutableList<RecordValue>? = if (key != null) mutableListOf() else null

    inline fun next(src: RecordValue) {
        res?.add(src)
    }

    inline fun isNotNull(index: Int): Boolean {
        return false
    }

    inline fun child(index: Int): Scope {
        val scp = Scope(if (key != null) "$key.$index" else null, collection, arr[index].jsonObject)
        if (res != null) {
            res.add(RecordValue.Reference(scp.id!!))
        }
        return scp
    }

    inline fun childList(index: Int): ListScope {
        return ListScope("$key.$index", collection, arr[index].jsonArray)
    }

    inline fun completed(): RecordValue {
        if (res != null) {
            return RecordValue.List(res)
        } else {
            return RecordValue.Null
        }
    }

    inline fun assertObject(index: Int): Boolean {
        if (arr[index] !is JsonObject) {
            throw Error("Invalid response")
        }
        return true
    }

    inline fun readString(index: Int): RecordValue {
        return RecordValue.String("")
    }
}
