package com.openland.react.graphql

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType

fun nativeArrayToApolloArray(src: ReadableArray): List<Any?> {
    val res = mutableListOf<Any?>()
    for (i in 0 until src.size()) {
        val v = src.getDynamic(i)
        when {
            v.isNull -> res.add(null)
            v.type == ReadableType.String -> res.add(v.asString())
            v.type == ReadableType.Boolean -> res.add(v.asBoolean())
            v.type == ReadableType.Number -> res.add(v.asDouble().toBigDecimal())
            v.type == ReadableType.Array -> res.add(nativeArrayToApolloArray(v.asArray()))
            v.type == ReadableType.Map -> res.add(nativeMapToApolloMap(v.asMap()))
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return res
}

fun nativeMapToApolloMap(src: ReadableMap): Map<String, Any> {
    val i = src.keySetIterator()
    val res = mutableMapOf<String, Any>()
    while (i.hasNextKey()) {
        val k = i.nextKey()
        val v = src.getDynamic(k)
        if (v.isNull) {
            continue
        }
        when {
            v.type == ReadableType.Number -> res[k] = v.asDouble().toBigDecimal()
            v.type == ReadableType.Boolean -> res[k] = v.asBoolean()
            v.type == ReadableType.String -> res[k] = v.asString()
            v.type == ReadableType.Map -> res[k] = nativeMapToApolloMap(v.asMap())
            v.type == ReadableType.Array -> res[k] = nativeArrayToApolloArray(v.asArray())
            else -> throw Error("Unknown type: " + v.type)
        }
    }
    return res
}