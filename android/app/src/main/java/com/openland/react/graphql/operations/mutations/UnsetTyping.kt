package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UnsetTypingSelector = obj(
            field("typingCancel", "typingCancel", arguments(fieldValue("conversationId", refValue("conversationId"))), notNull(scalar("String")))
        )
val UnsetTyping = object: OperationDefinition {
    override val name = "UnsetTyping"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UnsetTyping(\$conversationId:ID!){typingCancel(conversationId:\$conversationId)}"
    override val selector = UnsetTypingSelector
}