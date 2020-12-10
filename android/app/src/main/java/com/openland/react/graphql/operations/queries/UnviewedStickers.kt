package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UnviewedStickersSelector = obj(
            field("myStickers", "stickers", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("unviewedCount", "unviewedCount", notNull(scalar("Int")))
                )))
        )
val UnviewedStickers = object: OperationDefinition {
    override val name = "UnviewedStickers"
    override val kind = OperationKind.QUERY
    override val body = "query UnviewedStickers{stickers:myStickers{__typename unviewedCount}}"
    override val selector = UnviewedStickersSelector
}