package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OnLogoutSelector = obj(
            field("onLogOut", "onLogOut", notNull(scalar("Boolean")))
        )
val OnLogout = object: OperationDefinition {
    override val name = "OnLogout"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OnLogout{onLogOut}"
    override val selector = OnLogoutSelector
}