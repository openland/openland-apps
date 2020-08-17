package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationPicoSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))
        )
val OrganizationPico = object: OperationDefinition {
    override val name = "OrganizationPico"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationPico(\$id:ID!){organization(id:\$id){__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}"
    override val selector = OrganizationPicoSelector
}