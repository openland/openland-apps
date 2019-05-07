package com.openland.spacex.scheduler

import android.util.Log
import com.openland.spacex.OperationDefinition
import com.openland.spacex.store.*
import com.openland.spacex.utils.DispatchQueue
import org.json.JSONObject

sealed class QueryReadResult {
    class Value(val value: JSONObject) : QueryReadResult()
    object Missing : QueryReadResult()
}

class StoreScheduler {
    companion object {
        val ROOT_QUERY = "ROOT_QUERY"
    }

    val queue = DispatchQueue()
    private val store = RecordStore()
    private val bus = RecordStoreBus()

    fun readQueryFromCache(operation: OperationDefinition, arguments: JSONObject, queue: DispatchQueue, callback: (result: QueryReadResult) -> Unit) {
        this.queue.async {

            // Emulate empty persistence for now
            while (true) {
                val missing = collectMissingKeys(StoreScheduler.ROOT_QUERY, store, operation.selector, arguments)
                if (missing.isNotEmpty()) {
                    Log.d("SpaceX-Store", "Fill empty")
                    for (m in missing) {
                        store.loaded(Record(m, emptyMap()))
                    }
                } else {
                    break
                }
            }

            // Read from in-memory store
            val res = readFromStore(StoreScheduler.ROOT_QUERY, store, operation.selector, arguments)

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

    fun merge(recordSet: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        this.queue.async {

            // Emulate empty persistence for now
            while (true) {
                val missing = recordSet.records.keys.filter { !store.isInMemory(it) }
                if (missing.isNotEmpty()) {
                    Log.d("SpaceX-Store", "Fill empty")
                    for (m in missing) {
                        store.loaded(Record(m, emptyMap()))
                    }
                } else {
                    break
                }
            }

            val changed = store.merge(recordSet)
            bus.publish(changed)
            queue.async {
                callback()
            }
        }
    }

    fun subscribe(recordSet: RecordSet, queue: DispatchQueue, callback: () -> Unit) = bus.subscribe(recordSet) { queue.async { callback() } }
}