package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAdminAddSelector = obj(
            field("superAdminAdd","superAdminAdd", arguments(fieldValue("role", refValue("role")), fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
val SuperAdminAdd = object: OperationDefinition {
    override val name = "SuperAdminAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAdminAdd(\$role:SuperAdminRole!,\$userId:ID!){superAdminAdd(role:\$role,userId:\$userId)}"
    override val selector = SuperAdminAddSelector
}