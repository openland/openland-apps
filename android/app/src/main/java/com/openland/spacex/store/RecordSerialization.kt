package com.openland.spacex.store

import org.json.JSONArray
import org.json.JSONObject

/**
 * Serialize Record to String
 * @param record Record for serialization
 * @return serialized record
 */
fun serializeRecord(record: Record): String {
    return JSONObject(record.fields.mapValues { serializeValue(it.value) }).toString()
}

/**
 * Parse Record from String
 * @param key Record Key
 * @param src serialized record
 * @return Parsed Record
 */
fun parseRecord(key: String, src: String): Record {
    val field = JSONObject(src)
    val fields = mutableMapOf<String, RecordValue>()
    for (fieldKey in field.keys()) {
        val f = field[fieldKey]!!
        fields[fieldKey] = parseValue(f)
    }
    return Record(key, fields)
}

/**
 * Serialize Record Value to JSON
 * @param value Record Value
 * @return JSON serialization
 */
private fun serializeValue(value: RecordValue): Any {
    return when (value) {
        is RecordValue.String -> value.value
        is RecordValue.Number -> value.value
        is RecordValue.Boolean -> value.value
        RecordValue.Null -> JSONObject.NULL
        is RecordValue.Reference -> JSONObject(mapOf("key" to value.key))
        is RecordValue.List -> JSONArray(value.items.map { serializeValue(it) })
    }
}

/**
 * Parse Value to Record Value
 * @param f JSON serialization
 * @return Record Value
 */
private fun parseValue(f: Any): RecordValue {
    if (f == JSONObject.NULL) {
        return RecordValue.Null
    } else if (f is String) {
        return RecordValue.String(f)
    } else if (f is Boolean) {
        return RecordValue.Boolean(f)
    } else if (f is Number) {
        return RecordValue.Number(f.toDouble())
    } else if (f is JSONObject) {
        return RecordValue.Reference(f["key"] as String)
    } else if (f is JSONArray) {
        val res = mutableListOf<RecordValue>()
        for (i in 0 until f.length()) {
            res.add(parseValue(f.get(i)))
        }
        return RecordValue.List(res)
    } else {
        throw Error()
    }
}