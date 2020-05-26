package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val HubsSelector = obj(
            field("hubs", "hubs", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Hub", HubSimpleSelector)
                )))))
        )
val Hubs = object: OperationDefinition {
    override val name = "Hubs"
    override val kind = OperationKind.QUERY
    override val body = "query Hubs{hubs{__typename ...HubSimple}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = HubsSelector
}