package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAdminsSelector = obj(
            field("superAdmins", "superAdmins", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("email", "email", scalar("String"))
                )))))
        )
val SuperAdmins = object: OperationDefinition {
    override val name = "SuperAdmins"
    override val kind = OperationKind.QUERY
    override val body = "query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname}"
    override val selector = SuperAdminsSelector
}