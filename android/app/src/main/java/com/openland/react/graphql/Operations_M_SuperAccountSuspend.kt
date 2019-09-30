package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountSuspendSelector = obj(
            field("superAccountSuspend","superAccountSuspend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
val SuperAccountSuspend = object: OperationDefinition {
    override val name = "SuperAccountSuspend"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountSuspend(\$accountId:ID!){superAccountSuspend(id:\$accountId){__typename id state}}"
    override val selector = SuperAccountSuspendSelector
}