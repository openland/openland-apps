package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatNewLoadBeforeSelector = obj(
            field("gammaMessages", "batch", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("limit")), fieldValue("before", refValue("before"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", ChatNewMessageFragmentSelector)
                        ))))),
                    field("haveMoreBackward", "haveMoreBackward", scalar("Boolean"))
                ))
        )
val ChatNewLoadBefore = object: OperationDefinition {
    override val name = "ChatNewLoadBefore"
    override val kind = OperationKind.QUERY
    override val body = "query ChatNewLoadBefore(\$chatId:ID!,\$before:ID!,\$limit:Int!){batch:gammaMessages(chatId:\$chatId,first:\$limit,before:\$before){__typename messages{__typename ...ChatNewMessageFragment}haveMoreBackward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}"
    override val selector = ChatNewLoadBeforeSelector
}