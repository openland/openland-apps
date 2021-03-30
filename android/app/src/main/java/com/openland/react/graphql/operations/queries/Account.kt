package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("shortname", "shortname", scalar("String")),
                    field("email", "email", scalar("String"))
                )),
            field("myProfile", "myProfile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("authEmail", "authEmail", scalar("String"))
                )),
            field("sessionState", "sessionState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("isLoggedIn", "isLoggedIn", notNull(scalar("Boolean"))),
                    field("isActivated", "isActivated", notNull(scalar("Boolean"))),
                    field("isProfileCreated", "isProfileCreated", notNull(scalar("Boolean"))),
                    field("isAccountActivated", "isAccountActivated", notNull(scalar("Boolean"))),
                    field("isAccountExists", "isAccountExists", notNull(scalar("Boolean"))),
                    field("isAccountPicked", "isAccountPicked", notNull(scalar("Boolean"))),
                    field("isCompleted", "isCompleted", notNull(scalar("Boolean"))),
                    field("isBlocked", "isBlocked", notNull(scalar("Boolean")))
                ))),
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
val Account = object: OperationDefinition {
    override val name = "Account"
    override val kind = OperationKind.QUERY
    override val body = "query Account{me:me{__typename id name photo shortname email}myProfile{__typename id authEmail}sessionState:sessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}myPermissions{__typename roles}}"
    override val selector = AccountSelector
}