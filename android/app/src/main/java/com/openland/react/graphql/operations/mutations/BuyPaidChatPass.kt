package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BuyPaidChatPassSelector = obj(
            field("betaBuyPaidChatPass", "betaBuyPaidChatPass", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("paymentMethodId", refValue("paymentMethodId")), fieldValue("retryKey", refValue("retryKey"))), notNull(scalar("Boolean")))
        )
val BuyPaidChatPass = object: OperationDefinition {
    override val name = "BuyPaidChatPass"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BuyPaidChatPass(\$chatId:ID!,\$paymentMethodId:String!,\$retryKey:String!){betaBuyPaidChatPass(chatId:\$chatId,paymentMethodId:\$paymentMethodId,retryKey:\$retryKey)}"
    override val selector = BuyPaidChatPassSelector
}