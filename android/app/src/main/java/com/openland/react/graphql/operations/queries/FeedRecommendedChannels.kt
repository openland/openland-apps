package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedRecommendedChannelsSelector = obj(
            field("alphaRecommendedChannels", "search", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
val FeedRecommendedChannels = object: OperationDefinition {
    override val name = "FeedRecommendedChannels"
    override val kind = OperationKind.QUERY
    override val body = "query FeedRecommendedChannels(\$after:String,\$first:Int!){search:alphaRecommendedChannels(after:\$after,first:\$first){__typename edges{__typename cursor node{__typename ...FeedChannelFull}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}"
    override val selector = FeedRecommendedChannelsSelector
}