package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyStickersSelector = obj(
            field("myStickers", "stickers", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserStickers", MyStickersFragmentSelector)
                )))
        )
val MyStickers = object: OperationDefinition {
    override val name = "MyStickers"
    override val kind = OperationKind.QUERY
    override val body = "query MyStickers{stickers:myStickers{__typename ...MyStickersFragment}}fragment MyStickersFragment on UserStickers{__typename unviewedCount packs{__typename id title stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}"
    override val selector = MyStickersSelector
}