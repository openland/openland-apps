package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverStateSelector = obj(
            field("dialogs", "dialogs", arguments(fieldValue("first", intValue(1))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID")))
                        )))))
                )))
        )
val DiscoverState = object: OperationDefinition {
    override val name = "DiscoverState"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverState{dialogs(first:1){__typename items{__typename id}}}"
    override val selector = DiscoverStateSelector
}