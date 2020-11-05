package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured", "betaRoomAlterFeatured", arguments(fieldValue("roomId", refValue("id")), fieldValue("featured", refValue("featured"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("featured", "featured", notNull(scalar("Boolean")))
                )))
        )
val RoomAlterFeatured = object: OperationDefinition {
    override val name = "RoomAlterFeatured"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAlterFeatured(\$id:ID!,\$featured:Boolean!){betaRoomAlterFeatured(roomId:\$id,featured:\$featured){__typename id featured}}"
    override val selector = RoomAlterFeaturedSelector
}