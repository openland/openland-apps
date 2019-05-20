package com.openland.spacex.utils

import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import java.util.concurrent.Executors

class DispatchQueue(val name: String) {
    companion object {
        private val thread = HandlerThread("timer")
        private val handler: Handler by lazy { Handler(thread.looper) }
        private val currentQueueName = ThreadLocal<String>()
        val currentQueue: String?
            get() {
                return currentQueueName.get()
            }

        init {
            thread.start()
        }
    }

    private var nextId = 0
    private val queue = Executors.newSingleThreadExecutor()
    private val currentQueueLocal = ThreadLocal<Boolean>()
    private val activeTasks = mutableSetOf<Int>()
    val isCurrentQueue: Boolean
        get() {
            val e = currentQueueLocal.get()
            return e != null && e
        }

    fun asyncDelayed(delay: Int, op: () -> Unit): () -> Unit {
        if (!isCurrentQueue) {
            error("asyncDelayed need to be called in queue thread")
        }
        val id = nextId++
        activeTasks.add(id)
        DispatchQueue.handler.postDelayed({
            async {
                if (activeTasks.contains(id)) {
                    op()
                }
            }
        }, delay.toLong())
        return {
            if (!isCurrentQueue) {
                error("Operation can be canceled only in queue thread")
            }
            activeTasks.remove(id)
        }
    }

    fun async(op: () -> Unit) {
        queue.submit {
            val start = System.currentTimeMillis()
            try {
                currentQueueLocal.set(true)
                currentQueueName.set(this.name)
                op()
                val delta = (System.currentTimeMillis() - start)
                if (delta > 20) {
                    Log.w("SpaceX-Dispatch", "[$name] Dispatch completed in $delta ms")
                }
            } catch (t: Throwable) {
                t.printStackTrace()
            } finally {
                currentQueueName.remove()
                currentQueueLocal.remove()
            }
        }
    }
}