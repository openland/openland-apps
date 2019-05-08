package com.openland.spacex.transport

import android.content.Context
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject

class WebSocketTransport {

    private val url: String
    private val context: Context
    private val token: String?
    private var ws: WebSocketStableClient? = null
    private val queue = DispatchQueue()
    private var nextId = 1
    private var connected = false
    private var liveOperations = mutableMapOf<String, PendingOperation>()
    private val statusCallback: (connected: Boolean) -> Unit

    constructor(context: Context, url: String, token: String?, statusCallback: (connected: Boolean) -> Unit) {
        this.context = context
        this.statusCallback = statusCallback
        this.url = url
        this.token = token
        queue.async {
            this.connect()
        }
    }

    private fun connect() {

        this.ws = WebSocketStableClient(context, url, mapOf("x-openland-token" to this.token), queue, object : WebSocketStableClientCallback {
            override fun onMessage(message: JSONObject) {
                this@WebSocketTransport.handleMessage(message)
            }

            override fun onConnected() {
                if (!this@WebSocketTransport.connected) {
                    statusCallback(true)
                    this@WebSocketTransport.connected = true
                }
            }

            override fun onDisconnected() {
                if (this@WebSocketTransport.connected) {
                    statusCallback(false)
                    this@WebSocketTransport.connected = false
                }
                if (this@WebSocketTransport.ws != null) {
                    this@WebSocketTransport.ws!!.close()
                    this@WebSocketTransport.ws = null
                }
                connect()
            }
        })
        for (p in this.liveOperations) {
            postMessage("start", p.value.query, p.value.id)
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
            postMessage("start", operation, id)
        }
        return op
    }

    //
    // All methods are called in Dispatch Queue
    //

    private fun handleMessage(response: JSONObject) {
        val type = response.getString("type")
        if (type == "data") {

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
        this.ws!!.postMessage(JSONObject(mapOf("id" to id, "type" to type, "payload" to payload)))
    }

    private inner class PendingOperation(val id: String, var query: JSONObject, val callback: TransportOperationCallback) : RunningOperation {
        override fun cancel() {
            queue.async {
                liveOperations.remove(id)
                if (connected) {
                    postMessage("stop", JSONObject(), id)
                }
            }
        }

        override fun lazyUpdate(operation: JSONObject) {
            queue.async {
                query = operation
            }
        }
    }
}