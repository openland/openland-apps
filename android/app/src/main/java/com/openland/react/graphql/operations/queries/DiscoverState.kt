package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverStateSelector = obj(
            field("betaIsDiscoverDone", "betaIsDiscoverDone", notNull(scalar("Boolean"))),
            field("isDiscoverSkipped", "isDiscoverSkipped", notNull(scalar("Boolean")))
        )
val DiscoverState = object: OperationDefinition {
    override val name = "DiscoverState"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverState{betaIsDiscoverDone isDiscoverSkipped}"
    override val selector = DiscoverStateSelector
}