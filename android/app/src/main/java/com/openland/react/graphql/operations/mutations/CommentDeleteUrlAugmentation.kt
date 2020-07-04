package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommentDeleteUrlAugmentationSelector = obj(
            field("deleteCommentAugmentation", "deleteCommentAugmentation", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
val CommentDeleteUrlAugmentation = object: OperationDefinition {
    override val name = "CommentDeleteUrlAugmentation"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CommentDeleteUrlAugmentation(\$id:ID!){deleteCommentAugmentation(id:\$id)}"
    override val selector = CommentDeleteUrlAugmentationSelector
}