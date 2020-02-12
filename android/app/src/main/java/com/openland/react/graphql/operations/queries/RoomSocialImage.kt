package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSocialImageSelector = obj(
            field("roomSocialImage", "roomSocialImage", arguments(fieldValue("roomId", refValue("roomId"))), scalar("String"))
        )
val RoomSocialImage = object: OperationDefinition {
    override val name = "RoomSocialImage"
    override val kind = OperationKind.QUERY
    override val body = "query RoomSocialImage(\$roomId:ID!){roomSocialImage(roomId:\$roomId)}"
    override val selector = RoomSocialImageSelector
}