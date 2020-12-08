package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSuperSelector = obj(
            field("roomSuper", "roomSuper", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("featured", "featured", notNull(scalar("Boolean"))),
                    field("giftStickerPackId", "giftStickerPackId", scalar("ID"))
                ))
        )
val RoomSuper = object: OperationDefinition {
    override val name = "RoomSuper"
    override val kind = OperationKind.QUERY
    override val body = "query RoomSuper(\$id:ID!){roomSuper(id:\$id){__typename id featured giftStickerPackId}}"
    override val selector = RoomSuperSelector
}