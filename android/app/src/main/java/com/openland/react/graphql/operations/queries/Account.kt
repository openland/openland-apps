package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )),
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                ))),
            field("sessionState", "sessionState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SessionState", SessionStateFullSelector)
                )))
        )
val Account = object: OperationDefinition {
    override val name = "Account"
    override val kind = OperationKind.QUERY
    override val body = "query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isActivated isBlocked isCompleted isLoggedIn isProfileCreated}"
    override val selector = AccountSelector
}