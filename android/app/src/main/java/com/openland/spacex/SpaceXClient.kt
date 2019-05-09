package com.openland.spacex

import android.content.Context
import android.util.Log
import com.openland.spacex.scheduler.*
import com.openland.spacex.store.*
import com.openland.spacex.transport.RunningOperation
import com.openland.spacex.transport.TransportOperationCallback
import com.openland.spacex.transport.WebSocketTransport
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject

interface OperationCallback {
    fun onResult(result: JSONObject)
    fun onError(result: JSONObject)
}

interface StoreReadCallback {
    fun onResult(result: JSONObject?)
}

interface StoreWriteCallback {
    fun onResult()
    fun onError()
}

class SpaceXClient(url: String, token: String?, context: Context, name: String) {
    private var isConnected = false
    private val transport: WebSocketTransport = WebSocketTransport(context, url, token) {
        isConnected = it
        this.connectionStateListener?.invoke(it)
    }
    private val scheduler = StoreScheduler(name, context)
    private val transportScheduler = TransportScheduler(transport, scheduler)
    private val queue = DispatchQueue("client")
    private var connectionStateListener: ((connected: Boolean) -> Unit)? = null

    fun setConnectionStateListener(handler: (connected: Boolean) -> Unit) {
        this.connectionStateListener = handler
        handler(isConnected)
    }

    fun query(operation: OperationDefinition, arguments: JSONObject, policy: FetchPolicy, callback: OperationCallback) {
        if (operation.kind != OperationKind.QUERY) {
            throw Error("Invalid operation kind")
        }
        if (policy == FetchPolicy.CACHE_AND_NETWORK) {
            throw Error("Unable to use CACHE_AND_NETWORK policy for non watchable query")
        }

        if (policy == FetchPolicy.CACHE_FIRST) {
            scheduler.readQueryFromCache(operation, arguments, queue) {
                if (it is QueryReadResult.Value) {
                    callback.onResult(it.value)
                } else {
                    transportScheduler.operation(operation, arguments, queue) { r ->
                        if (r is TransportOperationResult.Value) {
                            callback.onResult(r.data)
                        } else if (r is TransportOperationResult.Error) {
                            callback.onError(r.data)
                        }
                    }
                }
            }
        } else {
            transportScheduler.operation(operation, arguments, queue) { r ->
                if (r is TransportOperationResult.Value) {
                    callback.onResult(r.data)
                } else if (r is TransportOperationResult.Error) {
                    callback.onError(r.data)
                }
            }
        }
    }

    fun read(operation: OperationDefinition, arguments: JSONObject, callback: StoreReadCallback) {
        scheduler.readQueryFromCache(operation, arguments, queue) {
            if (it is QueryReadResult.Value) {
                callback.onResult(it.value)
            } else {
                callback.onResult(null)
            }
        }
    }

    fun write(operation: OperationDefinition, arguments: JSONObject, data: JSONObject, callback: StoreWriteCallback) {
        queue.async {
            val normalized: RecordSet
            try {
                normalized = normalizeResponse("ROOT_QUERY", operation.selector, arguments, data)
            } catch (e: Throwable) {
                e.printStackTrace()
                callback.onError()
                return@async
            }
            scheduler.merge(normalized, queue) {
                callback.onResult()
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
        transportScheduler.operation(operation, arguments, queue) {
            if (it is TransportOperationResult.Value) {
                callback.onResult(it.data)
            } else if (it is TransportOperationResult.Error) {
                callback.onError(it.data)
            }
        }
    }

    //
    // Subscription
    //

    fun subscribe(operation: OperationDefinition, arguments: JSONObject, callback: OperationCallback): SpaceXSubscription {
        val res = SpaceXSubscription(operation, arguments, callback)
        res.start()
        return res
    }

    inner class SpaceXSubscription(
            val operation: OperationDefinition,
            val arguments: JSONObject,
            val callback: OperationCallback
    ) {

        private var completed = false
        private var runningOperation: (RunningOperation)? = null

        fun start() {
            runningOperation = transportScheduler.subscription(operation, arguments, queue) {
                if (it is TransportSubscriptionResult.Value) {
                    callback.onResult(it.data)
                } else if (it is TransportSubscriptionResult.Error) {
                    restart()
                } else if (it is TransportSubscriptionResult.Completed) {
                    restart()
                }
            }
        }

        private fun restart() {
            this.runningOperation?.cancel()
            this.runningOperation = null
            start()
        }

        fun updateArguments(arguments: JSONObject) {
            this.runningOperation?.lazyUpdate(JSONObject(
                    mapOf(
                            "query" to operation.body,
                            "name" to operation.name,
                            "variables" to arguments
                    )
            ))
        }

        fun stop() {
            this.completed = true
            this.runningOperation?.cancel()
            this.runningOperation = null
        }
    }

    //
    // Watch
    //

    private inner class QueryWatch(val operation: OperationDefinition,
                                   val arguments: JSONObject,
                                   val policy: FetchPolicy,
                                   val callback: OperationCallback) {
        private var completed = false
        private var storeSubscription: (() -> Unit)? = null

        fun start() {
            if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                scheduler.readQueryFromCache(operation, arguments, queue) {
                    if (it is QueryReadResult.Value) {
                        callback.onResult(it.value)
                        if (policy == FetchPolicy.CACHE_FIRST) {
                            doSubscribe(it.value)
                        } else {
                            doRequest()
                        }
                    } else {
                        doRequest()
                    }
                }
            } else {
                doRequest()
            }
        }

        private fun doInit() {
            if (this.completed) {
                return
            }
            if (policy == FetchPolicy.CACHE_FIRST || policy == FetchPolicy.CACHE_AND_NETWORK) {
                scheduler.readQueryFromCache(operation, arguments, queue) {
                    if (this.completed) {
                        return@readQueryFromCache
                    }
                    if (it is QueryReadResult.Value) {
                        callback.onResult(it.value)
                        if (policy == FetchPolicy.CACHE_FIRST) {
                            doSubscribe(it.value)
                        } else {
                            doRequest()
                        }
                    } else {
                        doRequest()
                    }
                }
            } else {
                doRequest()
            }
        }

        private fun doReload() {
            if (this.completed) {
                return
            }
            scheduler.readQueryFromCache(operation, arguments, queue) {
                if (this.completed) {
                    return@readQueryFromCache
                }
                if (it is QueryReadResult.Value) {
                    callback.onResult(it.value)
                } else {
                    doRequest()
                }
            }
        }

        private fun doSubscribe(data: JSONObject) {
            // TODO: Optimize!!
            val normalized = normalizeResponse("ROOT_QUERY", operation.selector, arguments, data)
            storeSubscription = scheduler.subscribe(normalized, queue) {
                storeSubscription?.invoke()
                storeSubscription = null
                doReload()
            }
        }

        private fun doRequest() {
            transportScheduler.operation(operation, arguments, queue) {
                if (this.completed) {
                    return@operation
                }
                if (it is TransportOperationResult.Value) {
                    callback.onResult(it.data)
                    doSubscribe(it.data)
                } else if (it is TransportOperationResult.Error) {
                    callback.onError(it.data)
                }
            }
        }

        fun stop() {
            this.completed = true
            this.storeSubscription?.invoke()
            this.storeSubscription = null
        }
    }
}