package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAddMembersSelector = obj(
            field("alphaRoomInvite", "alphaRoomInvite", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("invites", refValue("invites"))), notNull(list(notNull(obj(
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
val RoomAddMembers = object: OperationDefinition {
    override val name = "RoomAddMembers"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAddMembers(\$roomId:ID!,\$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:\$roomId,invites:\$invites){__typename user{__typename ...UserShort}role membership canKick}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = RoomAddMembersSelector
}