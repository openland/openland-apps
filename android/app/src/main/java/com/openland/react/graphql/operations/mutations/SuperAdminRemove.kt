package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAdminRemoveSelector = obj(
            field("superAdminRemove", "superAdminRemove", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
val SuperAdminRemove = object: OperationDefinition {
    override val name = "SuperAdminRemove"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAdminRemove(\$userId:ID!){superAdminRemove(userId:\$userId)}"
    override val selector = SuperAdminRemoveSelector
}