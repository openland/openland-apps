package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddCommentSelector = obj(
            field("betaAddComment","betaAddComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("peerId", refValue("peerId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyComment", refValue("replyComment")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
val AddComment = object: OperationDefinition {
    override val name = "AddComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$peerId:ID!,\$repeatKey:String,\$replyComment:ID,\$spans:[MessageSpanInput!]){betaAddComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,peerId:\$peerId,repeatKey:\$repeatKey,replyComment:\$replyComment,spans:\$spans){__typename id}}"
    override val selector = AddCommentSelector
}