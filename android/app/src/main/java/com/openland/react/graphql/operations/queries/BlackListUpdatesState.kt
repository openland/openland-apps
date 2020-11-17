package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BlackListUpdatesStateSelector = obj(
            field("blackListUpdatesState", "blackListUpdatesState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val BlackListUpdatesState = object: OperationDefinition {
    override val name = "BlackListUpdatesState"
    override val kind = OperationKind.QUERY
    override val body = "query BlackListUpdatesState{blackListUpdatesState{__typename state}}"
    override val selector = BlackListUpdatesStateSelector
}