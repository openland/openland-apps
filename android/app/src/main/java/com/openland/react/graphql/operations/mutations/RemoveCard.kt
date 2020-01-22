package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RemoveCardSelector = obj(
            field("cardRemove", "cardRemove", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("deleted", "deleted", notNull(scalar("Boolean"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val RemoveCard = object: OperationDefinition {
    override val name = "RemoveCard"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RemoveCard(\$id:ID!){cardRemove(id:\$id){__typename deleted id}}"
    override val selector = RemoveCardSelector
}