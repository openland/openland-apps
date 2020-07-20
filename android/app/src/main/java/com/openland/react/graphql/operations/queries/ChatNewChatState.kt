package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewChatStateSelector = obj(
            field("conversationState", "state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                )))
        )
val ChatNewChatState = object: OperationDefinition {
    override val name = "ChatNewChatState"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewChatState(\$chatId:ID!){state:conversationState(id:\$chatId){__typename state}}"
    override val selector = ChatNewChatStateSelector
}