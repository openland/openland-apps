package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyStickersSelector = obj(
            field("myStickers", "stickers", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("packs", "packs", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("stickers", "stickers", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sticker", StickerFragmentSelector)
                                ))))),
                            field("title", "title", notNull(scalar("String")))
                        )))))
                )))
        )
val MyStickers = object: OperationDefinition {
    override val name = "MyStickers"
    override val kind = OperationKind.QUERY
    override val body = "query MyStickers{stickers:myStickers{__typename packs{__typename id stickers{__typename ...StickerFragment}title}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}"
    override val selector = MyStickersSelector
}