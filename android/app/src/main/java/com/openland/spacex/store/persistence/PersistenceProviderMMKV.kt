package com.openland.spacex.store.persistence

import android.content.Context
import com.tencent.mmkv.MMKV

/**
 * PersistenceProvider that uses MMKV as storage
 */
class PersistenceProviderMMKV(val context: Context, val name: String) : PersistenceProvider {

    private val db = MMKV.mmkvWithID("spacex-$name-v1")!!

    override fun saveRecords(records: Map<String, String>) {
        for (kv in records) {
            this.db.encode(kv.key, kv.value)
        }
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        val res = mutableMapOf<String, String>()
        for (k in keys) {
            val ex = this.db.decodeString(k)
            if (ex != null) {
                res[k] = ex
            }
        }
        return res
    }
}
