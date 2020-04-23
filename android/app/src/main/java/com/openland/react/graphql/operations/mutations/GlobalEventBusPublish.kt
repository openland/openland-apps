package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GlobalEventBusPublishSelector = obj(
            field("globalEventBusPublish", "globalEventBusPublish", arguments(fieldValue("topic", refValue("topic")), fieldValue("message", refValue("message"))), notNull(scalar("Boolean")))
        )
val GlobalEventBusPublish = object: OperationDefinition {
    override val name = "GlobalEventBusPublish"
    override val kind = OperationKind.MUTATION
    override val body = "mutation GlobalEventBusPublish(\$topic:String,\$message:String){globalEventBusPublish(topic:\$topic,message:\$message)}"
    override val selector = GlobalEventBusPublishSelector
}