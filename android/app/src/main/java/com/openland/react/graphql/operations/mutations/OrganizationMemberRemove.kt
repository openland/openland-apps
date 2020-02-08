package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationMemberRemoveSelector = obj(
            field("betaOrganizationMemberRemove", "betaOrganizationMemberRemove", arguments(fieldValue("userId", refValue("userId")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val OrganizationMemberRemove = object: OperationDefinition {
    override val name = "OrganizationMemberRemove"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationMemberRemove(\$userId:ID!,\$organizationId:ID!){betaOrganizationMemberRemove(userId:\$userId,organizationId:\$organizationId){__typename id}}"
    override val selector = OrganizationMemberRemoveSelector
}