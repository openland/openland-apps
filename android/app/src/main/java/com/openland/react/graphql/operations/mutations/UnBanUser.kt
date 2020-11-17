package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UnBanUserSelector = obj(
            field("unBanUser", "unBanUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val UnBanUser = object: OperationDefinition {
    override val name = "UnBanUser"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UnBanUser(\$id:ID!){unBanUser(id:\$id)}"
    override val selector = UnBanUserSelector
}