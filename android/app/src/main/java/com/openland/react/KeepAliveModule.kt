package com.openland.react

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.jstasks.HeadlessJsTaskContext
import com.facebook.react.modules.core.Timing
import java.util.concurrent.atomic.AtomicBoolean

class KeepAliveModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNKeepAlive"
    }

    override fun initialize() {
        
        // Hack Timers
        runOnUIThread {
            val headlessContext = HeadlessJsTaskContext.getInstance(reactApplicationContext)
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

            val module = reactApplicationContext.getNativeModule(Timing::class.java)
            try {
                val isRunningTasks = Timing::class.java.getDeclaredField("isRunningTasks")
                isRunningTasks.isAccessible = true
                val v = isRunningTasks.get(module) as AtomicBoolean
                v.set(true)
            } catch (e: NoSuchFieldException) {
                e.printStackTrace()
            } catch (e: IllegalAccessException) {
                e.printStackTrace()
            }
        }
    }
}