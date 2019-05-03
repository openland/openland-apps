package com.openland.spacex

import com.openland.spacex.model.OperationDefinition
import com.openland.spacex.model.OperationKind
import com.openland.spacex.store.RecordStore
import com.openland.spacex.store.RecordStoreBus
import com.openland.spacex.store.readFromStore
import com.openland.spacex.transport.TransportOperationCallback
import com.openland.spacex.transport.WebSocketTransport
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.util.concurrent.Executors

interface OperationCallback {
    fun onResult(result: JsonObject)
    fun onError(result: JsonObject)
}

class SpaceXClient(url: String, token: String?) {
    private var isConnected = false
    private val transport: WebSocketTransport = WebSocketTransport(url, token) {
        isConnected = it
        this.connectionStateListener?.invoke(it)
    }
    private val store = RecordStore()
    private val bus = RecordStoreBus()
    private val transportQueue = Executors.newSingleThreadExecutor()
    private val cacheQueue = Executors.newSingleThreadExecutor()
    private var connectionStateListener: ((connected: Boolean) -> Unit)? = null

    fun query(operation: OperationDefinition, arguments: JsonObject, policy: FetchPolicy, callback: OperationCallback) {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        var completed = false
        cacheQueue.submit {
            if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                val existing = readFromStore("ROOT_QUERY", store, operation.selector!!)
                if (existing.first) {
                    callback.onResult(existing.second!!)
                    if (policy == FetchPolicy.CACHE_FIRST) {
                        return@submit
                    }
                }
            }
            transportQueue.submit {
                transport.operation(JsonObject(
                        mapOf(
                                "query" to JsonPrimitive(
                                        operation.body
                                ),
                                "name" to JsonPrimitive(
                                        operation.name
                                ),
                                "variables" to arguments
                        )
                ), object : TransportOperationCallback {
                    override fun onError(error: JsonObject) {
                        cacheQueue.submit {
                            if (!completed) {
                                completed = true
                                callback.onError(error)
                            }
                        }
                    }

                    override fun onResult(data: JsonObject) {
                        cacheQueue.submit {
                            if (!completed) {
                                completed = true
                                val normalized = operation.normalizeResponse(data)
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

    fun watch(operation: OperationDefinition, arguments: JsonObject, policy: FetchPolicy, callback: OperationCallback): () -> Unit {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        val watchQueryWatch = QueryWatch(operation, arguments, policy, callback)
        watchQueryWatch.start()
        return {
            watchQueryWatch.stop()
        }
    }

    fun mutation(operation: OperationDefinition, arguments: JsonObject, callback: OperationCallback) {
        if (operation.kind != OperationKind.MUTATION) {
            throw Error("Invalid operation kind")
        }
        var completed = false
        transportQueue.submit {
            transport.operation(JsonObject(
                    mapOf(
                            "query" to JsonPrimitive(
                                    operation.body
                            ),
                            "name" to JsonPrimitive(
                                    operation.name
                            ),
                            "variables" to arguments
                    )
            ), object : TransportOperationCallback {
                override fun onError(error: JsonObject) {
                    cacheQueue.submit {
                        if (!completed) {
                            completed = true
                            callback.onError(error)
                        }
                    }
                }

                override fun onResult(data: JsonObject) {
                    cacheQueue.submit {
                        if (!completed) {
                            completed = true
                            val normalized = operation.normalizeResponse(data)
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

    fun setConnectionStateListener(handler: (connected: Boolean) -> Unit) {
        this.connectionStateListener = handler
        handler(isConnected)
    }

    private inner class QueryWatch(val operation: OperationDefinition,
                                   val arguments: JsonObject,
                                   val policy: FetchPolicy,
                                   val callback: OperationCallback) {
        private var completed = false
        private var storeSubscription: (() -> Unit)? = null

        fun stop() {
            cacheQueue.submit {
                completed = true
                if (this.storeSubscription != null) {
                    this.storeSubscription!!()
                    this.storeSubscription = null
                }
            }
        }

        fun start() {
            cacheQueue.submit {
                if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                    val existing = readFromStore("ROOT_QUERY", store, operation.selector!!)
                    if (existing.first) {
                        callback.onResult(existing.second!!)
                        if (policy == FetchPolicy.CACHE_FIRST) {
                            // TODO: Optimize!!
                            storeSubscription = bus.subscribe(operation.normalizeResponse(existing.second!!)) { reload() }
                            return@submit
                        }
                    }
                }
                if (!completed) {
                    transportQueue.submit {
                        transport.operation(JsonObject(
                                mapOf(
                                        "query" to JsonPrimitive(
                                                operation.body
                                        ),
                                        "name" to JsonPrimitive(
                                                operation.name
                                        ),
                                        "variables" to arguments
                                )
                        ), object : TransportOperationCallback {
                            override fun onError(error: JsonObject) {
                                cacheQueue.submit {
                                    if (!completed) {
                                        completed = true
                                        callback.onError(error)
                                    }
                                }
                            }

                            override fun onResult(data: JsonObject) {
                                cacheQueue.submit {
                                    if (!completed) {
                                        val normalized = operation.normalizeResponse(data)
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
                    storeSubscription = bus.subscribe(operation.normalizeResponse(existing.second!!)) { reload() }
                    return
                }
            } else {
                if (!completed) {
                    transportQueue.submit {
                        transport.operation(JsonObject(
                                mapOf(
                                        "query" to JsonPrimitive(
                                                operation.body
                                        ),
                                        "name" to JsonPrimitive(
                                                operation.name
                                        ),
                                        "variables" to arguments
                                )
                        ), object : TransportOperationCallback {
                            override fun onError(error: JsonObject) {
                                cacheQueue.submit {
                                    if (!completed) {
                                        completed = true
                                        callback.onError(error)
                                    }
                                }
                            }

                            override fun onResult(data: JsonObject) {
                                cacheQueue.submit {
                                    if (!completed) {
                                        val normalized = operation.normalizeResponse(data)
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