package com.openland.react.window

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class BottomSafeAreaProvider(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private var bottomSafeArea: Int? = null
    }

    override fun getName(): String {
        return "RNBottomSafeAreaProvider"
    }

    @ReactMethod
    fun bottomSafeArea(promise: Promise) {
        if(BottomSafeAreaProvider.bottomSafeArea === null) {
            val resources = reactApplicationContext.resources
            val resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android")
            BottomSafeAreaProvider.bottomSafeArea = if (resourceId > 0) {
                resources.getDimensionPixelSize(resourceId)
            } else 0
        }
        promise.resolve(BottomSafeAreaProvider.bottomSafeArea)
    }
}