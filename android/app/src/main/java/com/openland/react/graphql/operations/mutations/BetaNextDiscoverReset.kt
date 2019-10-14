package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BetaNextDiscoverResetSelector = obj(
            field("betaNextDiscoverReset", "betaNextDiscoverReset", notNull(scalar("Boolean")))
        )
val BetaNextDiscoverReset = object: OperationDefinition {
    override val name = "BetaNextDiscoverReset"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BetaNextDiscoverReset{betaNextDiscoverReset}"
    override val selector = BetaNextDiscoverResetSelector
}