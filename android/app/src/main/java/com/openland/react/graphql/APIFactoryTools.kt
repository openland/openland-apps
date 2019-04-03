package com.openland.react.graphql

import com.apollographql.apollo.api.Input
import com.facebook.react.bridge.ReadableMap

fun readOptionalString(src: ReadableMap, key: String): Input<String> {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            Input.fromNullable(null)
        } else {
            Input.fromNullable(src.getString(key))
        }
    }
    return Input.absent()
}

fun readOptionalInt(src: ReadableMap, key: String): Input<Int> {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            Input.fromNullable(null)
        } else {
            Input.fromNullable(src.getInt(key))
        }
    }
    return Input.absent()
}

fun readOptionalBool(src: ReadableMap, key: String): Input<Boolean> {
    if (src.hasKey(key)) {
        return if (src.isNull(key)) {
            Input.fromNullable(null)
        } else {
            Input.fromNullable(src.getBoolean(key))
        }
    }
    return Input.absent()
}

fun readOptionalStringList(src: ReadableMap, key: String): Input<List<String?>> {
    return Input.absent()
}

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

fun <T> notNull(src: Input<T>): T {
    return src.value!!
}

fun <T> notNullListItems(src: List<T?>?): List<T>? {
    return src?.map { it!! }
}

fun <T> notNullListItems(src: Input<List<T?>>): Input<List<T>> {
    if (src.defined) {
        if (src.value != null) {
            return Input.fromNullable(src.value!!.map { it!! })
        } else {
            return Input.fromNullable(null)
        }
    }
    return Input.absent()
}