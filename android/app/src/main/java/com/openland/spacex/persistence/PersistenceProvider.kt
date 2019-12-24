package com.openland.spacex.persistence

/**
 * PersistenceProvider is an interface that have to be implemented to connect to new storage engine.
 * All operations are blocking and all threading is performed by library.
 *
 * Guarantees and constraints:
 * - saveRecords can be called from thread pool concurrently
 * - no two keys can be written at the same time
 * - before writing a key it is guaranteed that read will be performed first
 * - any key read only once
 * - there could be only one write operation at a time
 * - all write operations have to provide serializable transaction integrity
 * - in case of fatal failure it is possible to lose results from few last consequential write operations
 */
interface PersistenceProvider {

    /**
     * Synchronous method to saving records to store.
     * @param records map from keys to values to write
     */
    fun saveRecords(records: Map<String, String>)

    /**
     * Synchronous method to read records from store. Can be called in parallel.
     * @param keys keys to read
     * @return map from keys to values that exist in database.
     */
    fun loadRecords(keys: Set<String>): Map<String, String>
}

/**
 * EmptyPersistenceProvider for memory-only persistence.
 * Because of guarantees
 */
class EmptyPersistenceProvider : PersistenceProvider {
    override fun saveRecords(records: Map<String, String>) {
        // Nothing to do
    }

    override fun loadRecords(keys: Set<String>): Map<String, String> {
        return emptyMap()
    }
}