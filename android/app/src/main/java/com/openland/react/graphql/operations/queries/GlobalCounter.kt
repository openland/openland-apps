package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalCounterSelector = obj(
            field("alphaNotificationCounter", "alphaNotificationCounter", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("unreadCount", "unreadCount", notNull(scalar("Int")))
                )))
        )
val GlobalCounter = object: OperationDefinition {
    override val name = "GlobalCounter"
    override val kind = OperationKind.QUERY
    override val body = "query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}"
    override val selector = GlobalCounterSelector
}