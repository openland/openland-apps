package com.korshakov.testing.openland.async

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser

class RNFastAnimationTransactionSpec {
    var duration: Float = 0.3f
    var animations = mutableListOf<RNFastAnimationSpec>()
}

enum class RNFastAnimationType {
    spring,
    timing
}

class RNFastAnimationSpec {
    var type: RNFastAnimationType = RNFastAnimationType.timing
    var viewKey: String = ""
    var property: String = ""
    var to: Float = 0.0f
    var from: Float = 0.0f

    var duration: Float? = null
    var optional: Boolean = false
}

fun parseAnimationSpec(spec: String): RNFastAnimationTransactionSpec {
    val res = RNFastAnimationTransactionSpec()
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(spec)) as JsonObject
    if (parsed["duration"] is Number) {
        res.duration = (parsed["duration"] as Number).toFloat()
    }
    for (anim in parsed["animations"] as JsonArray<JsonObject>) {
        val aspec = RNFastAnimationSpec()
        when (anim["type"] as String) {
            "spring" -> aspec.type = RNFastAnimationType.spring
            "timing" -> aspec.type = RNFastAnimationType.timing
        }
        aspec.viewKey = anim["view"] as String
        aspec.property = anim["prop"] as String
        aspec.to = (anim["to"] as Number).toFloat()
        aspec.from = (anim["from"] as Number).toFloat()

//        // Duration
//        if let duration = anim["duration"].double {
//            aspec.duration = duration
//        }
//
//        if let optional = anim["optional"].bool {
//            aspec.optional = optional
//        }

        res.animations.add(aspec)
    }
    return res
}