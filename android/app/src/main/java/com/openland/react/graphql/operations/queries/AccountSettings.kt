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
    override val body = "query AccountSettings{me:me{__typename ...UserShort audienceSize}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = AccountSettingsSelector
}