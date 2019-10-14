package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedDeletePostSelector = obj(
            field("alphaDeleteFeedPost", "alphaDeleteFeedPost", arguments(fieldValue("feedItemId", refValue("feedItemId"))), notNull(scalar("Boolean")))
        )
val FeedDeletePost = object: OperationDefinition {
    override val name = "FeedDeletePost"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedDeletePost(\$feedItemId:ID!){alphaDeleteFeedPost(feedItemId:\$feedItemId)}"
    override val selector = FeedDeletePostSelector
}