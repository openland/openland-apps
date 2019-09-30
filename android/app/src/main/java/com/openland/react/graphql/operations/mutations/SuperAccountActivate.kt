package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountActivateSelector = obj(
            field("superAccountActivate","superAccountActivate", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
val SuperAccountActivate = object: OperationDefinition {
    override val name = "SuperAccountActivate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountActivate(\$accountId:ID!){superAccountActivate(id:\$accountId){__typename id state}}"
    override val selector = SuperAccountActivateSelector
}