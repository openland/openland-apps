package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddAppToChatSelector = obj(
            field("addAppToChat", "addAppToChat", arguments(fieldValue("appId", refValue("appId")), fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppChat", AppChatSelector)
                )))
        )
val AddAppToChat = object: OperationDefinition {
    override val name = "AddAppToChat"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddAppToChat(\$appId:ID!,\$chatId:ID!){addAppToChat(appId:\$appId,chatId:\$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}webhook}"
    override val selector = AddAppToChatSelector
}