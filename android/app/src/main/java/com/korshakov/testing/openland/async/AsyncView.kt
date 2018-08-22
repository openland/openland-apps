package com.korshakov.testing.openland.async

import android.content.Context
import android.widget.FrameLayout
import com.facebook.litho.ComponentContext
import com.facebook.litho.LithoView
import com.facebook.litho.widget.Text
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManager
import android.support.v4.view.accessibility.AccessibilityRecordCompat.setSource
import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.views.image.ReactImageView
import com.facebook.react.uimanager.annotations.ReactProp


class AsyncView(context: Context?) : FrameLayout(context) {
    val asyncNode: LithoView
    val asyncContext = ComponentContext(context)

    init {
        asyncNode = LithoView.create(context,
                Text.create(asyncContext)
                        .text("Hello world!")
                        .build()
        )
        this.addView(asyncNode,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT)
        )
    }

}

class AsyncViewManager : SimpleViewManager<AsyncView>() {

    override fun getName(): String {
        return "RNAsyncView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext?): AsyncView {
        return AsyncView(reactContext)
    }

    @ReactProp(name = "config")
    fun setConfig(view: AsyncView, config: String) {
        // TODO: Implement
    }
}

class AsyncPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext?): MutableList<NativeModule> {
        return mutableListOf()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext?): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(AsyncViewManager() as ViewManager<View, ReactShadowNode<*>>)
    }
}