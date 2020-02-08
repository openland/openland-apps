package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersPaginatedSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(list(notNull(obj(
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
val RoomMembersPaginated = object: OperationDefinition {
    override val name = "RoomMembersPaginated"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembersPaginated(\$roomId:ID!,\$first:Int,\$after:ID){members:roomMembers(roomId:\$roomId,first:\$first,after:\$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = RoomMembersPaginatedSelector
}