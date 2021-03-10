package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatDeleteSelector = obj(
            field("deleteChat", "deleteChat", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("oneSide", refValue("oneSide"))), notNull(scalar("Boolean")))
        )
val ChatDelete = object: OperationDefinition {
    override val name = "ChatDelete"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ChatDelete(\$chatId:ID!,\$oneSide:Boolean){deleteChat(chatId:\$chatId,oneSide:\$oneSide)}"
    override val selector = ChatDeleteSelector
}