package com.openland.react

import android.view.View
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.openland.react.async.AsyncConfigManager
import com.openland.react.async.AsyncDataViewManager
import com.openland.react.async.AsyncListViewManager
import com.openland.react.async.AsyncViewManager
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