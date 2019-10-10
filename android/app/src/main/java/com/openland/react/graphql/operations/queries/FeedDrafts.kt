package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedDraftsSelector = obj(
            field("alphaFeedMyDraftsChannel","drafts", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
val FeedDrafts = object: OperationDefinition {
    override val name = "FeedDrafts"
    override val kind = OperationKind.QUERY
    override val body = "query FeedDrafts{drafts:alphaFeedMyDraftsChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo shortname socialImage subscribed subscribersCount title}"
    override val selector = FeedDraftsSelector
}