package com.korshakov.testing.openland.async

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser

abstract class AsyncViewSpec(val key: String)

class AsyncFlexSpec(key: String, val children: Array<AsyncViewSpec>) : AsyncViewSpec(key)
class AsyncTextSpec(key: String, val text: String) : AsyncViewSpec(key)

private fun resolveChildren(src: JsonObject): Array<AsyncViewSpec> {
    val res = src["children"] as JsonArray<JsonObject>?
    if (res == null || res.size == 0) {
        return emptyArray()
    }
    return res.map { resolveSpec(it) }.toTypedArray()
}

private fun resolveSpec(src: JsonObject): AsyncViewSpec {
    val type = src["type"] as String
    val key = src["key"] as String
    if (type == "flex") {
        val res = AsyncFlexSpec(key, resolveChildren(src))
        // TODO: Handle
        return res
    } else if (type == "text") {
        val res = AsyncTextSpec(key, "Sample text")
        // TODO: Handle
        return res
    }

    error("Unable to resolve spec: $type")
}

fun parseSpec(src: String): AsyncViewSpec {
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(src)) as JsonObject
    return resolveSpec(parsed)
}