package com.openland.spacex.transport

import com.openland.spacex.OperationDefinition
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONArray
import org.json.JSONObject


sealed class TransportOperationResult {
    class Value(val data: JSONObject) : TransportOperationResult()
    class Error(val error: JSONArray) : TransportOperationResult()
}

class SpaceXTransport(val transport: TransportState) {
    fun operation(operation: OperationDefinition, variables: JSONObject, queue: DispatchQueue, callback: (result: TransportOperationResult) -> Unit) {
        var completed = false
        transport.operation(operation, variables) { res ->
            if (res is TransportResult.Result) {
                queue.async {
                    if (completed) {
                        return@async
                    }
                    completed = true
                    callback(TransportOperationResult.Value(res.data))
                }
            } else if (res is TransportResult.Error) {
                queue.async {
                    if (completed) {
                        return@async
                    }
                    completed = true
                    callback(TransportOperationResult.Error(res.error))
                }
            }
        }
    }

    fun subscription(operation: OperationDefinition, variables: JSONObject, queue: DispatchQueue, callback: (result: TransportOperationResult) -> Unit): () -> Unit {
        var completed = false
        return transport.operation(operation, variables) { res ->
            if (res is TransportResult.Result) {
                queue.async {
                    if (completed) {
                        return@async
                    }
                    callback(TransportOperationResult.Value(res.data))
                }
            } else if (res is TransportResult.Error) {
                queue.async {
                    if (completed) {
                        return@async
                    }
                    completed = true
                    callback(TransportOperationResult.Error(res.error))
                }
            } else if (res == TransportResult.Completed) {
                queue.async {
                    if (completed) {
                        return@async
                    }
                    completed = true
                    callback(TransportOperationResult.Error(JSONArray()))
                }
            }
        }
    }
}