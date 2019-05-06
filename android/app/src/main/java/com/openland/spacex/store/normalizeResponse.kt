package com.openland.spacex.store

import android.util.Log
import com.openland.spacex.model.OutputType
import com.openland.spacex.model.Selector
import org.json.JSONArray
import org.json.JSONObject

private class NormalizedCollection {
    val records = mutableMapOf<String, MutableMap<String, RecordValue>>()
    fun build(): RecordSet {
        return RecordSet(records.mapValues { Record(it.key, it.value) })
    }
}

private fun normalizeValue(
        parentCacheKey: String,
        collection: NormalizedCollection,
        value: OutputType,
        arguments: JSONObject,
        data: Any?): RecordValue {
    if (value is OutputType.NotNull) {
        val res = normalizeValue(parentCacheKey, collection, value.inner, arguments, data)
        if (res == RecordValue.Null) {
            error("Null value in the place of not-nullable")
        } else {
            return res
        }
    }
    if (data == null || data == JSONObject.NULL) {
        return RecordValue.Null
    }
    if (value is OutputType.Scalar) {
        return when {
            value.name == "String" -> RecordValue.String(data as String)
            value.name == "ID" -> RecordValue.String(data as String)
            value.name == "Date" -> RecordValue.String(data as String)
            value.name == "Int" || value.name == "Float" -> {
                return RecordValue.Number((data as Number).toFloat())
            }
            value.name == "Boolean" -> RecordValue.Boolean(data as Boolean)
            else -> error("Unknown scalar type: " + value.name)
        }
    } else if (value is OutputType.List) {
        val arr = (data as JSONArray)
        val items = mutableListOf<RecordValue>()
        for (i in 0 until arr.length()) {
            items.add(normalizeValue("$parentCacheKey.$i", collection, value.inner, arguments, data.get(i)))
        }
        return RecordValue.List(items)
    } else if (value is OutputType.Object) {
        return normalizeSelector(parentCacheKey, collection, value.selectors, arguments, data as JSONObject)!!
    }

    error("Unknown type")
}

private fun normalizeSelector(
        parentCacheKey: String?,
        collection: NormalizedCollection,
        selectors: List<Selector>,
        arguments: JSONObject,
        data: JSONObject
): RecordValue.Reference? {
    val map: MutableMap<String, RecordValue>?
    val id: String?
    if (data.has("id")) {
        id = data.getString("id")
    } else {
        id = parentCacheKey
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

    for (f in selectors) {
        if (f is Selector.Field) {
            if (map != null) {
                val key = selectorKey(f.name, f.arguments, arguments)
                map[key] = normalizeValue(id!! + "." + key, collection, f.type, arguments, data[f.alias])
            }
        } else if (f is Selector.TypeCondition) {
            if (data["__typename"] == RecordValue.String(f.type)) {
                normalizeSelector(parentCacheKey, collection, f.fragment.selectors, arguments, data)
            }
        } else if (f is Selector.Fragment) {
            // Can't check for type since there typename could be subclass
//            if (record.fields["__typename"] != RecordValue.String(f.type)) {
//                return false
//            }
            normalizeSelector(parentCacheKey, collection, f.fragment.selectors, arguments, data)
        } else {
            error("Unsupported selector")
        }
    }

    if (id != null) {
        return RecordValue.Reference(id)
    } else {
        return null
    }
}

private fun normalizeRootSelector(rootCacheKey: String?, collection: NormalizedCollection,
                                  selectors: List<Selector>, arguments: JSONObject,
                                  data: JSONObject) {
    if (rootCacheKey != null) {
        for (f in selectors) {
            if (f !is Selector.Field) {
                error("Root query cant't contain fragments")
            }
            val key = selectorKey(f.name, f.arguments, arguments)
            val id = "$rootCacheKey.$key"
            val refId = "$rootCacheKey.\$ref.$key"
            val ex = collection.records[refId]
            val map: MutableMap<String, RecordValue>
            if (ex == null) {
                map = mutableMapOf()
                collection.records[refId] = map
            } else {
                map = ex
            }
            map["data"] = normalizeValue(id, collection, f.type, arguments, data[f.alias])
        }
    } else {
        normalizeSelector(null, collection, selectors, arguments, data)
    }
}

fun normalizeResponse(rootCacheKey: String?, type: OutputType.Object, arguments: JSONObject, data: JSONObject): RecordSet {
    val start = System.currentTimeMillis()
    val collection = NormalizedCollection()
    normalizeRootSelector(rootCacheKey, collection, type.selectors, arguments, data)
    val res = collection.build()
    val delta = System.currentTimeMillis() - start
    if (delta > 20) {
        Log.e("SpaceX", "Normalization took too long: " + (System.currentTimeMillis() - start) + " ms")
    }
    return res
}