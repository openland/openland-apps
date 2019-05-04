package com.openland.spacex

import android.util.Log
import com.openland.spacex.model.OperationDefinition
import com.openland.spacex.model.OperationKind
import com.openland.spacex.store.RecordStore
import com.openland.spacex.store.RecordStoreBus
import com.openland.spacex.store.readFromStore
import com.openland.spacex.transport.RunningOperation
import com.openland.spacex.transport.TransportOperationCallback
import com.openland.spacex.transport.WebSocketTransport
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject
import java.util.concurrent.Executors

interface OperationCallback {
    fun onResult(result: JSONObject)
    fun onError(result: JSONObject)
}

class SpaceXClient(url: String, token: String?) {
    private var isConnected = false
    private val transport: WebSocketTransport = WebSocketTransport(url, token) {
        isConnected = it
        this.connectionStateListener?.invoke(it)
    }
    private val store = RecordStore()
    private val bus = RecordStoreBus()
    private val transportQueue = DispatchQueue()
    private val cacheQueue = DispatchQueue()
    private var connectionStateListener: ((connected: Boolean) -> Unit)? = null

    fun query(operation: OperationDefinition, arguments: JSONObject, policy: FetchPolicy, callback: OperationCallback) {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        var completed = false
        cacheQueue.async {
            if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                val existing = readFromStore("ROOT_QUERY", store, operation.selector!!)
                if (existing.first) {
                    callback.onResult(existing.second!!)
                    if (policy == FetchPolicy.CACHE_FIRST) {
                        return@async
                    }
                }
            }
            transportQueue.async {
                transport.operation(JSONObject(
                        mapOf(
                                "query" to operation.body,
                                "name" to operation.name,
                                "variables" to arguments
                        )
                ), object : TransportOperationCallback {
                    override fun onError(error: JSONObject) {
                        cacheQueue.async {
                            if (!completed) {
                                completed = true
                                callback.onError(error)
                            }
                        }
                    }

                    override fun onResult(data: JSONObject) {
                        cacheQueue.async {
                            if (!completed) {
                                completed = true
                                val normalized = operation.normalizeResponse(data, arguments)
                                val changed = store.merge(normalized)
                                bus.publish(changed)
                                callback.onResult(data)
                            }
                        }
                    }

                    override fun onCompleted() {
                        // Nothing to do
                    }
                })
            }
        }
    }

    fun watch(operation: OperationDefinition, arguments: JSONObject, policy: FetchPolicy, callback: OperationCallback): () -> Unit {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        val watchQueryWatch = QueryWatch(operation, arguments, policy, callback)
        watchQueryWatch.start()
        return {
            watchQueryWatch.stop()
        }
    }

    fun mutation(operation: OperationDefinition, arguments: JSONObject, callback: OperationCallback) {
        if (operation.kind != OperationKind.MUTATION) {
            throw Error("Invalid operation kind")
        }
        var completed = false
        transportQueue.async {
            transport.operation(JSONObject(
                    mapOf(
                            "query" to operation.body,
                            "name" to operation.name,
                            "variables" to arguments
                    )
            ), object : TransportOperationCallback {
                override fun onError(error: JSONObject) {
                    cacheQueue.async {
                        if (!completed) {
                            completed = true
                            callback.onError(error)
                        }
                    }
                }

                override fun onResult(data: JSONObject) {
                    cacheQueue.async {
                        if (!completed) {
                            completed = true
                            val normalized = operation.normalizeResponse(data, arguments)
                            val changed = store.merge(normalized)
                            bus.publish(changed)
                            callback.onResult(data)
                        }
                    }
                }

                override fun onCompleted() {
                    // Nothing to do
                }
            })
        }
    }

    fun subscribe(operation: OperationDefinition, arguments: JSONObject, callback: OperationCallback): SpaceXSubscription {
        val res = SpaceXSubscription(operation, arguments, callback)
        res.start()
        return res
    }

    fun setConnectionStateListener(handler: (connected: Boolean) -> Unit) {
        this.connectionStateListener = handler
        handler(isConnected)
    }

    inner class SpaceXSubscription(
            val operation: OperationDefinition,
            val arguments: JSONObject,
            val callback: OperationCallback
    ) {

        private var completed = false
        private var runningOperation: (RunningOperation)? = null

        fun start() {
            transportQueue.async {
                runningOperation = transport.operation(JSONObject(
                        mapOf(
                                "query" to operation.body,
                                "name" to operation.name,
                                "variables" to arguments
                        )
                ), object : TransportOperationCallback {
                    override fun onError(error: JSONObject) {
                        transportQueue.async {
                            if (!completed) {
                                restart()
                            }
                        }
                    }

                    override fun onResult(data: JSONObject) {
                        cacheQueue.async {
                            if (!completed) {
                                val normalized = operation.normalizeResponse(data, arguments)
                                val changed = store.merge(normalized)
                                bus.publish(changed)
                                callback.onResult(data)
                            }
                        }
                    }

                    override fun onCompleted() {
                        transportQueue.async {
                            if (!completed) {
                                restart()
                            }
                        }
                    }
                })
            }
        }

        private fun restart() {
            this.runningOperation?.cancel()
            this.runningOperation = null
            start()
        }

        fun updateArguments(arguments: JSONObject) {
            transportQueue.async {
                this.runningOperation?.lazyUpdate(JSONObject(
                        mapOf(
                                "query" to operation.body,
                                "name" to operation.name,
                                "variables" to arguments
                        )
                ))
            }
        }

        fun stop() {
            transportQueue.async {
                this.completed = true
                this.runningOperation?.cancel()
                this.runningOperation = null
            }
        }
    }


    private inner class QueryWatch(val operation: OperationDefinition,
                                   val arguments: JSONObject,
                                   val policy: FetchPolicy,
                                   val callback: OperationCallback) {
        private var completed = false
        private var storeSubscription: (() -> Unit)? = null

        fun stop() {
            cacheQueue.async {
                completed = true
                if (this.storeSubscription != null) {
                    this.storeSubscription!!()
                    this.storeSubscription = null
                }
            }
        }

        fun start() {
            cacheQueue.async {
                if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                    val existing = readFromStore("ROOT_QUERY", store, operation.selector!!)
                    if (existing.first) {
                        callback.onResult(existing.second!!)
                        if (policy == FetchPolicy.CACHE_FIRST) {
                            // TODO: Optimize!!
                            storeSubscription = bus.subscribe(operation.normalizeResponse(existing.second!!, arguments)) { reload() }
                            return@async
                        }
                    }
                }
                if (!completed) {
                    transportQueue.async {
                        transport.operation(JSONObject(
                                mapOf(
                                        "query" to operation.body,
                                        "name" to operation.name,
                                        "variables" to arguments
                                )
                        ), object : TransportOperationCallback {
                            override fun onError(error: JSONObject) {
                                cacheQueue.async {
                                    if (!completed) {
                                        completed = true
                                        callback.onError(error)
                                    }
                                }
                            }

                            override fun onResult(data: JSONObject) {
                                cacheQueue.async {
                                    if (!completed) {
                                        var start = System.currentTimeMillis()
                                        val normalized = operation.normalizeResponse(data, arguments)
                                        Log.d("SpaceX", "Normalized in " + (System.currentTimeMillis() - start) + " ms")
                                        start = System.currentTimeMillis()
                                        val changed = store.merge(normalized)
                                        Log.d("SpaceX", "Merged in " + (System.currentTimeMillis() - start) + " ms")
                                        bus.publish(changed)
                                        storeSubscription = bus.subscribe(normalized) { reload() }
                                        callback.onResult(data)
                                    }
                                }
                            }

                            override fun onCompleted() {
                                // Nothing to do
                            }
                        })
                    }
                }
            }
        }

        private fun reload() {
            if (this.storeSubscription != null) {
                this.storeSubscription!!()
                this.storeSubscription = null
            }
            val existing = readFromStore("ROOT_QUERY", store, operation.selector!!)
            if (existing.first) {
                callback.onResult(existing.second!!)
                if (policy == FetchPolicy.CACHE_FIRST) {
                    // TODO: Optimize!!
                    storeSubscription = bus.subscribe(operation.normalizeResponse(existing.second!!, arguments)) { reload() }
                    return
                }
            } else {
                if (!completed) {
                    transportQueue.async {
                        transport.operation(JSONObject(
                                mapOf(
                                        "query" to operation.body,
                                        "name" to operation.name,
                                        "variables" to arguments
                                )
                        ), object : TransportOperationCallback {
                            override fun onError(error: JSONObject) {
                                cacheQueue.async {
                                    try {
                                        if (!completed) {
                                            completed = true
                                            callback.onError(error)
                                        }
                                    } catch (e: Throwable) {
                                        e.printStackTrace()
                                    }
                                }
                            }

                            override fun onResult(data: JSONObject) {
                                cacheQueue.async {
                                    if (!completed) {
                                        val normalized = operation.normalizeResponse(data, arguments)
                                        val changed = store.merge(normalized)
                                        bus.publish(changed)
                                        storeSubscription = bus.subscribe(normalized) { reload() }
                                        callback.onResult(data)
                                    }
                                }
                            }

                            override fun onCompleted() {
                                // Nothing to do
                            }
                        })
                    }
                }
            }
        }
    }
}