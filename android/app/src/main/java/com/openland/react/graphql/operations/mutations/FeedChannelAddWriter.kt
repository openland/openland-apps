package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelAddWriterSelector = obj(
            field("alphaFeedChannelAddEditor","alphaFeedChannelAddEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val FeedChannelAddWriter = object: OperationDefinition {
    override val name = "FeedChannelAddWriter"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelAddWriter(\$id:ID!,\$userId:ID!){alphaFeedChannelAddEditor(id:\$id,userId:\$userId)}"
    override val selector = FeedChannelAddWriterSelector
}