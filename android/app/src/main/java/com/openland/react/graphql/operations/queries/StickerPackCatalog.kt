package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickerPackCatalogSelector = obj(
            field("stickerPackCatalog", "stickers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("published", "published", notNull(scalar("Boolean"))),
                    field("stickers", "stickers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sticker", StickerFragmentSelector)
                        )))))
                )))))
        )
val StickerPackCatalog = object: OperationDefinition {
    override val name = "StickerPackCatalog"
    override val kind = OperationKind.QUERY
    override val body = "query StickerPackCatalog{stickers:stickerPackCatalog{__typename id title published stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}"
    override val selector = StickerPackCatalogSelector
}