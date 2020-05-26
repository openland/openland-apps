package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val HubSelector = obj(
            field("hub", "hub", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Hub", HubSimpleSelector)
                ))
        )
val Hub = object: OperationDefinition {
    override val name = "Hub"
    override val kind = OperationKind.QUERY
    override val body = "query Hub(\$id:ID!){hub(id:\$id){__typename ...HubSimple}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = HubSelector
}