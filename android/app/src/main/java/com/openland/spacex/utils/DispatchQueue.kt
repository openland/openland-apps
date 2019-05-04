package com.openland.spacex.utils

import java.util.concurrent.Executors

class DispatchQueue {
    private val queue = Executors.newSingleThreadExecutor()

    fun async(op: () -> Unit) {
        queue.submit {
            try {
                op()
            } catch (t: Throwable) {
                t.printStackTrace()
            }
        }
    }
}