package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSuperSelector = obj(
            field("roomSuper", "roomSuper", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("featured", "featured", notNull(scalar("Boolean"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean")))
                ))
        )
val RoomSuper = object: OperationDefinition {
    override val name = "RoomSuper"
    override val kind = OperationKind.QUERY
    override val body = "query RoomSuper(\$id:ID!){roomSuper(id:\$id){__typename featured id listed}}"
    override val selector = RoomSuperSelector
}