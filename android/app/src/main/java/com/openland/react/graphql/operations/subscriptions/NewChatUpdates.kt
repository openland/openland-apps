package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val NewChatUpdatesSelector = obj(
            field("chatUpdates", "event", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("ChatUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", NewChatUpdateFragmentSelector)
                            )))
                    )),
                    inline("ChatUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", NewChatUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
val NewChatUpdates = object: OperationDefinition {
    override val name = "NewChatUpdates"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription NewChatUpdates(\$chatId:ID!,\$state:String){event:chatUpdates(chatId:\$chatId,fromState:\$state){__typename ... on ChatUpdateSingle{__typename state update{__typename ...NewChatUpdateFragment}}... on ChatUpdateBatch{__typename state updates{__typename ...NewChatUpdateFragment}}}}fragment NewChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...ChatNewMessageFragment}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...ChatNewMessageFragment}}... on ChatMessageDeleted{__typename message{__typename id}}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}"
    override val selector = NewChatUpdatesSelector
}