package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserPicoSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("firstName", "firstName", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String"))
                )))
        )
val UserPico = object: OperationDefinition {
    override val name = "UserPico"
    override val kind = OperationKind.QUERY
    override val body = "query UserPico(\$userId:ID!){user:user(id:\$userId){__typename firstName id name photo}}"
    override val selector = UserPicoSelector
}