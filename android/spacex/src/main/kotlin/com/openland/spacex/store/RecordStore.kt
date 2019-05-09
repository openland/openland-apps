package com.openland.spacex.store

class ChangedRecord(val key: String, val fields: Set<String>)

class RecordStore {

    private val inMemory = mutableMapOf<String, Record>()

    fun merge(recordSet: RecordSet): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        for (r in recordSet.records.values) {
            merge(r, res)
        }
        return res
    }

    fun merge(record: Record): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        merge(record, res)
        return res
    }

    fun loaded(record: Record) {
        if (this.inMemory.containsKey(record.key)) {
            throw Error("Record " + record.key + " already loaded")
        }
        this.inMemory[record.key] = record
    }

    fun loaded(set: RecordSet) {
        for (s in set.records) {
            loaded(s.value)
        }
    }

    fun read(key: String): Record {
        return loadRecord(key)
    }

    fun isInMemory(key: String): Boolean {
        return inMemory.containsKey(key)
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
        throw Error("record $key is not loaded yet")
    }
}