package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyBlackListSelector = obj(
            field("myBlackList", "myBlackList", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )))))
        )
val MyBlackList = object: OperationDefinition {
    override val name = "MyBlackList"
    override val kind = OperationKind.QUERY
    override val body = "query MyBlackList{myBlackList{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts isBanned isMeBanned primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = MyBlackListSelector
}