package com.openland.spacex

interface OperationDefinition {
    val kind: OperationKind
    val selector: OutputType.Object
    val name: String
    val body: String
}