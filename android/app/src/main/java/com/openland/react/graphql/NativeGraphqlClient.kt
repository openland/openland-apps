package com.openland.react.graphql

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openland.spacex.*
import com.openland.spacex.gen.Operations
import org.json.JSONObject

class NativeGraphqlClient(val key: String, val context: ReactApplicationContext, endpoint: String, token: String?, storage: String?) {

    private var connected = false
    private val client = SpaceXClient("wss:$endpoint", token, context)
    private val watches = mutableMapOf<String, () -> Unit>()
    private val subscriptions = mutableMapOf<String, SpaceXClient.SpaceXSubscription>()

    //
    // Init and Destroy
    //

    init {
        client.setConnectionStateListener {
            if (this.connected != it) {
                this.connected = it
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "status")
                map.putString("status", if (it) "connected" else "connecting")
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }
        }
    }

    fun dispose() {
        // TODO: Implement
    }

    //
    // Query
    //

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
            override fun onResult(result: JSONObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JSONObject) {
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

    //
    // Query Watch
    //

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
            override fun onResult(result: JSONObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JSONObject) {
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

    //
    // Mutation
    //

    fun mutate(id: String, query: String, arguments: ReadableMap) {
        client.mutation(Operations.operationByName(query), arguments.toKotlinX(), object : OperationCallback {
            override fun onResult(result: JSONObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)

                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JSONObject) {
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

    //
    // Subscriptions
    //

    fun subscribe(id: String, query: String, arguments: ReadableMap) {
        subscriptions[id] = client.subscribe(Operations.operationByName(query), arguments.toKotlinX(), object : OperationCallback {
            override fun onResult(result: JSONObject) {
                val res = result.toReact()

                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)

                map.putMap("data", res)

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError(result: JSONObject) {
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

    fun subscribeUpdate(id: String, arguments: ReadableMap) {
        subscriptions[id]?.updateArguments(arguments.toKotlinX())
    }

    fun unsubscribe(id: String) {
        subscriptions.remove(id)?.stop()
    }

    //
    // Store operations
    //

    fun read(id: String, query: String, arguments: ReadableMap) {
        client.read(Operations.operationByName(query), arguments.toKotlinX(), object : StoreReadCallback {
            override fun onResult(result: JSONObject?) {
                val res = result?.toReact()
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)

                if (res != null) {
                    map.putMap("data", res)
                } else {
                    map.putNull("data")
                }

                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }
        })
    }

    fun write(id: String, data: ReadableMap, query: String, arguments: ReadableMap) {
        client.write(Operations.operationByName(query), arguments.toKotlinX(), data.toKotlinX(), object : StoreWriteCallback {
            override fun onResult() {
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onError() {
                TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }

        })
    }
}