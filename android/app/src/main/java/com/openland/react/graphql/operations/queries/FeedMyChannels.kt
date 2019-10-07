package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedMyChannelsSelector = obj(
            field("alphaFeedMyChannels","channels", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("FeedChannel", FeedChannelFullSelector)
                        )))))
                )))
        )
val FeedMyChannels = object: OperationDefinition {
    override val name = "FeedMyChannels"
    override val kind = OperationKind.QUERY
    override val body = "query FeedMyChannels(\$after:ID,\$first:Int!){channels:alphaFeedMyChannels(after:\$after,first:\$first){__typename cursor items{__typename ...FeedChannelFull}}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo shortname subscribed subscribersCount title}"
    override val selector = FeedMyChannelsSelector
}