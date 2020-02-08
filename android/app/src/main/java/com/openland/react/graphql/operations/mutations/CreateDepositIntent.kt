package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateDepositIntentSelector = obj(
            field("cardDepositIntent", "cardDepositIntent", arguments(fieldValue("id", refValue("cardId")), fieldValue("amount", refValue("amount")), fieldValue("retryKey", refValue("retryKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("clientSecret", "clientSecret", notNull(scalar("String")))
                )))
        )
val CreateDepositIntent = object: OperationDefinition {
    override val name = "CreateDepositIntent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateDepositIntent(\$cardId:ID!,\$amount:Int!,\$retryKey:String!){cardDepositIntent(id:\$cardId,amount:\$amount,retryKey:\$retryKey){__typename id clientSecret}}"
    override val selector = CreateDepositIntentSelector
}