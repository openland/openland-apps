package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationPublicInviteSelector = obj(
            field("alphaOrganizationInviteLink", "publicInvite", arguments(fieldValue("organizationId", refValue("organizationId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("ttl", "ttl", scalar("String"))
                ))
        )
val OrganizationPublicInvite = object: OperationDefinition {
    override val name = "OrganizationPublicInvite"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationPublicInvite(\$organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:\$organizationId){__typename id key ttl}}"
    override val selector = OrganizationPublicInviteSelector
}