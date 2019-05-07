package com.openland.spacex

import com.openland.spacex.gen.field
import com.openland.spacex.gen.notNull
import com.openland.spacex.gen.obj
import com.openland.spacex.gen.scalar
import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordStore
import com.openland.spacex.store.RecordValue
import com.openland.spacex.store.readFromStore
import org.json.JSONObject
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ReaderTests {

    @Test
    fun `should read simple scalars`() {
        val type = obj(listOf(
                field("field1", "alias1", emptyMap(), notNull(scalar("String"))),
                field("field2", "alias2", emptyMap(), notNull(scalar("Int"))),
                field("field3", "alias3", emptyMap(), scalar("Float")),
                field("field4", "alias4", emptyMap(), scalar("Float")),
                field("field5", "alias5", emptyMap(), scalar("ID")),
                field("field6", "alias6", emptyMap(), scalar("Date")),
                field("field7", "alias7", emptyMap(), scalar("Boolean")),
                field("field8", "alias8", emptyMap(), scalar("Boolean"))
        ))
        val store = RecordStore()
        store.merge(Record("1", mapOf(
                "field1" to RecordValue.String("value1"),
                "field2" to RecordValue.Number(1.0),
                "field3" to RecordValue.Null,
                "field4" to RecordValue.Number(1.0),
                "field5" to RecordValue.String("1"),
                "field6" to RecordValue.String("123123"),
                "field7" to RecordValue.Boolean(true),
                "field8" to RecordValue.Boolean(false)
        )))

        val res = readFromStore("1", store, type, JSONObject())
        assertTrue(res.first)
        assertNotNull(res.second)
        val v = res.second!!
        assertEquals(8, v.length())
        assertEquals("value1", v["alias1"])
        assertEquals(1.0, v["alias2"])
        assertEquals(JSONObject.NULL, v["alias3"])
        assertEquals(1.0, v["alias4"])
        assertEquals("1", v["alias5"])
        assertEquals("123123", v["alias6"])
        assertEquals(true, v["alias7"])
        assertEquals(false, v["alias8"])
    }
}