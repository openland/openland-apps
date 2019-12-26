package com.openland.react

import android.content.Context
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.jstasks.HeadlessJsTaskContext
import com.facebook.react.jstasks.HeadlessJsTaskEventListener

private val handler = Handler(Looper.getMainLooper())

fun runOnUIThreadDelayed(delay: Int, callback: () -> Unit) {
    handler.postDelayed(callback, delay.toLong())
}

fun runOnUIThread(callback: () -> Unit) {
    handler.post(callback)
}

val Context.statusBarHeight: Float
    get() {
        val heightResId = this.resources
                .getIdentifier("status_bar_height", "dimen", "android")

        val statusBarHeight = if (heightResId > 0)
            this.resources.getDimensionPixelSize(heightResId).toFloat()
        else
            0.0f

        return statusBarHeight
    }


fun watchLifecycle(reactContext: ReactApplicationContext, callback: (active: Boolean) -> Unit) {

    val headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactContext)

    val syncObject = Object()
    var lastValue = false

    var wasStarted = false
    var hasTask = headlessJsTaskContext.hasActiveTasks()

    fun notifyIfNeeded() {
        val nv = wasStarted or hasTask
        if (nv != lastValue) {
            lastValue = nv
            callback(nv)
        }
    }

    reactContext.addLifecycleEventListener(object : LifecycleEventListener {
        override fun onHostResume() {
            synchronized(syncObject) {
                wasStarted = true
                notifyIfNeeded()
            }
        }

        override fun onHostPause() {
            synchronized(syncObject) {
                wasStarted = false
                notifyIfNeeded()
            }
        }

        override fun onHostDestroy() {
            synchronized(syncObject) {
                wasStarted = false
                notifyIfNeeded()
            }
        }
    })

    headlessJsTaskContext.addTaskEventListener(object : HeadlessJsTaskEventListener {

        override fun onHeadlessJsTaskStart(taskId: Int) {
            synchronized(syncObject) {
                hasTask = headlessJsTaskContext.hasActiveTasks()
                notifyIfNeeded()
            }
        }

        override fun onHeadlessJsTaskFinish(taskId: Int) {
            synchronized(syncObject) {
                hasTask = headlessJsTaskContext.hasActiveTasks()
                notifyIfNeeded()
            }
        }
    })
}