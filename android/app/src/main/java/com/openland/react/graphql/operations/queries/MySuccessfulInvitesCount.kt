package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MySuccessfulInvitesCountSelector = obj(
            field("mySuccessfulInvitesCount", "mySuccessfulInvitesCount", notNull(scalar("Int")))
        )
val MySuccessfulInvitesCount = object: OperationDefinition {
    override val name = "MySuccessfulInvitesCount"
    override val kind = OperationKind.QUERY
    override val body = "query MySuccessfulInvitesCount{mySuccessfulInvitesCount}"
    override val selector = MySuccessfulInvitesCountSelector
}