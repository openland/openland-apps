package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomUpdateSelector = obj(
            field("betaRoomUpdate", "betaRoomUpdate", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("socialImage", "socialImage", scalar("String"))
                    ))
                )))
        )
val RoomUpdate = object: OperationDefinition {
    override val name = "RoomUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomUpdate(\$roomId:ID!,\$input:RoomUpdateInput!){betaRoomUpdate(roomId:\$roomId,input:\$input){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id title photo description socialImage}}}"
    override val selector = RoomUpdateSelector
}