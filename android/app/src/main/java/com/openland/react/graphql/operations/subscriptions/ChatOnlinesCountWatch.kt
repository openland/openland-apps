package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatOnlinesCountWatchSelector = obj(
            field("chatOnlinesCount", "chatOnlinesCount", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("onlineMembers", "onlineMembers", notNull(scalar("Int")))
                )))
        )
val ChatOnlinesCountWatch = object: OperationDefinition {
    override val name = "ChatOnlinesCountWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ChatOnlinesCountWatch(\$chatId:ID!){chatOnlinesCount(chatId:\$chatId){__typename onlineMembers}}"
    override val selector = ChatOnlinesCountWatchSelector
}