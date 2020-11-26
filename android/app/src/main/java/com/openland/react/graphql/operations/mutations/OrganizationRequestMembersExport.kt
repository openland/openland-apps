package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationRequestMembersExportSelector = obj(
            field("requestOrganizationMembersExport", "requestOrganizationMembersExport", arguments(fieldValue("id", refValue("organizationId"))), notNull(scalar("Boolean")))
        )
val OrganizationRequestMembersExport = object: OperationDefinition {
    override val name = "OrganizationRequestMembersExport"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationRequestMembersExport(\$organizationId:ID!){requestOrganizationMembersExport(id:\$organizationId)}"
    override val selector = OrganizationRequestMembersExportSelector
}