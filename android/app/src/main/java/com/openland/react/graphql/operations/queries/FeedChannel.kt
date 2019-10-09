package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelSelector = obj(
            field("alphaFeedChannel","channel", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
val FeedChannel = object: OperationDefinition {
    override val name = "FeedChannel"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannel(\$id:ID!){channel:alphaFeedChannel(id:\$id){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo shortname subscribed subscribersCount title}"
    override val selector = FeedChannelSelector
}