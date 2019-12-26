package com.openland.react

import android.view.View
import com.facebook.litho.config.ComponentsConfiguration
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.jstasks.HeadlessJsTaskContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.openland.react.async.AsyncConfigManager
import com.openland.react.async.AsyncDataViewManager
import com.openland.react.async.AsyncListViewManager
import com.openland.react.async.AsyncViewManager
import com.openland.react.anim.RNSAnimatedViewManager
import com.openland.react.anim.RNSAnimatedViewViewManager
import com.openland.react.graphql.RNGraphQL
import com.openland.react.window.BottomSafeAreaProvider
import com.openland.react.window.RNSWindowManager

class RNSPackage : ReactPackage {

    init {
        ComponentsConfiguration.incrementalMountWhenNotVisible = false
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {

        // Hack Timers
        val headlessContext = HeadlessJsTaskContext.getInstance(reactContext)
        try {
            val mActiveTasks = HeadlessJsTaskContext::class.java.getDeclaredField("mActiveTasks")
            mActiveTasks.isAccessible = true
            val tasks = mActiveTasks.get(headlessContext) as MutableSet<Int>
            tasks.add(-1)
        } catch (e: NoSuchFieldException) {
            e.printStackTrace()
        } catch (e: IllegalAccessException) {
            e.printStackTrace()
        }

        return mutableListOf(
                AsyncConfigManager(reactContext),
                AsyncDataViewManager(reactContext),
                RNSAnimatedViewManager(reactContext),
                RNSWindowManager(reactContext),
                BottomSafeAreaProvider(reactContext),
                BenchmarkModule(reactContext),
                RNGraphQL(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return mutableListOf(
                AsyncViewManager(),
                AsyncListViewManager(),
                RNSAnimatedViewViewManager.sharedInstance,
                SplashViewManager()
        ) as MutableList<ViewManager<View, ReactShadowNode<*>>>
    }
}