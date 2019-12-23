package com.openland.spacex.transport.net

import com.openland.spacex.utils.DispatchQueue
import okhttp3.*

class DispatchedWebSocketClient(val url: String, val queue: DispatchQueue) {

    var onOpen: (() -> Unit)? = null
    var onClose: (() -> Unit)? = null
    var onMessage: ((msg: String) -> Unit)? = null


    private var socket: WebSocket? = null
    private var isClosed = false
    private var isStarted = false
    private val client = OkHttpClient()

    val callback = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response?) {
            queue.async {
                if (!this@DispatchedWebSocketClient.isClosed) {
                    this@DispatchedWebSocketClient.isStarted = true
                    this@DispatchedWebSocketClient.onOpen?.invoke()
                }
            }
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            queue.async {
                if (!this@DispatchedWebSocketClient.isClosed && this@DispatchedWebSocketClient.isStarted) {
                    this@DispatchedWebSocketClient.onMessage?.invoke(text)
                }
            }
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String?) {
            queue.async {
                if (!this@DispatchedWebSocketClient.isClosed) {
                    this@DispatchedWebSocketClient.isClosed = true
                    this@DispatchedWebSocketClient.socket = null
                    this@DispatchedWebSocketClient.onClose?.invoke()
                }
            }
        }
    }

    init {
        val request = Request.Builder().url(url)
                .addHeader("Sec-WebSocket-Protocol", "graphql-ws")
                .addHeader("Cookie", "")
                .build()
        this.socket = client.newWebSocket(request, callback)
    }

    fun post(text: String) {
        this.queue.async {
            if (!this.isClosed) {
                if (!this@DispatchedWebSocketClient.isStarted) {
                    throw Error("Socket is not started yet!")
                }
                this.socket!!.send(text)
            }
        }
    }

    fun close() {
        this.queue.async {
            if (!this.isClosed) {
                this.isClosed = true
                this.socket!!.close(1000, null)
                this.socket = null
            }
        }
    }
}