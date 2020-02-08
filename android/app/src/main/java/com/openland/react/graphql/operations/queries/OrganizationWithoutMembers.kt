package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationWithoutMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
val OrganizationWithoutMembers = object: OperationDefinition {
    override val name = "OrganizationWithoutMembers"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}roomsCount:betaPublicRoomsCount}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = OrganizationWithoutMembersSelector
}