package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreatedStickerPacksSelector = obj(
            field("createdStickerPacks", "createdStickerPacks", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", SuperStickerPackFragmentSelector)
                )))))
        )
val CreatedStickerPacks = object: OperationDefinition {
    override val name = "CreatedStickerPacks"
    override val kind = OperationKind.QUERY
    override val body = "query CreatedStickerPacks{createdStickerPacks{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private listed added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}"
    override val selector = CreatedStickerPacksSelector
}