package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyCommunitiesSelector = obj(
            field("myCommunities", "myCommunities", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
                    field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
val MyCommunities = object: OperationDefinition {
    override val name = "MyCommunities"
    override val kind = OperationKind.QUERY
    override val body = "query MyCommunities{myCommunities{__typename ...OrganizationShort isOwner:betaIsOwner isAdmin:betaIsAdmin}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}"
    override val selector = MyCommunitiesSelector
}