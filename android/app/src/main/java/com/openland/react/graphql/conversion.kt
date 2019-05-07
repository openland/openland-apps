package com.openland.react.graphql

import com.facebook.react.bridge.*
import org.json.JSONArray
import org.json.JSONObject

fun ReadableArray.toKotlinX(): Any? {
    val res = mutableListOf<Any?>()
    for (i in 0 until size()) {
        val v = getDynamic(i)
        when {
            v.isNull -> res.add(JSONObject.NULL)
            v.type == ReadableType.String -> res.add(v.asString())
            v.type == ReadableType.Boolean -> res.add(v.asBoolean())
            v.type == ReadableType.Number -> res.add(v.asDouble().toBigDecimal())
            v.type == ReadableType.Array -> res.add(v.asArray().toKotlinX())
            v.type == ReadableType.Map -> res.add(v.asMap().toKotlinX())
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return JSONArray(res)
}


fun ReadableMap.toKotlinX(): JSONObject {
    val i = keySetIterator()
    val res = mutableMapOf<String, Any?>()
    while (i.hasNextKey()) {
        val k = i.nextKey()
        val v = getDynamic(k)
        if (v.isNull) {
            res[k] = JSONObject.NULL
            continue
        }
        when {
            v.type == ReadableType.Number -> res[k] = v.asDouble().toBigDecimal()
            v.type == ReadableType.Boolean -> res[k] = v.asBoolean()
            v.type == ReadableType.String -> res[k] = v.asString()
            v.type == ReadableType.Map -> res[k] = v.asMap().toKotlinX()
            v.type == ReadableType.Array -> res[k] = v.asArray().toKotlinX()
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return JSONObject(res)
}

fun JSONArray.toReact(): WritableArray {
    val res = WritableNativeArray()
    for (i in 0 until length()) {
        if (this[i] == null || this[i] == JSONObject.NULL) {
            res.pushNull()
        } else if (this[i] is String) {
            res.pushString(this[i] as String)
        } else if (this[i] is Number) {
            res.pushDouble((this[i] as Number).toDouble())
        } else if (this[i] is Boolean) {
            res.pushBoolean(this[i] as Boolean)
        } else if (this[i] is JSONObject) {
            res.pushMap((this[i] as JSONObject).toReact())
        } else if (this[i] is JSONArray) {
            res.pushArray((this[i] as JSONArray).toReact())
        }
    }
    return res
}

fun JSONObject.toReact(): WritableMap {
    val res = WritableNativeMap()
    for (k in this.keys()) {
        if (this[k] == null || this[k] == JSONObject.NULL) {
            res.putNull(k)
        } else if (this[k] is String) {
            res.putString(k, this[k] as String)
        } else if (this[k] is Number) {
            res.putDouble(k, (this[k] as Number).toDouble())
        } else if (this[k] is Boolean) {
            res.putBoolean(k, (this[k] as Boolean))
        } else if (this[k]!! is JSONObject) {
            res.putMap(k, (this[k]!! as JSONObject).toReact())
        } else if (this[k]!! is JSONArray) {
            res.putArray(k, (this[k]!! as JSONArray).toReact())
        }
    }
    return res
}