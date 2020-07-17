package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewReadLastReadSelector = obj(
            field("lastReadedMessage", "message", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                ))
        )
val ChatNewReadLastRead = object: OperationDefinition {
    override val name = "ChatNewReadLastRead"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewReadLastRead(\$chatId:ID!){message:lastReadedMessage(chatId:\$chatId){__typename id}}"
    override val selector = ChatNewReadLastReadSelector
}