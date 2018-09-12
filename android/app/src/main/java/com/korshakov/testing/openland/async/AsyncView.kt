package com.korshakov.testing.openland.async

import android.graphics.Color
import android.graphics.Paint
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.widget.SolidColor
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp


class AsyncView(context: ReactContext) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)
    private var spec: AsyncViewSpec? = null
    private var inited = false

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
        lithoView.setComponent(SolidColor.create(asyncContext).color(Color.TRANSPARENT).build())
    }

    fun setConfigKey(src: String) {
        specViews[src] = this
        this.spec = specs[src]
        if (inited) {
            this.lithoView.setComponentAsync(resolveNode(this.asyncContext, this.spec!!, context as ReactContext))
        }
//        if (specs.containsKey(src)) {
//            this.setConfig(specs[src]!!)
//        }
    }

    fun setConfig(config: AsyncViewSpec) {
        this.spec = config
        if (this.inited) {
            this.lithoView.setComponentAsync(resolveNode(this.asyncContext, config, context as ReactContext))
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (!this.inited) {
            this.inited = true
            if (this.spec != null) {
                this.lithoView.setComponentAsync(resolveNode(this.asyncContext, this.spec!!, context as ReactContext))
            }
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