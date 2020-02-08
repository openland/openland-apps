package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMembersTinySelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("shortname", "shortname", scalar("String")),
                            field("photo", "photo", scalar("String")),
                            field("primaryOrganization", "primaryOrganization", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String")))
                                ))
                        )))
                )))))
        )
val RoomMembersTiny = object: OperationDefinition {
    override val name = "RoomMembersTiny"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMembersTiny(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename id name shortname photo primaryOrganization{__typename id name}}}}"
    override val selector = RoomMembersTinySelector
}