package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelRemoveWriterSelector = obj(
            field("alphaFeedChannelRemoveEditor", "alphaFeedChannelRemoveEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val FeedChannelRemoveWriter = object: OperationDefinition {
    override val name = "FeedChannelRemoveWriter"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelRemoveWriter(\$id:ID!,\$userId:ID!){alphaFeedChannelRemoveEditor(id:\$id,userId:\$userId)}"
    override val selector = FeedChannelRemoveWriterSelector
}