package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured", "betaRoomAlterFeatured", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("featured", refValue("featured"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean"))),
                    field("featured", "featured", notNull(scalar("Boolean")))
                )))
        )
val RoomAlterFeatured = object: OperationDefinition {
    override val name = "RoomAlterFeatured"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAlterFeatured(\$roomId:ID!,\$featured:Boolean!){betaRoomAlterFeatured(roomId:\$roomId,featured:\$featured){__typename id listed featured}}"
    override val selector = RoomAlterFeaturedSelector
}