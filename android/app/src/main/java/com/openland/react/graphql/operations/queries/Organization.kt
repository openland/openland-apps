package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                )))
        )
val Organization = object: OperationDefinition {
    override val name = "Organization"
    override val kind = OperationKind.QUERY
    override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = OrganizationSelector
}