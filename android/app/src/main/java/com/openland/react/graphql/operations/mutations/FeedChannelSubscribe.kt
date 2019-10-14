package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelSubscribeSelector = obj(
            field("alphaFeedChannelSubscribe", "alphaFeedChannelSubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val FeedChannelSubscribe = object: OperationDefinition {
    override val name = "FeedChannelSubscribe"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelSubscribe(\$id:ID!){alphaFeedChannelSubscribe(id:\$id)}"
    override val selector = FeedChannelSubscribeSelector
}