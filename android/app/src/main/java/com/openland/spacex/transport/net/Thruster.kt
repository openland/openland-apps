package com.openland.spacex.transport.net

import com.openland.spacex.utils.DispatchQueue

data class ThrusterConfig(val url: String, val timeout: Int)

class Thruster {
    private val configs: Array<ThrusterConfig>
    private val queue: DispatchQueue
    private val onSuccess: (socket: DispatchedWebSocketClient) -> Unit

    private var bucketSockets = mutableListOf<DispatchedWebSocketClient?>()
    private var bucketTimeout = mutableListOf<(() -> Unit)?>()
    private var isClosed = false

    constructor(configs: Array<ThrusterConfig>, queue: DispatchQueue, onSuccess: (socket: DispatchedWebSocketClient) -> Unit) {
        this.configs = configs
        this.queue = queue
        this.onSuccess = onSuccess

        for (i in 0 until (configs.size - 1)) {
            bucketSockets.add(null)
            bucketTimeout.add(null)
        }

        for (i in 0 until (configs.size - 1)) {
            this.restartBucket(i)
        }
    }

    private fun restartBucket(bucket: Int) {
        val timeout = this.configs[bucket].timeout
        val url = this.configs[bucket].url

        // Close existing
        if (this.bucketSockets[bucket] != null) {
            val ex = this.bucketSockets[bucket]!!
            this.bucketSockets[bucket] = null
            ex.onOpen = null
            ex.onClose = null
            ex.onMessage = null
            ex.close()
        }

        // Clear timeout
        if (this.bucketTimeout[bucket] != null) {
            this.bucketTimeout[bucket]!!.invoke()
            this.bucketTimeout[bucket] = null
        }

        val ws = DispatchedWebSocketClient(url, this.queue)
        this.bucketSockets[bucket] = ws
        ws.onOpen = {
            // Remove socket from buckets to avoid it's shutdown
            this.bucketSockets[bucket] = null

            // Close all other sockets
            this.close()

            // Remove callbacks and invoke onSuccess callback
            ws.onOpen = null
            ws.onClose = null
            this.onSuccess(ws)
        }


        ws.onClose = {
            this.bucketSockets[bucket] = null

            if (this.bucketTimeout[bucket] != null) {
                this.bucketTimeout[bucket]!!()
                this.bucketTimeout[bucket] = null
            }
            this.bucketTimeout[bucket] = this.queue.asyncDelayed(3000) {
                this.restartBucket(bucket)
            }
        }

        this.bucketTimeout[bucket] = this.queue.asyncDelayed(timeout) {
            this.restartBucket(bucket)
        }
    }

    fun close() {
        if (!this.queue.isCurrentQueue) {
            throw Error("Invalid queue")
        }

        if (this.isClosed) {
            return
        }
        this.isClosed = true

        for (i in 0 until (this.configs.size - 1)) {
            // Close Socket
            val ex = this.bucketSockets[i]
            this.bucketSockets[i] = null
            if (ex != null) {
                ex.onClose = null
                ex.onMessage = null
                ex.onOpen = null
                ex.close()
            }

            // Clear Timeout
            if (this.bucketTimeout[i] != null) {
                this.bucketTimeout[i]!!()
                this.bucketTimeout[i] = null
            }
        }
    }
}