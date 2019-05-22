package com.openland.spacex.persistence

import android.content.Context
import android.util.Log
import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet
import com.openland.spacex.store.parseRecord
import com.openland.spacex.store.serializeRecord
import com.openland.spacex.utils.DispatchQueue
import com.snappydb.DBFactory
import java.util.concurrent.Executors
import java.util.concurrent.SynchronousQueue
import java.util.concurrent.ThreadPoolExecutor
import java.util.concurrent.TimeUnit

interface PersistenceProvider {
    fun saveRecords(records: Map<String, String>)
    fun loadRecords(keys: Set<String>): Map<String, String>
}

class EmptyPersistenceProvider : PersistenceProvider {
    override fun saveRecords(records: Map<String, String>) {
        // Nothing to do
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        return emptyMap()
    }
}

class SnappyDBPersistenceProvider(val context: Context, val name: String) : PersistenceProvider {

    private val db by lazy { DBFactory.open(context, name) }

    override fun saveRecords(records: Map<String, String>) {
        val start = System.currentTimeMillis()
        for (kv in records) {
            db.put(kv.key, kv.value)
        }
        Log.d("SpaceX-Persistence", records.size.toString() + " written in " + (System.currentTimeMillis() - start) + " ms")
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        val start = System.currentTimeMillis()
        val res = mutableMapOf<String, String>()
        for (k in keys) {
            if (db.exists(k)) {
                val ex = db.get(k)
                if (ex != null && ex != "") {
                    res.put(k, ex)
                }
            }
        }
        Log.d("SpaceX-Persistence", res.size.toString() + " loaded in " + (System.currentTimeMillis() - start) + " ms")
        return res
    }
}


class SpaceXPersistence(val context: Context, val name: String?) {

    private val writerExecutor = Executors.newSingleThreadExecutor()

    private val readerExecutor = ThreadPoolExecutor(
            2, 8,
            60L, TimeUnit.SECONDS,
            SynchronousQueue<Runnable>()
    )

    private val persistenceProvider = if (name != null) SnappyDBPersistenceProvider(context, name) else EmptyPersistenceProvider()

    fun saveRecords(records: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        writerExecutor.submit {
            val start = System.currentTimeMillis()
            val serialized = records.records.mapValues { serializeRecord(it.value) }
            Log.d("SpaceX-Persistence", "Serialized in " + (System.currentTimeMillis() - start) + " ms")
            persistenceProvider.saveRecords(serialized)
            queue.async {
                callback()
            }
        }
    }

    fun loadRecords(keys: Set<String>, queue: DispatchQueue, callback: (records: RecordSet) -> Unit) {
        readerExecutor.execute {
            val loaded = mutableMapOf<String, Record>()
            val res = persistenceProvider.loadRecords(keys)
            val start = System.currentTimeMillis()
            for (kv in res) {
                loaded[kv.key] = parseRecord(kv.key, kv.value)
            }
            Log.d("SpaceX-Persistence", "Deserialized in " + (System.currentTimeMillis() - start) + " ms")
            // Fill empty for missing records
            for (k in keys) {
                if (!loaded.containsKey(k)) {
                    loaded[k] = Record(k, emptyMap())
                }
            }

            queue.async {
                callback(RecordSet(loaded))
            }
        }
    }
}