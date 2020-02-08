package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UsersSelector = obj(
            field("users", "items", arguments(fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "title", notNull(scalar("String"))),
                    field("email", "subtitle", scalar("String"))
                )))))
        )
val Users = object: OperationDefinition {
    override val name = "Users"
    override val kind = OperationKind.QUERY
    override val body = "query Users(\$query:String!){items:users(query:\$query){__typename id title:name subtitle:email}}"
    override val selector = UsersSelector
}