package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelSubscribersSelector = obj(
            field("alphaFeedChannelSubscribers", "subscribers", arguments(fieldValue("channelId", refValue("channelId")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        ))),
                                    field("role", "role", notNull(scalar("String")))
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
val FeedChannelSubscribers = object: OperationDefinition {
    override val name = "FeedChannelSubscribers"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelSubscribers(\$channelId:ID!,\$query:String,\$first:Int!,\$after:String){subscribers:alphaFeedChannelSubscribers(channelId:\$channelId,query:\$query,first:\$first,after:\$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = FeedChannelSubscribersSelector
}