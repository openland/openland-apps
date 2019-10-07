package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelCreateSelector = obj(
            field("alphaFeedCreateChannel","channel", arguments(fieldValue("about", refValue("about")), fieldValue("global", refValue("global")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
val FeedChannelCreate = object: OperationDefinition {
    override val name = "FeedChannelCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelCreate(\$about:String,\$global:Boolean,\$photoRef:ImageRefInput,\$title:String!){channel:alphaFeedCreateChannel(about:\$about,global:\$global,photoRef:\$photoRef,title:\$title){__typename id}}"
    override val selector = FeedChannelCreateSelector
}