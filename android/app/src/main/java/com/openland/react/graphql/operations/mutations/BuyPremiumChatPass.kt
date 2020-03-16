package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BuyPremiumChatPassSelector = obj(
            field("betaBuyPremiumChatPass", "betaBuyPremiumChatPass", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                    field("membership", "membership", notNull(scalar("String")))
                )))
        )
val BuyPremiumChatPass = object: OperationDefinition {
    override val name = "BuyPremiumChatPass"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BuyPremiumChatPass(\$chatId:ID!){betaBuyPremiumChatPass(chatId:\$chatId){__typename id premiumPassIsActive membership}}"
    override val selector = BuyPremiumChatPassSelector
}