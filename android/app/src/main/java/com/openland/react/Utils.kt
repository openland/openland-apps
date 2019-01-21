package com.openland.react

import android.content.Context
import android.os.Handler
import android.os.Looper

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