package com.openland.spacex.store

import com.openland.spacex.InputValue
import org.json.JSONArray
import org.json.JSONObject

/**
 * Calculate Selector Key from JSON object
 * @param src Source Object
 * @return selector key
 */
private fun selectorValueKey(src: Any): String {
    if (src == JSONObject.NULL) {
        return "null"
    } else if (src is String) {
        return "\"" + src + "\""
    } else if (src is JSONObject) {
        val sortedKeys = src.keys().asSequence().toList().sorted()
        val values = mutableListOf<String>()
        for (k in sortedKeys) {
            values.add(k + ":" + selectorValueKey(src[k]))
        }
        return "{" + values.joinToString(",") + "}"
    } else if (src is JSONArray) {
        val res = mutableListOf<String>()
        for (i in 0 until src.length()) {
            res.add(selectorValueKey(src[i]))
        }
        return "[" + res.joinToString(",") + "]"
    } else {
        return src.toString()
    }
}

/**
 * Selector key from InputValue
 * @param value Input Value
 * @param arguments Operation arguments
 * @return selector key
 */
private fun selectorKey(value: InputValue, arguments: JSONObject): String? {
    if (value is InputValue.Int) {
        return value.value.toString()
    } else if (value is InputValue.Float) {
        return value.value.toString()
    } else if (value is InputValue.Boolean) {
        return value.value.toString()
    } else if (value is InputValue.String) {
        return "\"" + value.value + "\""
    } else if (value == InputValue.Null) {
        return "null"
    } else if (value is InputValue.List) {
        return "[" + value.items.map { selectorKey(it, arguments) }.joinToString(",") + "]"
    } else if (value is InputValue.Object) {
        val inner = value.fields
                .mapValues { selectorKey(it.value, arguments) }
                .toSortedMap()
                .filterValues { it != null }
                .map { it.key + ":" + it.value }
                .joinToString(",")
        return "{$inner}"
    } else if (value is InputValue.Reference) {
        return if (arguments.has(value.name)) {
            selectorValueKey(arguments.get(value.name))
        } else {
            null
        }
    }

    error("Unreachable code")
}

/**
 * Calculate field selector key
 * @param name Field Name
 * @param fieldArguments Field arguments
 * @param arguments Operation arguments
 * @return selector key
 */
fun selectorKey(name: String, fieldArguments: Map<String, InputValue>, arguments: JSONObject): String {
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
    if (converted.isEmpty()) {
        return name
    }
    return name + "(" + converted.joinToString(",") + ")"
}