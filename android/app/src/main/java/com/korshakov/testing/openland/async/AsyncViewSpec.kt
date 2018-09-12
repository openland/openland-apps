package com.korshakov.testing.openland.async

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import dk.madslee.imageCapInsets.utils.RCTResourceDrawableIdHelper
import java.io.IOException
import java.net.URL

val helper = RCTResourceDrawableIdHelper()

class AsyncPatch {
    var source: Bitmap? = null
    var scale: Float = 1.0f
    var top: Float = 0.0f
    var right: Float = 0.0f
    var bottom: Float = 0.0f
    var left: Float = 0.0f
}

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
    var backgroundPatch: AsyncPatch? = null
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
    var highlightColor: Int? = null
    var overlay: Boolean = false
}

class AsyncTextSpec(key: String, val children: List<Any>) : AsyncViewSpec(key) {
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

class AsyncImageSpec(key: String, val url: String?) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()
    var touchableKey: String? = null
}

private fun resolveChildren(src: JsonObject, context: ReactContext): Array<AsyncViewSpec> {
    val res = src["children"] as JsonArray<JsonObject>?
    if (res == null || res.size == 0) {
        return emptyArray()
    }
    return res.map { resolveSpec(it, context) }.toTypedArray()
}

private fun resolveTextChildren(src: JsonObject, context: ReactContext): List<Any> {
    val res = mutableListOf<Any>()
    for (item in src["children"] as JsonArray<JsonObject>) {
        when {
            item["type"] == "value" -> res.add(item["value"] as String)
            item["type"] == "text" -> res.add(resolveSpec(item, context))
            else -> error("Non-text value in text node")
        }
    }
    return res
}

private fun resolveStyle(src: JsonObject, res: AsyncViewStyle, context: ReactContext) {
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
    (props["backgroundPatch"] as? JsonObject)?.let {
        val patch = AsyncPatch()
        var bitmap: Bitmap? = null

        try {
            val url = it["source"] as String
            if (url.startsWith("http")) {
                val loaded = URL(it["source"] as String).openStream()
                bitmap = BitmapFactory.decodeStream(loaded)
            } else {
                bitmap = BitmapFactory.decodeResource(context.resources, helper.getResourceDrawableId(context, url))
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }

        patch.scale = (it["scale"] as Number).toFloat()
        patch.source = bitmap
        // res.background(BitmapDrawable(context.resources, bitmap))
        // patch.source = it["source"] as String
        patch.left = (it["left"] as Number).toFloat()
        patch.top = (it["top"] as Number).toFloat()
        patch.right = (it["right"] as Number).toFloat()
        patch.bottom = (it["bottom"] as Number).toFloat()
        res.backgroundPatch = patch
    }
}

private fun resolveSpec(src: JsonObject, context: ReactContext): AsyncViewSpec {
    val type = src["type"] as String
    val key = src["key"] as String
    if (type == "flex") {
        val props = src["props"] as JsonObject
        val res = AsyncFlexSpec(key, resolveChildren(src, context))
        resolveStyle(src, res.style, context)

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

        if (props["overlay"] is Boolean) {
            res.overlay = props["overlay"] as Boolean
        }

        if (props["highlightColor"] is Number) {
            res.highlightColor = (props["highlightColor"] as Number).toInt()
        }

        return res
    } else if (type == "text") {
        val props = src["props"] as JsonObject
        val res = AsyncTextSpec(key, resolveTextChildren(src, context))
        resolveStyle(src, res.style, context)

        (props["fontSize"] as? Number)?.let { res.fontSize = it.toFloat() }
        (props["color"] as? Number)?.let { res.color = it.toInt() }
        (props["lineHeight"] as? Number)?.let { res.lineHeight = it.toFloat() }
        return res
    } else if (type == "image") {
        val props = src["props"] as JsonObject
        val res = AsyncImageSpec(key, props["source"] as? String?)
        if (props["touchableKey"] is String) {
            res.touchableKey = props["touchableKey"] as String
        }
        resolveStyle(src, res.style, context)
        return res
    }

    error("Unable to resolve spec: $type")
}

fun parseSpec(src: String, context: ReactContext): AsyncViewSpec {
    val parser = Parser()
    val parsed = parser.parse(StringBuilder(src)) as JsonObject
    return resolveSpec(parsed, context)
}