package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PermissionsSelector = obj(
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
val Permissions = object: OperationDefinition {
    override val name = "Permissions"
    override val kind = OperationKind.QUERY
    override val body = "query Permissions{myPermissions{__typename roles}}"
    override val selector = PermissionsSelector
}