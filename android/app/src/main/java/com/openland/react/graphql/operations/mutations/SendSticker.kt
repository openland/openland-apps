package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendStickerSelector = obj(
            field("sendSticker", "sendSticker", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("stickerId", refValue("stickerId")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
val SendSticker = object: OperationDefinition {
    override val name = "SendSticker"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendSticker(\$chatId:ID!,\$stickerId:ID!,\$replyMessages:[ID!],\$repeatKey:String){sendSticker(chatId:\$chatId,stickerId:\$stickerId,replyMessages:\$replyMessages,repeatKey:\$repeatKey)}"
    override val selector = SendStickerSelector
}