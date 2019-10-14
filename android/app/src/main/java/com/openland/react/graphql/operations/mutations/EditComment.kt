package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val EditCommentSelector = obj(
            field("editComment", "editComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("id", refValue("id")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
val EditComment = object: OperationDefinition {
    override val name = "EditComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation EditComment(\$fileAttachments:[FileAttachmentInput!],\$id:ID!,\$mentions:[MentionInput!],\$message:String,\$spans:[MessageSpanInput!]){editComment(fileAttachments:\$fileAttachments,id:\$id,mentions:\$mentions,message:\$message,spans:\$spans)}"
    override val selector = EditCommentSelector
}