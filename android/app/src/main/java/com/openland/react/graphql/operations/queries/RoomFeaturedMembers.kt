package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomFeaturedMembersSelector = obj(
            field("roomFeaturedMembers", "roomFeaturedMembers", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
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
                )))))
        )
val RoomFeaturedMembers = object: OperationDefinition {
    override val name = "RoomFeaturedMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomFeaturedMembers(\$roomId:ID!){roomFeaturedMembers(roomId:\$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = RoomFeaturedMembersSelector
}