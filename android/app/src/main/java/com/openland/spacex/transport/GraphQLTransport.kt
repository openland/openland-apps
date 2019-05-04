package com.openland.spacex.transport

import com.openland.spacex.model.OperationDefinition
import org.json.JSONObject

interface TransportOperationCallback {
    fun onError(error: JSONObject)
    fun onResult(data: JSONObject)
    fun onCompleted()
}

interface RunningOperation {
    fun cancel()
    fun lazyUpdate(operation: JSONObject)
}

interface GraphQLTransport {
    fun operation(operation: OperationDefinition, callback: TransportOperationCallback): RunningOperation
}