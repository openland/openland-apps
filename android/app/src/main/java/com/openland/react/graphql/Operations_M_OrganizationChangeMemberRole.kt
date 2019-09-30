package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationChangeMemberRoleSelector = obj(
            field("alphaOrganizationChangeMemberRole","alphaOrganizationChangeMemberRole", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("newRole", refValue("newRole")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
val OrganizationChangeMemberRole = object: OperationDefinition {
    override val name = "OrganizationChangeMemberRole"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationChangeMemberRole(\$memberId:ID!,\$newRole:OrganizationMemberRole!,\$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:\$memberId,newRole:\$newRole,organizationId:\$organizationId)}"
    override val selector = OrganizationChangeMemberRoleSelector
}