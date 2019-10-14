package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommentSetReactionSelector = obj(
            field("commentReactionAdd", "commentReactionAdd", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val CommentSetReaction = object: OperationDefinition {
    override val name = "CommentSetReaction"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CommentSetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionAdd(commentId:\$commentId,reaction:\$reaction)}"
    override val selector = CommentSetReactionSelector
}