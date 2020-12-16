package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val StickersWatchSelector = obj(
            field("myStickersUpdates", "event", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserStickers", MyStickersFragmentSelector)
                )))
        )
val StickersWatch = object: OperationDefinition {
    override val name = "StickersWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription StickersWatch{event:myStickersUpdates{__typename ...MyStickersFragment}}fragment MyStickersFragment on UserStickers{__typename unviewedCount packs{__typename id title stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}"
    override val selector = StickersWatchSelector
}