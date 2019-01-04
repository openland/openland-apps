package com.openland.react.async.views

import android.graphics.Typeface
import android.text.*
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
import com.facebook.litho.widget.Text
import com.facebook.react.uimanager.PixelUtil


@LayoutSpec
object LithoTextSpec {

    private fun resolveText(spec: AsyncTextSpec, reactContext: ReactContext): SpannableStringBuilder {
        val sb = SpannableStringBuilder()
        for (s in spec.children) {
            if (s is String) {
                sb.append(s)
            } else if (s is AsyncTextSpec) {
                val part = resolveText(s, reactContext)
                if(s.touchableKey != null){
                    val span = object : ClickableSpan() {
                        override fun onClick(view: View){
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
                            if(ds!=null){
                                ds.isUnderlineText = true
                                ds.color = spec.color
                            }

                        }
                    }
                    part.setSpan(span, 0, part.length ,  Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                }
                sb.append(part)
            }
        }
        return sb
    }


    @OnCreateLayout
    internal fun onCreateLayout(context: ComponentContext, @Prop spec: AsyncTextSpec, @Prop reactContext: ReactContext): Component {
        val res = Text.create(context)
                .key(spec.key)
                .textSizeDip(spec.fontSize)
                .typeface(resolveFont(context, spec.fontWeight))
                .textColor(spec.color)
                .shouldIncludeFontPadding(false)
        if(spec.touchableKey != null){
            res.clickHandler(LithoText.onClick(context))
        }

        if (spec.numberOfLines != null) {
            res.maxLines(spec.numberOfLines!!)
            res.ellipsize(TextUtils.TruncateAt.END)
        }

        // Fix line height
        val text = SpannableString(resolveText(spec, reactContext))
        var actualLineHeight = if (spec.lineHeight != null) spec.lineHeight!! else spec.fontSize * 1.6f
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

    private fun resolveFont(context: ComponentContext, weight: String?): Typeface?{
        return when (weight) {
            "100" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Thin.ttf")
            "300" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Light.ttf")
            "400" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Regular.ttf")
            "500" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Medium.ttf")
            "700" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Bold.ttf")
            "900" -> Typeface.createFromAsset(context.assets,"fonts/Roboto-Black.ttf")
            else -> null
        }
    }
}