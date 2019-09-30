package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessageUnsetReactionSelector = obj(
            field("messageReactionRemove","messageReactionRemove", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
val MessageUnsetReaction = object: OperationDefinition {
    override val name = "MessageUnsetReaction"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MessageUnsetReaction(\$messageId:ID!,\$reaction:MessageReactionType!){messageReactionRemove(messageId:\$messageId,reaction:\$reaction)}"
    override val selector = MessageUnsetReactionSelector
}