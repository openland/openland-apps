package com.openland.spacex.store.persistence

import android.content.Context
import android.util.Log
import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordSet
import com.openland.spacex.store.parseRecord
import com.openland.spacex.store.serializeRecord
import com.openland.spacex.utils.DispatchQueue
import java.util.concurrent.Executors
import java.util.concurrent.SynchronousQueue
import java.util.concurrent.ThreadPoolExecutor
import java.util.concurrent.TimeUnit

/**
 * SpaceXPersistence provides dispatched operations on top of underlying persistence provider.
 */
class SpaceXPersistence(val context: Context, val name: String?) {


    private val persistenceProvider = if (name != null)
        PersistenceProviderLMDB(context, name)
    else
        EmptyPersistenceProvider()

    private val writerExecutor = Executors.newSingleThreadExecutor()
    private val readerExecutor = ThreadPoolExecutor(
            2, 8,
            60L, TimeUnit.SECONDS,
            SynchronousQueue<Runnable>()
    )

    /**
     * Save records to store
     * @param records records to write
     * @param queue DispatchQueue to dispatch callback on
     * @param callback Callback to call on successful write
     */
    fun saveRecords(records: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        writerExecutor.submit {

            // Serializing
            var start = System.currentTimeMillis()
            val serialized = records.records.mapValues { serializeRecord(it.value) }
            Log.d("SpaceX-Persistence", "Serialized in " + (System.currentTimeMillis() - start) + " ms")

            // Write to store
            start = System.currentTimeMillis()
            persistenceProvider.saveRecords(serialized)
            Log.d("SpaceX-Persistence", "Written in " + (System.currentTimeMillis() - start) + " ms")

            queue.async {
                callback()
            }
        }
    }

    /**
     * Load records from store
     * @param keys keys to read
     * @param queue  DispatchQueue to dispatch callback on
     * @param callback Callback to call on successful read
     */
    fun loadRecords(keys: Set<String>, queue: DispatchQueue, callback: (records: RecordSet) -> Unit) {
        readerExecutor.execute {

            // Reading from store
            var start = System.currentTimeMillis()
            val res = persistenceProvider.loadRecords(keys)
            Log.d("SpaceX-Persistence", "Read in " + (System.currentTimeMillis() - start) + " ms")

            // Parsing
            start = System.currentTimeMillis()
            val loaded = mutableMapOf<String, Record>()
            for (kv in res) {
                loaded[kv.key] = parseRecord(kv.key, kv.value)
            }
            // Fill empty for missing records
            for (k in keys) {
                if (!loaded.containsKey(k)) {
                    loaded[k] = Record(k, emptyMap())
                }
            }
            Log.d("SpaceX-Persistence", "Parsed in " + (System.currentTimeMillis() - start) + " ms")

            queue.async {
                callback(RecordSet(loaded))
            }
        }
    }
}