package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackAddToCollectionSelector = obj(
            field("stickerPackAddToCollection","stickerPackAddToCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val StickerPackAddToCollection = object: OperationDefinition {
    override val name = "StickerPackAddToCollection"
    override val kind = OperationKind.MUTATION
    override val body = "mutation StickerPackAddToCollection(\$id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:\$id)}"
    override val selector = StickerPackAddToCollectionSelector
}