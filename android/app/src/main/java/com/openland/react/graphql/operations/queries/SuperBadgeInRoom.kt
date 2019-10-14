package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperBadgeInRoomSelector = obj(
            field("superBadgeInRoom", "superBadgeInRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                ))
        )
val SuperBadgeInRoom = object: OperationDefinition {
    override val name = "SuperBadgeInRoom"
    override val kind = OperationKind.QUERY
    override val body = "query SuperBadgeInRoom(\$roomId:ID!,\$userId:ID!){superBadgeInRoom(roomId:\$roomId,userId:\$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = SuperBadgeInRoomSelector
}