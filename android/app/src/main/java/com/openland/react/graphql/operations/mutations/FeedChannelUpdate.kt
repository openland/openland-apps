package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelUpdateSelector = obj(
            field("alphaFeedUpdateChannel", "channel", arguments(fieldValue("id", refValue("id")), fieldValue("title", refValue("title")), fieldValue("about", refValue("about")), fieldValue("photoRef", refValue("photoRef")), fieldValue("global", refValue("global"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val FeedChannelUpdate = object: OperationDefinition {
    override val name = "FeedChannelUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelUpdate(\$id:ID!,\$title:String!,\$about:String,\$photoRef:ImageRefInput,\$global:Boolean){channel:alphaFeedUpdateChannel(id:\$id,title:\$title,about:\$about,photoRef:\$photoRef,global:\$global){__typename id}}"
    override val selector = FeedChannelUpdateSelector
}