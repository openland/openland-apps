package com.openland.react.threads

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class ThreadSelfModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private var threadId: Int = 0
    private var parentContext: ReactApplicationContext? = null

    fun initialize(threadId: Int, parentContext: ReactApplicationContext) {
        this.parentContext = parentContext
        this.threadId = threadId
    }

    override fun getName(): String {
        return "ThreadSelfManager"
    }

    @ReactMethod
    fun postMessage(data: String) {
        if (parentContext == null) {
            return
        }

        parentContext!!.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("Thread" + threadId.toString(), data)
    }
}
