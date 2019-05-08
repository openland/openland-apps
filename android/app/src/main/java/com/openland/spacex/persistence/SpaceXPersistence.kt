package com.openland.spacex.persistence

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


class SpaceXPersistence(val context: Context, val name: String) {

    companion object {
        private val databases = mutableMapOf<String, PersistenceOpenHelper>()
        fun getDatabase(context: Context, name: String): PersistenceOpenHelper {
            synchronized(databases) {
                if (!databases.containsKey(name)) {
                    databases[name] = PersistenceOpenHelper(context, name)
                }
                return databases[name]!!
            }
        }
    }

    private val writerExecutor = Executors.newSingleThreadExecutor()

    private val readerExecutor = ThreadPoolExecutor(
            2, 8,
            60L, TimeUnit.SECONDS,
            SynchronousQueue<Runnable>()
    )

    private val db by lazy { getDatabase(context, name).writableDatabase }

    fun saveRecords(records: RecordSet, queue: DispatchQueue, callback: () -> Unit) {
        writerExecutor.submit {
            val start = System.currentTimeMillis()
            try {
                db.beginTransaction()
                for (kv in records.records) {
                    db.execSQL("REPLACE INTO records(\"_id\", \"record\") VALUES(?,?);", arrayOf(kv.key, serializeRecord(kv.value)))
                }
                db.setTransactionSuccessful()
            } catch (t: Throwable) {
                // TODO: Crash App
                // On any exception hang persistence engine
                t.printStackTrace()
                return@submit
            } finally {
                db.endTransaction()
            }
            Log.d("SpaceX-Persistence", records.records.size.toString() + " written in " + (System.currentTimeMillis() - start) + " ms")

            // TODO: Write
            queue.async {
                callback()
            }
        }
    }

    fun loadRecords(keys: Set<String>, queue: DispatchQueue, callback: (records: RecordSet) -> Unit) {
        readerExecutor.execute {
            val start = System.currentTimeMillis()
            val loaded = mutableMapOf<String, Record>()
            val condition = PersistenceOpenHelper.COLUMN_ID + " in (" + keys.joinToString(",") { "?" } + ")"
            val cursor = db.query(
                    PersistenceOpenHelper.TABLE_RECORDS,
                    arrayOf(PersistenceOpenHelper.COLUMN_ID, PersistenceOpenHelper.COLUMN_RECORD),
                    condition,
                    keys.toTypedArray(),
                    null,
                    null,
                    null)
            if (cursor != null) {
                try {
                    if (cursor.moveToFirst()) {
                        while (true) {
                            val key = cursor.getString(0)
                            val value = cursor.getString(1)
                            loaded[key] = parseRecord(key, value)

                            if (!cursor.moveToNext()) {
                                break
                            }
                        }
                    }
                } catch (t: Throwable) {
                    // TODO: Crash App
                    // On any exception ignore errors
                    t.printStackTrace()
                } finally {
                    cursor.close()
                }
            }
            Log.d("SpaceX-Persistence", loaded.size.toString() + " loaded in " + (System.currentTimeMillis() - start) + " ms")

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