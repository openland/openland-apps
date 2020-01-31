package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetUserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserNanoSelector)
                )))
        )
val GetUser = object: OperationDefinition {
    override val name = "GetUser"
    override val kind = OperationKind.QUERY
    override val body = "query GetUser(\$id:ID!){user:user(id:\$id){__typename ...UserNano}}fragment UserNano on User{__typename firstName id lastName name online photo}"
    override val selector = GetUserSelector
}