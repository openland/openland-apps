package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelUnsubscribeSelector = obj(
            field("alphaFeedChannelUnsubscribe","alphaFeedChannelUnsubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val FeedChannelUnsubscribe = object: OperationDefinition {
    override val name = "FeedChannelUnsubscribe"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelUnsubscribe(\$id:ID!){alphaFeedChannelUnsubscribe(id:\$id)}"
    override val selector = FeedChannelUnsubscribeSelector
}