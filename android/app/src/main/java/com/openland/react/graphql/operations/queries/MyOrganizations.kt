package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyOrganizationsSelector = obj(
            field("myOrganizations", "myOrganizations", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("betaIsPrimary", "isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
val MyOrganizations = object: OperationDefinition {
    override val name = "MyOrganizations"
    override val kind = OperationKind.QUERY
    override val body = "query MyOrganizations{myOrganizations{__typename ...OrganizationShort isPrimary:betaIsPrimary}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = MyOrganizationsSelector
}