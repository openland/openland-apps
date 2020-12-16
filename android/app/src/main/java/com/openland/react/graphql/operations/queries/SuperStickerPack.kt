package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperStickerPackSelector = obj(
            field("stickerPack", "stickerPack", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", SuperStickerPackFragmentSelector)
                ))
        )
val SuperStickerPack = object: OperationDefinition {
    override val name = "SuperStickerPack"
    override val kind = OperationKind.QUERY
    override val body = "query SuperStickerPack(\$id:ID!){stickerPack(id:\$id){__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}"
    override val selector = SuperStickerPackSelector
}