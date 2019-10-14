package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverIsDoneSelector = obj(
            field("betaIsDiscoverDone", "betaIsDiscoverDone", notNull(scalar("Boolean")))
        )
val DiscoverIsDone = object: OperationDefinition {
    override val name = "DiscoverIsDone"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverIsDone{betaIsDiscoverDone}"
    override val selector = DiscoverIsDoneSelector
}