package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAdminAddSelector = obj(
            field("superAdminAdd", "superAdminAdd", arguments(fieldValue("userId", refValue("userId")), fieldValue("role", refValue("role"))), notNull(scalar("String")))
        )
val SuperAdminAdd = object: OperationDefinition {
    override val name = "SuperAdminAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAdminAdd(\$userId:ID!,\$role:SuperAdminRole!){superAdminAdd(userId:\$userId,role:\$role)}"
    override val selector = SuperAdminAddSelector
}