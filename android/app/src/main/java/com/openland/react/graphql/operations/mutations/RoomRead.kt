package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomReadSelector = obj(
            field("roomRead","roomRead", arguments(fieldValue("id", refValue("id")), fieldValue("mid", refValue("mid"))), notNull(scalar("Boolean")))
        )
val RoomRead = object: OperationDefinition {
    override val name = "RoomRead"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomRead(\$id:ID!,\$mid:ID!){roomRead(id:\$id,mid:\$mid)}"
    override val selector = RoomReadSelector
}