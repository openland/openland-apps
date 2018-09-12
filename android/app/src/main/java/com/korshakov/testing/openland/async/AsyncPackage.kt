package com.korshakov.testing.openland.async

import android.view.View
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class AsyncPackage : ReactPackage {

    constructor() {
        ComponentsConfiguration.incrementalMountUsesLocalVisibleBounds = false
        ComponentsConfiguration.prewarmImageTexture = true
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(AsyncConfigManager(reactContext), AsyncDataViewManager(reactContext), AsyncAnimatedViewManager(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(
                AsyncViewManager() as ViewManager<View, ReactShadowNode<*>>,
                AsyncListViewManager() as ViewManager<View, ReactShadowNode<*>>,
                AsyncAnimatedViewViewManager(reactContext) as ViewManager<View, ReactShadowNode<*>>)
    }
}