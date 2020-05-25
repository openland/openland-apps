package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val HubSelector = obj(
            field("hub", "hub", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("shortname", "shortname", notNull(scalar("String"))),
                    field("type", "type", notNull(scalar("String"))),
                    field("owner", "owner", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("firstName", "firstName", notNull(scalar("String"))),
                            field("lastName", "lastName", scalar("String"))
                        ))
                ))
        )
val Hub = object: OperationDefinition {
    override val name = "Hub"
    override val kind = OperationKind.QUERY
    override val body = "query Hub(\$id:ID!){hub(id:\$id){__typename id title shortname type owner{__typename id firstName lastName}}}"
    override val selector = HubSelector
}