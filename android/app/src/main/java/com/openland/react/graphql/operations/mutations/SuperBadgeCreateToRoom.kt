package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperBadgeCreateToRoomSelector = obj(
            field("superBadgeCreateToRoom", "superBadgeCreateToRoom", arguments(fieldValue("name", refValue("name")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
val SuperBadgeCreateToRoom = object: OperationDefinition {
    override val name = "SuperBadgeCreateToRoom"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperBadgeCreateToRoom(\$name:String!,\$roomId:ID!,\$userId:ID!){superBadgeCreateToRoom(name:\$name,roomId:\$roomId,userId:\$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = SuperBadgeCreateToRoomSelector
}