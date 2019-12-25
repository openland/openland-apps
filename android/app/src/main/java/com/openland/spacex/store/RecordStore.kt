package com.openland.spacex.store

/**
 * Representation of changed record fields during merging
 */
class ChangedRecord(val key: String, val fields: Set<String>)

/**
 * In Memory Record Store. Any operation with store executed against Record Store first.
 */
class RecordStore {

    private val inMemory = mutableMapOf<String, Record>()

    /**
     * Merge Record Set
     * @param recordSet Record Set
     * @return Changed Records
     * @throws Error if record is NOT loaded in store
     */
    fun merge(recordSet: RecordSet): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        for (r in recordSet.records.values) {
            merge(r, res)
        }
        return res
    }

    /**
     * Merge single Record
     * @param record Record
     * @return Changed Records
     * @throws Error if record is NOT loaded in store
     */
    fun merge(record: Record): Map<String, ChangedRecord> {
        val res = mutableMapOf<String, ChangedRecord>()
        merge(record, res)
        return res
    }

    /**
     * Apply record that is loaded from persistence
     * @param record Record
     * @throws Error if record is already loaded in store
     */
    fun loaded(record: Record) {
        if (this.inMemory.containsKey(record.key)) {
            throw Error("Record " + record.key + " already loaded")
        }
        this.inMemory[record.key] = record
    }

    /**
     * Apply records that are loaded from persistence
     * @param set Record Set
     * @throws Error if record is already loaded in store
     */
    fun loaded(set: RecordSet) {
        for (s in set.records) {
            loaded(s.value)
        }
    }

    /**
     * Read Record by Key
     * @param key Record Key
     * @return Loaded Record
     * @throws Error if record is NOT loaded in store
     */
    fun read(key: String): Record {
        return loadRecord(key)
    }

    /**
     * Check if record is loaded in store
     * @param key Record Key
     * @return true if record exists in store
     */
    fun isInMemory(key: String): Boolean {
        return inMemory.containsKey(key)
    }

    //
    // Implementation
    //

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