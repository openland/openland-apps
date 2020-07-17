package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewGetMessageSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", ChatNewMessageFragmentSelector)
                ))
        )
val ChatNewGetMessage = object: OperationDefinition {
    override val name = "ChatNewGetMessage"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewGetMessage(\$id:ID!){message(messageId:\$id){__typename ...ChatNewMessageFragment}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}"
    override val selector = ChatNewGetMessageSelector
}