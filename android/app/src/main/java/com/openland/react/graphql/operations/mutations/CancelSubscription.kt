package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CancelSubscriptionSelector = obj(
            field("subscriptionCancel", "subscriptionCancel", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val CancelSubscription = object: OperationDefinition {
    override val name = "CancelSubscription"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CancelSubscription(\$id:ID!){subscriptionCancel(id:\$id){__typename id}}"
    override val selector = CancelSubscriptionSelector
}