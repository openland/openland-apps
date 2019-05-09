package com.openland.spacex.store

sealed class RecordValue {
    class String(val value: kotlin.String) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.String && other.value == value
        }

        override fun toString(): kotlin.String {
            return value
        }

        override fun hashCode(): Int {
            return value.hashCode()
        }
    }

    class Number(val value: kotlin.Double) : RecordValue() {

        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.Number && other.value == value
        }

        override fun toString(): kotlin.String {
            return value.toString()
        }

        override fun hashCode(): Int {
            return value.hashCode()
        }
    }

    class Boolean(val value: kotlin.Boolean) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.Boolean && other.value == value
        }

        override fun toString(): kotlin.String {
            return value.toString()
        }

        override fun hashCode(): Int {
            return value.hashCode()
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

        override fun hashCode(): Int {
            return key.hashCode()
        }
    }

    class List(val items: kotlin.collections.List<RecordValue>) : RecordValue() {
        override fun equals(other: Any?): kotlin.Boolean {
            return other != null && other is RecordValue.List && other.items == items
        }

        override fun toString(): kotlin.String {
            return "<List>"
        }

        override fun hashCode(): Int {
            return items.hashCode()
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