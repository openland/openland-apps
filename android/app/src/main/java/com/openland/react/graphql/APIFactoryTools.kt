package com.openland.react.graphql

import com.facebook.react.bridge.ReadableMap

fun readStringList(src: ReadableMap, key: String): List<String?>? {
    return null
}

fun readString(src: ReadableMap, key: String): String? {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            null
        } else {
            src.getString(key)
        }
    }
    return null
}

fun readInt(src: ReadableMap, key: String): Int? {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            null
        } else {
            src.getInt(key)
        }
    }
    return null
}

fun readBool(src: ReadableMap, key: String): Boolean? {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            null
        } else {
            src.getBoolean(key)
        }
    }
    return null
}

fun <T> notNull(src: T?): T {
    return src!!
}

fun <T> notNullListItems(src: List<T?>?): List<T>? {
    return src?.map { it!! }
}