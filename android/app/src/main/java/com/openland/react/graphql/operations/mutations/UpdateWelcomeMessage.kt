package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UpdateWelcomeMessageSelector = obj(
            field("updateWelcomeMessage", "updateWelcomeMessage", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("welcomeMessageIsOn", refValue("welcomeMessageIsOn")), fieldValue("welcomeMessageSender", refValue("welcomeMessageSender")), fieldValue("welcomeMessageText", refValue("welcomeMessageText"))), notNull(scalar("Boolean")))
        )
val UpdateWelcomeMessage = object: OperationDefinition {
    override val name = "UpdateWelcomeMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UpdateWelcomeMessage(\$roomId:ID!,\$welcomeMessageIsOn:Boolean!,\$welcomeMessageSender:ID,\$welcomeMessageText:String){updateWelcomeMessage(roomId:\$roomId,welcomeMessageIsOn:\$welcomeMessageIsOn,welcomeMessageSender:\$welcomeMessageSender,welcomeMessageText:\$welcomeMessageText)}"
    override val selector = UpdateWelcomeMessageSelector
}