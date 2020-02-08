package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelCreateSelector = obj(
            field("alphaFeedCreateChannel", "channel", arguments(fieldValue("title", refValue("title")), fieldValue("about", refValue("about")), fieldValue("photoRef", refValue("photoRef")), fieldValue("global", refValue("global"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
val FeedChannelCreate = object: OperationDefinition {
    override val name = "FeedChannelCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedChannelCreate(\$title:String!,\$about:String,\$photoRef:ImageRefInput,\$global:Boolean){channel:alphaFeedCreateChannel(title:\$title,about:\$about,photoRef:\$photoRef,global:\$global){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}"
    override val selector = FeedChannelCreateSelector
}