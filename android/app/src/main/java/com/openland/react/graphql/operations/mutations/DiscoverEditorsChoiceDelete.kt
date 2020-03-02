package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverEditorsChoiceDeleteSelector = obj(
            field("discoverEditorsChoiceDelete", "discoverEditorsChoiceDelete", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val DiscoverEditorsChoiceDelete = object: OperationDefinition {
    override val name = "DiscoverEditorsChoiceDelete"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverEditorsChoiceDelete(\$id:ID!){discoverEditorsChoiceDelete(id:\$id)}"
    override val selector = DiscoverEditorsChoiceDeleteSelector
}