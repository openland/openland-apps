package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersShortSelector = obj(
            field("roomMembers","members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        )))
                )))))
        )
val RoomMembersShort = object: OperationDefinition {
    override val name = "RoomMembersShort"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembersShort(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename id}}}"
    override val selector = RoomMembersShortSelector
}