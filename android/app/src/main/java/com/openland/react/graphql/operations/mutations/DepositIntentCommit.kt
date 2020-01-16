package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DepositIntentCommitSelector = obj(
            field("cardDepositIntentCommit", "cardDepositIntentCommit", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val DepositIntentCommit = object: OperationDefinition {
    override val name = "DepositIntentCommit"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DepositIntentCommit(\$id:ID!){cardDepositIntentCommit(id:\$id)}"
    override val selector = DepositIntentCommitSelector
}