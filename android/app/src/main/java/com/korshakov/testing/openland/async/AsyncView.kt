package com.korshakov.testing.openland.async

import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManager
import android.view.View
import com.facebook.litho.*
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.annotations.ReactProp

val specs = mutableMapOf<String, AsyncViewSpec>()
val specViews = mutableMapOf<String, AsyncView>()

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
        this.lithoView.setComponent(resolveNode(this.asyncContext, config, context as ReactContext))
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

class AsyncConfigManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNAsyncConfigManager"
    }

    @ReactMethod
    fun setConfig(key: String, config: String) {
        val parsed = parseSpec(config)
        specs[key] = parsed
        val ex = specViews[key]
        if (ex != null) {
            ex.setConfig(parsed)
        }
    }
}

class AsyncPackage : ReactPackage {
    constructor() {
        ComponentsConfiguration.incrementalMountUsesLocalVisibleBounds = false
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(AsyncConfigManager(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(AsyncViewManager() as ViewManager<View, ReactShadowNode<*>>)
    }
}