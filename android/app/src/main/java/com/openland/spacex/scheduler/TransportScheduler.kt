package com.openland.spacex.scheduler

import com.openland.spacex.OperationDefinition
import com.openland.spacex.OperationKind
import com.openland.spacex.store.normalizeResponse
import com.openland.spacex.transport.RunningOperation
import com.openland.spacex.transport.TransportOperationCallback
import com.openland.spacex.transport.WebSocketTransport
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject


sealed class TransportOperationResult {
    class Value(val data: JSONObject) : TransportOperationResult()
    class Error(val data: JSONObject) : TransportOperationResult()
}

sealed class TransportSubscriptionResult {
    class Value(val data: JSONObject) : TransportSubscriptionResult()
    class Error(val data: JSONObject) : TransportSubscriptionResult()
    object Completed : TransportSubscriptionResult()
}

class TransportScheduler(val transport: WebSocketTransport, val store: StoreScheduler) {
    private val transportQueue = DispatchQueue()

    fun operation(operation: OperationDefinition, arguments: JSONObject, queue: DispatchQueue, callback: (result: TransportOperationResult) -> Unit) {
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
                    transportQueue.async {
                        if (!completed) {
                            completed = true
                            queue.async {
                                callback(TransportOperationResult.Error(error))
                            }
                        }
                    }
                }

                override fun onResult(data: JSONObject) {
                    transportQueue.async {
                        if (!completed) {
                            completed = true
                            val normalized = normalizeResponse(if (operation.kind == OperationKind.QUERY) StoreScheduler.ROOT_QUERY else null,
                                    operation.selector, arguments, data)
                            store.merge(normalized, queue) {
                                callback(TransportOperationResult.Value(data))
                            }
                        }
                    }
                }

                override fun onCompleted() {
                    // Nothing to do
                }
            })
        }
    }

    fun subscription(operation: OperationDefinition, arguments: JSONObject, queue: DispatchQueue, callback: (result: TransportSubscriptionResult) -> Unit): RunningOperation {

        //
        // TODO: Fix Subscription updates handling. There is a small chance that updates will be
        //       applied in incorrect sequence
        //


        return transport.operation(JSONObject(
                mapOf(
                        "query" to operation.body,
                        "name" to operation.name,
                        "variables" to arguments
                )
        ), object : TransportOperationCallback {
            override fun onError(error: JSONObject) {
                queue.async {
                    callback(TransportSubscriptionResult.Error(error))
                }
            }

            override fun onResult(data: JSONObject) {
                transportQueue.async {
                    val normalized = normalizeResponse(
                            if (operation.kind == OperationKind.QUERY) StoreScheduler.ROOT_QUERY else null,
                            operation.selector, arguments, data)
                    store.merge(normalized, queue) {
                        callback(TransportSubscriptionResult.Value(data))
                    }
                }
            }

            override fun onCompleted() {
                queue.async {
                    callback(TransportSubscriptionResult.Completed)
                }
            }
        })
    }
}