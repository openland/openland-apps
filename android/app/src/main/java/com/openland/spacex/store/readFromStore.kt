package com.openland.spacex.store

import com.openland.spacex.model.*
import kotlinx.serialization.json.*

private fun selectorKey(name: String, arguments: Map<String, InputValue>): String {
    if (arguments.isEmpty()) {
        return name
    }
    // arguments.mapValues { it.value }
    return name
}

private fun readValue(value: RecordValue, type: OutputType, store: RecordStore): Pair<Boolean, JsonElement?> {
    if (type is OutputType.Scalar) {
        if (value == RecordValue.Null) {
            return true to JsonNull
        } else if (type.name == "String") {
            return if (value is RecordValue.String) {
                true to JsonPrimitive(value.value)
            } else {
                false to null
            }
        } else if (type.name == "Int") {
            return if (value is RecordValue.Number) {
                true to JsonPrimitive(value.value)
            } else {
                false to null
            }
        } else if (type.name == "Float") {
            return if (value is RecordValue.Number) {
                true to JsonPrimitive(value.value)
            } else {
                false to null
            }
        } else if (type.name == "ID") {
            return if (value is RecordValue.String) {
                true to JsonPrimitive(value.value)
            } else {
                false to null
            }
        } else if (type.name == "Date") {
            return if (value is RecordValue.String) {
                true to JsonPrimitive(value.value)
            } else {
                false to null
            }
        } else if (type.name == "Boolean") {
            return if (value is RecordValue.Boolean) {
                true to JsonPrimitive(value.value)
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
            readValue(value, type.inner, store)
        }
    } else if (type is OutputType.List) {
        if (value == RecordValue.Null) {
            return true to JsonNull
        } else {
            if (value is RecordValue.List) {
                val mapped = value.items.map { readValue(it, type.inner, store) }
                if (mapped.any { !it.first }) {
                    return false to null
                }
                val v = mapped.map { it.second!! }
                return true to JsonArray(v)
            } else {
                error("Invalid record value")
            }
        }
    } else if (type is OutputType.Object) {
        if (value == RecordValue.Null) {
            return true to JsonNull
        } else {
            if (value is RecordValue.Reference) {
                return readSelector(value.key, store, type.selectors)
            } else {
                error("Invalid record value")
            }
        }
    }
    return false to null
}

private fun readSelector(
        record: Record,
        fields: MutableMap<String, JsonElement>,
        store: RecordStore,
        selectors: List<Selector>
): Boolean {
    for (f in selectors) {
        if (f is Selector.Field) {
            val key = selectorKey(f.name, f.arguments)
            if (record.fields.containsKey(key)) {
                val rv = readValue(record.fields[key]!!, f.type, store)
                if (!rv.first) {
                    return false
                }
                fields[f.alias] = rv.second!!
            } else {
                return false
            }
        } else if (f is Selector.TypeCondition) {
            if (record.fields["__typename"] == RecordValue.String(f.type)) {
                if (!readSelector(record, fields, store, f.fragment.selectors)) {
                    return false
                }
            }
        } else if (f is Selector.Fragment) {
            if (record.fields["__typename"] != RecordValue.String(f.type)) {
                return false
            }
            if (!readSelector(record, fields, store, f.fragment.selectors)) {
                return false
            }
        } else {
            error("Unsupported selector")
        }
    }
    return true
}

private fun readSelector(cacheKey: String, store: RecordStore, selectors: List<Selector>): Pair<Boolean, JsonObject?> {
    val value = store.read(cacheKey)
    if (value.fields.isEmpty()) {
        return false to null
    }
    val k = store.read(value.key)
    val fields = mutableMapOf<String, JsonElement>()
    if (!readSelector(k, fields, store, selectors)) {
        return false to null
    }
    return true to JsonObject(fields)
}

fun readFromStore(cacheKey: String, store: RecordStore, type: OutputType.Object): Pair<Boolean, JsonObject?> {
    return readSelector(cacheKey, store, type.selectors)
}