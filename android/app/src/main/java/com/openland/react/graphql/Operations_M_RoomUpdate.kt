package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomUpdateSelector = obj(
            field("betaRoomUpdate","betaRoomUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("description","description", scalar("String")),
                        field("id","id", notNull(scalar("ID"))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("socialImage","socialImage", scalar("String")),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))
        )
val RoomUpdate = object: OperationDefinition {
    override val name = "RoomUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomUpdate(\$input:RoomUpdateInput!,\$roomId:ID!){betaRoomUpdate(input:\$input,roomId:\$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{description id photo socialImage title}}}"
    override val selector = RoomUpdateSelector
}