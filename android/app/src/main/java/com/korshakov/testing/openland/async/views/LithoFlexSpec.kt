package com.korshakov.testing.openland.async.views

import android.view.View
import com.facebook.litho.Column
import com.facebook.litho.Component
import com.facebook.litho.ComponentContext
import com.facebook.litho.Row
import com.facebook.litho.annotations.LayoutSpec
import com.facebook.litho.annotations.OnCreateLayout
import com.facebook.litho.annotations.Prop
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaJustify
import com.korshakov.testing.openland.async.*
import com.facebook.litho.annotations.FromEvent
import com.facebook.litho.ClickEvent
import com.facebook.litho.annotations.OnEvent
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.WritableNativeMap


@LayoutSpec
object LithoFlexSpec {

    @OnCreateLayout
    internal fun onCreateLayout(context: ComponentContext, @Prop spec: AsyncFlexSpec, @Prop reactContext: ReactContext): Component {

        val alignItems: YogaAlign = when (spec.alignItems) {
            AsyncFlexAlignItems.start -> YogaAlign.FLEX_START
            AsyncFlexAlignItems.end -> YogaAlign.FLEX_END
            AsyncFlexAlignItems.center -> YogaAlign.CENTER
            AsyncFlexAlignItems.stretch -> YogaAlign.STRETCH
        }

        val justifyContent: YogaJustify = when (spec.justifyContent) {
            AsyncFlexJustifyContent.start -> YogaJustify.FLEX_START
            AsyncFlexJustifyContent.end -> YogaJustify.FLEX_END
            AsyncFlexJustifyContent.center -> YogaJustify.CENTER
        }

        val res = if (spec.direction == AsyncFlexDirection.row) {
            Row.create(context)
        } else {
            Column.create(context)
        }

        res.key(spec.key)
        res.alignItems(alignItems)
        res.justifyContent(justifyContent)

        if (spec.touchableKey != null) {
            res.clickHandler(LithoFlex.onClick(context))
        }

        for (c in spec.children) {
            res.child(resolveNode(context, c, reactContext))
        }
        return resolveStyle(context, res, spec.style)
    }

    @OnEvent(ClickEvent::class)
    @JvmName("onClick")
    internal fun onClick(c: ComponentContext, @FromEvent view: View, @Prop spec: AsyncFlexSpec, @Prop reactContext: ReactContext) {
        val map = WritableNativeMap()
        map.putString("key", spec.touchableKey)
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("async_on_press", map)
    }
}