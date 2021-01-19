package com.openland.react

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.jstasks.HeadlessJsTaskContext
import com.facebook.react.modules.core.JavaTimerManager
import com.facebook.react.modules.core.TimingModule
//import com.facebook.react.modules.core.Timing
import java.util.concurrent.atomic.AtomicBoolean

class KeepAliveModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNKeepAlive"
    }

    override fun initialize() {
        runOnUIThread {

            // Hack HeadlessJsTaskContext
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

            // Hack TimingModule
            val module = reactApplicationContext.getNativeModule(TimingModule::class.java)
            module.onHeadlessJsTaskStart(-1)
        }
    }
}