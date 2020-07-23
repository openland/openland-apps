package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewLoadLastMessageSelector = obj(
            field("messages", "messages", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", intValue(1))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", ChatNewMessageFragmentSelector)
                )))))
        )
val ChatNewLoadLastMessage = object: OperationDefinition {
    override val name = "ChatNewLoadLastMessage"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewLoadLastMessage(\$chatId:ID!){messages(chatId:\$chatId,first:1){__typename ...ChatNewMessageFragment}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}"
    override val selector = ChatNewLoadLastMessageSelector
}