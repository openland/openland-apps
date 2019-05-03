package com.openland.spacex.model

import com.openland.spacex.store.RecordSet
import kotlinx.serialization.json.JsonObject

enum class OperationKind {
    QUERY,
    MUTATION,
    SUBSCRIPTION
}


interface OperationDefinition {
    val kind: OperationKind
    val selector: OutputType.Object?
    val name: String
    val body: String
    fun normalizeResponse(response: JsonObject): RecordSet
}