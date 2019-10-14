package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OnlineWatchSelector = obj(
            field("alphaSubscribeOnline", "alphaSubscribeOnline", arguments(fieldValue("users", refValue("users"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("timeout", "timeout", notNull(scalar("Int"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("lastSeen", "lastSeen", scalar("String")),
                            field("online", "online", notNull(scalar("Boolean")))
                        )))
                )))
        )
val OnlineWatch = object: OperationDefinition {
    override val name = "OnlineWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription OnlineWatch(\$users:[ID!]!){alphaSubscribeOnline(users:\$users){__typename timeout user{__typename id lastSeen online}}}"
    override val selector = OnlineWatchSelector
}