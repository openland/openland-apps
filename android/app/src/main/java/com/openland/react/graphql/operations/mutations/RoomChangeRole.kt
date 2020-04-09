package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomChangeRoleSelector = obj(
            field("betaRoomChangeRole", "betaRoomChangeRole", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("newRole", refValue("newRole"))), notNull(obj(
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
val RoomChangeRole = object: OperationDefinition {
    override val name = "RoomChangeRole"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomChangeRole(\$roomId:ID!,\$userId:ID!,\$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:\$roomId,userId:\$userId,newRole:\$newRole){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}"
    override val selector = RoomChangeRoleSelector
}