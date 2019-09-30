package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperBadgeUnsetToRoomSelector = obj(
            field("superBadgeUnsetToRoom","superBadgeUnsetToRoom", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
val SuperBadgeUnsetToRoom = object: OperationDefinition {
    override val name = "SuperBadgeUnsetToRoom"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperBadgeUnsetToRoom(\$badgeId:ID!,\$roomId:ID!,\$userId:ID!){superBadgeUnsetToRoom(badgeId:\$badgeId,roomId:\$roomId,userId:\$userId)}"
    override val selector = SuperBadgeUnsetToRoomSelector
}