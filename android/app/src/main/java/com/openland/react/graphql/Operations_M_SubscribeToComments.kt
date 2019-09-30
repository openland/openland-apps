package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SubscribeToCommentsSelector = obj(
            field("subscribeToComments","subscribeToComments", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("type", refValue("type"))), notNull(scalar("Boolean")))
        )
val SubscribeToComments = object: OperationDefinition {
    override val name = "SubscribeToComments"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SubscribeToComments(\$peerId:ID!,\$type:CommentSubscriptionType!){subscribeToComments(peerId:\$peerId,type:\$type)}"
    override val selector = SubscribeToCommentsSelector
}