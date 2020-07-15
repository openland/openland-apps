package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomDeleteSelector = obj(
            field("deleteChat", "deleteChat", arguments(fieldValue("chatId", refValue("chatId"))), notNull(scalar("Boolean")))
        )
val RoomDelete = object: OperationDefinition {
    override val name = "RoomDelete"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomDelete(\$chatId:ID!){deleteChat(chatId:\$chatId)}"
    override val selector = RoomDeleteSelector
}