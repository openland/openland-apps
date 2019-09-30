package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RegisterWebPushSelector = obj(
            field("registerWebPush","registerWebPush", arguments(fieldValue("endpoint", refValue("endpoint"))), notNull(scalar("String")))
        )
val RegisterWebPush = object: OperationDefinition {
    override val name = "RegisterWebPush"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RegisterWebPush(\$endpoint:String!){registerWebPush(endpoint:\$endpoint)}"
    override val selector = RegisterWebPushSelector
}