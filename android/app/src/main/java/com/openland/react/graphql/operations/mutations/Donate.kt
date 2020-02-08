package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DonateSelector = obj(
            field("donateToUser", "donateToUser", arguments(fieldValue("id", refValue("id")), fieldValue("amount", intValue(100))), notNull(scalar("Boolean")))
        )
val Donate = object: OperationDefinition {
    override val name = "Donate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation Donate(\$id:ID!){donateToUser(id:\$id,amount:100)}"
    override val selector = DonateSelector
}