package com.korshakov.testing.app.async

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

val specs = mutableMapOf<String, AsyncViewSpec>()
val specViews = mutableMapOf<String, AsyncView>()

class AsyncConfigManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNAsyncConfigManager"
    }

    @ReactMethod
    fun setConfig(key: String, config: String) {
        val parsed = parseSpec(config, reactApplicationContext)
        specs[key] = parsed
        specViews[key]?.setConfig(parsed)
    }
}