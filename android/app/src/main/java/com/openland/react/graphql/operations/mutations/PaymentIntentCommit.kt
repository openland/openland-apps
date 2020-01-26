package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PaymentIntentCommitSelector = obj(
            field("paymentIntentCommit", "paymentIntentCommit", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val PaymentIntentCommit = object: OperationDefinition {
    override val name = "PaymentIntentCommit"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PaymentIntentCommit(\$id:ID!){paymentIntentCommit(id:\$id)}"
    override val selector = PaymentIntentCommitSelector
}