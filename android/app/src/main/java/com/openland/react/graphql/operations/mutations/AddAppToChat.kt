package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddAppToChatSelector = obj(
            field("addAppToChat", "addAppToChat", arguments(fieldValue("appId", refValue("appId")), fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("PrivateRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            )),
                            inline("SharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            ))
                        ))),
                    field("webhook", "webhook", notNull(scalar("String")))
                )))
        )
val AddAppToChat = object: OperationDefinition {
    override val name = "AddAppToChat"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddAppToChat(\$appId:ID!,\$chatId:ID!){addAppToChat(appId:\$appId,chatId:\$chatId){__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}}"
    override val selector = AddAppToChatSelector
}