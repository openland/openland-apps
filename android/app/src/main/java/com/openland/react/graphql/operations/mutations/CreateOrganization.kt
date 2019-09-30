package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateOrganizationSelector = obj(
            field("createOrganization","organization", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )))
        )
val CreateOrganization = object: OperationDefinition {
    override val name = "CreateOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateOrganization(\$input:CreateOrganizationInput!){organization:createOrganization(input:\$input){__typename id name}}"
    override val selector = CreateOrganizationSelector
}