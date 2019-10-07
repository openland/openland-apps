package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelAddEditorSelector = obj(
            field("alphaFeedChannelAddEditor","alphaFeedChannelAddEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val FeedChannelAddEditor = object: OperationDefinition {
    override val name = "FeedChannelAddEditor"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelAddEditor(\$id:ID!,\$userId:ID!){alphaFeedChannelAddEditor(id:\$id,userId:\$userId)}"
    override val selector = FeedChannelAddEditorSelector
}