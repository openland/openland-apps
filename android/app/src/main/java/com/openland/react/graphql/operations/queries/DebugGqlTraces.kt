package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DebugGqlTracesSelector = obj(
            field("debugGqlTraces", "debugGqlTraces", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("ID")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("date", "date", notNull(scalar("Date"))),
                            field("duration", "duration", notNull(scalar("Int")))
                        )))))
                )))
        )
val DebugGqlTraces = object: OperationDefinition {
    override val name = "DebugGqlTraces"
    override val kind = OperationKind.QUERY
    override val body = "query DebugGqlTraces(\$first:Int!,\$after:ID){debugGqlTraces(first:\$first,after:\$after){__typename cursor items{__typename id name date duration}}}"
    override val selector = DebugGqlTracesSelector
}