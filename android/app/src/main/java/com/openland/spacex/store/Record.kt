package com.openland.spacex.store

import kotlinx.serialization.json.*

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

private fun serializeValue(value: RecordValue): JsonElement {
    return when (value) {
        is RecordValue.String -> JsonLiteral(value.value)
        is RecordValue.Number -> JsonLiteral(value.value)
        is RecordValue.Boolean -> JsonLiteral(value.value)
        RecordValue.Null -> JsonNull
        is RecordValue.Reference -> JsonObject(mapOf("key" to JsonLiteral(value.key)))
        is RecordValue.List -> JsonArray(value.items.map { serializeValue(it) })
    }
}

fun serializeRecord(record: Record): String {
    return Json.unquoted.stringify(
            JsonElement.serializer(),
            JsonObject(record.fields.mapValues { serializeValue(it.value) })
    )
}

fun parseValue(f: JsonElement): RecordValue {
    if (f.isNull) {
        return RecordValue.Null
    } else if (f is JsonLiteral) {
        val b = f.booleanOrNull
        if (b != null) {
            return RecordValue.Boolean(b)
        } else {
            val fl = f.floatOrNull
            if (fl != null) {
                return RecordValue.Number(fl)
            } else {
                return RecordValue.String(f.body as String)
            }
        }
    } else if (f is JsonObject) {
        return RecordValue.Reference((f["key"] as JsonLiteral).body as String)
    } else if (f is JsonArray) {
        return RecordValue.List(f.map { parseValue(it) })
    } else {
        throw Error()
    }
}

fun parseRecord(key: String, src: String): Record {
    val field = Json.unquoted.parseJson(src).jsonObject
    val fields = mutableMapOf<String, RecordValue>()
    for (key in field.keys) {
        val f = field[key]!!
        fields[key] = parseValue(f)
    }
    return Record(key, fields)
}