package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DeleteNotificationSelector = obj(
            field("deleteNotification","deleteNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(scalar("Boolean")))
        )
val DeleteNotification = object: OperationDefinition {
    override val name = "DeleteNotification"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DeleteNotification(\$notificationId:ID!){deleteNotification(notificationId:\$notificationId)}"
    override val selector = DeleteNotificationSelector
}