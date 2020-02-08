package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackSelector = obj(
            field("stickerPack", "stickerPack", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", StickerPackFragmentSelector)
                ))
        )
val StickerPack = object: OperationDefinition {
    override val name = "StickerPack"
    override val kind = OperationKind.QUERY
    override val body = "query StickerPack(\$id:ID!){stickerPack(id:\$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id title stickers{__typename ...StickerFragment}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}"
    override val selector = StickerPackSelector
}