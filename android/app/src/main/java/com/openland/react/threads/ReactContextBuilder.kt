package com.openland.react.threads

import android.content.Context
import android.net.Uri

import com.facebook.react.NativeModuleRegistryBuilder
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.CatalystInstanceImpl
import com.facebook.react.bridge.JSBundleLoader
import com.facebook.react.bridge.JSCJavaScriptExecutorFactory
import com.facebook.react.bridge.JavaScriptExecutor
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.NativeModuleCallExceptionHandler
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.queue.ReactQueueConfigurationSpec
import com.facebook.react.devsupport.interfaces.DevSupportManager
import com.facebook.soloader.SoLoader

import java.util.ArrayList
import java.util.concurrent.Callable

import com.facebook.react.modules.systeminfo.AndroidInfoHelpers.getFriendlyDeviceName

class ReactContextBuilder(private val parentContext: Context) {
    private var jsBundleLoader: JSBundleLoader? = null
    private var devSupportManager: DevSupportManager? = null
    private var instanceManager: ReactInstanceManager? = null
    private var reactPackages: ArrayList<ReactPackage>? = null

    init {
        SoLoader.init(parentContext, /* native exopackage */ false)
    }

    fun setJSBundleLoader(jsBundleLoader: JSBundleLoader): ReactContextBuilder {
        this.jsBundleLoader = jsBundleLoader
        return this
    }

    fun setDevSupportManager(devSupportManager: DevSupportManager): ReactContextBuilder {
        this.devSupportManager = devSupportManager
        return this
    }

    fun setReactInstanceManager(manager: ReactInstanceManager): ReactContextBuilder {
        this.instanceManager = manager
        return this
    }

    fun setReactPackages(reactPackages: ArrayList<ReactPackage>): ReactContextBuilder {
        this.reactPackages = reactPackages
        return this
    }

    @Throws(Exception::class)
    fun build(): ReactApplicationContext {
        val appName = Uri.encode(parentContext.packageName)
        val deviceName = Uri.encode(getFriendlyDeviceName())
        val jsExecutor = JSCJavaScriptExecutorFactory(appName, deviceName)
                .create()

        // fresh new react context
        val reactContext = ReactApplicationContext(parentContext)
        if (devSupportManager != null) {
            reactContext.setNativeModuleCallExceptionHandler(devSupportManager)
        }

        // load native modules
        val nativeRegistryBuilder = NativeModuleRegistryBuilder(reactContext, this.instanceManager)
        addNativeModules(reactContext, nativeRegistryBuilder)

        val catalystInstanceBuilder = CatalystInstanceImpl.Builder()
                .setReactQueueConfigurationSpec(ReactQueueConfigurationSpec.createDefault())
                .setJSExecutor(jsExecutor)
                .setRegistry(nativeRegistryBuilder.build())
                .setJSBundleLoader(jsBundleLoader)
                .setNativeModuleCallExceptionHandler(if (devSupportManager != null)
                    devSupportManager
                else
                    createNativeModuleExceptionHandler()
                )


        val catalystInstance: CatalystInstance
        catalystInstance = catalystInstanceBuilder.build()

        catalystInstance.getReactQueueConfiguration().jsQueueThread.callOnQueue {
            try {
                reactContext.initializeWithInstance(catalystInstance)
                catalystInstance.runJSBundle()
            } catch (e: Exception) {
                e.printStackTrace()
                devSupportManager!!.handleException(e)
            }

            null
        }.get()

        catalystInstance.getReactQueueConfiguration().uiQueueThread.callOnQueue {
            try {
                catalystInstance.initialize()
                reactContext.onHostResume(null)
            } catch (e: Exception) {
                e.printStackTrace()
                devSupportManager!!.handleException(e)
            }

            null
        }.get()

        return reactContext
    }

    private fun createNativeModuleExceptionHandler(): NativeModuleCallExceptionHandler {
        return NativeModuleCallExceptionHandler { e -> throw RuntimeException(e) }
    }

    private fun addNativeModules(reactContext: ReactApplicationContext, nativeRegistryBuilder: NativeModuleRegistryBuilder) {
        for (i in reactPackages!!.indices) {
            val reactPackage = reactPackages!![i]
            for (nativeModule in reactPackage.createNativeModules(reactContext)) {
                nativeRegistryBuilder.addNativeModule(nativeModule)
            }
        }
    }
}
