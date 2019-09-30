package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommentUnsetReactionSelector = obj(
            field("commentReactionRemove","commentReactionRemove", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val CommentUnsetReaction = object: OperationDefinition {
    override val name = "CommentUnsetReaction"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CommentUnsetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionRemove(commentId:\$commentId,reaction:\$reaction)}"
    override val selector = CommentUnsetReactionSelector
}