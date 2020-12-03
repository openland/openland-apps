package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperStickerPackCatalogSelector = obj(
            field("stickerPackCatalog", "stickers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", SuperStickerPackFragmentSelector)
                )))))
        )
val SuperStickerPackCatalog = object: OperationDefinition {
    override val name = "SuperStickerPackCatalog"
    override val kind = OperationKind.QUERY
    override val body = "query SuperStickerPackCatalog{stickers:stickerPackCatalog{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid crop{__typename x y w h}}}}}"
    override val selector = SuperStickerPackCatalogSelector
}