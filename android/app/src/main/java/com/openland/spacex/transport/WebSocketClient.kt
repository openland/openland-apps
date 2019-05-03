package com.openland.spacex.transport

import okhttp3.*
import okhttp3.WebSocket

class WebSocketClient {
    private val client = OkHttpClient()
    private val url: String
    private var started = false
    private var closed = false
    private var onMessageHandler: ((message: String) -> Unit)? = null
    private var onConnectedHandler: (() -> Unit)? = null
    private var onDisconnectedHandler: (() -> Unit)? = null
    private var connection: WebSocket? = null

    private var callback = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response?) {
            if (!this@WebSocketClient.closed) {
                this@WebSocketClient.onConnectedHandler?.invoke()
            }
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            if (!this@WebSocketClient.closed) {
                this@WebSocketClient.onMessageHandler?.invoke(text)
            }
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable?, response: Response?) {
            terminate()
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String?) {
            terminate()
        }

        override fun onClosing(webSocket: WebSocket?, code: Int, reason: String?) {
            terminate()
        }
    }

    constructor(url: String) {
        this.url = url
    }

    fun connect() {
        if (!this.started) {
            val request = Request.Builder().url(url)
                    .addHeader("Sec-WebSocket-Protocol", "graphql-ws")
                    .addHeader("Cookie", "")
                    .build()
            this.connection = client.newWebSocket(request, callback)
        } else {
            throw Error("Already connected!")
        }
    }

    fun postMessage(message: String) {
        this.connection!!.send(message)
    }

    fun onMessage(handler: (message: String) -> Unit) {
        this.onMessageHandler = handler
    }

    fun onConnected(handler: () -> Unit) {
        this.onConnectedHandler = handler
    }

    fun onDisconnected(handler: () -> Unit) {
        this.onDisconnectedHandler = handler
    }

    fun close() {
        if (this.closed) {
            return
        }
        this.closed = true
        this.connection?.close(0, "")
    }

    private fun terminate() {
        if (this.closed) {
            return
        }
        this.closed = true
        this.connection?.close(0, "")
        this.onDisconnectedHandler?.invoke()
    }
}