package com.openland.spacex.transport

import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject

class WebSocketTransport {

    private val url: String
    private val token: String?
    private var ws: WebSocketClient? = null
    private val queue = DispatchQueue()
    private var nextId = 1
    private var connected = false
    private var liveOperations = mutableMapOf<String, PendingOperation>()
    private val statusCallback: (connected: Boolean) -> Unit

    constructor(url: String, token: String?, statusCallback: (connected: Boolean) -> Unit) {
        this.statusCallback = statusCallback
        this.url = url
        this.token = token
        this.connect()
    }

    private fun connect() {
        queue.async {
            val ws = WebSocketClient(url)
            ws.onConnected {
                queue.async {
                    if (this.ws == ws) {
                        this.onConnected()
                    }
                }
            }
            ws.onDisconnected {
                queue.async {
                    if (this.ws == ws) {
                        this.onDisconnected()
                    }
                }
            }
            ws.onMessage {
                queue.async {
                    if (this.ws == ws) {
                        this.handleMessage(it)
                    }
                }
            }
            this.ws = ws
            ws.connect()
        }
    }

    private fun reconnect() {
        queue.async {
            if (!this.connected) {
                statusCallback(false)
                this.connected = false
            }
            if (this.ws != null) {
                this.ws!!.close()
                this.ws = null
            }
        }
    }

    //
    // External Methods
    //

    fun operation(operation: JSONObject, callback: TransportOperationCallback): RunningOperation {
        val id = nextId++.toString()
        val op = PendingOperation(id, operation, callback)
        queue.async {
            liveOperations[id] = op
            if (this.connected) {
                postMessage("start", operation, id)
            }
        }
        return op
    }

    //
    // All methods are called in Dispatch Queue
    //

    private fun onConnected() {
        postMessage("connection_init", JSONObject(mapOf("x-openland-token" to this.token)), nextId++.toString())
    }

    private fun onDisconnected() {
        reconnect()
    }

    private fun handleMessage(msg: String) {
        val response = JSONObject(msg)
        val type = response.getString("type")
        if (type == "ka") {
            // Keep Alive
            // TODO: Handle
        } else if (type == "connection_ack") {
            this.connected = true
            statusCallback(true)
            for (p in this.liveOperations) {
                postMessage("start", p.value.query, p.value.id)
            }
        } else if (type == "data") {

            // Handle data and resolver level errors
            val id = response.getString("id")
            val payload = response.getJSONObject("payload")
            val errors = payload.optJSONObject("error")
            val data = payload.optJSONObject("data")
            if (this.liveOperations.containsKey(id)) {
                if (errors != null) {
                    this.liveOperations[id]!!.callback.onError(errors)
                } else {
                    this.liveOperations[id]!!.callback.onResult(data!!)
                }
            }
        } else if (type == "error") {

            // Handle low level error
            val id = response.getString("id")
            val payload = response.getJSONObject("payload")
            if (this.liveOperations.containsKey(id)) {
                this.liveOperations[id]!!.callback.onError(payload)
            }

        } else if (type == "complete") {
            val id = response.getString("id")
            if (this.liveOperations.containsKey(id)) {
                this.liveOperations.remove(id)!!.callback.onCompleted()
            }
        } else {
            // Ignore unknown message
        }
    }

    private fun postMessage(type: String, payload: JSONObject, id: String) {
        this.ws!!.postMessage(JSONObject(
                mapOf(
                        "id" to id,
                        "type" to type,
                        "payload" to payload
                )
        ).toString())
    }

    private inner class PendingOperation(val id: String, var query: JSONObject, val callback: TransportOperationCallback) : RunningOperation {
        override fun cancel() {
            queue.async {
                liveOperations.remove(id)
            }
        }

        override fun lazyUpdate(operation: JSONObject) {
            queue.async {
                query = operation
            }
        }
    }
}