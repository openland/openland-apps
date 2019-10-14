package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DeleteOrganizationSelector = obj(
            field("deleteOrganization", "deleteOrganization", arguments(fieldValue("id", refValue("organizationId"))), notNull(scalar("Boolean")))
        )
val DeleteOrganization = object: OperationDefinition {
    override val name = "DeleteOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DeleteOrganization(\$organizationId:ID!){deleteOrganization(id:\$organizationId)}"
    override val selector = DeleteOrganizationSelector
}