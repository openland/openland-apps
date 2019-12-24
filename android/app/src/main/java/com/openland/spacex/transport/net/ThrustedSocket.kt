package com.openland.spacex.transport.net

import com.openland.spacex.utils.DispatchQueue

val CONNECTION_BUCKETS = arrayOf(1000, 5000, 30000)

class ThrustedSocket {

    val url: String
    val timeout: Int
    val queue: DispatchQueue

    var onOpen: (() -> Unit)? = null
    var onClose: (() -> Unit)? = null
    var onMessage: ((msg: String) -> Unit)? = null

    private var isClosed = false
    private val thruster: Thruster
    private var watchDog: WatchDogTimer? = null
    private var socket: DispatchedWebSocketClient? = null

    constructor(url: String, timeout: Int, queue: DispatchQueue) {
        this.url = url
        this.timeout = timeout
        this.queue = queue

        this.thruster = Thruster(CONNECTION_BUCKETS.map { ThrusterConfig(url, it) }.toTypedArray(), this.queue, this::onConnected)
    }

    private fun onConnected(socketClient: DispatchedWebSocketClient) {
        this.queue.requireQueue()

        this.watchDog = WatchDogTimer(this.timeout, this::onConnectionDied, this.queue)
        this.watchDog!!.reset()
        this.socket = socketClient

        socketClient.onClose = {
            this.onConnectionDied()
        }
        socketClient.onMessage = {
            if (!this.isClosed) {
                this.onMessage?.invoke(it)
            }
            this.watchDog?.kick()
        }

        this.onOpen?.invoke()
    }

    private fun onConnectionDied() {
        this.queue.requireQueue()
        if (this.isClosed) {
            return
        }

        this.isClosed = true

        // Stop Socket
        this.socket?.onMessage = null
        this.socket?.onClose = null
        this.socket?.onOpen = null
        this.socket?.close()
        this.socket = null

        // Stop Watch Dog
        this.watchDog?.kill()
        this.watchDog = null

        this.onClose?.invoke()
    }

    fun post(msg: String) {
        this.queue.requireQueue()

        if (this.socket != null) {
            this.socket!!.post(msg)
        } else {
            if (!this.isClosed) {
                throw Error("Socket is not connected yet")
            }
        }
    }

    fun close() {
        this.queue.requireQueue()

        if (this.isClosed) {
            return
        }
        this.isClosed = true

        // Stop Thruster
        this.thruster.close()

        // Stop Socket
        this.socket?.onMessage = null
        this.socket?.onClose = null
        this.socket?.onOpen = null
        this.socket?.close()
        this.socket = null

        // Stop Watch Dog
        this.watchDog?.kill()
        this.watchDog = null
    }
}