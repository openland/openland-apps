package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured", "betaRoomAlterFeatured", arguments(fieldValue("featured", refValue("featured")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("featured", "featured", notNull(scalar("Boolean"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean")))
                )))
        )
val RoomAlterFeatured = object: OperationDefinition {
    override val name = "RoomAlterFeatured"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAlterFeatured(\$featured:Boolean!,\$roomId:ID!){betaRoomAlterFeatured(featured:\$featured,roomId:\$roomId){__typename featured id listed}}"
    override val selector = RoomAlterFeaturedSelector
}