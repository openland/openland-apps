package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomJoinSelector = obj(
            field("betaRoomJoin", "join", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
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
val RoomJoin = object: OperationDefinition {
    override val name = "RoomJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomJoin(\$roomId:ID!){join:betaRoomJoin(roomId:\$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}"
    override val selector = RoomJoinSelector
}