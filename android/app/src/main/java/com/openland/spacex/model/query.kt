package com.openland.spacex.model

enum class OperationKind {
    QUERY,
    MUTATION,
    SUBSCRIPTION
}


interface OperationDefinition {
    val kind: OperationKind
    val selector: OutputType.Object
    val name: String
    val body: String
}