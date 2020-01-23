package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MakeCardDefaultSelector = obj(
            field("cardMakeDefault", "cardMakeDefault", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("isDefault", "isDefault", notNull(scalar("Boolean")))
                )))
        )
val MakeCardDefault = object: OperationDefinition {
    override val name = "MakeCardDefault"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MakeCardDefault(\$id:ID!){cardMakeDefault(id:\$id){__typename id isDefault}}"
    override val selector = MakeCardDefaultSelector
}