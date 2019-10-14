package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SetTypingSelector = obj(
            field("typingSend", "typingSend", arguments(fieldValue("conversationId", refValue("conversationId")), fieldValue("type", stringValue("TEXT"))), notNull(scalar("String")))
        )
val SetTyping = object: OperationDefinition {
    override val name = "SetTyping"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SetTyping(\$conversationId:ID!){typingSend(conversationId:\$conversationId,type:TEXT)}"
    override val selector = SetTypingSelector
}