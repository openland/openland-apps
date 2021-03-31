package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationPicoSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("membersCount", "membersCount", notNull(scalar("Int"))),
                    fragment("Organization", OrganizationSmallSelector)
                )))
        )
val OrganizationPico = object: OperationDefinition {
    override val name = "OrganizationPico"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationPico(\$id:ID!){organization(id:\$id){__typename ...OrganizationSmall membersCount}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}"
    override val selector = OrganizationPicoSelector
}