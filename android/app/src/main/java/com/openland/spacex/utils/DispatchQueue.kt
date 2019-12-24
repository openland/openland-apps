package com.openland.spacex.utils

import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import java.util.concurrent.Executors

/**
 * DispatchQueue helps to dispatch code execution on separate thread
 */
class DispatchQueue(val name: String) {
    companion object {
        private val thread = HandlerThread("timer")
        private val handler: Handler by lazy { Handler(thread.looper) }
        private val currentQueueName = ThreadLocal<String>()

        /**
         * Current Queue Name. Useful for logging.
         */
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

    /**
     * Check code is executing in this queue
     */
    val isCurrentQueue: Boolean
        get() {
            val e = currentQueueLocal.get()
            return e != null && e
        }


    /**
     * Schedule execution on queue. Exits immediately.
     * @param op callback to execute
     */
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

    /**
     * Schedule executing on queue after some time in the future.
     * @param delay delay of execution in ms
     * @param op callback to execute
     * @return cancelling callback
     */
    fun asyncDelayed(delay: Int, op: () -> Unit): () -> Unit {
        requireQueue()

        val id = nextId++
        activeTasks.add(id)
        handler.postDelayed({
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

    /**
     * Asserting that code is executing in this queue
     */
    fun requireQueue() {
        if (!this.isCurrentQueue) {
            throw Error("Invalid queue")
        }
    }
}