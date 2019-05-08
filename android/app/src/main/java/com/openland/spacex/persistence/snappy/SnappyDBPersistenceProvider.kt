package com.openland.spacex.persistence.snappy

import android.content.Context
import android.util.Log
import com.openland.spacex.persistence.PersistenceProvider
import com.snappydb.DBFactory

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