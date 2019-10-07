package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelRemoveEditorSelector = obj(
            field("alphaFeedChannelRemoveEditor","alphaFeedChannelRemoveEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val FeedChannelRemoveEditor = object: OperationDefinition {
    override val name = "FeedChannelRemoveEditor"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelRemoveEditor(\$id:ID!,\$userId:ID!){alphaFeedChannelRemoveEditor(id:\$id,userId:\$userId)}"
    override val selector = FeedChannelRemoveEditorSelector
}