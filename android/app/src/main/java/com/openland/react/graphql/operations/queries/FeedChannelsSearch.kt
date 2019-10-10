package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelsSearchSelector = obj(
            field("alphaFeedChannelSearch","search", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
val FeedChannelsSearch = object: OperationDefinition {
    override val name = "FeedChannelsSearch"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelsSearch(\$after:String,\$first:Int!,\$query:String,\$sort:String){search:alphaFeedChannelSearch(after:\$after,first:\$first,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...FeedChannelFull}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo shortname socialImage subscribed subscribersCount title}"
    override val selector = FeedChannelsSearchSelector
}