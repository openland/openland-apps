package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedSubscriptionsSelector = obj(
            field("alphaFeedMySubscriptions", "channels", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedChannel", FeedChannelFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val FeedSubscriptions = object: OperationDefinition {
    override val name = "FeedSubscriptions"
    override val kind = OperationKind.QUERY
    override val body = "query FeedSubscriptions(\$first:Int!,\$after:ID){channels:alphaFeedMySubscriptions(first:\$first,after:\$after){__typename items{__typename ...FeedChannelFull}cursor}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}"
    override val selector = FeedSubscriptionsSelector
}