package com.openland.spacex.utils

import android.util.Log

val TRACING_ENABLED = false

inline fun <T> trace(name: String, handler: () -> T): T {
    return if (TRACING_ENABLED) {
        val start = System.currentTimeMillis()
        val res = handler()
        val delta = System.currentTimeMillis() - start
        Log.d("SpaceX-Trace", "[${DispatchQueue.currentQueue ?: ""}] $name completed in $delta ms")
        res
    } else {
        handler()
    }
}