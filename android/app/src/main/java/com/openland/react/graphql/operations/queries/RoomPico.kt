package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomPicoSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomNanoSelector)
                ))
        )
val RoomPico = object: OperationDefinition {
    override val name = "RoomPico"
    override val kind = OperationKind.QUERY
    override val body = "query RoomPico(\$id:ID!){room(id:\$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}"
    override val selector = RoomPicoSelector
}