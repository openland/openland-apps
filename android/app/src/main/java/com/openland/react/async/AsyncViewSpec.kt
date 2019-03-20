package com.openland.react.async

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.util.Log
import com.facebook.react.bridge.ReactContext
import com.facebook.react.views.imagehelper.ImageSource
import dk.madslee.imageCapInsets.utils.RCTResourceDrawableIdHelper
import org.json.JSONObject
import java.io.IOException
import java.net.URL

fun JSONObject.nullableString(key: String): String? = if (has(key)) {
    getString(key)
} else {
    null
}

fun JSONObject.nullableFloat(key: String): Float? = if (has(key)) {
    val k = get(key)
    if (k is Number) {
        k.toFloat()
    } else {
        null
    }
} else {
    null
}

fun JSONObject.nullableInt(key: String): Int? = if (has(key)) {
    val k = get(key)
    if (k is Number) {
        k.toInt()
    } else {
        null
    }
} else {
    null
}

fun JSONObject.nullableBoolean(key: String): Boolean? = if (has(key)) {
    getBoolean(key)
} else {
    null
}

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
    var maxWidth: Float? = null
    var maxHeight: Float? = null
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
    var backgroundPatchTintColor: Int? = null

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

    var fontSize: Float? = null
    var opacity: Float? = null
    var lineHeight: Float? = null
    var fontWeight: String? = null
    var color: Int = Color.BLACK
    var numberOfLines: Int? = null
    var touchableKey: String? = null
    var underline: Boolean = false
    var textAlign: String? = null
    var fontStyle: String? = null
//    var fontSize: Float = 12
//    var lineHeight: Float?
//    var fontWeight: UIFontWeight = UIFontWeightRegular
//    var color: UIColor = UIColor.black
//    var numberOfLines: Int?
}

class AsyncImageSpec(key: String, val url: String?) : AsyncViewSpec(key) {
    var style: AsyncViewStyle = AsyncViewStyle()
    var touchableKey: String? = null
    var tintColor: Int? = null
}

private fun resolveChildren(src: JSONObject, context: ReactContext): Array<AsyncViewSpec> {
    val children = src.getJSONArray("children")
    if (children == null || children.length() == 0) {
        return emptyArray()
    }
    val res = mutableListOf<AsyncViewSpec>()
    for (i in 0 until children.length()) {
        res.add(resolveSpec(children.getJSONObject(i), context))
    }
    return res.toTypedArray()
}

private fun resolveTextChildren(src: JSONObject, context: ReactContext): List<Any> {
    val res = mutableListOf<Any>()
    val children = src.getJSONArray("children")
    for (i in 0 until children.length()) {
        val item = children.getJSONObject(i)
        when {
            item["type"] == "value" -> res.add(item["value"] as String)
            item["type"] == "text" -> res.add(resolveSpec(item, context))
            else -> error("Non-text value in text node")
        }
    }
    return res
}

private fun resolveStyle(src: JSONObject, res: AsyncViewStyle, context: ReactContext) {
    val props = src.getJSONObject("props")

    props.nullableFloat("width")?.let { res.width = it }
    props.nullableFloat("maxWidth")?.let { res.maxWidth = it }
    props.nullableFloat("height")?.let { res.height = it }
    props.nullableFloat("maxHeight")?.let { res.maxHeight = it }
    props.nullableFloat("flexGrow")?.let { res.flexGrow = it }
    props.nullableFloat("flexBasis")?.let { res.flexBasis = it }
    props.nullableFloat("flexShrink")?.let { res.flexShrink = it }


    res.alignSelf = when (props.nullableString("alignSelf")) {
        "flex-start" -> AsyncFlexAlignSelf.start
        "flex-end" -> AsyncFlexAlignSelf.end
        "center" -> AsyncFlexAlignSelf.center
        "stretch" -> AsyncFlexAlignSelf.stretch
        else -> null
    }

    props.nullableFloat("marginTop")?.let { res.marginTop = it }
    props.nullableFloat("marginBottom")?.let { res.marginBottom = it }
    props.nullableFloat("marginLeft")?.let { res.marginLeft = it }
    props.nullableFloat("marginRight")?.let { res.marginRight = it }
    props.nullableFloat("borderRadius")?.let { res.borderRadius = it }

    props.nullableInt("backgroundColor")?.let { res.backgroundColor = it }
    props.nullableInt("backgroundPatchTintColor")?.let { res.backgroundPatchTintColor = it }

    if (props.has("backgroundPatch")) {
        props.getJSONObject("backgroundPatch").let {
            val patch = AsyncPatch()
            var bitmap: Bitmap? = null
            val url = it["source"] as String
            var isResource = false
            try {
                var resUrl = ImageSource(context, url).uri.toString()
                Log.d("SView", "Image source: $resUrl, from $url")
                if (resUrl.startsWith("http://") || resUrl.startsWith("https://") || resUrl.startsWith("file://")) {
                    val loaded = URL(resUrl).openStream()
                    bitmap = BitmapFactory.decodeStream(loaded)
                } else {
                    isResource = true
                    bitmap = BitmapFactory.decodeResource(context.resources, helper.getResourceDrawableId(context, url))!!
                }
            } catch (e: IOException) {
                Log.d("SView", "Unable to laod image: $url")
                e.printStackTrace()
            }

            if (isResource && bitmap != null) {
                patch.scale = bitmap.density / 160.0f
            } else {
                patch.scale = (it["scale"] as Number).toFloat()
            }
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
}

fun resolveSpec(src: JSONObject, context: ReactContext): AsyncViewSpec {
    val type = src["type"] as String
    val key = src["key"] as String
    if (type == "flex") {
        val props = src["props"] as JSONObject
        val res = AsyncFlexSpec(key, resolveChildren(src, context))
        resolveStyle(src, res.style, context)

        // Direction
        res.direction = when (props.nullableString("flexDirection")) {
            "row" -> AsyncFlexDirection.row
            "column" -> AsyncFlexDirection.column
            else -> res.direction
        }

        // Align Items
        res.alignItems = when (props.nullableString("alignItems")) {
            "flex-start" -> AsyncFlexAlignItems.start
            "flex-end" -> AsyncFlexAlignItems.end
            "center" -> AsyncFlexAlignItems.center
            "stretch" -> AsyncFlexAlignItems.stretch
            else -> res.alignItems
        }

        // Justify Content
        res.justifyContent = when (props.nullableString("justifyContent")) {
            "flex-start" -> AsyncFlexJustifyContent.start
            "flex-end" -> AsyncFlexJustifyContent.end
            "center" -> AsyncFlexJustifyContent.center
            else -> res.justifyContent
        }

        props.nullableString("touchableKey")?.let { res.touchableKey = it }

//        if let v = src["props"]["touchableKey"].string {
//            res.touchableKey = v
//        }
//        if let v = src["props"]["highlightColor"].uInt64 {
//            res.highlightColor = resolveColorR(v)
//        }

        props.nullableBoolean("overlay")?.let { res.overlay = it }

        props.nullableInt("highlightColor")?.let { res.highlightColor = it }
        return res
    } else if (type == "text") {
        val props = src["props"] as JSONObject
        val res = AsyncTextSpec(key, resolveTextChildren(src, context))
        resolveStyle(src, res.style, context)

        props.nullableFloat("fontSize")?.let { res.fontSize = it }
        props.nullableString("fontWeight")?.let { res.fontWeight = it }
        props.nullableInt("color")?.let { res.color = it }
        props.nullableFloat("opacity")?.let { res.opacity = it }
        props.nullableString("textDecorationLine")?.let { res.underline = it == "underline" }
        props.nullableString("textAlign")?.let { res.textAlign = it }
        props.nullableString("fontStyle")?.let { res.fontStyle = it }

        props.nullableFloat("lineHeight")?.let { res.lineHeight = it }
        props.nullableString("touchableKey")?.let { res.touchableKey = it }
        return res
    } else if (type == "image") {
        val props = src["props"] as JSONObject
        val res = AsyncImageSpec(key, props.nullableString("source"))
        props.nullableString("touchableKey")?.let { res.touchableKey = it }
        props.nullableInt("tintColor")?.let { res.tintColor = it }
        resolveStyle(src, res.style, context)
        return res
    }

    error("Unable to resolve spec: $type")
}

fun parseSpec(src: String, context: ReactContext): AsyncViewSpec {
    var start = System.currentTimeMillis()
    val parsed = JSONObject(src)
    Log.d("SView-Parsing", "Parsed in " + (System.currentTimeMillis() - start) + " ms, size: " + src.length)
    start = System.currentTimeMillis()
    val res = resolveSpec(parsed, context)
    Log.d("SView-Resolve", "Resolved in " + (System.currentTimeMillis() - start) + " ms")
    return res
}