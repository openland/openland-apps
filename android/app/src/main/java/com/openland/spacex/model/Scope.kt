package com.openland.spacex.model

import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet
import com.openland.spacex.store.RecordValue
import org.json.JSONArray
import org.json.JSONObject

fun formatArgumentKey(element: JSONObject): String {
    val sortedKeys = element.keys().asSequence().toList().sortedBy { it }
    val converted = mutableListOf<String>()
    for (k in sortedKeys) {
        converted.add(k + ":" + formatArgumentKey(element[k]!!))
    }
    return "{" + converted.joinToString(",") + "}"
}

fun formatArgumentKey(element: Any?): String {
    if (element == null) {
        return "null"
    } else if (element is String) {
        return "\"" + element + "\""
    } else if (element is Boolean) {
        return element.toString()
    } else if (element is JSONObject) {
        return formatArgumentKey(element)
    } else if (element is JSONArray) {
        val res = mutableListOf<String>()
        for (i in 0 until element.length()) {
            res.add(formatArgumentKey(element[i]))
        }
        return "[" + res.joinToString(",") + "]"
    } else {
        error("Unknown element type")
    }
}

class NormalizedCollection {
    val records = mutableMapOf<String, MutableMap<String, RecordValue>>()
    fun build(): RecordSet {
        return RecordSet(records.mapValues { Record(it.key, it.value) })
    }
}

class Scope(parentCacheKey: String?, val collection: NormalizedCollection, val obj: JSONObject, val args: JSONObject) {

    val id: String?
    val map: MutableMap<String, RecordValue>?

    init {
        if (obj.has("id")) {
            this.id = obj.getString("id")
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
        return "(" + rargs2.joinToString(",") { it.first + ":" + it.second!! } + ")"
    }

    fun formatObjectKey(vararg args: Pair<String, String?>): String? {
        val rargs = args.filter { it.second != null }
        if (rargs.isEmpty()) {
            return ""
        }
        val rargs2 = rargs.sortedBy { it.first }
        return "{" + rargs2.joinToString(",") { it.first + ":" + it.second!! } + "}"
    }

    fun argumentKey(key: String): String? {
        if (this.args.has(key)) {
            return formatArgumentKey(this.args[key]!!)
        }
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
        val res = Scope(if (id != null) "$id.$storeKey" else null, collection, obj.getJSONObject(requestKey), args)
        map?.let { map[storeKey] = RecordValue.Reference(res.id!!) }
        return res
    }

    inline fun childList(requestKey: String, storeKey: String): ListScope {
        val res = ListScope(if (id != null) "$id.$storeKey" else null, collection, obj.getJSONArray(requestKey), args)

        return res
    }

    //
    // Type checking
    //

    inline fun isType(name: String): Boolean {
        if (obj.optString("__typename") == name) {
            return true
        }
        return false
    }

    inline fun assertType(name: String) {
        if (!hasKey("__typename")) {
            throw Error("Unable to find __typename")
        }
        if (obj.optString("__typename") != name) {
            throw Error("Invalid type")
        }
    }

    //
    // Assert Objects
    //

    inline fun assertObject(key: String): Boolean {
        if (obj[key] !is JSONObject) {
            throw Error("Not an object")
        }
        return true
    }

    inline fun assertList(key: String): Boolean {
        if (obj[key] !is JSONArray) {
            throw Error("Not a list")
        }
        return true
    }

    //
    // Check if key exists in response and not null
    //

    fun hasKey(key: String): Boolean {
        return obj.has(key) && !obj.isNull(key)
    }

    //
    // Read Int
    //

    fun readInt(key: String): RecordValue {
        return RecordValue.Number((obj.getDouble(key)).toFloat())
    }

    fun readIntOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.Number(obj.getDouble(key).toFloat())
        } else {
            RecordValue.Null
        }
    }

    //
    // Read String
    //

    fun readString(key: String): RecordValue {
        return RecordValue.String(obj.getString(key))
    }

    fun readStringOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.String(obj.optString(key))
        } else {
            RecordValue.Null
        }
    }

    //
    // Read Boolean
    //

    fun readBoolean(key: String): RecordValue {
        return RecordValue.Boolean(obj.getBoolean(key))
    }

    fun readBooleanOptional(key: String): RecordValue {
        return if (hasKey(key)) {
            RecordValue.Boolean(obj.optBoolean(key))
        } else {
            RecordValue.Null
        }
    }
}

class ListScope(val key: String?, val collection: NormalizedCollection, val arr: JSONArray, val args: JSONObject) {
    val size: Int = arr.length()
    val res: MutableList<RecordValue>? = if (key != null) mutableListOf() else null

    inline fun next(src: RecordValue) {
        res?.add(src)
    }

    inline fun isNotNull(index: Int): Boolean {
        return false
    }

    inline fun child(index: Int): Scope {
        val scp = Scope(if (key != null) "$key.$index" else null, collection, arr.getJSONObject(index), args)
        if (res != null) {
            res.add(RecordValue.Reference(scp.id!!))
        }
        return scp
    }

    inline fun childList(index: Int): ListScope {
        return ListScope("$key.$index", collection, arr.getJSONArray(index), args)
    }

    inline fun completed(): RecordValue {
        if (res != null) {
            return RecordValue.List(res)
        } else {
            return RecordValue.Null
        }
    }

    inline fun assertObject(index: Int): Boolean {
        if (arr[index] !is JSONObject) {
            throw Error("Invalid response")
        }
        return true
    }

    inline fun readString(index: Int): RecordValue {
        return RecordValue.String("")
    }
}
