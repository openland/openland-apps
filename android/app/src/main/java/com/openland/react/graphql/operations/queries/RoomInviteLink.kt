package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomInviteLinkSelector = obj(
            field("betaRoomInviteLink","link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
val RoomInviteLink = object: OperationDefinition {
    override val name = "RoomInviteLink"
    override val kind = OperationKind.QUERY
    override val body = "query RoomInviteLink(\$roomId:ID!){link:betaRoomInviteLink(roomId:\$roomId)}"
    override val selector = RoomInviteLinkSelector
}