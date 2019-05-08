package com.openland.spacex.persistence

interface PersistenceProvider {
    fun saveRecords(records: Map<String, String>)
    fun loadRecords(keys: Set<String>): Map<String, String>
}