package com.openland.react.graphql

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openland.spacex.FetchPolicy
import com.openland.spacex.OperationCallback
import com.openland.spacex.SpaceXClient
import com.openland.spacex.gen.Operations
import kotlinx.serialization.json.JsonObject

class NativeGraphqlClient(val key: String, val context: ReactApplicationContext, endpoint: String, token: String?, storage: String?) {

    private var connected = false
    private val client = SpaceXClient("wss:$endpoint", token)
    private val watches = mutableMapOf<String, () -> Unit>()

    init {
        client.setConnectionStateListener {
            if (it) {
                onConnected()
            } else {
                onDisconnected()
            }
        }
    }


    fun query(id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {

        // Resolve Fetch Policy
        var policy = FetchPolicy.CACHE_FIRST
        val policyKey = if (parameters.hasKey("fetchPolicy")) parameters.getString("fetchPolicy") else null
        when (policyKey) {
            "cache-first" -> policy = FetchPolicy.CACHE_FIRST
            "network-only" -> policy = FetchPolicy.NETWORK_ONLY
            "cache-and-network" -> policy = FetchPolicy.CACHE_AND_NETWORK
            "no-cache" -> throw Error("no-cache is unsupported on Android")
        }

        client.query(Operations.operationByName(query), arguments.toKotlinX(), policy, object : OperationCallback {
            override fun onResult(result: JsonObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JsonObject) {
                val res = result.toReact()
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "failure")
                map.putString("id", id)
                map.putString("kind", "graphql")
                map.putMap("data", res)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }
        })
    }

    fun watch(id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {
        // Resolve Fetch Policy
        var policy = FetchPolicy.CACHE_FIRST
        val policyKey = if (parameters.hasKey("fetchPolicy")) parameters.getString("fetchPolicy") else null
        when (policyKey) {
            "cache-first" -> policy = FetchPolicy.CACHE_FIRST
            "network-only" -> policy = FetchPolicy.NETWORK_ONLY
            "cache-and-network" -> policy = FetchPolicy.CACHE_AND_NETWORK
            "no-cache" -> throw Error("no-cache is unsupported on Android")
        }

        val res = client.watch(Operations.operationByName(query), arguments.toKotlinX(), policy, object : OperationCallback {
            override fun onResult(result: JsonObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JsonObject) {
                val res = result.toReact()
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "failure")
                map.putString("id", id)
                map.putString("kind", "graphql")
                map.putMap("data", res)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }
        })
        watches[id] = res
    }

    fun watchEnd(id: String) {
        watches.remove(id)?.invoke()
    }

    fun mutate(id: String, query: String, arguments: ReadableMap) {
        client.mutation(Operations.operationByName(query), arguments.toKotlinX(), object : OperationCallback {
            override fun onResult(result: JsonObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)

                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JsonObject) {
                val res = result.toReact()
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "failure")
                map.putString("id", id)
                map.putString("kind", "graphql")
                map.putMap("data", res)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }
        })
    }

    fun read(id: String, query: String, arguments: ReadableMap) {
        // TODO: Implement
    }

    fun write(id: String, data: ReadableMap, query: String, arguments: ReadableMap) {
        // TODO: Implement
    }

    fun subscribe(id: String, query: String, arguments: ReadableMap) {
        // TODO: Implement
    }

    fun subscribeUpdate(id: String, arguments: ReadableMap) {
        // TODO: Implement
    }

    fun unsubscribe(id: String) {
        // TODO: Implement
    }

    fun dispose() {
        // TODO: Implement
    }

    private fun onDisconnected() {
        if (!this.connected) {
            return
        }
        this.connected = false
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "status")
        map.putString("status", "connecting")
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }

    private fun onConnected() {
        if (this.connected) {
            return
        }
        this.connected = true
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "status")
        map.putString("status", "connected")
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }
}