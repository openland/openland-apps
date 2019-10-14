package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountAddSelector = obj(
            field("superAccountAdd", "superAccountAdd", arguments(fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val SuperAccountAdd = object: OperationDefinition {
    override val name = "SuperAccountAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountAdd(\$title:String!){superAccountAdd(title:\$title){__typename id}}"
    override val selector = SuperAccountAddSelector
}