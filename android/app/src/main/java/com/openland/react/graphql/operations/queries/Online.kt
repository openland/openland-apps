package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OnlineSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("lastSeen", "lastSeen", scalar("String")),
                    field("online", "online", notNull(scalar("Boolean")))
                )))
        )
val Online = object: OperationDefinition {
    override val name = "Online"
    override val kind = OperationKind.QUERY
    override val body = "query Online(\$userId:ID!){user:user(id:\$userId){__typename id lastSeen online}}"
    override val selector = OnlineSelector
}