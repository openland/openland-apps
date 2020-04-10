package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationWithoutMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFragmentSelector)
                )))
        )
val OrganizationWithoutMembers = object: OperationDefinition {
    override val name = "OrganizationWithoutMembers"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id isMine superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount}"
    override val selector = OrganizationWithoutMembersSelector
}