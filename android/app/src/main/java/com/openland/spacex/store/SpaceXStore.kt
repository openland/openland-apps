package com.openland.spacex.store

import android.content.Context
import com.openland.spacex.OperationDefinition
import com.openland.spacex.OperationKind
import com.openland.spacex.persistence.SpaceXPersistence
import com.openland.spacex.utils.DispatchQueue
import com.openland.spacex.utils.trace
import org.json.JSONObject
import java.util.concurrent.atomic.AtomicInteger

sealed class QueryReadResult {
    class Value(val value: JSONObject) : QueryReadResult()
    object Missing : QueryReadResult()
}

sealed class QueryReadAndWatchResult {
    class Value(val value: JSONObject) : QueryReadAndWatchResult()
    object Missing : QueryReadAndWatchResult()
    object Updated : QueryReadAndWatchResult()
}

private class Subscription(val id: Set<String>, val callback: () -> Unit)
private class ReadRequest(val missing: MutableSet<String>, val callback: () -> Unit)


class SpaceXStore(context: Context, name: String?) {
    companion object {
        const val ROOT_QUERY = "ROOT_QUERY"
    }

    private val normalizationQueue = DispatchQueue("normalization")
    private val storeQueue = DispatchQueue("store")

    // Store
    private val store = RecordStore()

    // Persistence
    private val pendingReadRequests = mutableListOf<ReadRequest>()
    private val requested = mutableSetOf<String>()
    private val persistence = SpaceXPersistence(context, name)
    private var isWriting = false
    private val pendingWrite = mutableMapOf<String, Record>()

    // Bus
    private var nextSubscriptionId = AtomicInteger(1)
    private var subscriptions = mutableMapOf<Int, Subscription>()

    fun mergeResponse(operation: OperationDefinition, variables: JSONObject, data: JSONObject, queue: DispatchQueue, callback: () -> Unit) {
        this.normalizationQueue.async {
            val rootCacheKey = if (operation.kind == OperationKind.QUERY) ROOT_QUERY else null
            val normalized = normalizeResponse(rootCacheKey, operation.selector, variables, data)
            this.merge(normalized, queue, callback)
        }
    }

    fun merge(recordSet: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        this.storeQueue.async {
            prepareMerge(recordSet) {

                // Merge data in RAM store
                val changed = store.merge(recordSet)

                // Write data to disk
                if (changed.isNotEmpty()) {
                    val toWrite = RecordSet(changed.mapValues { store.read(it.key) })
                    this.persistenceWrite(toWrite)
                }

                // Notify watchers
                if (changed.isNotEmpty()) {
                    val triggered = mutableListOf<Subscription>()
                    val keys = mutableSetOf<String>()
                    for (r in changed) {
                        for (f in r.value.fields) {
                            keys.add(r.key + "." + f)
                        }
                    }
                    for (s in subscriptions) {
                        if (s.value.id.any { keys.contains(it) }) {
                            triggered.add(s.value)
                        }
                    }
                    for (t in triggered) {
                        t.callback()
                    }
                }

                // Invoke callback
                queue.async {
                    callback()
                }
            }
        }
    }

    fun readQuery(operation: OperationDefinition, variables: JSONObject, queue: DispatchQueue, callback: (result: QueryReadResult) -> Unit) {
        this.storeQueue.async {
            prepareRead(operation, variables) {
                // Read from in-memory store
                val res = readRootFromStore(SpaceXStore.ROOT_QUERY, store, operation.selector, variables)

                // Notify about result
                if (res.first) {
                    queue.async {
                        callback(QueryReadResult.Value(res.second!!))
                    }
                } else {
                    queue.async {
                        callback(QueryReadResult.Missing)
                    }
                }
            }
        }
    }

    fun readQueryAndWatch(operation: OperationDefinition, variables: JSONObject, queue: DispatchQueue, callback: (result: QueryReadAndWatchResult) -> Unit) {
        this.storeQueue.async {
            prepareRead(operation, variables) {
                // Read from in-memory store
                val res = readRootFromStore(SpaceXStore.ROOT_QUERY, store, operation.selector, variables)

                // If missing
                if (!res.first) {
                    queue.async {
                        callback(QueryReadAndWatchResult.Missing)
                    }
                    return@prepareRead
                }
                // If exists
                queue.async {
                    callback(QueryReadAndWatchResult.Value(res.second!!))
                }

                // Calculate keys
                // TODO: Optimize
                val normalized = normalizeResponse(SpaceXStore.ROOT_QUERY, operation.selector, variables, res.second!!)
                val keys = mutableSetOf<String>()
                for (r in normalized.records) {
                    for (f in r.value.fields) {
                        keys.add(r.key + "." + f.key)
                    }
                }

                // Subscribe for first notification
                val subscId = nextSubscriptionId.getAndIncrement()
                this.subscriptions[subscId] = Subscription(keys) {
                    this.subscriptions.remove(subscId)
                    queue.async {
                        callback(QueryReadAndWatchResult.Updated)
                    }
                }
            }
        }
    }

    fun close() {
        // TODO: Implement
    }

    private fun prepareMerge(recordSet: RecordSet, callback: () -> Unit) {
        val missing = trace("prepareMerge") { recordSet.records.keys.filter { !store.isInMemory(it) } }
        if (missing.isNotEmpty()) {
            persistenceRead(missing.toSet()) {
                callback()
            }
        } else {
            callback()
        }
    }

    private fun prepareRead(operation: OperationDefinition, variables: JSONObject, callback: () -> Unit) {
        val missing = trace("collectMissingKeys") { collectMissingKeysRoot(SpaceXStore.ROOT_QUERY, store, operation.selector, variables) }
        if (missing.isNotEmpty()) {
            persistenceRead(missing) {
                prepareRead(operation, variables, callback)
            }
        } else {
            callback()
        }
    }


    private fun persistenceRead(keys: Set<String>, callback: () -> Unit) {
        pendingReadRequests.add(ReadRequest(keys.toMutableSet(), callback))
        val filtered = keys.filter { !requested.contains(it) }
        if (filtered.isNotEmpty()) {
            doLoad(filtered.toSet())
        }
    }

    private fun persistenceWrite(records: RecordSet) {
        this.storeQueue.async {
            pendingWrite.putAll(records.records)
            doWriteIfNeeded()
        }
    }

    private fun doWriteIfNeeded() {
        if (pendingWrite.isNotEmpty() && !isWriting) {
            isWriting = true
            val toWrite = RecordSet(pendingWrite.toMap())
            pendingWrite.clear()
            persistence.saveRecords(toWrite, this.storeQueue) {
                isWriting = false
                doWriteIfNeeded()
            }
        }
    }

    private fun doLoad(keys: Set<String>) {
        requested.addAll(keys)
        persistence.loadRecords(keys, this.storeQueue) {

            // Some health check
            for (k in keys) {
                if (!it.records.containsKey(k)) {
                    throw Error("Key $k was not loaded from persistence!")
                }
            }

            store.loaded(it)

            // Notify
            for (p in pendingReadRequests) {
                p.missing.removeAll(keys)
            }
            val ready = pendingReadRequests.filter { it.missing.isEmpty() }
            pendingReadRequests.removeAll { it.missing.isEmpty() }
            for (r in ready) {
                r.callback()
            }
        }

    }
}