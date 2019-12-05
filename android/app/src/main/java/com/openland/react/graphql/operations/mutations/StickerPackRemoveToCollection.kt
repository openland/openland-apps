package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackRemoveToCollectionSelector = obj(
            field("stickerPackAddToCollection", "stickerPackRemoveToCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val StickerPackRemoveToCollection = object: OperationDefinition {
    override val name = "StickerPackRemoveToCollection"
    override val kind = OperationKind.MUTATION
    override val body = "mutation StickerPackRemoveToCollection(\$id:ID!){stickerPackRemoveToCollection:stickerPackAddToCollection(id:\$id)}"
    override val selector = StickerPackRemoveToCollectionSelector
}