package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedSubscriptionsSelector = obj(
            field("alphaFeedMySubscriptions","channels", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))))
        )
val FeedSubscriptions = object: OperationDefinition {
    override val name = "FeedSubscriptions"
    override val kind = OperationKind.QUERY
    override val body = "query FeedSubscriptions{channels:alphaFeedMySubscriptions{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}"
    override val selector = FeedSubscriptionsSelector
}