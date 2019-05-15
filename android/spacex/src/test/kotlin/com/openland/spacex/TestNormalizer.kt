package com.openland.spacex

import com.openland.spacex.gen.*
import com.openland.spacex.store.RecordValue
import com.openland.spacex.store.normalizeData
import org.json.JSONObject
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class TestNormalizer {

    @Test
    fun `should parse String fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("String")),
                field("field2", "field2_alias", notNull(scalar("String"))),
                field("field3", "field3_alias", scalar("String"))
        )

        val cases = listOf(
                """{"field1_alias":"1","field2_alias":"2","field3_alias":null}""",
                """{"field1_alias":"1","field2_alias":"2"}"""
        )

        for (case in cases) {
            val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))

            assertEquals(1, normalized.records.size)
            assertTrue(normalized.records.containsKey("1"))

            // Check fields
            val nr = normalized.records.getValue("1")
            assertEquals(3, nr.fields.size)
            assertTrue(nr.fields.containsKey("field1"))
            assertTrue(nr.fields.containsKey("field2"))
            assertTrue(nr.fields.containsKey("field3"))
            assertEquals(RecordValue.String("1"), nr.fields["field1"])
            assertEquals(RecordValue.String("2"), nr.fields["field2"])
            assertEquals(RecordValue.Null, nr.fields["field3"])
        }
    }

    @Test
    fun `should parse String fields from float`() {
        val type = obj(
                field("field1", "field1_alias", scalar("String")),
                field("field2", "field2_alias", notNull(scalar("String"))),
                field("field3", "field3_alias", scalar("String"))
        )
        val floatCase = """{"field1_alias":1.0,"field2_alias":2.0}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(floatCase))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(3, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertEquals(RecordValue.String("1.0"), nr.fields["field1"])
        assertEquals(RecordValue.String("2.0"), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
    }

    @Test
    fun `should parse String fields from integers`() {
        val type = obj(
                field("field1", "field1_alias", scalar("String")),
                field("field2", "field2_alias", notNull(scalar("String"))),
                field("field3", "field3_alias", scalar("String"))
        )
        val intCase = """{"field1_alias":1,"field2_alias":2}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(intCase))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(3, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertEquals(RecordValue.String("1"), nr.fields["field1"])
        assertEquals(RecordValue.String("2"), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
    }

    @Test
    fun `should parse String fields from booleans`() {
        val type = obj(
                field("field1", "field1_alias", scalar("String")),
                field("field2", "field2_alias", notNull(scalar("String"))),
                field("field3", "field3_alias", scalar("String"))
        )
        val intCase = """{"field1_alias":true,"field2_alias":false}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(intCase))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(3, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertEquals(RecordValue.String("true"), nr.fields["field1"])
        assertEquals(RecordValue.String("false"), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
    }

    @Test
    fun `should parse Boolean fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("Boolean")),
                field("field2", "field2_alias", notNull(scalar("Boolean"))),
                field("field3", "field3_alias", scalar("Boolean")),
                field("field4", "field4_alias", scalar("Boolean"))
        )
        val case = """{"field1_alias":true,"field2_alias":false,"field3_alias":null}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(4, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertTrue(nr.fields.containsKey("field4"))
        assertEquals(RecordValue.Boolean(true), nr.fields["field1"])
        assertEquals(RecordValue.Boolean(false), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
        assertEquals(RecordValue.Null, nr.fields["field4"])
    }

    @Test
    fun `should parse Int fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("Int")),
                field("field2", "field2_alias", notNull(scalar("Int"))),
                field("field3", "field3_alias", scalar("Int")),
                field("field4", "field4_alias", scalar("Int"))
        )
        val case = """{"field1_alias":1,"field2_alias":2,"field3_alias":null}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(4, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertTrue(nr.fields.containsKey("field4"))
        assertEquals(RecordValue.Number(1.0), nr.fields["field1"])
        assertEquals(RecordValue.Number(2.0), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
        assertEquals(RecordValue.Null, nr.fields["field4"])
    }

    @Test
    fun `should parse Float fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("Float")),
                field("field2", "field2_alias", notNull(scalar("Float"))),
                field("field3", "field3_alias", scalar("Float")),
                field("field4", "field4_alias", scalar("Float"))
        )
        val case = """{"field1_alias":1.0,"field2_alias":2.0,"field3_alias":null}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(4, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertTrue(nr.fields.containsKey("field4"))
        assertEquals(RecordValue.Number(1.0), nr.fields["field1"])
        assertEquals(RecordValue.Number(2.0), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
        assertEquals(RecordValue.Null, nr.fields["field4"])
    }

    @Test
    fun `should parse ID fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("ID")),
                field("field2", "field2_alias", notNull(scalar("ID"))),
                field("field3", "field3_alias", scalar("ID")),
                field("field4", "field4_alias", scalar("ID"))
        )
        val case = """{"field1_alias":1,"field2_alias":"2","field3_alias":null}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(4, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertTrue(nr.fields.containsKey("field4"))
        assertEquals(RecordValue.String("1"), nr.fields["field1"])
        assertEquals(RecordValue.String("2"), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
        assertEquals(RecordValue.Null, nr.fields["field4"])
    }

    @Test
    fun `should parse Date fields`() {
        val type = obj(
                field("field1", "field1_alias", scalar("Date")),
                field("field2", "field2_alias", notNull(scalar("Date"))),
                field("field3", "field3_alias", scalar("Date")),
                field("field4", "field4_alias", scalar("Date"))
        )
        val case = """{"field1_alias":1,"field2_alias":"2","field3_alias":null}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(4, nr.fields.size)
        assertTrue(nr.fields.containsKey("field1"))
        assertTrue(nr.fields.containsKey("field2"))
        assertTrue(nr.fields.containsKey("field3"))
        assertTrue(nr.fields.containsKey("field4"))
        assertEquals(RecordValue.String("1"), nr.fields["field1"])
        assertEquals(RecordValue.String("2"), nr.fields["field2"])
        assertEquals(RecordValue.Null, nr.fields["field3"])
        assertEquals(RecordValue.Null, nr.fields["field4"])
    }

    @Test
    fun `should crash on invalid scalar name`() {
        val type = obj(
                field("field1", "field1_alias", scalar("DateTime")),
                field("field2", "field2_alias", notNull(scalar("DateTime"))),
                field("field3", "field3_alias", scalar("DateTime")),
                field("field4", "field4_alias", scalar("DateTime"))
        )
        val case = """{"field1_alias":1,"field2_alias":"2","field3_alias":null}"""
        assertFailsWith(InvalidDataException::class) {
            normalizeData("1", type, JSONObject(), JSONObject(case))
        }
    }

    @Test
    fun `should crash on missing non-nullable value`() {
        val type = obj(
                field("field1", "field1_alias", scalar("String")),
                field("field2", "field2_alias", notNull(scalar("String"))),
                field("field3", "field3_alias", scalar("String")),
                field("field4", "field4_alias", scalar("String"))
        )
        val case = """{"field1_alias":"1","field2_alias":null,"field3_alias":null}"""
        assertFailsWith(InvalidDataException::class) {
            normalizeData("1", type, JSONObject(), JSONObject(case))
        }
    }

    @Test
    fun `should detect correct ids`() {
        val type = obj(
                field("id", "id", scalar("ID")),
                field("value", "value", scalar("String"))
        )
        val cases = listOf("""{"id":"1","value":null}""", """{"id":1,"value":null}""")
        for (case in cases) {
            val normalized = normalizeData("some-parent-id", type, JSONObject(), JSONObject(case))
            assertEquals(1, normalized.records.size)
            assertTrue(normalized.records.containsKey("1"))
        }
    }

    @Test
    fun `should detect parse fragments`() {
        val type = obj(
                field("id", "id", scalar("ID")),
                field("value", "value", scalar("String")),
                fragment("SomeValue", obj(
                        field("value2", "value2", scalar("String"))
                ))
        )
        val cases = listOf(
                """{"id":"1","value":null,"value2":"2"}""",
                """{"id":1,"value":null,"value2":"2"}""",
                """{"__typename": "SomeType", "id":1,"value":null,"value2":"2"}""", // Invalid __typename MUST NOT crash parsers
                """{"__typename": "SomeValue", "id":1,"value":null,"value2":"2"}"""
        )
        for (case in cases) {
            val normalized = normalizeData("some-parent-id", type, JSONObject(), JSONObject(case))
            assertEquals(1, normalized.records.size)
            assertTrue(normalized.records.containsKey("1"))
            val r = normalized.records["1"]!!
            assertEquals(3, r.fields.size)
        }
    }

    @Test
    fun `should detect parse inline fragments`() {
        val type = obj(
                field("id", "id", scalar("ID")),
                field("value", "value", scalar("String")),
                inline("SomeType", obj(
                        field("value2", "value2", scalar("String"))
                ))
        )
        val cases = listOf("""{"__typename":"SomeType","id":"1","value":null,"value2":"2"}""", """{"__typename":"SomeType","id":1,"value":null,"value2":"2"}""")
        val negativeCase = listOf("""{"__typename":"SomeType2","id":"1","value":null,"value2":"2"}""", """{"__typename":"SomeType2","id":1,"value":null,"value2":"2"}""")
        for (case in cases) {
            val normalized = normalizeData("some-parent-id", type, JSONObject(), JSONObject(case))
            assertEquals(1, normalized.records.size)
            assertTrue(normalized.records.containsKey("1"))
            val r = normalized.records["1"]!!
            assertEquals(3, r.fields.size)
        }
        for (case in negativeCase) {
            val normalized = normalizeData("some-parent-id", type, JSONObject(), JSONObject(case))
            assertEquals(1, normalized.records.size)
            assertTrue(normalized.records.containsKey("1"))
            val r = normalized.records["1"]!!
            assertEquals(2, r.fields.size)
        }
    }

    @Test
    fun `should parse simple lists`() {
        val type = obj(
                field("list", "list", list(scalar("String")))
        )
        val case = """{"list":["1",null,"3"]}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(1, nr.fields.size)
        assertTrue(nr.fields.containsKey("list"))
        assertTrue(nr.fields["list"] is RecordValue.List)
        val list = nr.fields["list"] as RecordValue.List
        assertEquals(3, list.items.size)
        assertEquals(RecordValue.String("1"), list.items[0])
        assertEquals(RecordValue.Null, list.items[1])
        assertEquals(RecordValue.String("3"), list.items[2])
    }

    @Test
    fun `should parse lists of lists`() {
        val type = obj(
                field("list", "list", list(list(scalar("String"))))
        )
        val case = """{"list":[["1",null,"3"]]}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(1, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        val nr = normalized.records.getValue("1")
        assertEquals(1, nr.fields.size)
        assertTrue(nr.fields.containsKey("list"))
        assertTrue(nr.fields["list"] is RecordValue.List)
        val list = nr.fields["list"] as RecordValue.List
        assertEquals(1, list.items.size)
        val list2 = list.items[0] as RecordValue.List
        assertEquals(3, list2.items.size)
        assertEquals(RecordValue.String("1"), list2.items[0])
        assertEquals(RecordValue.Null, list2.items[1])
        assertEquals(RecordValue.String("3"), list2.items[2])
    }

    @Test
    fun `should parse lists of objects`() {
        val type = obj(
                field("list", "list",
                        list(obj(
                                field("value", "value", scalar("String"))
                        ))
                )
        )
        val case = """{"list":[{"value":"1"},null,{"value":"3"}]}"""
        val normalized = normalizeData("1", type, JSONObject(), JSONObject(case))
        assertEquals(3, normalized.records.size)
        assertTrue(normalized.records.containsKey("1"))
        assertTrue(normalized.records.containsKey("1.list.0"))
        assertFalse(normalized.records.containsKey("1.list.1"))
        assertTrue(normalized.records.containsKey("1.list.2"))
        val nr = normalized.records.getValue("1")
        assertEquals(1, nr.fields.size)
        assertTrue(nr.fields.containsKey("list"))
        assertTrue(nr.fields["list"] is RecordValue.List)
        val list = nr.fields["list"] as RecordValue.List
        assertEquals(3, list.items.size)
        assertEquals(RecordValue.Reference("1.list.0"), list.items[0])
        assertEquals(RecordValue.Null, list.items[1])
        assertEquals(RecordValue.Reference("1.list.2"), list.items[2])
    }
}