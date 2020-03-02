package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsDeleteSelector = obj(
            field("discoverCollectionsDelete", "discoverCollectionsDelete", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val DiscoverCollectionsDelete = object: OperationDefinition {
    override val name = "DiscoverCollectionsDelete"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverCollectionsDelete(\$id:ID!){discoverCollectionsDelete(id:\$id)}"
    override val selector = DiscoverCollectionsDeleteSelector
}