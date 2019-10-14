package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomDeleteMessagesSelector = obj(
            field("betaMessageDelete", "betaMessageDelete", arguments(fieldValue("mids", refValue("mids"))), notNull(scalar("Boolean")))
        )
val RoomDeleteMessages = object: OperationDefinition {
    override val name = "RoomDeleteMessages"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomDeleteMessages(\$mids:[ID!]!){betaMessageDelete(mids:\$mids)}"
    override val selector = RoomDeleteMessagesSelector
}