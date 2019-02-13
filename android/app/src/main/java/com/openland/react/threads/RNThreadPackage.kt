package com.openland.react.threads

import com.facebook.react.ReactPackage
import com.facebook.react.ReactNativeHost
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

import java.util.Arrays

class RNThreadPackage(private val reactNativeHost: ReactNativeHost, vararg additionalThreadPackages: ReactPackage) : ReactPackage {
    private val additionalThreadPackages: Array<ReactPackage> = additionalThreadPackages as Array<ReactPackage>

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return Arrays.asList<NativeModule>(
                RNThreadModule(reactContext, reactNativeHost, additionalThreadPackages)
        )
    }
}