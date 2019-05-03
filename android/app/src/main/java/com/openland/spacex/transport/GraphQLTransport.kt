package com.openland.spacex.transport

import com.openland.spacex.model.OperationDefinition
import kotlinx.serialization.json.JsonObject

interface TransportOperationCallback {
    fun onError(error: JsonObject)
    fun onResult(data: JsonObject)
    fun onCompleted()
}

interface RunningOperation {
    fun cancel()
    fun lazyUpdate(operation: JsonObject)
}

interface GraphQLTransport {
    fun operation(operation: OperationDefinition, callback: TransportOperationCallback): RunningOperation
}