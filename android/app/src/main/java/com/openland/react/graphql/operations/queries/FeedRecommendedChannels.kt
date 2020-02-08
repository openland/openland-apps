package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedRecommendedChannelsSelector = obj(
            field("alphaRecommendedChannels", "search", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
val FeedRecommendedChannels = object: OperationDefinition {
    override val name = "FeedRecommendedChannels"
    override val kind = OperationKind.QUERY
    override val body = "query FeedRecommendedChannels(\$first:Int!,\$after:String){search:alphaRecommendedChannels(first:\$first,after:\$after){__typename edges{__typename node{__typename ...FeedChannelFull}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}"
    override val selector = FeedRecommendedChannelsSelector
}