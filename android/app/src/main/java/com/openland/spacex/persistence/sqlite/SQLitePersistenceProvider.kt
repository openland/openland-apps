package com.openland.spacex.persistence.sqlite

import android.content.Context
import android.util.Log
import com.openland.spacex.persistence.PersistenceProvider

class SQLitePersistenceProvider(context: Context, name: String) : PersistenceProvider {

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

    private val db by lazy { getDatabase(context, name).writableDatabase }

    override fun saveRecords(records: Map<String, String>) {
        val start = System.currentTimeMillis()
        try {
            db.beginTransaction()
            for (kv in records) {
                db.execSQL("REPLACE INTO records(\"_id\", \"record\") VALUES(?,?);", arrayOf(kv.key, kv.value))
            }
            db.setTransactionSuccessful()
        } catch (t: Throwable) {
            // TODO: Crash App
            // On any exception hang persistence engine
            t.printStackTrace()
            return
        } finally {
            db.endTransaction()
        }
        Log.d("SpaceX-Persistence", records.size.toString() + " written in " + (System.currentTimeMillis() - start) + " ms")
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        val start = System.currentTimeMillis()
        val loaded = mutableMapOf<String, String>()
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
                        loaded[key] = value

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
        return loaded
    }
}