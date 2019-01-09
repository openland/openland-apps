package com.openland.react.async.views

import android.view.View
import com.facebook.litho.annotations.LayoutSpec
import com.facebook.litho.annotations.OnCreateLayout
import com.facebook.litho.annotations.Prop
import com.openland.react.async.*
import com.facebook.litho.annotations.FromEvent
import com.facebook.litho.annotations.OnEvent
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.WritableNativeMap
import android.content.res.Resources
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.generic.RoundingParams
import com.facebook.litho.*
import com.facebook.litho.fresco.FrescoImage


@LayoutSpec
object LithoImageSpec {

    @OnCreateLayout
    internal fun onCreateLayout(context: ComponentContext, @Prop spec: AsyncImageSpec, @Prop reactContext: ReactContext): Component {
        var uri = spec.url
        if(uri !== null && !(uri.startsWith("http://") || uri.startsWith("https://") || uri.startsWith("file://"))){
            uri = helper.getResourceDrawableUri(context, spec.url).toString()
        }
        val controller = Fresco.newDraweeControllerBuilder()
                .setUri(uri)
                .build()

        var res = FrescoImage.create(context)
                .controller(controller)
                .fadeDuration(0)

        if(spec.touchableKey !== null){
            res = res.clickHandler(LithoImage.onClick(context))
        }
        res = res.longClickHandler(LithoImage.onLongClick(context))


        if (spec.style.borderRadius != null) {
            res = res.roundingParams(RoundingParams.fromCornersRadius(Resources.getSystem().displayMetrics.density * spec.style.borderRadius!!))
        }

        return resolveStyle(context, res, spec.style)
    }

    @OnEvent(ClickEvent::class)
    @JvmName("onClick")
    internal fun onClick(c: ComponentContext, @FromEvent view: View, @Prop spec: AsyncImageSpec, @Prop reactContext: ReactContext) {
        val map = WritableNativeMap()
        map.putString("key", spec.touchableKey)
        val loc = IntArray(2)
        view.getLocationInWindow(loc)
        map.putInt("x", Math.round(loc[0] / Resources.getSystem().displayMetrics.density ))
        map.putInt("y", Math.round(loc[1]/ Resources.getSystem().displayMetrics.density ) - 24)
        map.putInt("w", Math.round(view.width/ Resources.getSystem().displayMetrics.density ))
        map.putInt("h", Math.round(view.height/ Resources.getSystem().displayMetrics.density ))
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("async_on_press", map)
    }

    @OnEvent(LongClickEvent::class)
    @JvmName("onLongClick")
    internal fun onLongClick(c: ComponentContext, @FromEvent view: View, @Prop spec: AsyncImageSpec, @Prop reactContext: ReactContext): Boolean {
        return false
    }
}