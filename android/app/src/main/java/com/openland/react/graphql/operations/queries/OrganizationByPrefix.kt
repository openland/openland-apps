package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationByPrefixSelector = obj(
            field("alphaOrganizationByPrefix","organizationByPrefix", arguments(fieldValue("query", refValue("query"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                ))
        )
val OrganizationByPrefix = object: OperationDefinition {
    override val name = "OrganizationByPrefix"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationByPrefix(\$query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:\$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
    override val selector = OrganizationByPrefixSelector
}