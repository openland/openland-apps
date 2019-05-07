package com.openland.spacex.scheduler

import android.util.Log
import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet

class Request(val missing: MutableSet<String>, val callback: () -> Unit)

class PersistenceScheduler(val store: StoreScheduler) {

    private val pendingReadRequests = mutableListOf<Request>()
    private val requested = mutableSetOf<String>()

    fun read(keys: Set<String>, callback: () -> Unit) {
        pendingReadRequests.add(Request(keys.toMutableSet(), callback))
        val filtered = keys.filter { !requested.contains(it) }
        if (filtered.isNotEmpty()) {
            doLoad(filtered)
        }
    }

    private fun doLoad(keys: List<String>) {
        store.queue.async {
            Log.d("SpaceX-Persistence", "Loading: " + keys.toString())
            val loaded = mutableMapOf<String, Record>()
            for (k in keys) {
                loaded[k] = Record(k, emptyMap())
            }
            val rs = RecordSet(loaded)
            store.queue.async {
                store.loaded(rs)

                // Notify
                for (p in pendingReadRequests) {
                    p.missing.removeAll(keys)
                    if (p.missing.isEmpty()) {
                        p.callback()
                    }
                }
                val ready = pendingReadRequests.filter { it.missing.isEmpty() }
                pendingReadRequests.removeAll { it.missing.isEmpty() }
                for (r in ready) {
                    r.callback()
                }
            }
        }
    }
}