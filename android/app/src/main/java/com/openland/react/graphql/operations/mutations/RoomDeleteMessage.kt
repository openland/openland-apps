package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomDeleteMessageSelector = obj(
            field("betaMessageDelete", "betaMessageDelete", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
val RoomDeleteMessage = object: OperationDefinition {
    override val name = "RoomDeleteMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomDeleteMessage(\$messageId:ID!){betaMessageDelete(mid:\$messageId)}"
    override val selector = RoomDeleteMessageSelector
}