package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomPicoSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomNanoSelector)
                ))
        )
val RoomPico = object: OperationDefinition {
    override val name = "RoomPico"
    override val kind = OperationKind.QUERY
    override val body = "query RoomPico(\$id:ID!){room(id:\$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}}"
    override val selector = RoomPicoSelector
}