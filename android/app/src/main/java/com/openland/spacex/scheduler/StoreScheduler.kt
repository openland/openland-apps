package com.openland.spacex.scheduler

import android.content.Context
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
    private val persistence: PersistenceScheduler
    private val store = RecordStore()
    private val bus = RecordStoreBus()

    constructor(name: String, context: Context) {
        persistence = PersistenceScheduler(context, name, this)
    }

    fun readQueryFromCache(operation: OperationDefinition, arguments: JSONObject, queue: DispatchQueue, callback: (result: QueryReadResult) -> Unit) {
        this.queue.async {
            prepareStore(operation, arguments) {
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
    }

    fun loaded(recordSet: RecordSet) {
        store.loaded(recordSet)
    }

    fun merge(recordSet: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        this.queue.async {
            prepareMerge(recordSet) {
                val changed = store.merge(recordSet)
                bus.publish(changed)
                persistence.write(RecordSet(changed.mapValues { store.read(it.key) }))
                queue.async {
                    callback()
                }
            }
        }
    }

    fun subscribe(recordSet: RecordSet, queue: DispatchQueue, callback: () -> Unit) = bus.subscribe(recordSet) { queue.async { callback() } }


    private fun prepareMerge(recordSet: RecordSet, callback: () -> Unit) {
        val missing = recordSet.records.keys.filter { !store.isInMemory(it) }
        if (missing.isNotEmpty()) {
            persistence.read(missing.toSet()) {
                callback()
            }
        } else {
            callback()
        }
    }

    private fun prepareStore(operation: OperationDefinition, arguments: JSONObject, callback: () -> Unit) {
        val missing = collectMissingKeys(StoreScheduler.ROOT_QUERY, store, operation.selector, arguments)
        if (missing.isNotEmpty()) {
            persistence.read(missing) {
                prepareStore(operation, arguments, callback)
            }
        } else {
            callback()
        }
    }

}