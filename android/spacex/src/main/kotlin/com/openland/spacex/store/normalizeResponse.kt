package com.openland.spacex.store

import com.openland.spacex.InvalidDataException
import com.openland.spacex.OutputType
import com.openland.spacex.Selector
import org.json.JSONArray
import org.json.JSONObject

private class NormalizedCollection {
    val records = mutableMapOf<String, MutableMap<String, RecordValue>>()
    fun build(): RecordSet {
        return RecordSet(records.mapValues { Record(it.key, it.value) })
    }
}

private fun normalizeValue(
        parentCacheKey: String?,
        collection: NormalizedCollection,
        value: OutputType,
        arguments: JSONObject,
        data: Any?): RecordValue? {
    if (value is OutputType.NotNull) {
        val res = normalizeValue(parentCacheKey, collection, value.inner, arguments, data)
        if (res == RecordValue.Null) {
            throw InvalidDataException("Unexpected null value")
        } else {
            return res
        }
    }
    if (data == null || data == JSONObject.NULL) {
        return RecordValue.Null
    }
    if (value is OutputType.Scalar) {
        if (parentCacheKey != null) {
            return when {
                value.name == "String" || value.name == "ID" || value.name == "Date" -> {
                    return when (data) {
                        is Number -> RecordValue.String(data.toString())
                        is Boolean -> RecordValue.String(data.toString())
                        else -> RecordValue.String(data as String)
                    }
                }
                value.name == "Int" || value.name == "Float" -> {
                    if (data is Number) {
                        RecordValue.Number(data.toDouble())
                    } else {
                        throw InvalidDataException("Unexpected value for " + value.name + ": " + data)
                    }
                }
                value.name == "Boolean" -> {
                    if (data is Boolean) {
                        RecordValue.Boolean(data)
                    } else {
                        throw InvalidDataException("Unexpected value for " + value.name + ": " + data)
                    }
                }
                else -> throw InvalidDataException("Unsupported Scalar: " + value.name)
            }
        } else {
            return null
        }
    } else if (value is OutputType.List) {
        val arr = (data as JSONArray)
        if (parentCacheKey != null) {

            val items = mutableListOf<RecordValue>()
            for (i in 0 until arr.length()) {
                items.add(normalizeValue("$parentCacheKey.$i", collection, value.inner, arguments, data.get(i))!!)
            }
            return RecordValue.List(items)
        } else {
            for (i in 0 until arr.length()) {
                normalizeValue(null, collection, value.inner, arguments, data.get(i))
            }
        }
    } else if (value is OutputType.Object) {
        return normalizeSelector(parentCacheKey, collection, value.selectors, arguments, data as JSONObject)
    }

    error("Unreachable code")
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
        val v = data["id"]
        if (v == JSONObject.NULL) {
            id = parentCacheKey
        } else {
            id = v.toString()
        }
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
                map[key] = normalizeValue(id!! + "." + key, collection, f.type, arguments, data.opt(f.alias))!!
            } else {
                normalizeValue(null, collection, f.type, arguments, data.opt(f.alias))
            }
        } else if (f is Selector.TypeCondition) {
            if (data["__typename"] == f.type) {
                normalizeSelector(parentCacheKey, collection, f.fragment.selectors, arguments, data)
            }
        } else if (f is Selector.Fragment) {
            normalizeSelector(parentCacheKey, collection, f.fragment.selectors, arguments, data)
        } else {
            error("Unreachable code")
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
            map["data"] = normalizeValue(id, collection, f.type, arguments, data[f.alias])!!
        }
    } else {
        normalizeSelector(null, collection, selectors, arguments, data)
    }
}

fun normalizeData(id: String, type: OutputType.Object, arguments: JSONObject, data: JSONObject): RecordSet {
    val collection = NormalizedCollection()
    normalizeSelector(id, collection, type.selectors, arguments, data)
    return collection.build()
}

fun normalizeResponse(rootCacheKey: String?, type: OutputType.Object, arguments: JSONObject, data: JSONObject): RecordSet {
    val start = System.currentTimeMillis()
    val collection = NormalizedCollection()
    normalizeRootSelector(rootCacheKey, collection, type.selectors, arguments, data)
    val res = collection.build()
    val delta = System.currentTimeMillis() - start
    if (delta > 20) {
        // Log.e("SpaceX", "Normalization took too long: " + (System.currentTimeMillis() - start) + " ms")
    }
    return res
}