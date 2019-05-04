package com.openland.spacex.store

import org.json.JSONArray
import org.json.JSONObject

sealed class RecordValue {
    class String(val value: kotlin.String) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.String && other.value == value
        }

        override fun toString(): kotlin.String {
            return value
        }
    }

    class Number(val value: kotlin.Float) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.Number && other.value == value
        }

        override fun toString(): kotlin.String {
            return value.toString()
        }
    }

    class Boolean(val value: kotlin.Boolean) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.Boolean && other.value == value
        }

        override fun toString(): kotlin.String {
            return value.toString()
        }
    }

    object Null : RecordValue() {
        override fun toString(): kotlin.String {
            return "<NULL>"
        }
    }

    class Reference(val key: kotlin.String) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.Reference && other.key == key
        }

        override fun toString(): kotlin.String {
            return "<Ref: $key>"
        }
    }

    class List(val items: kotlin.collections.List<RecordValue>) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.List && other.items == items
        }

        override fun toString(): kotlin.String {
            return "<List>"
        }
    }
}

class Record(val key: String, val fields: Map<String, RecordValue>) {
    override fun equals(other: Any?): Boolean {
        if (other == null || other !is Record) {
            return false
        }
        for (f in fields) {
            if (other.fields[f.key] != f.value) {
                return false
            }
        }
        for (f in other.fields) {
            if (fields[f.key] != f.value) {
                return false
            }
        }
        return true
    }

    override fun hashCode(): Int {
        return key.hashCode()
    }

    override fun toString(): String {
        return "{$key}"
    }
}

class RecordSet(val records: Map<String, Record>)

private fun serializeValue(value: RecordValue): Any? {
    return when (value) {
        is RecordValue.String -> value.value
        is RecordValue.Number -> value.value
        is RecordValue.Boolean -> value.value
        RecordValue.Null -> null
        is RecordValue.Reference -> JSONObject(mapOf("key" to value.key))
        is RecordValue.List -> JSONArray(value.items.map { serializeValue(it) })
    }
}

fun serializeRecord(record: Record): String {
    return JSONObject(record.fields.mapValues { serializeValue(it.value) }).toString()
}

fun parseValue(f: Any?): RecordValue {
    if (f == null) {
        return RecordValue.Null
    } else if (f is String) {
        return RecordValue.String(f)
    } else if (f is Boolean) {
        return RecordValue.Boolean(f)
    } else if (f is Float) {
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
        val f = field[key]!!
        fields[key] = parseValue(f)
    }
    return Record(key, fields)
}