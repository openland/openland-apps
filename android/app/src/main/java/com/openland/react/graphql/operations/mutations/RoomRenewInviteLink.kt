package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomRenewInviteLinkSelector = obj(
            field("betaRoomInviteLinkRenew", "link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
val RoomRenewInviteLink = object: OperationDefinition {
    override val name = "RoomRenewInviteLink"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomRenewInviteLink(\$roomId:ID!){link:betaRoomInviteLinkRenew(roomId:\$roomId)}"
    override val selector = RoomRenewInviteLinkSelector
}