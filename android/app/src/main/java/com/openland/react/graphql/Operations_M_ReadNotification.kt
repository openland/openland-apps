package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ReadNotificationSelector = obj(
            field("readNotification","readNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unread","unread", notNull(scalar("Int")))
                )))
        )
val ReadNotification = object: OperationDefinition {
    override val name = "ReadNotification"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ReadNotification(\$notificationId:ID!){readNotification(notificationId:\$notificationId){__typename id unread}}"
    override val selector = ReadNotificationSelector
}