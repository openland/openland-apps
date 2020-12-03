package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackUpdateSelector = obj(
            field("stickerPackUpdate", "stickerPackUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val StickerPackUpdate = object: OperationDefinition {
    override val name = "StickerPackUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation StickerPackUpdate(\$id:ID!,\$input:StickerPackInput!){stickerPackUpdate(id:\$id,input:\$input){__typename id}}"
    override val selector = StickerPackUpdateSelector
}