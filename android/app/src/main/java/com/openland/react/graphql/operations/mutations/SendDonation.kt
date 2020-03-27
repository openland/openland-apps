package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendDonationSelector = obj(
            field("sendDonation", "sendDonation", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("userId", refValue("userId")), fieldValue("amount", refValue("amount")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
val SendDonation = object: OperationDefinition {
    override val name = "SendDonation"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendDonation(\$amount:Int!,\$chatId:ID,\$userId:ID,\$message:String,\$repeatKey:String){sendDonation(chatId:\$chatId,userId:\$userId,amount:\$amount,message:\$message,repeatKey:\$repeatKey)}"
    override val selector = SendDonationSelector
}