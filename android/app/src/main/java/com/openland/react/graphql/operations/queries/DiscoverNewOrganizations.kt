package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverNewOrganizationsSelector = obj(
            field("discoverNewAndGrowingOrganizations", "discoverNewAndGrowingOrganizations", arguments(fieldValue("first", refValue("first")), fieldValue("seed", refValue("seed")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Organization", DiscoverOrganizationSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val DiscoverNewOrganizations = object: OperationDefinition {
    override val name = "DiscoverNewOrganizations"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverNewOrganizations(\$first:Int!,\$seed:Int!,\$after:String){discoverNewAndGrowingOrganizations(first:\$first,seed:\$seed,after:\$after){__typename items{__typename ...DiscoverOrganization}cursor}}fragment DiscoverOrganization on Organization{__typename id name photo membersCount}"
    override val selector = DiscoverNewOrganizationsSelector
}