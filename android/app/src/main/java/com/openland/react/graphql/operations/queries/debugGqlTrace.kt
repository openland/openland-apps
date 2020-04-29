package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DebugGqlTraceSelector = obj(
            field("debugGqlTrace", "debugGqlTrace", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("duration", "duration", notNull(scalar("Int"))),
                    field("traceData", "traceData", notNull(scalar("String"))),
                    field("date", "date", notNull(scalar("Date")))
                )))
        )
val DebugGqlTrace = object: OperationDefinition {
    override val name = "DebugGqlTrace"
    override val kind = OperationKind.QUERY
    override val body = "query DebugGqlTrace(\$id:ID!){debugGqlTrace(id:\$id){__typename id name duration traceData date}}"
    override val selector = DebugGqlTraceSelector
}