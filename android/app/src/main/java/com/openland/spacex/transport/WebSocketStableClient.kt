package com.openland.spacex.transport

import android.content.Context
import android.net.ConnectivityManager
import android.net.LinkProperties
import android.net.Network
import android.net.NetworkCapabilities
import android.os.Build
import android.util.Log
import com.openland.spacex.utils.DispatchQueue
import com.openland.spacex.utils.backoffDelay
import org.json.JSONObject

interface WebSocketStableClientCallback {
    fun onMessage(message: JSONObject)
    fun onConnected()
    fun onDisconnected()
}

private enum class ConnectionState {
    WAITING, CONNECTING, STARTING, STARTED, COMPLETED
}

class WebSocketStableClient(val context: Context,
                            val url: String,
                            val params: Map<String, Any?>,
                            val queue: DispatchQueue,
                            private val callback: WebSocketStableClientCallback) {
    private companion object {
        var nextId = 0
    }

    private val tag = "SpaceX-WS-${nextId++}"
    private var connection: WebSocketClient? = null
    private var state = ConnectionState.WAITING
    private var pending = mutableListOf<JSONObject>()
    private var attempt = 0
    private var networkAvailable = false
    private var existingFlush: (() -> Unit)? = null
    private var keepAliveTimeout: (() -> Unit)? = null
    private var connectivityCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network?) {
            queue.async {
                onNetworkingAvailable()
            }
        }

        override fun onLinkPropertiesChanged(network: Network?, linkProperties: LinkProperties?) {
            queue.async {
                onNetworkChanged()
            }
        }

        override fun onCapabilitiesChanged(network: Network?, networkCapabilities: NetworkCapabilities?) {
            queue.async {
                onNetworkChanged()
            }
        }

        override fun onUnavailable() {
            queue.async {
                onNetworkingLost()
            }
        }

        override fun onLost(network: Network?) {
            queue.async {
                onNetworkingLost()
            }
        }
    }

    init {
        Log.d(tag, "Start")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            connectivityManager.registerDefaultNetworkCallback(connectivityCallback)
        } else {
            // Enforce network for old androids
            networkAvailable = true
            // Launch connection
            queue.async { connect() }
        }
    }

    fun postMessage(message: JSONObject) {
        assertRightQueue()

        when (state) {
            ConnectionState.COMPLETED -> {
                // Silently ignore if connection is completed
                return
            }
            ConnectionState.WAITING -> {
                // Add to pending buffer if we are not connected already
                pending.add(message)
            }
            ConnectionState.CONNECTING -> {
                // Add to pending buffer if we are not connected already
                pending.add(message)
            }
            ConnectionState.STARTING -> {
                // If we connected, but not started add to pending buffer (in case of failed start)
                // and send message to socket
                pending.add(message)
                sendMessage(message)
            }
            ConnectionState.STARTED -> {
                sendMessage(message)
            }
        }
    }

    fun close() {
        assertRightQueue()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            connectivityManager.unregisterNetworkCallback(connectivityCallback)
        }

        connection?.close()
    }

    private fun connect() {
        Log.d(tag, "Connecting")
        if (this.state != ConnectionState.WAITING) {
            error("Unexpected state: " + this.state)
        }
        this.state = ConnectionState.CONNECTING
        val ws = WebSocketClient(url)
        ws.onConnected {
            queue.async {
                if (ws == this.connection) {
                    Log.d(tag, "Connected")
                    onConnected()
                }
            }
        }
        ws.onDisconnected {
            queue.async {
                if (ws == this.connection) {
                    Log.d(tag, "Disconnected")
                    onDisconnected()
                }
            }
        }
        ws.onMessage {
            queue.async {
                if (ws == this.connection) {
                    Log.d(tag, "<<: $it")
                    onMessage(it)
                }
            }
        }
        this.connection = ws
        ws.connect()
    }

    private fun onConnected() {
        if (this.state !== ConnectionState.CONNECTING) {
            error("Unexpected state: " + this.state)
        }
        this.state = ConnectionState.STARTING
        sendMessage(JSONObject(mapOf("type" to "connection_init", "payload" to JSONObject(params))))
        for (p in pending) {
            sendMessage(p)
        }
    }

    private fun onDisconnected() {
        onFailure()
    }

    private fun onMessage(message: String) {
        try {
            val parsed = JSONObject(message)
            val type = parsed.getString("type")
            if (type == "ka") {
                // Default keep-alive interval on server is 10 seconds.
                this.keepAliveTimeout?.invoke()
                this.keepAliveTimeout = queue.asyncDelayed(15000) {
                    onFailure()
                }
            } else if (type == "connection_ack") {
                if (this.state == ConnectionState.STARTING) {
                    this.state = ConnectionState.STARTED
                    this.pending.clear()
                    this.callback.onConnected()
                }
            } else {
                this.callback.onMessage(parsed)
            }
        } catch (t: Throwable) {
            t.printStackTrace()
            onFailure()
        }
    }

    private fun sendMessage(message: JSONObject) {
        try {
            val serialized = message.toString()
            Log.d(tag, ">>: $serialized")
            this.connection!!.postMessage(serialized)
        } catch (t: Throwable) {
            t.printStackTrace()
            onFailure()
        }
    }

    private fun onFailure() {
        if (this.connection != null) {
            val c = this.connection!!
            this.connection = null
            c.close()
        }

        if (this.state === ConnectionState.STARTED) {
            this.state = ConnectionState.COMPLETED
            callback.onDisconnected()
        } else {
            this.state = ConnectionState.WAITING
            attempt++
            scheduleConnection(backoffDelay(attempt, 1000, 10000, 10))
        }
    }

    private fun scheduleConnection(delay: Int) {
        if (this.state == ConnectionState.WAITING && networkAvailable) {
            Log.d(tag, "Reconnecting in $delay")
            cancelScheduled()
            this.existingFlush = queue.asyncDelayed(delay) {
                this.existingFlush = null
                connect()
            }
        }
    }

    private fun onNetworkingAvailable() {
        if (!networkAvailable) {
            Log.d(tag, "Network available")
            networkAvailable = true
        }
        onNetworkChanged()
    }

    private fun onNetworkChanged() {
        if (networkAvailable) {
            if (this.state == ConnectionState.WAITING) {
                Log.d(tag, "Enforce reconnect since network changed")
                cancelScheduled()
                connect()
            }
        }
    }

    private fun onNetworkingLost() {
        if (networkAvailable) {
            Log.d(tag, "Network lost")
            networkAvailable = false
        }
    }

    private fun cancelScheduled() {
        if (this.existingFlush != null) {
            this.existingFlush!!()
            this.existingFlush = null
        }
    }

    private fun assertRightQueue() {
        if (!queue.isCurrentQueue) {
            throw error("Client methods must be called in dispatch queue")
        }
    }
}