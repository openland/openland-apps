package com.korshakov.testing.openland.async

import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp


class AsyncView(context: ReactContext) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
    }

    fun setConfigKey(src: String) {
        specViews.set(src, this)
        if (specs.containsKey(src)) {
            this.setConfig(specs[src]!!)
        }
    }

    fun setConfig(config: AsyncViewSpec) {
        this.lithoView.setComponentAsync(resolveNode(this.asyncContext, config, context as ReactContext))
    }
}

class AsyncViewManager : SimpleViewManager<AsyncView>() {

    override fun getName(): String {
        return "RNAsyncView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AsyncView {
        return AsyncView(reactContext)
    }

    @ReactProp(name = "configKey")
    fun setConfigKey(view: AsyncView, configKey: String) {
        view.setConfigKey(configKey)
    }
}