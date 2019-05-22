package com.openland.spacex

import android.content.Context
import com.openland.spacex.store.*
import com.openland.spacex.transport.TransportOperationResult
import com.openland.spacex.transport.SpaceXTransport
import com.openland.spacex.transport.TransportState
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONArray
import org.json.JSONObject

interface OperationCallback {
    fun onResult(result: JSONObject)
    fun onError(result: JSONArray)
}

interface StoreReadCallback {
    fun onResult(result: JSONObject?)
}

interface StoreWriteCallback {
    fun onResult()
    fun onError()
}

class SpaceXClient(url: String, token: String?, context: Context, name: String?) {
    private var isConnected = false
    private val store = SpaceXStore(context, name)
    private val transport = SpaceXTransport(TransportState(context, url, token) {
        isConnected = it
        this.connectionStateListener?.invoke(it)
    })
    private val queue = DispatchQueue("client")
    private var connectionStateListener: ((connected: Boolean) -> Unit)? = null

    fun setConnectionStateListener(handler: (connected: Boolean) -> Unit) {
        this.connectionStateListener = handler
        handler(isConnected)
    }

    fun query(operation: OperationDefinition, variables: JSONObject, policy: FetchPolicy, callback: OperationCallback) {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        if (policy == FetchPolicy.CACHE_AND_NETWORK) {
            throw Error("Unable to use CACHE_AND_NETWORK policy for non watchable query")
        }

        if (policy == FetchPolicy.CACHE_FIRST) {
            store.readQuery(operation, variables, queue) {
                if (it is QueryReadResult.Value) {
                    callback.onResult(it.value)
                } else {
                    transport.operation(operation, variables, queue) { r ->
                        if (r is TransportOperationResult.Value) {
                            store.mergeResponse(operation, variables, r.data, queue) {
                                callback.onResult(r.data)
                            }
                        } else if (r is TransportOperationResult.Error) {
                            callback.onError(r.error)
                        }
                    }
                }
            }
        } else {
            transport.operation(operation, variables, queue) { r ->
                if (r is TransportOperationResult.Value) {
                    store.mergeResponse(operation, variables, r.data, queue) {
                        callback.onResult(r.data)
                    }
                } else if (r is TransportOperationResult.Error) {
                    callback.onError(r.error)
                }
            }
        }
    }

    //
    // Mutation
    //

    fun mutation(operation: OperationDefinition, variables: JSONObject, callback: OperationCallback) {
        if (operation.kind != OperationKind.MUTATION) {
            throw Error("Invalid operation kind")
        }
        transport.operation(operation, variables, queue) {
            if (it is TransportOperationResult.Value) {
                store.mergeResponse(operation, variables, it.data, queue) {
                    callback.onResult(it.data)
                }
            } else if (it is TransportOperationResult.Error) {
                callback.onError(it.error)
            }
        }
    }

    //
    // Watch
    //

    fun watch(operation: OperationDefinition, variables: JSONObject, policy: FetchPolicy, callback: OperationCallback): () -> Unit {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        val watchQueryWatch = QueryWatch(operation, variables, policy, callback)
        watchQueryWatch.start()
        return {
            watchQueryWatch.stop()
        }
    }

    private inner class QueryWatch(
            val operation: OperationDefinition,
            val variables: JSONObject,
            val policy: FetchPolicy,
            val callback: OperationCallback
    ) {
        private var completed = false
        private var storeSubscription: (() -> Unit)? = null
        private var wasLoadedFromNetwork = false

        fun start() {
            queue.async {
                if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                    this.doReloadFromCache()
                } else {
                    this.doRequest()
                }
            }
        }

        private fun doReloadFromCache() {
            store.readQueryAndWatch(operation, variables, queue) {
                if (this.completed) {
                    return@readQueryAndWatch
                }
                if (it is QueryReadAndWatchResult.Value) {
                    callback.onResult(it.value)
                    if (policy == FetchPolicy.CACHE_AND_NETWORK && !wasLoadedFromNetwork) {
                        doRequest(false)
                    }
                } else if (it == QueryReadAndWatchResult.Missing) {
                    doRequest()
                } else if (it == QueryReadAndWatchResult.Updated) {
                    doReloadFromCache()
                }
            }
        }


        private fun doRequest(reload: Boolean = true) {
            this.wasLoadedFromNetwork = true
            transport.operation(operation, variables, queue) {
                if (this.completed) {
                    return@operation
                }
                if (it is TransportOperationResult.Value) {
                    store.mergeResponse(operation, variables, it.data, queue) {
                        if (this.completed) {
                            return@mergeResponse
                        }
                        if (reload) {
                            doReloadFromCache()
                        }
                    }
                } else if (it is TransportOperationResult.Error) {
                    if (reload) {
                        callback.onError(it.error)
                    }
                }
            }
        }

        fun stop() {
            queue.async {
                this.completed = true
                this.storeSubscription?.invoke()
                this.storeSubscription = null
            }
        }
    }

    //
    // Subscription
    //

    fun subscribe(operation: OperationDefinition, variables: JSONObject, callback: OperationCallback): () -> Unit {
        val res = SpaceXSubscription(operation, variables, callback)
        res.start()
        return { res.stop() }
    }

    private inner class SpaceXSubscription(
            val operation: OperationDefinition,
            val variables: JSONObject,
            val callback: OperationCallback
    ) {

        private var completed = false
        private var runningOperation: (() -> Unit)? = null

        fun start() {
            queue.async {
                runningOperation = transport.subscription(operation, variables, queue) {
                    if (it is TransportOperationResult.Value) {
                        store.mergeResponse(operation, variables, it.data, queue) {
                            callback.onResult(it.data)
                        }
                    } else if (it is TransportOperationResult.Error) {
                        callback.onError(it.error)
                    }
                }
            }
        }

        fun stop() {
            queue.async {
                this.completed = true
                this.runningOperation?.invoke()
                this.runningOperation = null
            }
        }
    }

    //
    // Store Operations
    //

    fun read(operation: OperationDefinition, variables: JSONObject, callback: StoreReadCallback) {
        store.readQuery(operation, variables, queue) {
            if (it is QueryReadResult.Value) {
                callback.onResult(it.value)
            } else {
                callback.onResult(null)
            }
        }
    }

    fun write(operation: OperationDefinition, variables: JSONObject, data: JSONObject, callback: StoreWriteCallback) {
        store.mergeResponse(operation, variables, data, queue) {
            callback.onResult()
        }
    }
}