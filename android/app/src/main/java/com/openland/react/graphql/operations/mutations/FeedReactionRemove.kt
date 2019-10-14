package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedReactionRemoveSelector = obj(
            field("feedReactionRemove", "feedReactionRemove", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val FeedReactionRemove = object: OperationDefinition {
    override val name = "FeedReactionRemove"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedReactionRemove(\$feedItemId:ID!,\$reaction:MessageReactionType!){feedReactionRemove(feedItemId:\$feedItemId,reaction:\$reaction)}"
    override val selector = FeedReactionRemoveSelector
}