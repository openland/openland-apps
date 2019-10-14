package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val EditMessageSelector = obj(
            field("editMessage", "editMessage", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("messageId", refValue("messageId")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
val EditMessage = object: OperationDefinition {
    override val name = "EditMessage"
    override val kind = OperationKind.MUTATION
    override val body = "mutation EditMessage(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyMessages:[ID!],\$spans:[MessageSpanInput!]){editMessage(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyMessages:\$replyMessages,spans:\$spans)}"
    override val selector = EditMessageSelector
}