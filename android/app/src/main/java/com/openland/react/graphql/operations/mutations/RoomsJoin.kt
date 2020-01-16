package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomsJoinSelector = obj(
            field("betaRoomsJoin", "join", arguments(fieldValue("roomsIds", refValue("roomsIds"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID")))
                    ))
                )))))
        )
val RoomsJoin = object: OperationDefinition {
    override val name = "RoomsJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomsJoin(\$roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:\$roomsIds){__typename ... on PrivateRoom{id}... on SharedRoom{id}}}"
    override val selector = RoomsJoinSelector
}