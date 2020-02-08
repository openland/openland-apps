package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAlterHiddenSelector = obj(
            field("betaRoomAlterListed", "betaRoomAlterListed", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("listed", refValue("listed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean"))),
                    field("featured", "featured", notNull(scalar("Boolean")))
                )))
        )
val RoomAlterHidden = object: OperationDefinition {
    override val name = "RoomAlterHidden"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAlterHidden(\$roomId:ID!,\$listed:Boolean!){betaRoomAlterListed(roomId:\$roomId,listed:\$listed){__typename id listed featured}}"
    override val selector = RoomAlterHiddenSelector
}