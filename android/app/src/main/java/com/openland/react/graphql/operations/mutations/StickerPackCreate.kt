package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackCreateSelector = obj(
            field("stickerPackCreate", "stickerPackCreate", arguments(fieldValue("title", refValue("title")), fieldValue("stickers", refValue("stickers"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val StickerPackCreate = object: OperationDefinition {
    override val name = "StickerPackCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation StickerPackCreate(\$title:String!,\$stickers:[StickerInput!]){stickerPackCreate(title:\$title,stickers:\$stickers){__typename id}}"
    override val selector = StickerPackCreateSelector
}