package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAdminMembersSelector = obj(
            field("roomAdmins", "roomAdmins", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
val RoomAdminMembers = object: OperationDefinition {
    override val name = "RoomAdminMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomAdminMembers(\$roomId:ID!){roomAdmins(roomId:\$roomId){__typename user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname}"
    override val selector = RoomAdminMembersSelector
}