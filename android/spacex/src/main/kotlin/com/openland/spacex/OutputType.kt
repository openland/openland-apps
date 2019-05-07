package com.openland.spacex

sealed class OutputType {
    class NotNull(val inner: OutputType) : OutputType()
    class Scalar(val name: String) : OutputType()
    class Object(val selectors: kotlin.collections.List<Selector>) : OutputType()
    class List(val inner: OutputType) : OutputType()
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