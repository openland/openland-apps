package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
val RoomMembers = object: OperationDefinition {
    override val name = "RoomMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembers(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = RoomMembersSelector
}