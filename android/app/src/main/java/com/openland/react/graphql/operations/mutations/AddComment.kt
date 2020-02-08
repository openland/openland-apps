package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddCommentSelector = obj(
            field("betaAddComment", "betaAddComment", arguments(fieldValue("repeatKey", refValue("repeatKey")), fieldValue("peerId", refValue("peerId")), fieldValue("message", refValue("message")), fieldValue("replyComment", refValue("replyComment")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val AddComment = object: OperationDefinition {
    override val name = "AddComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddComment(\$repeatKey:String,\$peerId:ID!,\$message:String,\$replyComment:ID,\$mentions:[MentionInput!],\$fileAttachments:[FileAttachmentInput!],\$spans:[MessageSpanInput!]){betaAddComment(repeatKey:\$repeatKey,peerId:\$peerId,message:\$message,replyComment:\$replyComment,mentions:\$mentions,fileAttachments:\$fileAttachments,spans:\$spans){__typename id}}"
    override val selector = AddCommentSelector
}