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
    override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = OrganizationSelector
}