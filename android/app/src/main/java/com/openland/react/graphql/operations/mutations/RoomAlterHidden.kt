package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAlterHiddenSelector = obj(
            field("betaRoomAlterListed","betaRoomAlterListed", arguments(fieldValue("listed", refValue("listed")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        )
val RoomAlterHidden = object: OperationDefinition {
    override val name = "RoomAlterHidden"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomAlterHidden(\$listed:Boolean!,\$roomId:ID!){betaRoomAlterListed(listed:\$listed,roomId:\$roomId){__typename featured id listed}}"
    override val selector = RoomAlterHiddenSelector
}