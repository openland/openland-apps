package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddStickerSelector = obj(
            field("stickerPackAddSticker", "stickerPackAddSticker", arguments(fieldValue("id", refValue("packId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("ImageSticker", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                )))
        )
val AddSticker = object: OperationDefinition {
    override val name = "AddSticker"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddSticker(\$packId:ID!,\$input:StickerInput!){stickerPackAddSticker(id:\$packId,input:\$input){__typename ... on ImageSticker{__typename id}}}"
    override val selector = AddStickerSelector
}