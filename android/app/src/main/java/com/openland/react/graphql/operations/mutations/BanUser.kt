package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BanUserSelector = obj(
            field("banUser", "banUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val BanUser = object: OperationDefinition {
    override val name = "BanUser"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BanUser(\$id:ID!){banUser(id:\$id)}"
    override val selector = BanUserSelector
}