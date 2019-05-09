package com.openland.spacex

sealed class InputValue {
    class String(val value: kotlin.String) : InputValue()
    class Int(val value: kotlin.Int) : InputValue()
    class Float(val value: kotlin.Double) : InputValue()
    class Boolean(val value: kotlin.Boolean) : InputValue()
    object Null : InputValue()

    class List(val items: Array<InputValue>) : InputValue()
    class Object(val fields: Map<kotlin.String, InputValue>) : InputValue()

    class Reference(val name: kotlin.String) : InputValue()
}