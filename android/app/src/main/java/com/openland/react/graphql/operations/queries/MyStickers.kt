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
                            field("title", "title", notNull(scalar("String"))),
                            field("stickers", "stickers", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sticker", StickerFragmentSelector)
                                )))))
                        )))))
                )))
        )
val MyStickers = object: OperationDefinition {
    override val name = "MyStickers"
    override val kind = OperationKind.QUERY
    override val body = "query MyStickers{stickers:myStickers{__typename packs{__typename id title stickers{__typename ...StickerFragment}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}"
    override val selector = MyStickersSelector
}