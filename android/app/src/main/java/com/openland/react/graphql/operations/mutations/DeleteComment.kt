package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DeleteCommentSelector = obj(
            field("deleteComment", "deleteComment", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val DeleteComment = object: OperationDefinition {
    override val name = "DeleteComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DeleteComment(\$id:ID!){deleteComment(id:\$id)}"
    override val selector = DeleteCommentSelector
}