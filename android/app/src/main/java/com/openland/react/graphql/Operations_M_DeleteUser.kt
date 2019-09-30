package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DeleteUserSelector = obj(
            field("superDeleteUser","superDeleteUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val DeleteUser = object: OperationDefinition {
    override val name = "DeleteUser"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DeleteUser(\$id:ID!){superDeleteUser(id:\$id)}"
    override val selector = DeleteUserSelector
}