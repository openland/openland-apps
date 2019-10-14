package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UnSubscribeFromCommentsSelector = obj(
            field("unsubscribeFromComments", "unsubscribeFromComments", arguments(fieldValue("peerId", refValue("peerId"))), notNull(scalar("Boolean")))
        )
val UnSubscribeFromComments = object: OperationDefinition {
    override val name = "UnSubscribeFromComments"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UnSubscribeFromComments(\$peerId:ID!){unsubscribeFromComments(peerId:\$peerId)}"
    override val selector = UnSubscribeFromCommentsSelector
}