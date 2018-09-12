package com.openland.react.anim

import android.util.Log
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser

class RNSAnimationTransactionSpec {
    var duration: Float = 0.3f
    var animations = mutableListOf<RNFastAnimationSpec>()
}

enum class RNSAnimationType {
    timing
}

enum class RNSEasingType {
    material,
    linear,
    bezier
}

class RNSEasing {
    var type: RNSEasingType = RNSEasingType.linear
    var bezier: Array<Float>? = null
}

class RNFastAnimationSpec {
    var type: RNSAnimationType = RNSAnimationType.timing
    var easing: RNSEasing = RNSEasing()
    var viewKey: String = ""
    var property: String = ""
    var to: Float = 0.0f
    var from: Float = 0.0f

    var duration: Float? = null
    var optional: Boolean = false
}

fun parseAnimationSpec(spec: String): RNSAnimationTransactionSpec {
    val res = RNSAnimationTransactionSpec()
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(spec)) as JsonObject
    if (parsed["duration"] is Number) {
        res.duration = (parsed["duration"] as Number).toFloat()
    }
    for (anim in parsed["animations"] as JsonArray<JsonObject>) {
        val aspec = RNFastAnimationSpec()
        when (anim["type"] as String) {
            "spring" -> {
                Log.d("RNSAnimated", "Spring animations are not supported on Android")
            }
            "timing" -> aspec.type = RNSAnimationType.timing
        }

        aspec.viewKey = anim["view"] as String
        aspec.property = anim["prop"] as String
        aspec.to = (anim["to"] as Number).toFloat()
        aspec.from = (anim["from"] as Number).toFloat()

        // Easing
        if (anim["easing"] is JsonObject) {
            val eas = anim["easing"] as JsonObject
            when(eas["type"] as String) {
                "linear" -> aspec.easing = RNSEasing().apply { type = RNSEasingType.linear }
                "material" -> aspec.easing = RNSEasing().apply { type = RNSEasingType.material }
                "bezier" -> aspec.easing = RNSEasing().apply { type = RNSEasingType.bezier; bezier = (eas["bezier"] as JsonArray<Number>).map { it.toFloat() }.toTypedArray() }
            }
        }

        // Duration
        if (anim["duration"] is Number) {
            aspec.duration = (anim["duration"] as Number).toFloat()
        }

        // Optional
        if (anim["optional"] is Boolean) {
            aspec.optional = anim["optional"] as Boolean
        }

        res.animations.add(aspec)
    }
    return res
}