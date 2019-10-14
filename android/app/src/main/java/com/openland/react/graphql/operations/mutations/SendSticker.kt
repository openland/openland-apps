package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendStickerSelector = obj(
            field("sendSticker", "sendSticker", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("stickerId", refValue("stickerId"))), notNull(scalar("Boolean")))
        )
val SendSticker = object: OperationDefinition {
    override val name = "SendSticker"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendSticker(\$chatId:ID!,\$repeatKey:String,\$replyMessages:[ID!],\$stickerId:ID!){sendSticker(chatId:\$chatId,repeatKey:\$repeatKey,replyMessages:\$replyMessages,stickerId:\$stickerId)}"
    override val selector = SendStickerSelector
}