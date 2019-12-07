package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelSubscribersSelector = obj(
            field("alphaFeedChannelSubscribers", "subscribers", arguments(fieldValue("after", refValue("after")), fieldValue("channelId", refValue("channelId")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("role", "role", notNull(scalar("String"))),
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        )))
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
val FeedChannelSubscribers = object: OperationDefinition {
    override val name = "FeedChannelSubscribers"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelSubscribers(\$after:String,\$channelId:ID!,\$first:Int!,\$query:String){subscribers:alphaFeedChannelSubscribers(after:\$after,channelId:\$channelId,first:\$first,query:\$query){__typename edges{__typename cursor node{__typename role user{__typename ...UserShort}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = FeedChannelSubscribersSelector
}