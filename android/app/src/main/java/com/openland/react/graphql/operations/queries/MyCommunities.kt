package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyCommunitiesSelector = obj(
            field("myCommunities", "myCommunities", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("membersCount", "membersCount", notNull(scalar("Int"))),
                    field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
                    field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationSmallSelector)
                )))))
        )
val MyCommunities = object: OperationDefinition {
    override val name = "MyCommunities"
    override val kind = OperationKind.QUERY
    override val body = "query MyCommunities{myCommunities{__typename ...OrganizationSmall membersCount isOwner:betaIsOwner isAdmin:betaIsAdmin}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}"
    override val selector = MyCommunitiesSelector
}