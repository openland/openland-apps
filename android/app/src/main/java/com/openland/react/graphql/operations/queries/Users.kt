package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UsersSelector = obj(
            field("users", "users", arguments(fieldValue("ids", refValue("ids"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserFullSelector)
                )))))
        )
val Users = object: OperationDefinition {
    override val name = "Users"
    override val kind = OperationKind.QUERY
    override val body = "query Users(\$ids:[ID!]!){users(ids:\$ids){__typename ...UserFull}}fragment UserFull on User{__typename id name firstName lastName photo phone birthDay email website about birthDay location isBot isDeleted online lastSeen joinDate linkedin instagram twitter facebook shortname audienceSize inContacts isBanned isMeBanned primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = UsersSelector
}