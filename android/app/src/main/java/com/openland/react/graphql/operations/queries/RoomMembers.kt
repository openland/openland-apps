package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("role", "role", notNull(scalar("String"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean")))
                )))))
        )
val RoomMembers = object: OperationDefinition {
    override val name = "RoomMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembers(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename ...UserShort}role membership canKick}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = RoomMembersSelector
}