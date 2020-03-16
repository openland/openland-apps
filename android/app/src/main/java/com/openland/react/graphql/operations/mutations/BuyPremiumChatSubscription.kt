package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BuyPremiumChatSubscriptionSelector = obj(
            field("betaBuyPremiumChatSubscription", "betaBuyPremiumChatSubscription", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                    field("premiumSubscription", "premiumSubscription", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("state", "state", notNull(scalar("String")))
                        )),
                    field("membership", "membership", notNull(scalar("String")))
                )))
        )
val BuyPremiumChatSubscription = object: OperationDefinition {
    override val name = "BuyPremiumChatSubscription"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BuyPremiumChatSubscription(\$chatId:ID!){betaBuyPremiumChatSubscription(chatId:\$chatId){__typename id premiumPassIsActive premiumSubscription{__typename id state}membership}}"
    override val selector = BuyPremiumChatSubscriptionSelector
}