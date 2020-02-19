package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )),
            field("myProfile", "myProfile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("authEmail", "authEmail", scalar("String"))
                )),
            field("sessionState", "sessionState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SessionState", SessionStateFullSelector)
                ))),
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
val Account = object: OperationDefinition {
    override val name = "Account"
    override val kind = OperationKind.QUERY
    override val body = "query Account{me:me{__typename ...UserShort}myProfile{__typename id authEmail}sessionState:sessionState{__typename ...SessionStateFull}myPermissions{__typename roles}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment SessionStateFull on SessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}"
    override val selector = AccountSelector
}