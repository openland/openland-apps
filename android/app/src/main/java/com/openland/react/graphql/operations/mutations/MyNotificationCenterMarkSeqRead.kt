package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyNotificationCenterMarkSeqReadSelector = obj(
            field("notificationCenterMarkSeqRead", "notificationCenterMarkSeqRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("Boolean")))
        )
val MyNotificationCenterMarkSeqRead = object: OperationDefinition {
    override val name = "MyNotificationCenterMarkSeqRead"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MyNotificationCenterMarkSeqRead(\$seq:Int!){notificationCenterMarkSeqRead(toSeq:\$seq)}"
    override val selector = MyNotificationCenterMarkSeqReadSelector
}