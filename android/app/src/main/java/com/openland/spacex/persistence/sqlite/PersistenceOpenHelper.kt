package com.openland.spacex.persistence.sqlite

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper


class PersistenceOpenHelper(context: Context, name: String) : SQLiteOpenHelper(context, name, null, DATABASE_VERSION) {

    companion object {
        val TABLE_RECORDS = "records"
        val COLUMN_ID = "_id"
        val COLUMN_RECORD = "record"
        private val DATABASE_VERSION = 1
        private val DATABASE_CREATE = String.format(
                "create table %s(%s text primary key, %s text not null);",
                TABLE_RECORDS, COLUMN_ID, COLUMN_RECORD)
    }

    override fun onCreate(database: SQLiteDatabase) {
        database.execSQL(DATABASE_CREATE)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS $TABLE_RECORDS")
        onCreate(db)
    }
}