package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalEventBusSelector = obj(
            field("globalEventBus", "globalEventBus", arguments(fieldValue("topic", refValue("topic"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("message", "message", notNull(scalar("String")))
                )))
        )
val GlobalEventBus = object: OperationDefinition {
    override val name = "GlobalEventBus"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription GlobalEventBus(\$topic:String){globalEventBus(topic:\$topic){__typename message}}"
    override val selector = GlobalEventBusSelector
}