package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateDepositIntentSelector = obj(
            field("cardDepositIntent", "cardDepositIntent", arguments(fieldValue("amount", refValue("amount")), fieldValue("id", refValue("cardId")), fieldValue("retryKey", refValue("retryKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("clientSecret", "clientSecret", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val CreateDepositIntent = object: OperationDefinition {
    override val name = "CreateDepositIntent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateDepositIntent(\$amount:Int!,\$cardId:ID!,\$retryKey:String!){cardDepositIntent(amount:\$amount,id:\$cardId,retryKey:\$retryKey){__typename clientSecret id}}"
    override val selector = CreateDepositIntentSelector
}