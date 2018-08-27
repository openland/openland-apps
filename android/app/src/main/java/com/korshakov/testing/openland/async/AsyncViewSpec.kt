package com.korshakov.testing.openland.async

import android.graphics.Color
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser

class AsyncViewStyle {
    var height: Float? = null
    var width: Float? = null
    var flexGrow: Float = 0.0f
    var flexShrink: Float = 0.0f
    var flexBasis: Float? = null
    var alignSelf: AsyncFlexAlignSelf? = null

    var marginBottom: Float? = null
    var marginTop: Float? = null
    var marginLeft: Float? = null
    var marginRight: Float? = null

    var backgroundColor: Int? = null
    var borderRadius: Float? = null
//    var backgroundGradient: [UIColor]?
}

abstract class AsyncViewSpec(val key: String)

enum class AsyncFlexDirection {
    row,
    column
}

enum class AsyncFlexAlignItems {
    start,
    end,
    center,
    stretch
}

enum class AsyncFlexJustifyContent {
    start,
    end,
    center
}

enum class AsyncFlexAlignSelf {
    start,
    end,
    center,
    stretch
}

class AsyncFlexSpec(key: String, val children: Array<AsyncViewSpec>) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()
    var direction: AsyncFlexDirection = AsyncFlexDirection.row
    var alignItems: AsyncFlexAlignItems = AsyncFlexAlignItems.start
    var justifyContent: AsyncFlexJustifyContent = AsyncFlexJustifyContent.start
    var touchableKey: String? = null
}

class AsyncTextSpec(key: String, val text: String) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()

    var fontSize: Float = 12.0f
    var lineHeight: Float? = null
    var fontWeight: Float? = null
    var color: Int = Color.BLACK
    var numberOfLines: Int? = null
//    var fontSize: Float = 12
//    var lineHeight: Float?
//    var fontWeight: UIFontWeight = UIFontWeightRegular
//    var color: UIColor = UIColor.black
//    var numberOfLines: Int?
}

class AsyncImageSpec(key: String, val url: String) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()
}

class AsyncListSpec(key: String, val children: Array<AsyncViewSpec>) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()
}

private fun resolveChildren(src: JsonObject): Array<AsyncViewSpec> {
    val res = src["children"] as JsonArray<JsonObject>?
    if (res == null || res.size == 0) {
        return emptyArray()
    }
    return res.map { resolveSpec(it) }.toTypedArray()
}

private fun resolveTextChildren(src: JsonObject): String {
    var res = ""
    for (item in src["children"] as JsonArray<JsonObject>) {
        if (item["type"] == "value") {
            res += item["value"] as String
        } else {
            error("Non-text value in text node")
        }
    }
    return res;
}

private fun resolveStyle(src: JsonObject, res: AsyncViewStyle) {
    val props = src["props"] as JsonObject

    (props["width"] as? Number)?.let {
        res.width = it.toFloat()
    }
    (props["height"] as? Number)?.let {
        res.height = it.toFloat()
    }

    (props["flexGrow"] as? Number)?.let {
        res.flexGrow = it.toFloat()
    }
    (props["flexBasis"] as? Number)?.let {
        res.flexBasis = it.toFloat()
    }
    (props["flexShrink"] as? Number)?.let {
        res.flexShrink = it.toFloat()
    }

    (props["alignSelf"] as? String)?.let {
        res.alignSelf = when (props["alignSelf"]) {
            "flex-start" -> AsyncFlexAlignSelf.start
            "flex-end" -> AsyncFlexAlignSelf.end
            "center" -> AsyncFlexAlignSelf.center
            "stretch" -> AsyncFlexAlignSelf.stretch
            else -> null
        }
    }

    (props["marginTop"] as? Number)?.let {
        res.marginTop = it.toFloat()
    }
    (props["marginBottom"] as? Number)?.let {
        res.marginBottom = it.toFloat()
    }
    (props["marginLeft"] as? Number)?.let {
        res.marginLeft = it.toFloat()
    }
    (props["marginRight"] as? Number)?.let {
        res.marginRight = it.toFloat()
    }

    (props["borderRadius"] as? Number)?.let {
        res.borderRadius = it.toFloat()
    }

    (props["backgroundColor"] as? Number)?.let {
        res.backgroundColor = it.toInt()
    }
}

private fun resolveSpec(src: JsonObject): AsyncViewSpec {
    val type = src["type"] as String
    val key = src["key"] as String
    if (type == "flex") {
        val props = src["props"] as JsonObject
        val res = AsyncFlexSpec(key, resolveChildren(src))
        resolveStyle(src, res.style)

        // Direction
        res.direction = when (props["flexDirection"]) {
            "row" -> AsyncFlexDirection.row
            "column" -> AsyncFlexDirection.column
            else -> res.direction
        }

        // Align Items
        res.alignItems = when (props["alignItems"]) {
            "flex-start" -> AsyncFlexAlignItems.start
            "flex-end" -> AsyncFlexAlignItems.end
            "center" -> AsyncFlexAlignItems.center
            "stretch" -> AsyncFlexAlignItems.stretch
            else -> res.alignItems
        }

        // Justify Content
        res.justifyContent = when (props["justifyContent"]) {
            "flex-start" -> AsyncFlexJustifyContent.start
            "flex-end" -> AsyncFlexJustifyContent.end
            "center" -> AsyncFlexJustifyContent.center
            else -> res.justifyContent
        }

        if (props["touchableKey"] is String) {
            res.touchableKey = props["touchableKey"] as String
        }

//        if let v = src["props"]["touchableKey"].string {
//            res.touchableKey = v
//        }
//        if let v = src["props"]["highlightColor"].uInt64 {
//            res.highlightColor = resolveColorR(v)
//        }

        return res
    } else if (type == "text") {
        val props = src["props"] as JsonObject
        val res = AsyncTextSpec(key, resolveTextChildren(src))
        resolveStyle(src, res.style)

        (props["fontSize"] as? Number)?.let { res.fontSize = it.toFloat() }
        (props["color"] as? Number)?.let { res.color = it.toInt() }

        return res
    } else if (type == "image") {
        val props = src["props"] as JsonObject
        val res = AsyncImageSpec(key, props["source"] as String)
        resolveStyle(src, res.style)
        return res
    } else if (type == "list") {
        val props = src["props"] as JsonObject
        val res = AsyncListSpec(key, resolveChildren(src))
        resolveStyle(src, res.style)
        return res
    }

    error("Unable to resolve spec: $type")
}

fun parseSpec(src: String): AsyncViewSpec {
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(src)) as JsonObject
    return resolveSpec(parsed)
}