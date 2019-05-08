package com.openland.spacex.scheduler

import android.content.Context
import com.openland.spacex.persistence.SpaceXPersistence
import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet

class Request(val missing: MutableSet<String>, val callback: () -> Unit)

class PersistenceScheduler(val context: Context, val name: String, val store: StoreScheduler) {

    private val pendingReadRequests = mutableListOf<Request>()
    private val requested = mutableSetOf<String>()
    private val persistence = SpaceXPersistence(context, name)

    private var isWriting = false
    private val pendingWrite = mutableMapOf<String, Record>()

    fun read(keys: Set<String>, callback: () -> Unit) {
        pendingReadRequests.add(Request(keys.toMutableSet(), callback))
        val filtered = keys.filter { !requested.contains(it) }
        if (filtered.isNotEmpty()) {
            doLoad(filtered.toSet())
        }
    }

    fun write(records: RecordSet) {
        store.queue.async {
            pendingWrite.putAll(records.records)
            doWriteIfNeeded()
        }
    }

    private fun doWriteIfNeeded() {
        if (pendingWrite.isNotEmpty() && !isWriting) {
            isWriting = true
            val toWrite = RecordSet(pendingWrite.toMap())
            pendingWrite.clear()
            persistence.saveRecords(toWrite, store.queue) {
                isWriting = false
                doWriteIfNeeded()
            }
        }
    }

    private fun doLoad(keys: Set<String>) {
        requested.addAll(keys)
        persistence.loadRecords(keys, store.queue) {

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