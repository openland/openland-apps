package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountAppInviteSelector = obj(
            field("appInvite", "invite", notNull(scalar("String")))
        )
val AccountAppInvite = object: OperationDefinition {
    override val name = "AccountAppInvite"
    override val kind = OperationKind.QUERY
    override val body = "query AccountAppInvite{invite:appInvite}"
    override val selector = AccountAppInviteSelector
}