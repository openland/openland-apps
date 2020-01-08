package com.openland.react.anim

import android.util.Log
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser

class RNSAnimationTransactionSpec {
    var transactionKey: String? = null
    var duration: Float = 0.3f
    var animations = mutableListOf<RNSAnimationSpec>()
    var valueSets = mutableListOf<RNSValueSet>()
}

enum class RNSAnimationType {
    timing,
    circular
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

class RNSAnimationSpec {
    var type: RNSAnimationType = RNSAnimationType.timing
    var easing: RNSEasing = RNSEasing()
    var viewKey: String = ""
    var property: String = ""
    var to: Float = 0.0f
    var from: Float = 0.0f

    var centerX: Float = 0.0f
    var centerY: Float = 0.0f

    var duration: Float? = null
    var optional: Boolean = false
}

class RNSValueSet {
    var viewKey: String = ""
    var property: String = ""
    var value: Float = 0.0f
    var optional: Boolean = false
}

fun parseAnimationSpec(spec: String): RNSAnimationTransactionSpec {
    val res = RNSAnimationTransactionSpec()
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(spec)) as JsonObject
    if (parsed["duration"] is Number) {
        res.duration = (parsed["duration"] as Number).toFloat()
    }
    if (parsed["transactionKey"] is String) {
        res.transactionKey = parsed["transactionKey"] as String
    }
    for (anim in parsed["animations"] as JsonArray<JsonObject>) {
        val aspec = RNSAnimationSpec()
        when (anim["type"] as String) {
            "spring" -> {
                Log.d("RNSAnimated", "Spring animations are not supported on Android")
            }
            "timing" -> aspec.type = RNSAnimationType.timing
            "circular" -> {
                aspec.type = RNSAnimationType.circular
            }
        }

        aspec.viewKey = anim["view"] as String
        aspec.to = (anim["to"] as Number).toFloat()
        aspec.from = (anim["from"] as Number).toFloat()

        // Property
        if (aspec.type != RNSAnimationType.circular) {
            aspec.property = anim["prop"] as String
        }

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

        if (anim["centerX"] is Number) {
            aspec.centerX = (anim["centerX"] as Number).toFloat()
        }
        if (anim["centerY"] is Number) {
            aspec.centerY = (anim["centerY"] as Number).toFloat()
        }

        // Optional
        if (anim["optional"] is Boolean) {
            aspec.optional = anim["optional"] as Boolean
        }

        res.animations.add(aspec)
    }
    for (setter in parsed["valueSetters"] as JsonArray<JsonObject>) {
        val aspec = RNSValueSet()
        aspec.viewKey = setter["view"] as String
        aspec.property = setter["prop"] as String
        aspec.value = (setter["to"] as Number).toFloat()
        if (setter["optional"] is Boolean) {
            aspec.optional = setter["optional"] as Boolean
        }
        res.valueSets.add(aspec)
    }
    return res
}