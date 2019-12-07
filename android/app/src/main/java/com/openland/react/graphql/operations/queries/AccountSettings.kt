package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountSettingsSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("audienceSize", "audienceSize", notNull(scalar("Int"))),
                    fragment("User", UserShortSelector)
                )),
            field("myOrganizations", "organizations", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
val AccountSettings = object: OperationDefinition {
    override val name = "AccountSettings"
    override val kind = OperationKind.QUERY
    override val body = "query AccountSettings{me:me{__typename audienceSize ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = AccountSettingsSelector
}