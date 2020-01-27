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
    override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner roomsCount:betaPublicRoomsCount facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = OrganizationWithoutMembersSelector
}