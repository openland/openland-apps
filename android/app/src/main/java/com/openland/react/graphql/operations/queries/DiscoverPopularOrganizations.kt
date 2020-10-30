package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverPopularOrganizationsSelector = obj(
            field("discoverPopularNowOrganizations", "discoverPopularNowOrganizations", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("organization", "organization", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Organization", DiscoverOrganizationSelector)
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val DiscoverPopularOrganizations = object: OperationDefinition {
    override val name = "DiscoverPopularOrganizations"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverPopularOrganizations(\$first:Int!,\$after:String){discoverPopularNowOrganizations(first:\$first,after:\$after){__typename items{__typename organization{__typename ...DiscoverOrganization}}cursor}}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname}"
    override val selector = DiscoverPopularOrganizationsSelector
}