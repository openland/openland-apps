package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UpdateOrganizationSelector = obj(
            field("updateOrganizationProfile", "updateOrganizationProfile", arguments(fieldValue("input", refValue("input")), fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val UpdateOrganization = object: OperationDefinition {
    override val name = "UpdateOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UpdateOrganization(\$input:UpdateOrganizationProfileInput!,\$organizationId:ID){updateOrganizationProfile(input:\$input,id:\$organizationId){__typename id}}"
    override val selector = UpdateOrganizationSelector
}