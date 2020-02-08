package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SendMessageSelector = obj(
            field("sendMessage", "sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("message", refValue("message")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
val SendMessage = object: OperationDefinition {
    override val name = "SendMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SendMessage(\$chatId:ID!,\$message:String,\$replyMessages:[ID!],\$mentions:[MentionInput!],\$fileAttachments:[FileAttachmentInput!],\$spans:[MessageSpanInput!],\$repeatKey:String){sentMessage:sendMessage(chatId:\$chatId,message:\$message,replyMessages:\$replyMessages,mentions:\$mentions,fileAttachments:\$fileAttachments,spans:\$spans,repeatKey:\$repeatKey)}"
    override val selector = SendMessageSelector
}