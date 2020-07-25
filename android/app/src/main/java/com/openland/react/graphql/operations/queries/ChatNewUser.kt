package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewUserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", ChatNewUserFragmentSelector)
                )))
        )
val ChatNewUser = object: OperationDefinition {
    override val name = "ChatNewUser"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewUser(\$id:ID!){user(id:\$id){__typename ...ChatNewUserFragment}}fragment ChatNewUserFragment on User{__typename id firstName lastName isBot shortname}"
    override val selector = ChatNewUserSelector
}