package com.openland.spacex.store

import com.openland.spacex.model.*
import org.json.JSONArray
import org.json.JSONObject

private fun selectorKey(value: InputValue, arguments: JSONObject): String? {
    if (value is InputValue.Int) {
        return value.value.toString()
    } else if (value is InputValue.Reference) {
        if (arguments.has(value.name)) {
            val ex = arguments.get(value.name)
            if (ex == null) {
                return "null"
            } else if (ex is String) {
                return "\"" + ex + "\""
            } else if (ex is Number) {
                return ex.toString()
            } else if (ex is Boolean) {
                return ex.toString()
            } else if (ex is JSONArray) {
                val res = mutableListOf<String>()

                return "[]"
            } else {
                error("Unknown input value")
            }
        } else {
            return null
        }
    } else {
        error("Unknown input value")
    }
}

private fun selectorKey(name: String, fieldArguments: Map<String, InputValue>, arguments: JSONObject): String {
    if (fieldArguments.isEmpty()) {
        return name
    }
    val mapped = fieldArguments.mapValues { selectorKey(it.value, arguments) }
    val sortedKeys = mapped.keys.sortedBy { it }
    val converted = mutableListOf<String>()
    for (k in sortedKeys) {
        if (mapped[k] != null) {
            converted.add(k + ":" + mapped[k])
        }
    }
    return name + "(" + converted.joinToString(",") + ")"
}

private fun readValue(value: RecordValue, type: OutputType, store: RecordStore, arguments: JSONObject): Pair<Boolean, Any?> {
    if (type is OutputType.Scalar) {
        if (value == RecordValue.Null) {
            return true to null
        } else if (type.name == "String") {
            return if (value is RecordValue.String) {
                true to value.value
            } else {
                false to null
            }
        } else if (type.name == "Int") {
            return if (value is RecordValue.Number) {
                true to value.value
            } else {
                false to null
            }
        } else if (type.name == "Float") {
            return if (value is RecordValue.Number) {
                true to value.value
            } else {
                false to null
            }
        } else if (type.name == "ID") {
            return if (value is RecordValue.String) {
                true to value.value
            } else {
                false to null
            }
        } else if (type.name == "Date") {
            return if (value is RecordValue.String) {
                true to value.value
            } else {
                false to null
            }
        } else if (type.name == "Boolean") {
            return if (value is RecordValue.Boolean) {
                true to value.value
            } else {
                false to null
            }
        } else {
            error("Unknown scalar type: " + type.name)
        }
    } else if (type is OutputType.NotNull) {
        return if (value == RecordValue.Null) {
            false to null
        } else {
            readValue(value, type.inner, store, arguments)
        }
    } else if (type is OutputType.List) {
        if (value == RecordValue.Null) {
            return true to null
        } else {
            if (value is RecordValue.List) {
                val mapped = value.items.map { readValue(it, type.inner, store, arguments) }
                if (mapped.any { !it.first }) {
                    return false to null
                }
                val v = mapped.map { it.second!! }
                return true to JSONArray(v)
            } else {
                error("Invalid record value")
            }
        }
    } else if (type is OutputType.Object) {
        if (value == RecordValue.Null) {
            return true to null
        } else {
            if (value is RecordValue.Reference) {
                return readSelector(value.key, store, type.selectors, arguments)
            } else {
                error("Invalid record value")
            }
        }
    }
    return false to null
}

private fun readSelector(
        record: Record,
        fields: MutableMap<String, Any?>,
        store: RecordStore,
        selectors: List<Selector>,
        arguments: JSONObject
): Boolean {
    for (f in selectors) {
        if (f is Selector.Field) {
            val key = selectorKey(f.name, f.arguments, arguments)
            if (record.fields.containsKey(key)) {
                val rv = readValue(record.fields[key]!!, f.type, store, arguments)
                if (!rv.first) {
                    return false
                }
                fields[f.alias] = rv.second
            } else {
                return false
            }
        } else if (f is Selector.TypeCondition) {
            if (record.fields["__typename"] == RecordValue.String(f.type)) {
                if (!readSelector(record, fields, store, f.fragment.selectors, arguments)) {
                    return false
                }
            }
        } else if (f is Selector.Fragment) {
            // Can't check for type since there typename could be subclass
//            if (record.fields["__typename"] != RecordValue.String(f.type)) {
//                return false
//            }
            if (!readSelector(record, fields, store, f.fragment.selectors, arguments)) {
                return false
            }
        } else {
            error("Unsupported selector")
        }
    }
    return true
}

private fun readSelector(cacheKey: String, store: RecordStore, selectors: List<Selector>, arguments: JSONObject): Pair<Boolean, JSONObject?> {
    val value = store.read(cacheKey)
    if (value.fields.isEmpty()) {
        return false to null
    }
    val k = store.read(value.key)
    val fields = mutableMapOf<String, Any?>()
    if (!readSelector(k, fields, store, selectors, arguments)) {
        return false to null
    }
    return true to JSONObject(fields)
}

fun readFromStore(cacheKey: String, store: RecordStore, type: OutputType.Object, arguments: JSONObject): Pair<Boolean, JSONObject?> {
    return readSelector(cacheKey, store, type.selectors, arguments)
}