package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedReactionAddSelector = obj(
            field("feedReactionAdd","feedReactionAdd", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val FeedReactionAdd = object: OperationDefinition {
    override val name = "FeedReactionAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedReactionAdd(\$feedItemId:ID!,\$reaction:MessageReactionType!){feedReactionAdd(feedItemId:\$feedItemId,reaction:\$reaction)}"
    override val selector = FeedReactionAddSelector
}