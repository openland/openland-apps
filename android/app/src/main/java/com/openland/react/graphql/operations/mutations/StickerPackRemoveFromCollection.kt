package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackRemoveFromCollectionSelector = obj(
            field("stickerPackRemoveFromCollection", "stickerPackRemoveFromCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val StickerPackRemoveFromCollection = object: OperationDefinition {
    override val name = "StickerPackRemoveFromCollection"
    override val kind = OperationKind.MUTATION
    override val body = "mutation StickerPackRemoveFromCollection(\$id:ID!){stickerPackRemoveFromCollection:stickerPackRemoveFromCollection(id:\$id)}"
    override val selector = StickerPackRemoveFromCollectionSelector
}