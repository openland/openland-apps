package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperBadgeUnsetToRoomSelector = obj(
            field("superBadgeUnsetToRoom", "superBadgeUnsetToRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("badgeId", refValue("badgeId"))), notNull(scalar("Boolean")))
        )
val SuperBadgeUnsetToRoom = object: OperationDefinition {
    override val name = "SuperBadgeUnsetToRoom"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperBadgeUnsetToRoom(\$roomId:ID!,\$userId:ID!,\$badgeId:ID!){superBadgeUnsetToRoom(roomId:\$roomId,userId:\$userId,badgeId:\$badgeId)}"
    override val selector = SuperBadgeUnsetToRoomSelector
}