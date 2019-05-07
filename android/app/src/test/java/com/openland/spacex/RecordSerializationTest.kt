package com.openland.spacex

import com.openland.spacex.store.Record
import com.openland.spacex.store.RecordValue
import com.openland.spacex.store.parseRecord
import com.openland.spacex.store.serializeRecord
import org.junit.Test
import kotlin.test.assertEquals

class RecordSerializationTests {

    @Test
    fun testRecordSerialization() {
        val record1 = Record(
                "key1",
                mapOf(
                        "field1" to RecordValue.String("value1"),
                        "field2" to RecordValue.Boolean(true),
                        "field3" to RecordValue.Boolean(false),
                        "field4" to RecordValue.String("valu\"'!#23🦄e3"),
                        "field5" to RecordValue.Number(0.0),
                        "field5" to RecordValue.Null,
                        "field6" to RecordValue.Reference("key2")
                )
        )
        val serialized = serializeRecord(record1)
        val expected = "{\"field6\":{\"key\":\"key2\"},\"field1\":\"value1\",\"field3\":false,\"field2\":true,\"field5\":null,\"field4\":\"valu\\\"'!#23\uD83E\uDD84e3\"}"
        assertEquals(expected, serialized)

        val res = parseRecord("key1", serialized)
        assertEquals(record1, res)
    }
}