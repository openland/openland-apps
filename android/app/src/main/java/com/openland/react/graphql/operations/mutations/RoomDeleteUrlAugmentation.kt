package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomDeleteUrlAugmentationSelector = obj(
            field("betaMessageDeleteAugmentation", "betaMessageDeleteAugmentation", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
val RoomDeleteUrlAugmentation = object: OperationDefinition {
    override val name = "RoomDeleteUrlAugmentation"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomDeleteUrlAugmentation(\$messageId:ID!){betaMessageDeleteAugmentation(mid:\$messageId)}"
    override val selector = RoomDeleteUrlAugmentationSelector
}