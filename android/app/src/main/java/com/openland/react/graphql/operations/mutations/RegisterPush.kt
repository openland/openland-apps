package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RegisterPushSelector = obj(
            field("registerPush","registerPush", arguments(fieldValue("endpoint", refValue("endpoint")), fieldValue("type", refValue("type"))), notNull(scalar("String")))
        )
val RegisterPush = object: OperationDefinition {
    override val name = "RegisterPush"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RegisterPush(\$endpoint:String!,\$type:PushType!){registerPush(endpoint:\$endpoint,type:\$type)}"
    override val selector = RegisterPushSelector
}