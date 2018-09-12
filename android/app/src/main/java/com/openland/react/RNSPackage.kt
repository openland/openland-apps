package com.openland.react

import android.view.View
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.korshakov.testing.app.async.AsyncConfigManager
import com.korshakov.testing.app.async.AsyncDataViewManager
import com.korshakov.testing.app.async.AsyncListViewManager
import com.korshakov.testing.app.async.AsyncViewManager
import com.openland.react.anim.RNSAnimatedViewManager
import com.openland.react.anim.RNSAnimatedViewViewManager

class RNSPackage : ReactPackage {

    constructor() {
        ComponentsConfiguration.incrementalMountUsesLocalVisibleBounds = false
        ComponentsConfiguration.prewarmImageTexture = true
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(AsyncConfigManager(reactContext), AsyncDataViewManager(reactContext), RNSAnimatedViewManager(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        val animated = RNSAnimatedViewViewManager(reactContext)
        animated.initialize()
        return mutableListOf(
                AsyncViewManager() as ViewManager<View, ReactShadowNode<*>>,
                AsyncListViewManager() as ViewManager<View, ReactShadowNode<*>>,
                animated as ViewManager<View, ReactShadowNode<*>>)
    }


}