package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserNanoSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("shortname", "shortname", scalar("String")),
                    field("isBot", "isBot", notNull(scalar("Boolean"))),
                    field("inContacts", "inContacts", notNull(scalar("Boolean")))
                )))
        )
val UserNano = object: OperationDefinition {
    override val name = "UserNano"
    override val kind = OperationKind.QUERY
    override val body = "query UserNano(\$id:ID!){user(id:\$id){__typename id name photo shortname isBot inContacts}}"
    override val selector = UserNanoSelector
}