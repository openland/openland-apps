package com.openland.spacex.model

sealed class OutputType {
    class NotNull(val inner: OutputType) : OutputType()
    class Scalar(val name: String) : OutputType()
    class Object(val selectors: kotlin.collections.List<Selector>) : OutputType()
    class List(val inner: OutputType) : OutputType()
}

fun notNull(outputType: OutputType): OutputType {
    return OutputType.NotNull(outputType)
}

fun scalar(name: String): OutputType {
    return OutputType.Scalar(name)
}

fun field(name: String, alias: String, type: OutputType): Selector.Field {
    return Selector.Field(name, alias, type, emptyMap())
}

fun field(name: String, alias: String, arguments: Map<String, InputValue>, type: OutputType): Selector.Field {
    return Selector.Field(name, alias, type, arguments)
}

fun list(inner: OutputType): OutputType {
    return OutputType.List(inner)
}

fun obj(selector: List<Selector>): OutputType.Object {
    return OutputType.Object(selector)
}

fun fragment(name: String, fragment: OutputType.Object): Selector {
    return Selector.Fragment(name, fragment)
}

fun inline(name: String, fragment: OutputType.Object): Selector {
    return Selector.TypeCondition(name, fragment)
}

fun reference(name: String): InputValue.Reference {
    return InputValue.Reference(name)
}

fun i(value: Int): InputValue.Int {
    return InputValue.Int(value)
}

fun s(value: String): InputValue.String {
    return InputValue.String(value)
}

fun listValue(vararg inputValue: InputValue): InputValue.List {
    return InputValue.List(inputValue as Array<InputValue>)
}

fun objectValue(vararg args: Pair<String, InputValue>): InputValue.Object {
    return InputValue.Object(args.toMap())
}

sealed class InputValue {
    class Reference(val name: kotlin.String) : InputValue()
    class List(val items: Array<InputValue>) : InputValue()
    class Object(val fields: Map<kotlin.String, InputValue>) : InputValue()

    class Int(val value: kotlin.Int) : InputValue()
    class String(val value: kotlin.String) : InputValue()
}

sealed class Selector {
    class Field(
            val name: String,
            val alias: String,
            val type: OutputType,
            val arguments: Map<String, InputValue>
    ) : Selector()

    class TypeCondition(
            val type: String,
            val fragment: OutputType.Object
    ) : Selector()

    class Fragment(val type: String, val fragment: OutputType.Object) : Selector()
}