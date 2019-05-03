package com.openland.react.graphql

import com.facebook.react.bridge.*
import kotlinx.serialization.json.*

fun ReadableArray.toKotlinX(): JsonElement {
    val res = mutableListOf<JsonElement>()
    for (i in 0 until size()) {
        val v = getDynamic(i)
        when {
            v.isNull -> res.add(JsonNull)
            v.type == ReadableType.String -> res.add(JsonPrimitive(v.asString()))
            v.type == ReadableType.Boolean -> res.add(JsonPrimitive(v.asBoolean()))
            v.type == ReadableType.Number -> res.add(JsonPrimitive(v.asDouble().toBigDecimal()))
            v.type == ReadableType.Array -> res.add(v.asArray().toKotlinX())
            v.type == ReadableType.Map -> res.add(v.asMap().toKotlinX())
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return JsonArray(res)
}


fun ReadableMap.toKotlinX(): JsonObject {
    val i = keySetIterator()
    val res = mutableMapOf<String, JsonElement>()
    while (i.hasNextKey()) {
        val k = i.nextKey()
        val v = getDynamic(k)
        if (v.isNull) {
            continue
        }
        when {
            v.type == ReadableType.Number -> res[k] = JsonPrimitive(v.asDouble().toBigDecimal())
            v.type == ReadableType.Boolean -> res[k] = JsonPrimitive(v.asBoolean())
            v.type == ReadableType.String -> res[k] = JsonPrimitive(v.asString())
            v.type == ReadableType.Map -> res[k] = v.asMap().toKotlinX()
            v.type == ReadableType.Array -> res[k] = v.asArray().toKotlinX()
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return JsonObject(res)
}

fun JsonArray.toReact(): WritableArray {
    val res = WritableNativeArray()
    for (i in 0 until size) {
        if (this[i].isNull) {
            res.pushNull()
        } else if (this[i] is JsonPrimitive) {
            val p = this[i] as JsonPrimitive
            if (p.booleanOrNull != null) {
                res.pushBoolean(p.boolean)
            } else if (p.doubleOrNull != null) {
                res.pushDouble(p.double)
            } else {
                res.pushString(p.content)
            }
        } else if (this[i] is JsonObject) {
            res.pushMap((this[i] as JsonObject).toReact())
        } else if (this[i] is JsonArray) {
            res.pushArray((this[i] as JsonArray).toReact())
        }
    }
    return res
}

fun JsonObject.toReact(): WritableMap {
    val res = WritableNativeMap()
    for (k in this.keys) {
        if (this[k]!!.isNull) {
            res.putNull(k)
        } else if (this[k]!! is JsonPrimitive) {
            val p = this[k]!! as JsonPrimitive
            if (p.booleanOrNull != null) {
                res.putBoolean(k, p.boolean)
            } else if (p.doubleOrNull != null) {
                res.putDouble(k, p.double)
            } else {
                res.putString(k, p.content)
            }
        } else if (this[k]!! is JsonObject) {
            res.putMap(k, (this[k]!! as JsonObject).toReact())
        } else if (this[k]!! is JsonArray) {
            res.putArray(k, (this[k]!! as JsonArray).toReact())
        }
    }
    return res
}