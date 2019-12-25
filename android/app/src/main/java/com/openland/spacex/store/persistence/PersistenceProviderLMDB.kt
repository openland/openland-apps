package com.openland.spacex.store.persistence

import android.content.Context
import com.openland.lmdb.LMDB
import com.openland.lmdb.LMDBDatabase
import com.openland.lmdb.LMDBEnvironment

/**
 * PersistenceProvider that uses LMDB as storage
 */
class PersistenceProviderLMDB(val context: Context, val name: String) : PersistenceProvider {

    private val env: LMDBEnvironment = LMDB.createEnvironment(context.filesDir.absolutePath + "/" + name + "-v3.mdb")
    private val db: LMDBDatabase

    init {
        val tx = env.startTransaction()
        db = tx.openDatabase("persistence")
        tx.commit()
    }

    override fun saveRecords(records: Map<String, String>) {
        val tx = env.startTransaction()
        try {
            for (kv in records) {
                db.put(tx, kv.key, kv.value)
            }
            tx.commit()
        } catch (e: Throwable) {
            tx.abort()
            throw e
        }
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        val res = mutableMapOf<String, String>()
        val tx = env.startTransaction(true)
        try {
            for (k in keys) {
                val ex = db.get(tx, k)
                if (ex != null) {
                    res[k] = ex
                }
            }
        } finally {
            tx.abort()
        }
        return res
    }

}
