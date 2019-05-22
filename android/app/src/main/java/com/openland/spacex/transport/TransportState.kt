package com.openland.spacex.transport

import android.content.Context
import com.openland.spacex.OperationDefinition
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.atomic.AtomicInteger

sealed class TransportResult {
    class Result(val data: JSONObject) : TransportResult()
    class Error(val error: JSONArray) : TransportResult()
    object Completed : TransportResult()
}

private class PendingOperation(
        val id: String,
        val requestId: String,
        val operation: OperationDefinition,
        val variables: JSONObject,
        val handler: (TransportResult) -> Unit
)

class TransportState : NetworkingHandler {

    private val context: Context

    private val url: String
    private val token: String?

    private var networking: NetworkingApollo
    private var nextId = AtomicInteger(1)

    private var connected = false
    private val queue = DispatchQueue("ws")

    private var liveOperations = mutableMapOf<String, PendingOperation>()
    private var liveOperationsIds = mutableMapOf<String, String>()
    private val statusCallback: (connected: Boolean) -> Unit

    constructor(context: Context, url: String, token: String?, statusCallback: (connected: Boolean) -> Unit) {
        this.context = context
        this.statusCallback = statusCallback
        this.url = url
        this.token = token
        this.networking = NetworkingApollo(context, url, mapOf("x-openland-token" to this.token), this.queue, this)
        this.networking.connect()
    }

    fun operation(operation: OperationDefinition, variables: JSONObject, handler: (TransportResult) -> Unit): () -> Unit {
        val id = nextId.getAndIncrement().toString()
        val op = PendingOperation(id, id, operation, variables, handler)
        this.queue.async {

            // Save operation
            this.liveOperationsIds[id] = id
            this.liveOperations[id] = op

            // Start operation
            this.flushQueryStart(op)
        }
        return {
            this.queue.async {
                if (this.liveOperations.containsKey(id)) {

                    // Remove from callbacks
                    this.liveOperations.remove(id)
                    this.liveOperationsIds.remove(op.requestId)

                    // Stop Query
                    this.flushQueryStop(op)
                }
            }
        }
    }


    //
    // Responses
    //

    override fun onResponse(id: String, data: JSONObject) {
        val rid = this.liveOperationsIds[id]
        if (rid != null) {
            val op = liveOperations[rid]
            if (op != null) {
                op.handler(TransportResult.Result(data))
            }
        }
    }

    override fun onError(id: String, data: JSONArray) {
        val rid = this.liveOperationsIds[id]
        if (rid != null) {
            val op = liveOperations[rid]
            if (op != null) {
                this.liveOperations.remove(rid)
                this.liveOperationsIds.remove(id)
                op.handler(TransportResult.Error(data))
            }
        }
    }

    override fun onCompleted(id: String) {
        val rid = this.liveOperationsIds[id]
        if (rid != null) {
            val op = liveOperations[rid]
            if (op != null) {
                this.liveOperations.remove(rid)
                this.liveOperationsIds.remove(id)
                op.handler(TransportResult.Completed)
            }
        }
    }

    override fun onTryAgain(id: String, delay: Int) {
        // TODO: Implement
    }

    //
    // Sessions
    //

    override fun onSessionRestart() {

    }

    override fun onConnected() {
        this.statusCallback(true)
    }

    override fun onDisconnected() {
        this.statusCallback(false)
    }

    //
    // Ops
    //

    private fun flushQueryStart(operation: PendingOperation) {
        this.networking.startRequest(operation.requestId, JSONObject(mapOf(
                "query" to operation.operation.body,
                "name" to operation.operation.name,
                "variables" to operation.variables
        )))
    }

    private fun flushQueryStop(operation: PendingOperation) {
        this.networking.stopRequest(operation.requestId)
    }
}