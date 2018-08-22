package com.korshakov.testing.openland.async

import android.content.Context
import android.graphics.Color
import android.widget.FrameLayout
import com.facebook.litho.widget.Text
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManager
import android.support.v4.view.accessibility.AccessibilityRecordCompat.setSource
import android.view.View
import android.widget.TextView
import com.facebook.litho.*
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.litho.widget.Image
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.views.image.ReactImageView
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup
import com.korshakov.testing.openland.R

class AsyncView(context: Context?) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
    }

    fun setConfig(src: String) {
        val parsed = parseSpec(src)
        this.lithoView.setComponent(resolveNode(this.asyncContext, parsed))
        resolveNode(this.asyncContext, parsed)
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
        view.setConfig(config)
    }
}

class AsyncPackage : ReactPackage {
    constructor() {
        ComponentsConfiguration.incrementalMountUsesLocalVisibleBounds = false
    }

    override fun createNativeModules(reactContext: ReactApplicationContext?): MutableList<NativeModule> {
        return mutableListOf()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext?): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(AsyncViewManager() as ViewManager<View, ReactShadowNode<*>>)
    }
}