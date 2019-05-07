package com.openland.spacex.store

class ChangedRecord(val key: String, val fields: Set<String>)

class RecordStore(val persistence: RecordPersistence = EmptyPersistence) {

    private val inMemory = mutableMapOf<String, Record>()

    fun merge(recordSet: RecordSet): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        for (r in recordSet.records.values) {
            merge(r, res)
        }
        flushRecords(res)
        return res
    }

    fun merge(record: Record): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        merge(record, res)
        flushRecords(res)
        return res
    }

    fun read(key: String): Record {
        return loadRecord(key)
    }

    private fun merge(record: Record, changed: MutableMap<String, ChangedRecord>) {
        val ex = loadRecord(record.key)
        val changedFields = mutableSetOf<String>()
        val fields = mutableMapOf<String, RecordValue>()
        for (field in ex.fields) {
            fields[field.key] = field.value
        }
        for (field in record.fields) {
            val exf = ex.fields[field.key]
            if (exf == null || exf != field.value) {
                changedFields.add(field.key)
                fields[field.key] = field.value
            }
        }
        if (changedFields.size > 0) {
            inMemory[record.key] = Record(record.key, fields)
            changed[record.key] = ChangedRecord(record.key, changedFields)
        }
    }

    private fun loadRecord(key: String): Record {
        val cached = inMemory[key]
        if (cached != null) {
            return cached
        }
        val persisted = persistence.read(setOf(key))
        if (persisted.isNotEmpty()) {
            val p = persisted.getValue(key)
            val res = parseRecord(key, p)
            inMemory[key] = res
            return res
        }
        val res = Record(key, emptyMap())
        inMemory[key] = res
        return res
    }

    private fun flushRecords(changed: MutableMap<String, ChangedRecord>) {
        if (changed.isEmpty()) {
            return
        }
        val map = mutableMapOf<String, String>()
        for (k in changed.keys) {
            map[k] = serializeRecord(inMemory[k]!!)
        }
        persistence.write(map)
    }
}