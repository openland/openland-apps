package com.openland.spacex

import com.openland.spacex.store.selectorKey
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Test
import kotlin.test.assertEquals

class TestSelectorKey {

    @Test
    fun `should return name for empty arguments`() {
        val selector1 = selectorKey("name", emptyMap(), JSONObject())
        assertEquals("name", selector1)
        val selector2 = selectorKey("nameonetwothre12", emptyMap(), JSONObject())
        assertEquals("nameonetwothre12", selector2)
    }

    @Test
    fun `should format constants correctly`() {
        val selector1 = selectorKey("field", mapOf("var1" to InputValue.Int(1)), JSONObject())
        assertEquals("field(var1:1)", selector1)
        val selector2 = selectorKey("field", mapOf("var1" to InputValue.Float(1.0)), JSONObject())
        assertEquals("field(var1:1.0)", selector2)
        val selector3 = selectorKey("field", mapOf("var1" to InputValue.Boolean(true)), JSONObject())
        assertEquals("field(var1:true)", selector3)
        val selector4 = selectorKey("field", mapOf("var1" to InputValue.Boolean(false)), JSONObject())
        assertEquals("field(var1:false)", selector4)
        val selector5 = selectorKey("field", mapOf("var1" to InputValue.String("arg")), JSONObject())
        assertEquals("field(var1:\"arg\")", selector5)
        val selector6 = selectorKey("field", mapOf("var1" to InputValue.Null), JSONObject())
        assertEquals("field(var1:null)", selector6)
    }

    @Test
    fun `should sort arguments in right order`() {
        val selector1 = selectorKey("field", mapOf(
                "c" to InputValue.Int(1),
                "a" to InputValue.Int(1),
                "b" to InputValue.Int(1)
        ), JSONObject())
        assertEquals("field(a:1,b:1,c:1)", selector1)
    }

    @Test
    fun `should format lists correctly`() {
        val selector1 = selectorKey("field", mapOf("var1" to InputValue.List(arrayOf(InputValue.Int(1), InputValue.Int(2), InputValue.Int(3)))), JSONObject())
        assertEquals("field(var1:[1,2,3])", selector1)
        val selector2 = selectorKey("field", mapOf("var1" to InputValue.List(arrayOf(InputValue.String("1"), InputValue.String("2"), InputValue.String("3")))), JSONObject())
        assertEquals("field(var1:[\"1\",\"2\",\"3\"])", selector2)
        val selector3 = selectorKey("field", mapOf("var1" to InputValue.Reference("var1")), JSONObject(mapOf(
                "var1" to JSONArray(listOf("1", "2", "3"))
        )))
        assertEquals("field(var1:[\"1\",\"2\",\"3\"])", selector3)
    }

    @Test
    fun `should format objects correctly`() {
        val selector1 = selectorKey("field",
                mapOf("var1" to InputValue.Object(mapOf("a" to InputValue.Int(1), "c" to InputValue.Int(3), "b" to InputValue.Int(2)))), JSONObject())
        assertEquals("field(var1:{a:1,b:2,c:3})", selector1)

        val selector2 = selectorKey("field", mapOf("var1" to InputValue.Reference("var1")), JSONObject(mapOf(
                "var1" to JSONObject(mapOf("a" to 1, "b" to 2, "c" to 3))
        )))
        assertEquals("field(var1:{a:1,b:2,c:3})", selector2)

        val selector3 = selectorKey("field", mapOf("var1" to InputValue.Reference("var1")), JSONObject(mapOf(
                "var1" to JSONObject(mapOf("a" to 1, "b" to 2, "c" to JSONObject.NULL))
        )))
        assertEquals("field(var1:{a:1,b:2,c:null})", selector3)
    }

    @Test
    fun `should ignore not specified arguments`() {
        val selector2 = selectorKey("field", mapOf("var1" to InputValue.Reference("var1")), JSONObject())
        assertEquals("field", selector2)

        val selector3 = selectorKey("field", mapOf("var1" to InputValue.Object(mapOf("var2" to InputValue.Reference("var1")))), JSONObject())
        assertEquals("field(var1:{})", selector3)
    }
}