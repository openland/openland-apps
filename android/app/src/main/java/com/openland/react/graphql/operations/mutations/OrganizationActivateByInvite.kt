package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationActivateByInviteSelector = obj(
            field("joinAppInvite", "joinAppInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
val OrganizationActivateByInvite = object: OperationDefinition {
    override val name = "OrganizationActivateByInvite"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationActivateByInvite(\$inviteKey:String!){joinAppInvite(key:\$inviteKey)}"
    override val selector = OrganizationActivateByInviteSelector
}