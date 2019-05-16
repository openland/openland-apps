package com.openland.react.async.views

import android.graphics.Color
import android.graphics.Typeface
import android.text.*
import android.text.style.AbsoluteSizeSpan
import android.view.View
import com.facebook.litho.Component
import com.facebook.litho.ComponentContext
import com.facebook.litho.annotations.LayoutSpec
import com.facebook.litho.annotations.OnCreateLayout
import com.facebook.litho.annotations.Prop
import com.openland.react.async.*
import com.facebook.litho.annotations.FromEvent
import com.facebook.litho.ClickEvent
import com.facebook.litho.annotations.OnEvent
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.WritableNativeMap
import android.text.style.ClickableSpan
import android.text.style.ForegroundColorSpan
import android.text.style.BackgroundColorSpan
import android.text.style.TypefaceSpan
import com.facebook.litho.widget.Text
import com.facebook.react.uimanager.PixelUtil

@LayoutSpec
object LithoTextSpec {

    private val fontCache = mutableMapOf<String, Typeface>()

    private fun resolveText(spec: AsyncTextSpec, reactContext: ReactContext, context: ComponentContext): SpannableStringBuilder {
        val sb = SpannableStringBuilder()
        for (s in spec.children) {
            if (s is String) {
                sb.append(s)
            } else if (s is AsyncTextSpec) {
                val part = resolveText(s, reactContext, context)
                if (s.touchableKey != null) {
                    val span = object : ClickableSpan() {
                        override fun onClick(view: View) {
                            val map = WritableNativeMap()
                            map.putString("key", s.touchableKey)
                            val loc = IntArray(2)
                            view.getLocationInWindow(loc)
                            map.putInt("x", loc[0])
                            map.putInt("y", loc[1])
                            map.putInt("w", view.width)
                            map.putInt("h", view.height)
                            reactContext
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                    .emit("async_on_press", map)
                        }

                        override fun updateDrawState(ds: TextPaint?) {
                            super.updateDrawState(ds)
                            if (ds != null) {
                                ds.isUnderlineText = s.underline
                                ds.color = spec.color
                            }

                        }
                    }
                    part.setSpan(span, 0, part.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)


                }
                if (s.fontSize !== null) {
                    part.setSpan(AbsoluteSizeSpan(s.fontSize!!.toInt(), true), 0, part.length, Spannable.SPAN_INCLUSIVE_EXCLUSIVE)
                }

                if (s.fontWeight !== null || s.fontStyle !== null) {
                    val span = object : TypefaceSpan(s.fontWeight) {

                        override fun updateDrawState(ds: TextPaint?) {
                            super.updateDrawState(ds)
                            if (ds != null) {
                                ds.typeface = resolveFont(context, s.fontWeight, s.fontStyle)
                            }

                        }
                    }

                    part.setSpan(span, 0, part.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                }

                if (s.backgroundColor != null) {
                    part.setSpan(BackgroundColorSpan(s.backgroundColor!!), 0, part.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                }

                if (s.color != Color.BLACK) {
                    part.setSpan(ForegroundColorSpan(s.color), 0, part.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                }

                sb.append(part)
            }
        }
        return sb
    }


    @OnCreateLayout
    internal fun onCreateLayout(context: ComponentContext, @Prop spec: AsyncTextSpec, @Prop reactContext: ReactContext): Component {
        val fontSize = if (spec.fontSize !== null) spec.fontSize!! else 12f
        val opacity = if (spec.opacity !== null) spec.opacity!! else 1f
        val res = Text.create(context)
                .key(spec.key)
                .textSizeDip(fontSize)
                .typeface(resolveFont(context, spec.fontWeight, spec.fontStyle))
                .textColor(spec.color)
                .alpha(opacity)
                .shouldIncludeFontPadding(false)

        if (spec.backgroundColor != null) {
            res.backgroundColor(spec.backgroundColor!!)
        }

        if (spec.touchableKey != null) {
            res.clickHandler(LithoText.onClick(context))
        }

        if (spec.numberOfLines != null) {
            res.maxLines(spec.numberOfLines!!)
            res.ellipsize(TextUtils.TruncateAt.END)
        }

        when (spec.textAlign) {
            "center" -> res.textAlignment(Layout.Alignment.ALIGN_CENTER)
            "left" -> res.textAlignment(Layout.Alignment.ALIGN_NORMAL)
            "right" -> res.textAlignment(Layout.Alignment.ALIGN_OPPOSITE)
        }

        // Fix line height
        val text = SpannableString(resolveText(spec, reactContext, context))
        var actualLineHeight = if (spec.lineHeight != null) spec.lineHeight!! else fontSize * 1.2f
        actualLineHeight = PixelUtil.toPixelFromDIP(actualLineHeight)
        text.setSpan(CustomLineHeightSpan(actualLineHeight), 0, text.length, Spannable.SPAN_INCLUSIVE_INCLUSIVE);
        res.text(text)

        // TODO: Handle styles
        return resolveStyle(context, res, spec.style)
    }

    @OnEvent(ClickEvent::class)
    @JvmName("onClick")
    internal fun onClick(c: ComponentContext, @FromEvent view: View, @Prop spec: AsyncTextSpec, @Prop reactContext: ReactContext) {
        val map = WritableNativeMap()
        map.putString("key", spec.touchableKey)
        val loc = IntArray(2)
        view.getLocationInWindow(loc)
        map.putInt("x", loc[0])
        map.putInt("y", loc[1])
        map.putInt("w", view.width)
        map.putInt("h", view.height)
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("async_on_press", map)
    }

    private fun resolveFont(context: ComponentContext, weight: String?, style: String?): Typeface? {
        val weightStyle = (if (weight !== null) weight else "400") + (if (style == "italic") "-italic" else "")

        return when (weightStyle) {
            "100" -> loadFromAsset(context, "fonts/Roboto-Thin.ttf")
            "300" -> loadFromAsset(context, "fonts/Roboto-Light.ttf")
            "400" -> loadFromAsset(context, "fonts/Roboto-Regular.ttf")
            "500" -> loadFromAsset(context, "fonts/Roboto-Medium.ttf")
            "700" -> loadFromAsset(context, "fonts/Roboto-Bold.ttf")
            "900" -> loadFromAsset(context, "fonts/Roboto-Black.ttf")
            "100-italic" -> loadFromAsset(context, "fonts/Roboto-ThinItalic.ttf")
            "300-italic" -> loadFromAsset(context, "fonts/Roboto-LightItalic.ttf")
            "400-italic" -> loadFromAsset(context, "fonts/Roboto-Italic.ttf")
            "500-italic" -> loadFromAsset(context, "fonts/Roboto-MediumItalic.ttf")
            "700-italic" -> loadFromAsset(context, "fonts/Roboto-BoldItalic.ttf")
            "900-italic" -> loadFromAsset(context, "fonts/Roboto-BlackItalic.ttf")
            else -> null
        }
    }

    private fun loadFromAsset(context: ComponentContext, path: String): Typeface {
        synchronized(fontCache) {
            val res = fontCache[path]
            if (res != null) {
                return res
            }
            val res2 = Typeface.createFromAsset(context.applicationContext.assets, path)
            fontCache[path] = res2
            return res2
        }
    }

}