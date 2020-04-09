package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomKickSelector = obj(
            field("betaRoomKick", "betaRoomKick", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                )))
        )
val RoomKick = object: OperationDefinition {
    override val name = "RoomKick"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomKick(\$roomId:ID!,\$userId:ID!){betaRoomKick(roomId:\$roomId,userId:\$userId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}"
    override val selector = RoomKickSelector
}