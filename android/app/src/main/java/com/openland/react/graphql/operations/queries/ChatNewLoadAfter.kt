package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewLoadAfterSelector = obj(
            field("gammaMessages", "batch", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("limit")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", ChatNewMessageFragmentSelector)
                        ))))),
                    field("haveMoreForward", "haveMoreForward", scalar("Boolean"))
                ))
        )
val ChatNewLoadAfter = object: OperationDefinition {
    override val name = "ChatNewLoadAfter"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewLoadAfter(\$chatId:ID!,\$after:ID!,\$limit:Int!){batch:gammaMessages(chatId:\$chatId,first:\$limit,after:\$after){__typename messages{__typename ...ChatNewMessageFragment}haveMoreForward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}"
    override val selector = ChatNewLoadAfterSelector
}