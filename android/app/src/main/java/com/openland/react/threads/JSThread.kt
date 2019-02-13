package com.openland.react.threads

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

import java.util.Random

class JSThread(val name: String) {
    val threadId: Int
    private var reactContext: ReactApplicationContext? = null

    init {
        this.threadId = Math.abs(Random().nextInt())
    }

    @Throws(Exception::class)
    fun runFromContext(context: ReactApplicationContext, reactContextBuilder: ReactContextBuilder) {
        if (reactContext != null) {
            return
        }

        reactContext = reactContextBuilder.build()

        val threadSelfModule = reactContext!!.getNativeModule(ThreadSelfModule::class.java)
        threadSelfModule.initialize(threadId, context)
    }

    fun postMessage(message: String) {
        if (reactContext == null) {
            return
        }

        reactContext!!.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("ThreadMessage", message)
    }

    fun onHostResume() {
        if (reactContext == null) {
            return
        }

        reactContext!!.onHostResume(null)
    }

    fun onHostPause() {
        if (reactContext == null) {
            return
        }

        reactContext!!.onHostPause()
    }

    fun terminate() {
        if (reactContext == null) {
            return
        }

        reactContext!!.onHostPause()
        reactContext!!.destroy()
        reactContext = null
    }
}
