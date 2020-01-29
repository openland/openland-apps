package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BuyProChatSubscriptionSelector = obj(
            field("betaBuyProChatSubscription", "betaBuyProChatSubscription", arguments(fieldValue("chatId", refValue("chatId"))), notNull(scalar("Boolean")))
        )
val BuyProChatSubscription = object: OperationDefinition {
    override val name = "BuyProChatSubscription"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BuyProChatSubscription(\$chatId:ID!){betaBuyProChatSubscription(chatId:\$chatId)}"
    override val selector = BuyProChatSubscriptionSelector
}