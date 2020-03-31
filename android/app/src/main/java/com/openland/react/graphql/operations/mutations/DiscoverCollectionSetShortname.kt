package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionSetShortnameSelector = obj(
            field("alphaSetCollectionShortName", "alphaSetCollectionShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
val DiscoverCollectionSetShortname = object: OperationDefinition {
    override val name = "DiscoverCollectionSetShortname"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverCollectionSetShortname(\$id:ID!,\$shortname:String!){alphaSetCollectionShortName(id:\$id,shortname:\$shortname)}"
    override val selector = DiscoverCollectionSetShortnameSelector
}