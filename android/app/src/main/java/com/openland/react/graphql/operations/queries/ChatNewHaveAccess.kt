package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewHaveAccessSelector = obj(
            field("haveAccessToChat", "haveAccessToChat", arguments(fieldValue("chatId", refValue("chatId"))), notNull(scalar("Boolean")))
        )
val ChatNewHaveAccess = object: OperationDefinition {
    override val name = "ChatNewHaveAccess"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewHaveAccess(\$chatId:ID!){haveAccessToChat(chatId:\$chatId)}"
    override val selector = ChatNewHaveAccessSelector
}