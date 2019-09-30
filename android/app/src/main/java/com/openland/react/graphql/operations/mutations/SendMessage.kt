package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendMessageSelector = obj(
            field("sendMessage","sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
val SendMessage = object: OperationDefinition {
    override val name = "SendMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendMessage(\$chatId:ID!,\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$repeatKey:String,\$replyMessages:[ID!],\$spans:[MessageSpanInput!]){sentMessage:sendMessage(chatId:\$chatId,fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,repeatKey:\$repeatKey,replyMessages:\$replyMessages,spans:\$spans)}"
    override val selector = SendMessageSelector
}