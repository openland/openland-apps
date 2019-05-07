package com.openland.spacex.store

import org.json.JSONArray
import org.json.JSONObject

private fun serializeValue(value: RecordValue): Any? {
    return when (value) {
        is RecordValue.String -> value.value
        is RecordValue.Number -> value.value
        is RecordValue.Boolean -> value.value
        RecordValue.Null -> JSONObject.NULL
        is RecordValue.Reference -> JSONObject(mapOf("key" to value.key))
        is RecordValue.List -> JSONArray(value.items.map { serializeValue(it) })
    }
}

fun serializeRecord(record: Record): String {
    return JSONObject(record.fields.mapValues { serializeValue(it.value) }).toString()
}

fun parseValue(f: Any): RecordValue {
    if (f == JSONObject.NULL) {
        return RecordValue.Null
    } else if (f is String) {
        return RecordValue.String(f)
    } else if (f is Boolean) {
        return RecordValue.Boolean(f)
    } else if (f is Double) {
        return RecordValue.Number(f)
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

fun parseRecord(key: String, src: String): Record {
    val field = JSONObject(src)
    val fields = mutableMapOf<String, RecordValue>()
    for (key in field.keys()) {
        val f = field[key]
        fields[key] = parseValue(f)
    }
    return Record(key, fields)
}