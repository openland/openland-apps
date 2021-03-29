package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersSearchSelector = obj(
            field("chatMembersSearch", "chatMembersSearch", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        ))),
                                    field("role", "role", notNull(scalar("String"))),
                                    field("membership", "membership", notNull(scalar("String"))),
                                    field("canKick", "canKick", notNull(scalar("Boolean"))),
                                    field("badge", "badge", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("UserBadge", UserBadgeSelector)
                                        ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val RoomMembersSearch = object: OperationDefinition {
    override val name = "RoomMembersSearch"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembersSearch(\$cid:ID!,\$query:String,\$first:Int!,\$after:String){chatMembersSearch(cid:\$cid,query:\$query,first:\$first,after:\$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = RoomMembersSearchSelector
}