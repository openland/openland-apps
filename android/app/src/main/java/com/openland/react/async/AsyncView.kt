package com.openland.react.async

import android.graphics.Color
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.widget.SolidColor
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp


class AsyncView(context: ReactContext) : FrameLayout(context) {

    private val asyncContext = ComponentContext(context)
    private val componentTree = ComponentTree.create(asyncContext,
            SolidColor.create(asyncContext)
                    .color(Color.TRANSPARENT).build())
            .incrementalMount(false)
            .build()
    private val lithoView = LithoView(context)
    private var spec: AsyncViewSpec? = null
    private var prevSpec: AsyncViewSpec? = null

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
        lithoView.componentTree = componentTree
    }

    fun setConfigKey(src: String) {
        specViews[src] = this
        this.spec = specs[src]
        setComponentIfReady()
    }

    fun setConfig(config: AsyncViewSpec) {
        this.spec = config
        setComponentIfReady()
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        setComponentIfReady()
    }

    private fun setComponentIfReady() {
        if (this.spec != null && this.spec != this.prevSpec) {
            this.prevSpec = this.spec
            componentTree.setRootAsync(resolveNode(this.asyncContext, this.spec!!, context as ReactContext))
        }
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