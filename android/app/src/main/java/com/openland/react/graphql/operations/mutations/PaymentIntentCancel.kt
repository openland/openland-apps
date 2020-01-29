package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PaymentIntentCancelSelector = obj(
            field("paymentCancel", "paymentCancel", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val PaymentIntentCancel = object: OperationDefinition {
    override val name = "PaymentIntentCancel"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PaymentIntentCancel(\$id:ID!){paymentCancel(id:\$id)}"
    override val selector = PaymentIntentCancelSelector
}