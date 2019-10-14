package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountPendSelector = obj(
            field("superAccountPend", "superAccountPend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val SuperAccountPend = object: OperationDefinition {
    override val name = "SuperAccountPend"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountPend(\$accountId:ID!){superAccountPend(id:\$accountId){__typename id state}}"
    override val selector = SuperAccountPendSelector
}