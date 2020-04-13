package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFragmentSelector)
                )))
        )
val Organization = object: OperationDefinition {
    override val name = "Organization"
    override val kind = OperationKind.QUERY
    override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id isMine superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount}"
    override val selector = OrganizationSelector
}