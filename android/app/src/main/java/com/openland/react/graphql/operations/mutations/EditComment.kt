package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val EditCommentSelector = obj(
            field("editComment", "editComment", arguments(fieldValue("id", refValue("id")), fieldValue("message", refValue("message")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
val EditComment = object: OperationDefinition {
    override val name = "EditComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation EditComment(\$id:ID!,\$message:String,\$mentions:[MentionInput!],\$fileAttachments:[FileAttachmentInput!],\$spans:[MessageSpanInput!]){editComment(id:\$id,message:\$message,mentions:\$mentions,fileAttachments:\$fileAttachments,spans:\$spans)}"
    override val selector = EditCommentSelector
}