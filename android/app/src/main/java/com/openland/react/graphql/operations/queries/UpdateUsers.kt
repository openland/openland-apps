package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UpdateUsersSelector = obj(
            field("users", "users", arguments(fieldValue("ids", refValue("ids"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UpdateUserSelector)
                )))))
        )
val UpdateUsers = object: OperationDefinition {
    override val name = "UpdateUsers"
    override val kind = OperationKind.QUERY
    override val body = "query UpdateUsers(\$ids:[ID!]!){users(ids:\$ids){__typename ...UpdateUser}}fragment UpdateUser on User{__typename id name photo}"
    override val selector = UpdateUsersSelector
}