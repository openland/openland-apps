package com.korshakov.testing.openland.async

import android.widget.FrameLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup

class AsyncAnimatedView(context: ReactContext) : ReactViewGroup(context)

class AsyncAnimatedViewViewManager : ViewGroupManager<AsyncAnimatedView>() {

    override fun getName(): String {
        return "RNFastAnimatedView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AsyncAnimatedView {
        return AsyncAnimatedView(reactContext)
    }

    @ReactProp(name = "animatedKey")
    fun setAnimatedKey(view: AsyncAnimatedView, key: String) {
        // view.setDataViewKey(key)
    }
}

class AsyncAnimatedViewManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNFastAnimatedViewManager"
    }

    @ReactMethod
    fun animate(key: String) {
        //
    }
}