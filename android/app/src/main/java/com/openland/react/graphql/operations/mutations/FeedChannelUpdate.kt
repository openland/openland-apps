package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelUpdateSelector = obj(
            field("alphaFeedUpdateChannel", "channel", arguments(fieldValue("about", refValue("about")), fieldValue("global", refValue("global")), fieldValue("id", refValue("id")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val FeedChannelUpdate = object: OperationDefinition {
    override val name = "FeedChannelUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelUpdate(\$about:String,\$global:Boolean,\$id:ID!,\$photoRef:ImageRefInput,\$title:String!){channel:alphaFeedUpdateChannel(about:\$about,global:\$global,id:\$id,photoRef:\$photoRef,title:\$title){__typename id}}"
    override val selector = FeedChannelUpdateSelector
}