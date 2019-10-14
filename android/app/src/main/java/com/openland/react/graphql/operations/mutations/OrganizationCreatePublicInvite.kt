package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationCreatePublicInviteSelector = obj(
            field("alphaOrganizationRefreshInviteLink", "alphaOrganizationRefreshInviteLink", arguments(fieldValue("expirationDays", refValue("expirationDays")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("ttl", "ttl", scalar("String"))
                )))
        )
val OrganizationCreatePublicInvite = object: OperationDefinition {
    override val name = "OrganizationCreatePublicInvite"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationCreatePublicInvite(\$expirationDays:Int,\$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:\$expirationDays,organizationId:\$organizationId){__typename id key ttl}}"
    override val selector = OrganizationCreatePublicInviteSelector
}