package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RemoveStickerSelector = obj(
            field("stickerPackRemoveSticker", "stickerPackRemoveSticker", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val RemoveSticker = object: OperationDefinition {
    override val name = "RemoveSticker"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RemoveSticker(\$id:ID!){stickerPackRemoveSticker(id:\$id)}"
    override val selector = RemoveStickerSelector
}