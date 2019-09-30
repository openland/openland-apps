package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationAlterPublishedSelector = obj(
            field("alphaAlterPublished","alphaAlterPublished", arguments(fieldValue("id", refValue("organizationId")), fieldValue("published", refValue("published"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        )
val OrganizationAlterPublished = object: OperationDefinition {
    override val name = "OrganizationAlterPublished"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationAlterPublished(\$organizationId:ID!,\$published:Boolean!){alphaAlterPublished(id:\$organizationId,published:\$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
    override val selector = OrganizationAlterPublishedSelector
}