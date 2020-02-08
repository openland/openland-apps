package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val EditMessageSelector = obj(
            field("editMessage", "editMessage", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("message", refValue("message")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
val EditMessage = object: OperationDefinition {
    override val name = "EditMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation EditMessage(\$messageId:ID!,\$message:String,\$replyMessages:[ID!],\$mentions:[MentionInput!],\$fileAttachments:[FileAttachmentInput!],\$spans:[MessageSpanInput!]){editMessage(messageId:\$messageId,message:\$message,replyMessages:\$replyMessages,mentions:\$mentions,fileAttachments:\$fileAttachments,spans:\$spans)}"
    override val selector = EditMessageSelector
}