package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAllStickerPacksSelector = obj(
            field("superAllStickerPacks", "superAllStickerPacks", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", SuperStickerPackFragmentSelector)
                )))))
        )
val SuperAllStickerPacks = object: OperationDefinition {
    override val name = "SuperAllStickerPacks"
    override val kind = OperationKind.QUERY
    override val body = "query SuperAllStickerPacks{superAllStickerPacks{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}"
    override val selector = SuperAllStickerPacksSelector
}